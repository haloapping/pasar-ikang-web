import { createCookieSessionStorage } from "react-router";

type SessionData = {
  token: string;
};

type SessionFlashData = {
  error: string;
};

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>({
    cookie: {
      name: "__session",
      maxAge: 604800, // 7 days in seconds
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secrets: [String(process.env.COOKIE_SECRET_KEY)],
      secure: true,
    },
  });

export { getSession, commitSession, destroySession };
