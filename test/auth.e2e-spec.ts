import { INestApplication } from "@nestjs/common";
import request from "supertest";
import { runAndGetAppFixture } from "./fixtures/startapp.fixture";
import { PrismaService } from "../src/modules/prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";

describe("AuthController (e2e)", () => {
  let app: INestApplication;
  let prismaService: PrismaService;
  let jwtService: JwtService;
  beforeAll(async () => {
    app = await runAndGetAppFixture();
    prismaService = app.get<PrismaService>(PrismaService);
    jwtService = app.get<JwtService>(JwtService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await prismaService.user.deleteMany();
    await app.close();
  });

  describe("signup", function () {
    it("should response 400 when send invalid data", async function () {
      const response = await request(app.getHttpServer())
        .post("/auth/signup")
        .send({ username: "badValue", email: 1, password: "" });

      expect(response.statusCode).toBe(400);
    });

    it("should response 'Email must be a gmail account'", async function () {
      const response = await request(app.getHttpServer())
        .post("/auth/signup")
        .send({
          username: "badValue",
          email: "fake@hotmail.com",
          password: "aw151510125",
        });

      expect(response.body.message).toContain("Email must be a gmail account");
    });

    it("should response jwt", async function () {
      let fakeJwt: string = "test.test.test";
      jest.spyOn(jwtService, "sign").mockReturnValue(fakeJwt);
      const response = await request(app.getHttpServer())
        .post("/auth/signup")
        .send({
          username: "test",
          email: "fake@gmail.com",
          password: "1234567890#$%",
        });
      expect(response.body.data).toBe(fakeJwt);
      expect(response.statusCode).toBe(201);
    });
  });
});
