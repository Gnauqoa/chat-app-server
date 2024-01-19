import { faker } from "@faker-js/faker";
import bcrypt from "bcryptjs";
import { UniqueEnforcer } from "enforce-unique";

const uniqueUsernameEnforcer = new UniqueEnforcer();

export function createUser() {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  const username = uniqueUsernameEnforcer
    .enforce(() => {
      return (
        faker.string.alphanumeric({ length: 5 }) +
        " " +
        faker.internet.userName({
          firstName: firstName.toLowerCase(),
          lastName: lastName.toLowerCase(),
        })
      );
    })
    .slice(0, 20)
    .toLowerCase()
    .replace(/[^a-z0-9_]/g, "_");
  return {
    username,
    name: `${firstName} ${lastName}`,
    email: `${username}@example.com`,
  };
}
export function getCreatedAndUpdated(from: Date = new Date(2020, 0, 1)) {
  const createdAt = faker.date.between({ from, to: new Date() });
  const updatedAt = faker.date.between({ from: createdAt, to: new Date() });
  return { createdAt, updatedAt };
}
export async function createPassword(
  username: string = faker.internet.userName()
) {
  return bcrypt.hash("12345678", 10);
}
