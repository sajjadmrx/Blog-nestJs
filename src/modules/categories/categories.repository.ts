import { Injectable } from "@nestjs/common";
import { ICategory, ICategoryCreateInput, ICategoryUpdateInput } from "src/common/interfaces/categories.interface";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class CategoriesRepository {
    constructor(private prisma: PrismaService) { }

    async find() {
        return this.prisma.categories.findMany()
    }


    async findById(id: number) {
        return this.prisma.categories.findUnique({
            where: {
                id: id,
            }
        })
    }


    async findBySlug(slug: string): Promise<ICategory> {
        return this.prisma.categories.findUnique({
            where: {
                slug: slug,
            }
        })
    }

    async create(input: ICategoryCreateInput): Promise<ICategory> {
        return this.prisma.categories.create({
            data: {
                name: input.name,
                slug: input.slug,
            }
        })
    }

    async update(id: number, data: ICategoryUpdateInput): Promise<ICategory> {
        return this.prisma.categories.update({
            where: {
                id: id,
            },
            data: data
        })
    }

    async delete(id: number): Promise<ICategory> {
        return this.prisma.categories.delete({
            where: {
                id: id,
            }
        })
    }
}