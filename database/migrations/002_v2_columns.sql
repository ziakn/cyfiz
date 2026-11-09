-- Columns added to tables that already existed in v1.
-- "Duplicate column" errors are ignored by the runner, so fresh installs are fine.
ALTER TABLE articles ADD COLUMN content LONGTEXT NULL;
ALTER TABLE articles ADD COLUMN author_name VARCHAR(100) NULL;
ALTER TABLE articles ADD COLUMN author_role VARCHAR(150) NULL;
ALTER TABLE articles ADD COLUMN audience VARCHAR(150) NULL;
ALTER TABLE admin_users ADD COLUMN status INT DEFAULT 1;
ALTER TABLE portal_users ADD COLUMN password_reset_token_hash VARCHAR(64) NULL;
ALTER TABLE portal_users ADD COLUMN password_reset_expires_at DATETIME NULL;

