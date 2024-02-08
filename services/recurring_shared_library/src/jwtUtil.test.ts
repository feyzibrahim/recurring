import Jwt from "jsonwebtoken";
import {
  createJwtAccessToken,
  createJwtRefreshToken,
  validateJwt,
} from "./jwtUtil";

jest.mock("jsonwebtoken");

describe("JWT Utility Functions", () => {
  const user = { user: "username", role: "user", organization: "org" };
  const secret = "secret";

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("createJwtAccessToken should return a valid access token", () => {
    const expectedToken = "access_token";
    (Jwt.sign as jest.Mock).mockReturnValue(expectedToken);

    const token = createJwtAccessToken(user, secret);
    console.log("file: jwtUtil.test.ts:23 -> test -> token", token);

    expect(Jwt.sign).toHaveBeenCalledWith(
      { user: user, roles: user.role, organization: user.organization },
      secret,
      { expiresIn: "1h" }
    );
    expect(token).toBe(expectedToken);
  });

  test("createJwtRefreshToken should return a valid refresh token", () => {
    const expectedToken = "refresh_token";
    (Jwt.sign as jest.Mock).mockReturnValue(expectedToken);

    const token = createJwtRefreshToken(user, secret);

    expect(Jwt.sign).toHaveBeenCalledWith(
      { user: user, roles: user.role },
      secret,
      { expiresIn: "30d" }
    );
    expect(token).toBe(expectedToken);
  });

  //   test("validateJwt should return the decoded payload for a valid token", () => {
  //     const validToken = createJwtAccessToken(user, secret);
  //     console.log("file: jwtUtil.test.ts:49 -> test -> validToken", validToken);
  //     const decodedPayload = {
  //       user: "username",
  //       role: "user",
  //       organization: "org",
  //     };
  //     (Jwt.sign as jest.Mock).mockReturnValue(decodedPayload);

  //     const payload = validateJwt(validToken, secret);
  //     console.log("file: jwtUtil.test.ts:58 -> test -> payload", payload);

  //     expect(Jwt.verify).toHaveBeenCalledWith(validToken, secret);
  //     expect(payload).toEqual(decodedPayload);
  //   });

  test("validateJwt should throw an error for an invalid token", () => {
    const token = "invalid_token";
    (Jwt.verify as jest.Mock).mockImplementation(() => {
      throw new Error("Invalid token");
    });

    expect(() => validateJwt(token, secret)).toThrowError("Invalid token");
  });
});
