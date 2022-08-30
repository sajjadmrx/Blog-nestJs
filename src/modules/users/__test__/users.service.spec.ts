import { UsersService } from "../users.service";
import { UsersRepository } from "../users.repository";
import { User } from "../../../shared/interfaces/user.interface";
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
describe("UserService", function () {
  let usersService: UsersService;
  let usersRepository: UsersRepository;
  beforeEach(() => {
    usersRepository = new UsersRepository(jest.fn() as unknown as any);
    usersService = new UsersService(usersRepository);
  });

  describe("getProfile()", function () {
    it("should return user without password field", () => {
      const result = usersService.getProfile(user);
      delete user.password;

      expect(result).toEqual(user);
    });
    it("should password is undefined", () => {
      const result = usersService.getProfile(user);
      expect(result.password).toBeUndefined();
    });
  });
  describe("updateRole()", function () {
    it("should reject 'INVALID_ROLE' when set unknown role", () => {
      const role = "MANAGER";
      expect(usersService.updateRole(user.id, role)).rejects.toEqual(
        new BadRequestException("INVALID_ROLE")
      );
    });
  });
});
