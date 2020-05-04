import parseCookies from '../../helpers/parseCookies';

describe('Cookie parser tests', () => {
  test('parses a single cookie without directives', () => {
    const parsedCookies = parseCookies('mockName=mockValue');
    expect(parsedCookies).toHaveLength(1);
    expect(parsedCookies[0]).toMatchObject({
      cookieName: 'mockName',
      cookieValue: 'mockValue',
      options: {},
    });
  });

  test('parses a single cookie with directives', () => {
    const parsedCookies = parseCookies(
      'mockName=mockValue; Path=/; HttpOnly; Secure; maxage=360000'
    );
    expect(parsedCookies).toHaveLength(1);
    expect(parsedCookies[0]).toMatchObject({
      cookieName: 'mockName',
      cookieValue: 'mockValue',
      options: {
        path: '/',
        httpOnly: true,
        secure: true,
        maxAge: 360000,
      },
    });
  });

  test('parses a single cookie with every available directive', () => {
    const parsedCookies = parseCookies(
      'mockName=mockValue; Max-Age=360000; Path=/pp; Expires=Mon, 04 May 2020 16:35:10 GMT; HttpOnly; Secure; SameSite=Strict'
    );
    expect(parsedCookies).toHaveLength(1);
    expect(parsedCookies[0]).toMatchObject({
      cookieName: 'mockName',
      cookieValue: 'mockValue',
      options: {
        path: '/pp',
        httpOnly: true,
        secure: true,
        expires: new Date('2020-05-04T16:35:10.000Z'),
        sameSite: 'strict',
        maxAge: 360000,
      },
    });
  });

  test('parses multiple cookies without directives', () => {
    const parsedCookies = parseCookies(
      'mockName1=mockValue1, mockName2=mockValue2, mockName3=mockValue3'
    );
    expect(parsedCookies).toHaveLength(3);
  });

  test('parses multiple cookies with every available directive', () => {
    const parsedCookies = parseCookies(
      'mockName1=mockValue1; Max-Age=360000; Path=/pp; Expires=Mon, 04 May 2020 16:35:10 GMT; HttpOnly; Secure; SameSite=Strict, mockName2=mockValue2; Max-Age=360000; Path=/pp; Expires=Mon, 04 May 2020 16:35:10 GMT; HttpOnly; Secure; SameSite=Strict, mockName3=mockValue3; Max-Age=360000; Path=/pp; Expires=Mon, 04 May 2020 16:35:10 GMT; HttpOnly; Secure; SameSite=Strict'
    );
    expect(parsedCookies).toHaveLength(3);
    expect(parsedCookies[0]).toMatchObject({
      cookieName: 'mockName1',
      cookieValue: 'mockValue1',
      options: {
        path: '/pp',
        httpOnly: true,
        secure: true,
        expires: new Date('2020-05-04T16:35:10.000Z'),
        sameSite: 'strict',
        maxAge: 360000,
      },
    });
    expect(parsedCookies[1]).toMatchObject({
      cookieName: 'mockName2',
      cookieValue: 'mockValue2',
      options: {
        path: '/pp',
        httpOnly: true,
        secure: true,
        expires: new Date('2020-05-04T16:35:10.000Z'),
        sameSite: 'strict',
        maxAge: 360000,
      },
    });
    expect(parsedCookies[2]).toMatchObject({
      cookieName: 'mockName3',
      cookieValue: 'mockValue3',
      options: {
        path: '/pp',
        httpOnly: true,
        secure: true,
        expires: new Date('2020-05-04T16:35:10.000Z'),
        sameSite: 'strict',
        maxAge: 360000,
      },
    });
  });

  test('throws error if invalid cookie (invalid set-cookie header) is provided', () => {
    try {
      parseCookies('');
    } catch (error) {
      expect(error.message).toBe(
        'Invalid raw cookies, look at the format of a set-cookie header string and provide something similar.'
      );
    }

    try {
      parseCookies('cookie');
    } catch (error) {
      expect(error.message).toBe(
        'Invalid raw cookies, look at the format of a set-cookie header string and provide something similar.'
      );
    }
  });
});
