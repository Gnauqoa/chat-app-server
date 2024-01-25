import bcrypt from "bcryptjs";
import { Prisma, PrismaClient } from "@prisma/client";
import { generateTokens } from "../config/jwt";
import { createAsyncFcError } from "../utils/auth";

const prisma = new PrismaClient();
export const userSelect = Prisma.validator<Prisma.UserSelect>()({
  name: true,
  id: true,
  createdAt: true,
  updatedAt: true,
  email: true,
});

export const searchUserByName = async ({
  name,
  skip,
  take,
  page,
}: {
  name: string;
  skip: number;
  take: number;
  page: number;
}) => {
  const totalItems = await prisma.user.count({
    where: {
      name: {
        contains: name,
      },
    },
  });
  const users = await prisma.user.findMany({
    where: {
      name: {
        contains: name,
      },
    },

    select: userSelect,
    skip,
    take,
  });
  return {
    items: users,
    per_page: take,
    page: page,
    total_items: totalItems,
    total_pages: Math.ceil(totalItems / take),
  };
};

export const updateUser = async ({
  name,
  id,
}: {
  id: number;
  name: string;
}) => {
  const user = await prisma.user.update({
    where: { id },
    data: { name },
  });
  return user;
};
export const signIn = async (usernameOrEmail: string, password: string) => {
  const user = await prisma.user.findFirst({
    where: {
      OR: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    },
  });
  if (!user || !user.password) {
    return createAsyncFcError({
      message: "Invalid username or password",
      status: 401,
    });
  }
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword)
    return createAsyncFcError({
      message: "Invalid username or password",
      status: 401,
    });
  return await generateTokens(user.id);
};
