/*
  Warnings:

  - A unique constraint covering the columns `[categoryId]` on the table `Post` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `categoryId` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `categories` DROP FOREIGN KEY `Categories_postId_fkey`;

-- AlterTable
ALTER TABLE `post` ADD COLUMN `categoryId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Post_categoryId_key` ON `Post`(`categoryId`);

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
