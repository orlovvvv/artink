/*
  Warnings:

  - You are about to drop the column `Data` on the `Wizyta` table. All the data in the column will be lost.
  - You are about to drop the `KartaPlatnicza` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Platonsc` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PozycjaZamowienia` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Produkt` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Przelew` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Uzytkownik` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Zamowienie` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[data_wyzyty]` on the table `Wizyta` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `data_wyzyty` to the `Wizyta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Wizyta` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Wizyta_Data_key` ON `Wizyta`;

-- AlterTable
ALTER TABLE `Wizyta` DROP COLUMN `Data`,
    ADD COLUMN `data_wyzyty` DATE NOT NULL,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `KartaPlatnicza`;

-- DropTable
DROP TABLE `Platonsc`;

-- DropTable
DROP TABLE `PozycjaZamowienia`;

-- DropTable
DROP TABLE `Produkt`;

-- DropTable
DROP TABLE `Przelew`;

-- DropTable
DROP TABLE `Uzytkownik`;

-- DropTable
DROP TABLE `Zamowienie`;

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `nazwa` VARCHAR(191) NOT NULL,
    `haslo` VARCHAR(191) NOT NULL,
    `rola` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Wizyta_data_wyzyty_key` ON `Wizyta`(`data_wyzyty`);

-- AddForeignKey
ALTER TABLE `Wizyta` ADD CONSTRAINT `Wizyta_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
