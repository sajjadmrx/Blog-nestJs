import { CanActivate, ExecutionContext, ForbiddenException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "@prisma/client";
import { Observable } from "rxjs";
import { IUser } from "../interfaces/user.interface";

function CheckRoleGuard(roles: Array<Role>): any {
    class _checkRoldGuard implements CanActivate {
        constructor(private refactor: Reflector) { }

        canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
            const user = context.switchToHttp().getRequest().user as IUser
            if (roles.length === 0) return true
            const hasRole: Array<Boolean> = roles.map(role => role == user.role)
            if (hasRole.includes(true)) return true;

            throw new ForbiddenException("PERMISSION_DENIED")
        }
    }
    return _checkRoldGuard;
}

export default CheckRoleGuard;