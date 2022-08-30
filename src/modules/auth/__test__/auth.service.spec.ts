import { Test } from "@nestjs/testing";
import { AuthService } from "../auth.service";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { Prisma, User } from "@prisma/client";
import { UsersRepository } from "../../users/users.repository";
import { Queue } from "bull";
import { QueuesWelcomeEmailCreate } from "../../../shared/interfaces/queues.interface";
import { BadRequestException } from "@nestjs/common";

const user: User = {
  username: "mrx",
  email: "mrx@gmail.com",
  role: "ADMIN",
  id: 1,
  password: "hash",
  createdAt: new Date(),
  updatedAt: new Date(),
};

const input = {
  username: "mrx",
  email: "mrx@email.com",
  password: "ok",
};

describe("AuthService", function () {
  let authService: AuthService;
  let usersRepository: UsersRepository;
  let jwtService: JwtService;
  let queueSendWelcomeEmail;
  beforeEach(async () => {
    usersRepository = new UsersRepository(jest.fn() as unknown as any);
    jwtService = new JwtService();
    queueSendWelcomeEmail = {
      add: jest.fn(),
    } as unknown as Queue<QueuesWelcomeEmailCreate>;
    authService = new AuthService(
      usersRepository,
      jwtService,
      queueSendWelcomeEmail
    );
  });

  it("should pass test", () => {
    expect(authService).toBeTruthy();
  });

  describe("signUp", function () {
    it("should throw error user exist", async () => {
      jest
        .spyOn(usersRepository, "findByEmailOrUsername")
        .mockImplementation(async (email: string, username: string) => [user]);

      await expect(authService.signUp(input)).rejects.toEqual(
        new BadRequestException("Email or username already exist")
      );
    });

    it("should create User & return jwt code", async () => {
      jest
        .spyOn(usersRepository, "findByEmailOrUsername")
        .mockImplementation(async (email: string, username: string) => []);
      jest
        .spyOn(usersRepository, "create")
        .mockImplementation(async () => user);
      const token = "abcdvdfsminewrhnfqbetwetfiw";
      jest.spyOn(jwtService, "sign").mockReturnValue(token);

      await expect(authService.signUp(input)).resolves.toBe(token);
    });

    it("should add welcome email to queue", async () => {
      jest
        .spyOn(usersRepository, "findByEmailOrUsername")
        .mockImplementation(async (email: string, username: string) => []);
      jest
        .spyOn(usersRepository, "create")
        .mockImplementation(async () => user);
      const token = "abcdvdfsminewrhnfqbetwetfiw";
      jest.spyOn(jwtService, "sign").mockReturnValue(token);

      await authService.signUp(input);
      await expect(queueSendWelcomeEmail.add).toBeCalled();
    });
  });
});
