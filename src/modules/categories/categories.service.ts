import { BadRequestException, Injectable } from "@nestjs/common";
import { getResponseMessage } from "src/shared/constants/messages.constant";
import { CategoryCreateInput } from "src/shared/interfaces/categories.interface";
import { CategoriesRepository } from "./categories.repository";
import { CreateCategoryDto } from "./dtos/create.dto";
import { updateCategoryDto } from "./dtos/update.dto";

@Injectable()
export class CategoriesService {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async getAll() {
    try {
      return await this.categoriesRepository.find();
    } catch (error) {
      throw error;
    }
  }

  async getById(id: number) {
    try {
      const category = await this.categoriesRepository.findById(id);
      if (!category) throw new BadRequestException("Category not found");

      return category;
    } catch (error) {
      throw error;
    }
  }

  async getBySlug(slug: string) {
    try {
      const category = await this.categoriesRepository.findBySlug(slug);
      if (!category) throw new BadRequestException("Category not found");

      return category;
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

      const hasExist = await this.categoriesRepository.findBySlug(input.slug);
      if (hasExist)
        throw new BadRequestException(getResponseMessage("CATEGORY_EXIST"));

      const created = await this.categoriesRepository.create(input);

      return created;
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, item: updateCategoryDto) {
    try {
      const exist = await this.categoriesRepository.findBySlug(item.slug);
      if (exist && exist.id !== id)
        throw new BadRequestException(getResponseMessage("CATEGORY_EXIST"));

      const updated = await this.categoriesRepository.update(id, item);
      return updated;
    } catch (error) {
      throw error;
    }
  }

  async delete(id: number) {
    try {
      const category = await this.categoriesRepository.findById(id);
      if (!category) throw new BadRequestException("Category not found");

      await this.categoriesRepository.delete(category.id);
      return {};
    } catch (error) {
      throw error;
    }
  }
}
