import jwt from "jsonwebtoken";

import {
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
  hashToken,
} from "../config/jwt";
import prisma from "../config/prisma";
export type errorType = {
	status: number
	message: string
}
export const createAsyncFcError = ({
  message,
  status,
}: {
  message: string;
  status: number;
}) => {
  return Promise.reject({ message, status });
};
export const addRefreshTokenToWhitelist = async ({
  refreshToken,
  userId,
}: {
  refreshToken: string;
  userId: number;
}) => {
  return await prisma.jWTtoken.create({
    data: {
      token: hashToken(refreshToken),
      userId,
    },
  });
};
export const authRefreshToken = async (refreshToken: string) => {
  try {
    const payload = jwt.verify(refreshToken, JWT_REFRESH_SECRET) as {
      id: number;
      userId: number;
    };
    const token = await prisma.jWTtoken.findUnique({
      where: {
        id: payload.id,
      },
    });
    if (token?.token !== hashToken(refreshToken)) return false;
    const user = await prisma.user.findUnique({
      where: {
        id: payload.userId,
      },
    });
    if (!user || user.id !== payload.userId) return false;
    return payload as { userId: number; id: number };
  } catch {
    return false;
  }
};
export const authByAccessToken = async (request: Request) => {
  try {
    const accessToken = request.headers.get("Authorization")?.split(" ")[1];
    if (!accessToken) return false;
    const payload = jwt.verify(accessToken, JWT_ACCESS_SECRET);
    return payload as { userId: number };
  } catch (e) {
    return false;
  }
};
export const findRefreshTokenById = async (id: number) => {
  return await prisma.jWTtoken.findUnique({
    where: {
      id,
    },
  });
};

export const deleteRefreshToken = async (id: number) => {
  return await prisma.jWTtoken.delete({
    where: {
      id,
    },
  });
};

export const revokeTokens = async (userId: number) => {
  return await prisma.jWTtoken.updateMany({
    where: {
      userId,
    },
    data: {
      revoked: true,
    },
  });
};
