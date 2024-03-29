import { PrismaClient } from "@prisma/client";
import { userSelect } from "./userService";

const prisma = new PrismaClient();
export const createRoom = async ({
  users,
  name,
  ownerId,
}: {
  ownerId: number;
  users: { id: string }[];
  name: string;
}) => {
  const room = await prisma.room.create({
    data: {
      name,
      ownerId,
    },
    select: {
      id: true,
      owner: true,
      name: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  await Promise.all(
    users.map((user) =>
      prisma.roomUser.create({
        data: {
          roomId: room.id,
          userId: parseInt(user.id),
        },
      })
    )
  );
  return room;
};
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
      select: {
        id: true,
        message: true,
        createdAt: true,
        updatedAt: true,
        userId: true,
        deleted: true,
        user: true,
        roomId: true,
      },
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
  const totalItems = await prisma.roomUser.count({
    where: { userId: userId, room: { name: { contains: query } } },
  });
  return {
    items: (
      await prisma.roomUser.findMany({
        where: { userId: userId, room: { name: { contains: query } } },
        select: { room: true, user: { select: userSelect } },
        skip,
        take,
      })
    ).map((roomUser) => ({ ...roomUser.room, owner: roomUser.user })),
    per_page: take,
    page,
    total_items: totalItems,
    total_pages: Math.ceil(totalItems / take),
  };
};

export const update = async ({
  roomId,
  name,
}: {
  roomId: number;
  name: string;
}) => {
  return await prisma.room.update({
    where: { id: roomId },
    data: { name },
    select: {
      id: true,
      name: true,
      createdAt: true,
      updatedAt: true,
      owner: true,
    },
  });
};
