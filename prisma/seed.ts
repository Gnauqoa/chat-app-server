import prisma from "../src/config/prisma";
import {
  createPassword,
  createUser,
  getCreatedAndUpdated,
} from "../src/utils/db";
import { faker } from "@faker-js/faker";

async function main() {
  // Create a new user
  const totalUsers = 40;
  const totalRoom = 2;
  const admin = await prisma.user.create({
    data: {
      name: "quang",
      username: "quang",
      password: await createPassword("12345678"),
      email: "quang@gmail.com",
    },
  });
  const rooms = await Promise.all(
    Array.from({ length: totalRoom }, async (_, index) => {
      return await prisma.room.create({
        data: {
          name: `room ${index}`,
          ownerId: admin.id,
        },
      });
    })
  );
  console.time(`👤 Created ${totalUsers} users...`);
  const users = await Promise.all(
    Array.from({ length: totalUsers }, async (_, index) => {
      const userData = createUser();
      const userCreatedUpdated = getCreatedAndUpdated();
      const user = await prisma.user
        .create({
          select: { id: true },
          data: {
            ...userData,
            ...userCreatedUpdated,
            password: await createPassword(userData.username),
            messages: {
              create: {
                message: faker.lorem.sentence(),
                roomId: rooms[0].id,
              },
            },
            rooms: {
              create: {
                roomId: rooms[0].id,
              },
            },
          },
        })
        .catch(() => null);
      return user;
    })
  ).then((users) => users.filter(Boolean));
  console.timeEnd(`👤 Created ${users.length} users...`);
}

main().catch((error) => {
  console.error("Error in seed script:", error);
  process.exit(1);
});
