import { Prisma, Categories } from "@prisma/client"

export interface ICategory extends Categories { };


export interface ICategoryCreateInput extends Prisma.CategoriesCreateInput { };


export interface ICategoryUpdateInput extends Prisma.CategoriesUpdateInput { };