import { rule, shield, and } from 'graphql-shield';
import { ApolloContext } from '../typings';
import { Rule } from 'graphql-shield/dist/rules';
import { ForbiddenError, AuthenticationError } from 'apollo-server-express';

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
    me: isAuthenticated,
    user: and(isAuthenticated, hasRole('USER')),
  },
});

export default permissions;
