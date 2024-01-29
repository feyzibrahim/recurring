import { OAuth2Client } from "google-auth-library";
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const validateUserOnGoogleAuth = async (body: any) => {
  const { credential } = body;
  const ticket = await client.verifyIdToken({
    idToken: credential,
    audience: process.env.GOOGLE_AUTH_ID,
  });

  const data = ticket.getPayload();

  return data;
};

export default validateUserOnGoogleAuth;
