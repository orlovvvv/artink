-- CreateTable
CREATE TABLE `Uzytkownik` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `nazwa` VARCHAR(191) NULL,
    `haslo` VARCHAR(191) NOT NULL,
    `rola` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',

    UNIQUE INDEX `Uzytkownik_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Zamowienie` (
    `id` VARCHAR(191) NOT NULL,
    `dataZlozenia` DATETIME(3) NOT NULL,
    `status` BOOLEAN NOT NULL,
    `liczbaPozycji` INTEGER NOT NULL,
    `kwota` DOUBLE NOT NULL,
    `faktura` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PozycjaZamowienia` (
    `id` VARCHAR(191) NOT NULL,
    `iloscProduktu` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Produkt` (
    `id` VARCHAR(191) NOT NULL,
    `nazwa` VARCHAR(191) NOT NULL,
    `waga` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Platonsc` (
    `id` VARCHAR(191) NOT NULL,
    `kwota` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `KartaPlatnicza` (
    `id` VARCHAR(191) NOT NULL,
    `wlasciciel` VARCHAR(191) NOT NULL,
    `dataWaznosci` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Przelew` (
    `id` VARCHAR(191) NOT NULL,
    `nazwaBanku` VARCHAR(191) NOT NULL,
    `numerKonta` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Formularz` (
    `id` VARCHAR(191) NOT NULL,
    `imie` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `tresc` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
