import mockRedisClient from '../mocks/mockRedisClient';
import createSession from '../../helpers/createSession';
import { generate, isValid } from 'shortid';
import getSession from '../../helpers/getSession';

describe('createSession', () => {
  let sessionIds: string[] = [];

  afterAll(() => {
    // Remove every mock session created in tests
    sessionIds.forEach(sessionId => {
      mockRedisClient.del(`session_${sessionId}`);
    });

    sessionIds = [];

    // Close redis connection so no handles are left open
    mockRedisClient.quit();
  });

  it('creates a valid and secure session', async () => {
    const mockUserId = generate();
    const mockSessionSecret = generate();
    const session = await createSession(
      mockUserId,
      mockRedisClient,
      mockSessionSecret,
      259200
    );

    expect(isValid(session.csrfToken)).toBeTruthy();
    expect(isValid(session.sessionId)).toBeTruthy();
    sessionIds.push(session.sessionId);

    const prevSession = await getSession(
      session.sessionId,
      mockRedisClient,
      mockSessionSecret
    );

    expect(isValid(prevSession?.csrfToken)).toBeTruthy();
    expect(isValid(prevSession?.sessionId)).toBeTruthy();
    expect(isValid(prevSession?.userId)).toBeTruthy();
  });

  it('expires session after specified time', async () => {
    const mockUserId = generate();
    const mockSessionSecret = generate();

    const session = await createSession(
      mockUserId,
      mockRedisClient,
      mockSessionSecret,
      -1
    );

    const prevSession = await getSession(
      session.sessionId,
      mockRedisClient,
      mockSessionSecret
    );

    expect(prevSession).toBeNull();
  });
});
