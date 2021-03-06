import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { ICategory, ICategoryCreateInput, ICategoryUpdateInput } from "src/shared/interfaces/categories.interface";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class CategoriesRepository {
    constructor(private prisma: PrismaService) { }

    async find() {
        return this.prisma.category.findMany()
    }


    async findById(id: number) {
        return this.prisma.category.findUnique({
            where: {
                id: id,
            }
        })
    }


    async findBySlug(slug: string): Promise<ICategory> {
        return this.prisma.category.findUnique({
            where: {
                slug: slug,
            }
        })
    }

    async create(input: ICategoryCreateInput): Promise<ICategory> {
        return this.prisma.category.create({
            data: {
                name: input.name,
                slug: input.slug,
            }
        })
    }

    async update(id: number, data: ICategoryUpdateInput): Promise<ICategory> {
        return this.prisma.category.update({
            where: {
                id: id,
            },
            data: data
        })
    }

    async delete(id: number): Promise<ICategory> {
        return this.prisma.category.delete({
            where: {
                id: id,
            }
        })
    }

    hasExistWithIds(ids: number[]): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.prisma.category.findMany({
                where: {
                    id: {
                        in: ids
                    }
                }
            }).then((categories: ICategory[]) => {
                resolve(categories.length === ids.length)
            }).catch(error => {
                reject(error)
            })
        })
    }
}