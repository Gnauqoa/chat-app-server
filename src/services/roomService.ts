import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getMessages = async ({
  roomId,
  skip,
  take,
  page,
}: {
  skip: number;
  take: number;
  page: number;
  roomId: number;
}) => {
  const totalItems = await prisma.message.count({
    where: { roomId },
  });
  return {
    items: await prisma.message.findMany({
      where: { roomId },
      skip,
      take,
      orderBy: { createdAt: "desc" },
    }),
    per_page: take,
    page,
    total_items: totalItems,
    total_pages: Math.ceil(totalItems / take),
  };
};

export const getRooms = async ({
  userId,
  query,
  skip,
  take,
  page,
}: {
  query: string;
  userId: number;
  skip: number;
  take: number;
  page: number;
}) => {
  const totalItems = await prisma.user.count({
    where: { id: userId, name: { contains: query } },
  });
  return {
    items: await prisma.user.findMany({
      where: { id: userId, name: { contains: query } },
      select: { rooms: true },
      skip,
      take,
    }),
    per_page: take,
    page,
    total_items: totalItems,
    total_pages: Math.ceil(totalItems / take),
  };
};
