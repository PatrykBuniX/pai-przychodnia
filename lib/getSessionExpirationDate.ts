const EXPIRE_SESSION_AFTER = 1000 * 60 * 60; //1h

export const getSessionExpirationDate = () => {
  return new Date(Date.now() + EXPIRE_SESSION_AFTER);
};

export const getSessionCookie = (sessionId: string, expireAt: Date) =>
  `authorization=${sessionId}; Expires=${expireAt.toUTCString()}; Secure: HttpOnly; Path=/;`;

export const getDeleteSessionCookie = () =>
  `authorization=; Expires=${new Date(Date.now()).toUTCString()}; Path=/;`;
