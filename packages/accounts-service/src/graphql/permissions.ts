import { rule, shield, and } from 'graphql-shield';
import { ApolloContext } from '../typings';
import { Rule } from 'graphql-shield/dist/rules';
import { ForbiddenError, AuthenticationError } from 'apollo-server-express';
import { createRateLimitRule } from 'graphql-rate-limit';
import { UserRole } from '@prisma/client';

const isAuthenticated = rule({ cache: 'contextual' })(
  (_, __, { auth }: ApolloContext) => {
    if (!auth.isAuthenticated || !auth.user) {
      return new AuthenticationError('Unauthorized');
    }

    return auth.isAuthenticated;
  }
);

const hasRole = (...roles: UserRole[]): Rule =>
  rule({ cache: 'contextual' })((_, __, { auth }: ApolloContext) => {
    if (!roles.includes(auth.user.role)) {
      return new ForbiddenError(`You don't have access to this resource!`);
    }

    return true;
  });

const permissions = shield({
  Query: {
    me: and(
      isAuthenticated,
      createRateLimitRule({ identifyContext: ctx => ctx.id })({
        window: '1m',
        max: 5,
      })
    ),
    user: and(
      isAuthenticated,
      createRateLimitRule({ identifyContext: ctx => ctx.id })({
        window: '1m',
        max: 10,
      })
    ),
  },
});

export default permissions;
