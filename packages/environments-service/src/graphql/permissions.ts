import { AuthenticationError, ForbiddenError } from 'apollo-server-express';
import { ApolloContext } from '../typings';
import { rule, shield, allow, and } from 'graphql-shield';
import { Rule } from 'graphql-shield/dist/rules';
import { createRateLimitRule } from 'graphql-rate-limit';

const rateLimitRule = createRateLimitRule({ identifyContext: ctx => ctx.id });

const isAuthenticated = rule({ cache: 'contextual' })(
  (_, __, { auth }: ApolloContext) => {
    if (!auth.isAuthenticated || !auth.user) {
      return new AuthenticationError('Unauthorized');
    }

    return auth.isAuthenticated;
  }
);

const hasRole = (...roles: string[]): Rule =>
  rule({ cache: 'contextual' })((_, __, { auth }: ApolloContext) => {
    if (!roles.includes(auth.user.role)) {
      return new ForbiddenError(`You don't have access to this resource!`);
    }

    return true;
  });

const permissions = shield({
  Query: {
    '*': isAuthenticated,
    /*
      We need to allow the federation spec queries so AGM
      can fetch the needed info about the service.
    */
    _entities: allow,
    _service: allow,
  },
  Mutation: {
    createEnvironment: and(
      isAuthenticated,
      rateLimitRule({ window: '10m', max: 5 })
    ),
  },
});

export default permissions;
