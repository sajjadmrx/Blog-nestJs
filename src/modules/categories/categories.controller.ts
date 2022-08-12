import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from "@nestjs/swagger";
import CheckRoleGuard from "src/shared/guards/check-roles.guard";
import { CategoriesService } from "./categories.service";
import { CreateCategoryDto } from "./dtos/create.dto";
import { updateCategoryDto } from "./dtos/update.dto";

@Controller("/categories")
@ApiTags("Categories")
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @ApiOperation({
    summary: "get Categories",
  })
  @ApiOkResponse()
  @Get("/")
  async getCategories() {
    return this.categoriesService.getAll();
  }

  @ApiOperation({ summary: "get category by id" })
  @ApiOkResponse()
  @Get("/:id")
  async getCategoryById(@Param("id") id: string) {
    return this.categoriesService.getById(Number(id));
  }

  @ApiOperation({
    summary: "create a category",
    description: `Required Permission: 'ADMIN'`,
  })
  @ApiBearerAuth()
  @Post("/")
  @UseGuards(CheckRoleGuard(["ADMIN"]))
  @UseGuards(AuthGuard("jwt"))
  async createCategory(@Body() createDto: CreateCategoryDto) {
    return this.categoriesService.create(createDto);
  }

  @ApiOperation({
    summary: "update a category by Id",
    description: `Required Permission: 'ADMIN'`,
  })
  @ApiBearerAuth()
  @Patch("/:id")
  @UseGuards(CheckRoleGuard(["ADMIN"]))
  @UseGuards(AuthGuard("jwt"))
  async updateCategory(
    @Body() item: updateCategoryDto,
    @Param("id") id: string
  ) {
    return this.categoriesService.update(Number(id), item);
  }

  @ApiOperation({
    summary: "delete a category by Id",
    description: `Required Permission: 'ADMIN'`,
  })
  @ApiBearerAuth()
  @Delete("/:id")
  @UseGuards(CheckRoleGuard(["ADMIN"]))
  @UseGuards(AuthGuard("jwt"))
  @ApiParam({ name: "id" })
  async deleteCategory(@Param("id") id: string) {
    return this.categoriesService.delete(Number(id));
  }
}
