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
    await prismaService.user.deleteMany();
    testUser = await createUserFixture(prismaService);
    fakeJwt = await createJwtFixture(app, testUser.id);
  });

  afterEach(async () => {
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
});
