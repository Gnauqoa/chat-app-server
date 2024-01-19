import bcrypt from "bcryptjs";
import prisma from "../src/config/prisma";

async function main() {
  try {
    // Create a new user
    const newUser = await prisma.user.create({
      data: {
        name: "Test",
        username: "John Doe",
        email: "johndoe@example.com",
        password: await bcrypt.hash("12345678", 10),
      },
    });

    console.log("User created:", newUser);
  } catch (error) {
    console.error("Error creating user:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error("Error in seed script:", error);
  process.exit(1);
});
