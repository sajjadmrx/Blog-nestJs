import { PrismaService } from "../../src/modules/prisma/prisma.service";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";

export async function createUserFixture(
  prismaService: PrismaService
): Promise<User> {
  const pass = await bcrypt.hash("hashedPassword", 10);
  return prismaService.user.create({
    data: {
      username: "test",
      email: "test@test.com",
      password: pass,
    },
  });
}
