import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCategoryDto {


    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: String, example: 'Category name', required: true })
    name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: String, example: 'animals', required: true })
    slug: string;


    // @IsNumber()
    // @IsNotEmpty()
    // @ApiProperty({ type: Number, example: 1, required: false })
    // parentId: number;



}