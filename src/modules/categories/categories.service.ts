import { BadRequestException, Injectable } from "@nestjs/common";
import { getResponseMessage } from "src/shared/constants/messages.constant";
import { responseData } from "src/shared/functions/response.func";
import { CategoryCreateInput } from "src/shared/interfaces/categories.interface";
import { CategoriesRepository } from "./categories.repository";
import { CreateCategoryDto } from "./dtos/create.dto";
import { updateCategoryDto } from "./dtos/update.dto";

@Injectable()
export class CategoriesService {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async getAll() {
    try {
      const categories = await this.categoriesRepository.find();
      return responseData({
        statusCode: "OK",
        message: getResponseMessage("SUCCESS"),
        data: categories,
      });
    } catch (error) {
      throw error;
    }
  }

  async getById(id: number) {
    try {
      if (!Number(id))
        throw new BadRequestException(getResponseMessage("INVALID_ID"));

      const category = await this.categoriesRepository.findById(id);
      if (!category) throw new BadRequestException("Category not found");

      return responseData({
        statusCode: "OK",
        message: getResponseMessage("SUCCESS"),
        data: category,
      });
    } catch (error) {
      throw error;
    }
  }

  async getBySlug(slug: string) {
    try {
      const category = await this.categoriesRepository.findBySlug(slug);
      if (!category) throw new BadRequestException("Category not found");

      return responseData({
        statusCode: "OK",
        message: getResponseMessage("SUCCESS"),
        data: category,
      });
    } catch (error) {
      throw error;
    }
  }

  async create(createDto: CreateCategoryDto) {
    try {
      let input: CategoryCreateInput = {
        name: createDto.name,
        slug: createDto.slug,
        //parentId: 1
      };
      // if (createDto.parentId) {
      //     //TODO: check if parent exists
      //     //TODO: add parentId to schema
      //     //  input.parentId = 1
      //     // input.parentId = Number(createDto.parentId)
      // }
      const hasExist = await this.categoriesRepository.findBySlug(input.slug);
      if (hasExist)
        throw new BadRequestException(getResponseMessage("CATEGORY_EXIST"));

      const created = await this.categoriesRepository.create(input);

      return responseData({
        statusCode: "CREATED",
        message: getResponseMessage("SUCCESS"),
        data: created,
      });
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, item: updateCategoryDto) {
    try {
      if (!Number(id))
        throw new BadRequestException(getResponseMessage("INVALID_ID"));

      const exist = await this.categoriesRepository.findBySlug(item.slug);
      if (exist && exist.id !== id)
        throw new BadRequestException(getResponseMessage("CATEGORY_EXIST"));

      const updated = await this.categoriesRepository.update(id, item);
      return responseData({
        statusCode: "OK",
        message: getResponseMessage("SUCCESS"),
        data: updated,
      });
    } catch (error) {
      throw error;
    }
  }

  async delete(id: number) {
    try {
      if (!Number(id))
        throw new BadRequestException(getResponseMessage("INVALID_ID"));
      const category = await this.categoriesRepository.findById(id);
      if (!category) throw new BadRequestException("Category not found");

      await this.categoriesRepository.delete(category.id);
      return responseData({
        statusCode: "OK",
        message: getResponseMessage("SUCCESS"),
        // data: deleted,
      });
    } catch (error) {
      throw error;
    }
  }
}
