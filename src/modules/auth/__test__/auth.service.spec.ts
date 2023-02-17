import { Test } from "@nestjs/testing";
import { AuthService } from "../auth.service";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { Prisma, User } from "@prisma/client";
import { UsersRepository } from "../../users/users.repository";
import { Queue } from "bull";
import { welcomeEmailQueue } from "../../../shared/interfaces/queues.interface";
import { BadRequestException, UnauthorizedException } from "@nestjs/common";
import bcrypt, { compare } from "bcrypt";
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
  let sendWelcomeEmailQueue;
  beforeEach(async () => {
    usersRepository = new UsersRepository(jest.fn() as unknown as any);
    jwtService = new JwtService();
    sendWelcomeEmailQueue = {
      add: jest.fn(),
    } as unknown as Queue<welcomeEmailQueue>;
    authService = new AuthService(
      usersRepository,
      jwtService,
      sendWelcomeEmailQueue,
      jest.fn() as any
    );
  });

  it("should Defined", () => {
    expect(authService).toBeDefined();
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
      await expect(sendWelcomeEmailQueue.add).toBeCalled();
    });
  });

  describe("signIn", function () {
    it("should reject 'invalid credentials' when user not found", async () => {
      jest
        .spyOn(usersRepository, "findOneByUsername")
        .mockImplementation(() => null);
      await expect(
        authService.signIn({
          username: input.username,
          password: input.password,
        })
      ).rejects.toEqual(new UnauthorizedException("invalid credentials"));
    });
    it("should reject 'invalid credentials' when password not Matching", async () => {
      jest
        .spyOn(usersRepository, "findOneByUsername")
        .mockImplementation(() => Promise.resolve(user));
      jest
        .spyOn(bcrypt, "compare")
        .mockImplementation(async (pass: string, hash: string) =>
          Promise.resolve(false)
        );
      await expect(
        authService.signIn({
          username: input.username,
          password: input.password,
        })
      ).rejects.toEqual(new UnauthorizedException("invalid credentials"));
    });
    it("should return jwt code when password is Matching", async () => {
      jest
        .spyOn(usersRepository, "findOneByUsername")
        .mockImplementation(async () => user);

      jest.spyOn(bcrypt, "compare").mockImplementation(async () => true);

      jest.spyOn(jwtService, "sign").mockImplementation(() => "token");

      await expect(authService.signIn(input)).resolves.toBe("token");
    });
  });
});
