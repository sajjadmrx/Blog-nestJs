import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiOkResponse, ApiParam, ApiTags } from "@nestjs/swagger";
import CheckRoleGuard from "src/shared/guards/check-roles.guard";
import { CategoriesService } from "./categories.service";
import { CreateCategoryDto } from "./dtos/create.dto";
import { updateCategoryDto } from "./dtos/update.dto";

@Controller('/categories')
@ApiTags('Categories')
export class CategoriesController {
    constructor(private categoriesService: CategoriesService) { }


    @Get('/')
    @ApiOkResponse()
    async getCategories() {
        return this.categoriesService.getAll()
    }

    @Get('/:id')
    @ApiOkResponse()
    async getCategoryById(@Param('id') id: string) {
        return this.categoriesService.getById(Number(id))
    }

    @Post('/')
    @UseGuards(CheckRoleGuard(['ADMIN']))
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    async createCategory(@Body() createDto: CreateCategoryDto) {
        return this.categoriesService.create(createDto)
    }


    @Patch('/:id')
    @UseGuards(CheckRoleGuard(['ADMIN']))
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    async updateCategory(@Body() item: updateCategoryDto, @Param('id') id: string,) {
        return this.categoriesService.update(Number(id), item)
    }

    @Delete('/:id')
    @UseGuards(CheckRoleGuard(['ADMIN']))
    @UseGuards(AuthGuard('jwt'))
    @ApiParam({ name: 'id' })
    @ApiBearerAuth()
    async deleteCategory(@Param('id') id: string) {
        return this.categoriesService.delete(Number(id))
    }
}