const envChecker = () => {
  try {
    if (!process.env.PORT) throw new Error(".env | PORT NUMBER IS REQUIRED");
    if (!process.env.REFRESH_SECRET)
      throw new Error(".env | REFRESH_SECRET IS REQUIRED");
    if (!process.env.ACCESS_SECRET)
      throw new Error(".env | REFRESH_SECRET IS REQUIRED");
    if (!process.env.FRONTEND_URL)
      throw new Error(".env | FRONTEND_URL IS REQUIRED");
    if (!process.env.DATABASE_CONNECTION_URI)
      throw new Error(".env | DATABASE_CONNECTION_URI IS REQUIRED");
    if (!process.env.GOOGLE_AUTH_ID)
      throw new Error(".env | GOOGLE_AUTH_ID IS REQUIRED");
    if (!process.env.MAIL_HOST) throw new Error(".env | MAIL_HOST IS REQUIRED");
    if (!process.env.MAIL_USER) throw new Error(".env | MAIL_USER IS REQUIRED");
    if (!process.env.MAIL_PASS) throw new Error(".env | MAIL_PASS IS REQUIRED");
    if (!process.env.VERIFICATION_SECRET)
      throw new Error(".env | VERIFICATION_SECRET IS REQUIRED");

    console.log("Log: envChecker -> Env Check Passed");
  } catch (error: any) {
    console.log("Log: envChecker -> ", error);
    process.exit(0);
  }
};

export default envChecker;
