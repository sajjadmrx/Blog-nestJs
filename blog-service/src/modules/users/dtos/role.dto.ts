import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { Role } from "../../../shared/interfaces/role.interface";

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
