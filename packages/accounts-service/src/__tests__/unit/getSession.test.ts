import getSession from '../../helpers/getSession';
import createSession from '../../helpers/createSession';
import { generate } from 'shortid';
import mockRedisClient from '../mocks/mockRedisClient';

describe('getSession', () => {
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

  it('returns a session if valid', async () => {
    const mockUserId = generate();
    const mockSessionSecret = generate();
    const newSession = await createSession(
      mockUserId,
      mockRedisClient,
      mockSessionSecret,
      1000
    );

    sessionIds.push(newSession.sessionId);

    const retrievedSession = await getSession(
      newSession.sessionId,
      mockRedisClient,
      mockSessionSecret
    );

    expect(retrievedSession).toBeTruthy();
  });

  it(`returns null if session doesn't exist or has expired`, async () => {
    const mockUserId = generate();
    const mockSessionSecret = generate();
    const newSession = await createSession(
      mockUserId,
      mockRedisClient,
      mockSessionSecret,
      -1
    );

    const retrievedSession = await getSession(
      newSession.sessionId,
      mockRedisClient,
      mockSessionSecret
    );

    expect(retrievedSession).toBeNull();
  });
});
