import { Prisma, Category } from "@prisma/client"

export interface ICategory extends Category { };


export interface ICategoryCreateInput extends Prisma.CategoryCreateInput { };


export interface ICategoryUpdateInput extends Prisma.CategoryUpdateInput { };