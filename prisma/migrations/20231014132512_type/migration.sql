/*
  Warnings:

  - You are about to drop the column `test` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Post` DROP COLUMN `test`,
    ADD COLUMN `type` VARCHAR(191) NOT NULL DEFAULT 'post';

-- AlterTable
ALTER TABLE `Projects` ADD COLUMN `type` VARCHAR(191) NOT NULL DEFAULT 'project';
