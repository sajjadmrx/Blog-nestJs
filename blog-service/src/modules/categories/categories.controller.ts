import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
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
import { ResponseInterceptor } from "../../shared/interceptors/response.interceptor";
import { authGuard } from "../../shared/guards/auth.guard";

@ApiTags("Categories")
@UseInterceptors(ResponseInterceptor)
@Controller("/categories")
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
  async getCategoryById(@Param("id", ParseIntPipe) id: number) {
    return this.categoriesService.getById(id);
  }

  @ApiOperation({ summary: "get category by slug" })
  @ApiOkResponse()
  @Get("/s/:slug")
  async getCategoryBySlug(@Param("slug") slug: string) {
    return this.categoriesService.getBySlug(slug);
  }

  @ApiOperation({
    summary: "create a category",
    description: `Required Permission: 'ADMIN'`,
  })
  @ApiBearerAuth()
  @Post("/")
  @UseGuards(CheckRoleGuard(["ADMIN"]))
  @UseGuards(authGuard(false))
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
  @UseGuards(authGuard(false))
  async updateCategory(
    @Body() item: updateCategoryDto,
    @Param("id", ParseIntPipe) id: number
  ) {
    return this.categoriesService.update(id, item);
  }

  @ApiOperation({
    summary: "delete a category by Id",
    description: `Required Permission: 'ADMIN'`,
  })
  @ApiBearerAuth()
  @Delete("/:id")
  @UseGuards(CheckRoleGuard(["ADMIN"]))
  @UseGuards(authGuard(false))
  @ApiParam({ name: "id" })
  async deleteCategory(@Param("id", ParseIntPipe) id: number) {
    return this.categoriesService.delete(id);
  }
}
