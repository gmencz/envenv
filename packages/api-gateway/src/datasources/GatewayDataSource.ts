import { RemoteGraphQLDataSource } from '@apollo/gateway';
import parseCookies from '../helpers/parseCookies';
import { GatewayContext } from '../typings';

type WillSendRequestParams = {
  request: any;
  context: GatewayContext;
};

export default class GatewayDataSource extends RemoteGraphQLDataSource {
  willSendRequest({ request, context }: WillSendRequestParams): void {
    if (context && context.req && context.req.cookies) {
      // Perform authentication here
      // console.log(context.req.cookies);

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
