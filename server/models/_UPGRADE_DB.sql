RENAME TABLE `qr_brandes` TO `icons`;
ALTER TABLE `icons` CHANGE `name` `name` CHAR(64) NOT NULL;
ALTER TABLE `icons` CHANGE `image` `image` VARCHAR(210) NULL DEFAULT NULL;
ALTER TABLE `icons` ADD `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP AFTER `created_at`;


ALTER TABLE `users` CHANGE `name` `employeeName` VARCHAR(64) NOT NULL;
ALTER TABLE `users` CHANGE `passive` `activated` TINYINT NOT NULL DEFAULT '1';
ALTER TABLE `users` ADD `employeeCode` INT(6) NOT NULL DEFAULT '0' AFTER `id`;
ALTER TABLE `users` ADD `avatar` VARCHAR(210) NULL DEFAULT NULL AFTER `password`;
-- ALTER TABLE `users` ADD UNIQUE `users_employee_code_unique` (`employeeCode`);
ALTER TABLE `users` DROP INDEX `users_email_unique`;
ALTER TABLE `users` DROP `email`;
ALTER TABLE `users` DROP `remember_token`;
UPDATE `users` SET `password` = '';


RENAME TABLE `url_has_tags` TO `tagging`;
ALTER TABLE `tagging` ADD `id` INT NOT NULL AUTO_INCREMENT FIRST, ADD PRIMARY KEY (`id`);
ALTER TABLE `tagging` CHANGE `urls_id` `url_id` INT(10) UNSIGNED NOT NULL;
ALTER TABLE `tagging` CHANGE `tags_id` `tag_id` INT(10) UNSIGNED NOT NULL;


ALTER TABLE `tags` ADD `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP AFTER `created_at`;


ALTER TABLE `clicks` CHANGE `urls_id` `url_id` INT(10) UNSIGNED NOT NULL;


ALTER TABLE `urls` CHANGE `enable` `enabled` TINYINT NULL DEFAULT '1';
ALTER TABLE `urls` ADD UNIQUE `urls_keyCode_foreign` (`key`);