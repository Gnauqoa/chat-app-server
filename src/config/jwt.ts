import jwt from "jsonwebtoken";
import crypto from "crypto";
import prisma from "./prisma";

export const JWT_REFRESH_SECRET =
  process.env.JWT_REFRESH_SECRET || "refresh_secret";
export const JWT_ACCESS_SECRET =
  process.env.JWT_ACCESS_SECRET || "access_secret";
export const ACCESS_TOKEN_EXPIRES_IN =
  process.env.ACCESS_TOKEN_EXPIRES_IN || "7d";
export const REFRESH_TOKEN_EXPIRES_IN =
  process.env.REFRESH_TOKEN_EXPIRES_IN || "30d";

export function generateAccessToken(userId: number) {
  return jwt.sign({ userId: userId }, JWT_ACCESS_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRES_IN,
  });
}

export function hashToken(token: string) {
  return crypto.createHash("sha512").update(token).digest("hex");
}

export function generateRefreshToken(userId: number, id: number) {
  return jwt.sign(
    {
      id,
      userId,
    },
    JWT_REFRESH_SECRET,
    {
      expiresIn: REFRESH_TOKEN_EXPIRES_IN,
    }
  );
}
export const generateTokens = async (userId: number) => {
  const tokenRecord = await prisma.jWTtoken.create({
    data: {
      userId,
      token: "",
    },
    select: { id: true },
  });
  const accessToken = generateAccessToken(userId);
  const refreshToken = generateRefreshToken(userId, tokenRecord.id);
  await prisma.jWTtoken.update({
    where: {
      id: tokenRecord.id,
    },
    data: {
      token: hashToken(refreshToken),
    },
  });
  return {
    accessToken,
    refreshToken,
  };
};
