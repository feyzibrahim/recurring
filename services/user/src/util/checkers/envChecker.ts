const envChecker = () => {
  try {
    if (!process.env.PORT) throw new Error("PORT NUMBER IS REQUIRED");
    if (!process.env.FRONTEND_URL) throw new Error("FRONTEND_URL IS REQUIRED");
    if (!process.env.DATABASE_CONNECTION_URI)
      throw new Error("DATABASE_CONNECTION_URI IS REQUIRED");

    console.log("Log: envChecker -> Env Check Passed");
  } catch (error: any) {
    console.log("Log: envChecker -> ", error);
    process.exit(0);
  }
};

export default envChecker;
