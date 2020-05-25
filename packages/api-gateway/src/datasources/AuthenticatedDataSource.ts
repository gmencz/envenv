import { RemoteGraphQLDataSource } from '@apollo/gateway';
import parseCookies from '../helpers/parseCookies';
import { GatewayContext } from '../typings';
import getSession from '../helpers/getSession';
import redisClient from '../helpers/redisClient';

type WillSendRequestParams = {
  request: any;
  context: GatewayContext;
};

export default class AuthenticatedDataSource extends RemoteGraphQLDataSource {
  async willSendRequest({
    request,
    context,
  }: WillSendRequestParams): Promise<void> {
    if (context && context.req && context.req.cookies) {
      // Perform authentication here
      if (context.req.cookies.SessionID) {
        const session = await getSession(
          context.req.cookies.SessionID,
          redisClient
        );

        if (
          session &&
          session.csrfToken === context.req.headers['csrf-token']
        ) {
          request.http.headers.set(
            'user',
            JSON.stringify({ id: session.userId, role: session.userRole })
          );
        }
      }

      request.http.headers.set('forwarded-from-gateway', 'true');
      request.http.headers.set('Cookie', JSON.stringify(context.req.cookies));
    }
  }

  // The context here is also the gateway's
  didReceiveResponse({ response, context }: any): typeof response {
    const rawCookies = response.http.headers.get('set-cookie') as string | null;

    if (rawCookies) {
      const cookies = parseCookies(rawCookies);
      cookies.forEach(({ cookieName, cookieValue, options }) => {
        if (context && context.res) {
          context.res.cookie(cookieName, cookieValue, options);
        }
      });
    }

    return response;
  }
}
