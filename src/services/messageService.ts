import { PrismaClient } from "@prisma/client";
import { createAsyncFcError } from "../utils/auth";

const prisma = new PrismaClient();

export const deleteMessage = async ({ id }: { id: number }) => {
  const message = await prisma.message.findUnique({
    where: { id, deleted: false },
  });

  if (!message)
    return createAsyncFcError({ message: "Can't found message", status: 404 });
  return {
    data: await prisma.message.update({
      where: { id },
      data: { deleted: true },
    }),
  };
};

export const createMessage = async ({
  message,
  userId,
  roomId,
}: {
  message: string;
  userId: number;
  roomId: number;
}) => {
  if (!message)
    return createAsyncFcError({ message: "Message is required", status: 400 });
  const room = await prisma.room.findUnique({ where: { id: roomId } });
  if (!room)
    return createAsyncFcError({ message: "Can't found room", status: 404 });
  const user = await prisma.user.findUnique({
    where: { id: userId, rooms: { some: { roomId } } },
  });
  if (!user)
    return createAsyncFcError({ message: "Can't found user", status: 404 });
  return await prisma.message.create({
    data: { message, userId, roomId },
  });
};
