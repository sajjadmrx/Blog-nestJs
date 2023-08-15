import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { User } from "../interfaces/user.interface";
import { RoleType } from "../interfaces/role.interface";

function CheckRoleGuard(roles: Array<RoleType>): any {
  class _checkRoleGuard implements CanActivate {
    constructor(private refactor: Reflector) {}

    canActivate(
      context: ExecutionContext
    ): boolean | Promise<boolean> | Observable<boolean> {
      const user = context.switchToHttp().getRequest().user as User;
      if (roles.length === 0) return true;
      const hasRole: Array<Boolean> = roles.map((role) => role == user.role);
      if (hasRole.includes(true)) return true;

      throw new ForbiddenException("PERMISSION_DENIED");
    }
  }
  return _checkRoleGuard;
}

export default CheckRoleGuard;
