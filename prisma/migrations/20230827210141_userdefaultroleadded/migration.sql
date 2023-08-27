-- AlterTable
ALTER TABLE `Experience` MODIFY `description` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `role` VARCHAR(191) NULL DEFAULT 'member';
