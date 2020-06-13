RENAME TABLE `qr_brandes` TO `social_media`;
RENAME TABLE `url_has_tags` TO `tagging`;

ALTER TABLE `users` CHANGE `passive` `enabled` TINYINT NULL DEFAULT '1';
ALTER TABLE `users` DROP `remember_token`;
UPDATE `users` SET `password` = '';

ALTER TABLE `tagging` ADD `id` INT NOT NULL AUTO_INCREMENT FIRST, ADD PRIMARY KEY (`id`);
ALTER TABLE `tagging` CHANGE `urls_id` `url_id` INT(10) UNSIGNED NOT NULL;
ALTER TABLE `tagging` CHANGE `tags_id` `tag_id` INT(10) UNSIGNED NOT NULL;

ALTER TABLE `clicks` CHANGE `urls_id` `url_id` INT(10) UNSIGNED NOT NULL;
ALTER TABLE `urls` CHANGE `enable` `enabled` TINYINT NULL DEFAULT '1';