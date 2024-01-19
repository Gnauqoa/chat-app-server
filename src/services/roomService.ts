import { PrismaClient } from "@prisma/client";
import { createAsyncFcError } from "../utils/auth";

const prisma = new PrismaClient();

export const getMessages = async ({ roomId }: { roomId: number }) => {
  if (!roomId)
    return createAsyncFcError({ message: "Room id is required", status: 404 });
  return await prisma.message.findMany({
    where: { roomId },
  });
};
