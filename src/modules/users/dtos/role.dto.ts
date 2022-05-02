import { ApiProperty } from "@nestjs/swagger";
import { Prisma, Role } from "@prisma/client";
import { IsNotEmpty, IsString } from "class-validator";

export class RoleDto {

    @ApiProperty({
        enum: Role,
        description: "The role of the user",
        required: true,
        example: "ADMIN",
    })
    @IsString()
    @IsNotEmpty()
    name: string;
}