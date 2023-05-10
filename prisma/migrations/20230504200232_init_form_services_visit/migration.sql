-- CreateTable
CREATE TABLE `Wizyta` (
    `id` VARCHAR(191) NOT NULL,
    `imie` VARCHAR(191) NOT NULL,
    `nazwisko` VARCHAR(191) NOT NULL,
    `Data` DATETIME(3) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `usluga` ENUM('Tatuaz', 'Piercing', 'Makijaz_pernamentny') NOT NULL DEFAULT 'Tatuaz',
    `notatki` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Wizyta_Data_key`(`Data`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
