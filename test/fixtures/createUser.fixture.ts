import { PrismaService } from "../../src/modules/prisma/prisma.service";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

export async function createUserFixture(
  prismaService: PrismaService
): Promise<User> {
  const pass = await bcrypt.hash("hashedPassword", 10);
  let username = uuidv4();
  return prismaService.user.create({
    data: {
      username: username,
      email: `${username}@gmail.com`,
      password: pass,
    },
  });
}
