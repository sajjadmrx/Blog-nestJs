import { UsersService } from "../users.service";
import { UsersRepository } from "../users.repository";
import { User } from "../../../shared/interfaces/user.interface";
import { BadRequestException } from "@nestjs/common";
import { RoleType } from "../../../shared/interfaces/role.interface";
const getFakeUser = (): User => {
  return {
    username: "mrx",
    email: "mrx@gmail.com",
    role: "ADMIN",
    id: 1,
    password: "hash",
    createdAt: new Date(),
    updatedAt: new Date(),
  };
};
describe("UserService", function () {
  let usersService: UsersService;
  let usersRepository: UsersRepository;
  beforeEach(() => {
    usersRepository = new UsersRepository(jest.fn() as unknown as any);
    usersService = new UsersService(usersRepository);
  });

  describe("getProfile()", function () {
    it("should return user without password field", () => {
      const user: User = getFakeUser();
      const result = usersService.getProfile(user);

      expect(result).toEqual(user);
    });
    it("should password is undefined", () => {
      const user: User = getFakeUser();
      const result = usersService.getProfile(user);

      expect(result.password).toBeUndefined();
    });
  });
  describe("updateRole()", function () {
    it("should reject 'INVALID_ROLE' when set unknown role", () => {
      const user: User = getFakeUser();
      const role = "MANAGER";
      expect(usersService.updateRole(user.id, role)).rejects.toEqual(
        new BadRequestException("INVALID_ROLE")
      );
    });
    it("should reject 'INVALID_USER_ID' when set unknown userId", async () => {
      const user: User = getFakeUser();
      jest.spyOn(usersRepository, "update").mockImplementation(() => {
        throw new Error("invalid"); //database error
      });
      const role: RoleType = "ADMIN";
      await expect(usersService.updateRole(user.id, role)).rejects.toEqual(
        new BadRequestException("INVALID_USER_ID")
      );
    });
    it("should update user role and return role", async () => {
      const user: User = getFakeUser();
      const role: RoleType = "ADMIN";
      jest
        .spyOn(usersRepository, "update")
        .mockImplementation(() => Promise.resolve(user));
      await expect(usersService.updateRole(user.id, role)).resolves.toBe(role);
    });
  });
});
