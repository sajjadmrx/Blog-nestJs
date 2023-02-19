import { INestApplication } from "@nestjs/common";
import { PrismaService } from "../src/modules/prisma/prisma.service";
import { runAndGetAppFixture } from "./fixtures/startapp.fixture";
import { User } from "../src/shared/interfaces/user.interface";
import { createUserFixture } from "./fixtures/createUser.fixture";
import { createJwtFixture } from "./fixtures/createJwt.fixture";
import request from "supertest";

describe("UsersController E2E", function () {
  let app: INestApplication;
  let prismaService: PrismaService;
  let testUser: User;
  let fakeJwt: string;

  beforeAll(async () => {
    app = await runAndGetAppFixture();
    prismaService = app.get<PrismaService>(PrismaService);
  });

  beforeEach(async () => {
    testUser = await createUserFixture(prismaService);
    fakeJwt = await createJwtFixture(app, testUser.id);
  });

  afterEach(async () => {
    await prismaService.user.deleteMany();
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await app.close();
  }, 100000);

  describe("Current User", function () {
    it("should response 401", function (done) {
      request(app.getHttpServer()).get("/users/@me").expect(401, done);
    });
    it("should response user profile", async function () {
      const response = await request(app.getHttpServer())
        .get("/users/@me")
        .set("Authorization", `Bearer ${fakeJwt}`);
      const data = response.body.data;
      delete testUser.password;
      // @ts-ignore
      testUser.updatedAt = testUser.updatedAt.toISOString();
      // @ts-ignore
      testUser.createdAt = testUser.createdAt.toISOString();
      expect(data).toEqual(testUser);
    });
  });
  describe("update user role by UserId", function () {
    it("should response 403 for role permissions", async function () {
      const response = await request(app.getHttpServer())
        .put("/users/role/9999")
        .set("Authorization", `Bearer ${fakeJwt}`);
      expect(response.statusCode).toBe(403);
    });
    it("should update user role", async function () {
      const targetUser: User = await createUserFixture(prismaService);
      await prismaService.user.updateMany({
        where: { id: testUser.id },
        data: { role: "ADMIN" },
      });

      const response = await request(app.getHttpServer())
        .put(`/users/role/${targetUser.id}`)
        .set("Authorization", `Bearer ${fakeJwt}`)
        .send({ name: "ADMIN" });
      expect(response.statusCode).toBe(200);
    });
    it("should response INVALID_USER_ID when set invalid userId", async function () {
      await prismaService.user.updateMany({
        where: { id: testUser.id },
        data: { role: "ADMIN" },
      });

      const response = await request(app.getHttpServer())
        .put(`/users/role/${0}`)
        .set("Authorization", `Bearer ${fakeJwt}`)
        .send({ name: "ADMIN" });
      expect(response.body.message).toBe("INVALID_USER_ID");
    });
  });
});
