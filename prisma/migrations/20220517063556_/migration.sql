-- AlterTable
ALTER TABLE `categories` ADD COLUMN `postId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Categories` ADD CONSTRAINT `Categories_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
