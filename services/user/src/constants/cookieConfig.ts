const cookieConfig = {
  // secure: true,
  httpOnly: true,
  maxAge: 1000 * 60 * 60 * 24 * 30,
  sameSite: "strict" as const,
};

export default cookieConfig;
