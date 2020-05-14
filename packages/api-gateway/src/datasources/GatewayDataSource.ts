import { RemoteGraphQLDataSource } from '@apollo/gateway';
import parseCookies from '../helpers/parseCookies';

export default class GatewayDataSource extends RemoteGraphQLDataSource {
  willSendRequest({ request, context }): void {
    if (context && context.req && context.req.cookies) {
      request.http.headers.set('Cookie', JSON.stringify(context.req.cookies));
    }
  }

  didReceiveResponse({ response, context }): typeof response {
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
