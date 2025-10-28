-- CreateTable
CREATE TABLE `form` (
    `id` VARCHAR(21) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `work_area` VARCHAR(20) NOT NULL,
    `question_1` VARCHAR(150) NOT NULL,
    `question_2` VARCHAR(150) NOT NULL,
    `question_3` VARCHAR(150) NOT NULL,
    `question_4` VARCHAR(150) NOT NULL,
    `question_5` VARCHAR(150) NOT NULL,
    `question_6` VARCHAR(150) NOT NULL,
    `question_7` VARCHAR(150) NOT NULL,
    `question_8` VARCHAR(150) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
