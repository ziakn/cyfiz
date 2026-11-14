-- Role & permission system (dynamic roles; per-module view/create/update/delete).
-- Modules are defined in code (src/lib/permissions.ts); grants live here.

CREATE TABLE IF NOT EXISTS roles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description VARCHAR(255) NULL,
  is_super TINYINT(1) NOT NULL DEFAULT 0,   -- super roles bypass every permission check
  is_system TINYINT(1) NOT NULL DEFAULT 0,  -- system roles cannot be deleted
  status INT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS role_permissions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  role_id INT NOT NULL,
  module VARCHAR(60) NOT NULL,
  can_view TINYINT(1) NOT NULL DEFAULT 0,
  can_create TINYINT(1) NOT NULL DEFAULT 0,
  can_update TINYINT(1) NOT NULL DEFAULT 0,
  can_delete TINYINT(1) NOT NULL DEFAULT 0,
  UNIQUE KEY uniq_role_module (role_id, module),
  FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
);

ALTER TABLE admin_users ADD COLUMN role_id INT NULL;

INSERT INTO roles (name, slug, description, is_super, is_system)
SELECT 'Super Admin', 'super_admin', 'Full access to everything, including users and roles.', 1, 1 FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM roles WHERE slug = 'super_admin');

INSERT INTO roles (name, slug, description, is_super, is_system)
SELECT 'Editor', 'editor', 'Manages site content, quizzes and incoming messages.', 0, 1 FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM roles WHERE slug = 'editor');

INSERT INTO roles (name, slug, description, is_super, is_system)
SELECT 'Viewer', 'viewer', 'Read-only access to content and submissions.', 0, 1 FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM roles WHERE slug = 'viewer');

INSERT IGNORE INTO role_permissions (role_id, module, can_view, can_create, can_update, can_delete) SELECT id, 'articles', 1, 1, 1, 1 FROM roles WHERE slug = 'editor';

INSERT IGNORE INTO role_permissions (role_id, module, can_view, can_create, can_update, can_delete) SELECT id, 'trainings', 1, 1, 1, 1 FROM roles WHERE slug = 'editor';

INSERT IGNORE INTO role_permissions (role_id, module, can_view, can_create, can_update, can_delete) SELECT id, 'credentials', 1, 1, 1, 1 FROM roles WHERE slug = 'editor';

INSERT IGNORE INTO role_permissions (role_id, module, can_view, can_create, can_update, can_delete) SELECT id, 'expertise', 1, 1, 1, 1 FROM roles WHERE slug = 'editor';

INSERT IGNORE INTO role_permissions (role_id, module, can_view, can_create, can_update, can_delete) SELECT id, 'speaking', 1, 1, 1, 1 FROM roles WHERE slug = 'editor';

INSERT IGNORE INTO role_permissions (role_id, module, can_view, can_create, can_update, can_delete) SELECT id, 'research', 1, 1, 1, 1 FROM roles WHERE slug = 'editor';

INSERT IGNORE INTO role_permissions (role_id, module, can_view, can_create, can_update, can_delete) SELECT id, 'messages', 1, 0, 1, 0 FROM roles WHERE slug = 'editor';

INSERT IGNORE INTO role_permissions (role_id, module, can_view, can_create, can_update, can_delete) SELECT id, 'subscribers', 1, 0, 0, 0 FROM roles WHERE slug = 'editor';

INSERT IGNORE INTO role_permissions (role_id, module, can_view, can_create, can_update, can_delete) SELECT id, 'quizzes', 1, 1, 1, 1 FROM roles WHERE slug = 'editor';

INSERT IGNORE INTO role_permissions (role_id, module, can_view, can_create, can_update, can_delete) SELECT id, 'settings', 1, 0, 0, 0 FROM roles WHERE slug = 'editor';

INSERT IGNORE INTO role_permissions (role_id, module, can_view, can_create, can_update, can_delete) SELECT id, 'articles', 1, 0, 0, 0 FROM roles WHERE slug = 'viewer';

INSERT IGNORE INTO role_permissions (role_id, module, can_view, can_create, can_update, can_delete) SELECT id, 'trainings', 1, 0, 0, 0 FROM roles WHERE slug = 'viewer';

INSERT IGNORE INTO role_permissions (role_id, module, can_view, can_create, can_update, can_delete) SELECT id, 'credentials', 1, 0, 0, 0 FROM roles WHERE slug = 'viewer';

INSERT IGNORE INTO role_permissions (role_id, module, can_view, can_create, can_update, can_delete) SELECT id, 'expertise', 1, 0, 0, 0 FROM roles WHERE slug = 'viewer';

INSERT IGNORE INTO role_permissions (role_id, module, can_view, can_create, can_update, can_delete) SELECT id, 'speaking', 1, 0, 0, 0 FROM roles WHERE slug = 'viewer';

INSERT IGNORE INTO role_permissions (role_id, module, can_view, can_create, can_update, can_delete) SELECT id, 'research', 1, 0, 0, 0 FROM roles WHERE slug = 'viewer';

INSERT IGNORE INTO role_permissions (role_id, module, can_view, can_create, can_update, can_delete) SELECT id, 'messages', 1, 0, 0, 0 FROM roles WHERE slug = 'viewer';

INSERT IGNORE INTO role_permissions (role_id, module, can_view, can_create, can_update, can_delete) SELECT id, 'subscribers', 1, 0, 0, 0 FROM roles WHERE slug = 'viewer';

INSERT IGNORE INTO role_permissions (role_id, module, can_view, can_create, can_update, can_delete) SELECT id, 'quizzes', 1, 0, 0, 0 FROM roles WHERE slug = 'viewer';

-- Map existing admin users onto roles (unknown legacy roles get the least-privileged one).
UPDATE admin_users SET role_id = (SELECT id FROM roles WHERE slug = 'super_admin') WHERE role_id IS NULL AND LOWER(role) = 'admin';

UPDATE admin_users SET role_id = (SELECT id FROM roles WHERE slug = 'editor') WHERE role_id IS NULL AND LOWER(role) = 'editor';

UPDATE admin_users SET role_id = (SELECT id FROM roles WHERE slug = 'viewer') WHERE role_id IS NULL;
