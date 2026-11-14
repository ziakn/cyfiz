-- Packages: free and paid plans shown on /packages and managed in Admin → Packages.

CREATE TABLE IF NOT EXISTS packages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  tier VARCHAR(10) NOT NULL DEFAULT 'Free',        -- Free | Paid
  price VARCHAR(40) NULL,                          -- display text, e.g. $29
  period VARCHAR(60) NULL,                         -- display text, e.g. per month
  description TEXT NULL,
  features TEXT NULL,                              -- one feature per line
  badge VARCHAR(40) NULL,                          -- e.g. Most popular
  featured VARCHAR(3) NOT NULL DEFAULT 'No',       -- Yes = highlighted card
  cta_label VARCHAR(60) NULL,
  cta_url VARCHAR(255) NULL,
  sort_order INT DEFAULT 0,
  status INT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Sample packages (edit or replace them in the admin). Only added while the table is empty.
INSERT INTO packages (name, tier, price, period, description, features, badge, featured, cta_label, cta_url, sort_order)
SELECT * FROM (
  SELECT 'Free' AS name, 'Free' AS tier, 'Free' AS price, '' AS period,
         'Everything you need to start learning and stay informed.' AS description,
         'Read all published Insights\nWeekly 5-minute briefing\nPractice quizzes in the learner portal\nAnswer explanations in practice mode' AS features,
         '' AS badge, 'No' AS featured, 'Create free account' AS cta_label, '/portal/register' AS cta_url, 1 AS sort_order
  UNION ALL
  SELECT 'Professional', 'Paid', '$29', 'per month',
         'For professionals who want the full toolkit and exam-style practice.',
         'Everything in Free\nExam mode with unlimited attempts\nTraining materials and toolkits\nPriority email support',
         'Most popular', 'Yes', 'Get Professional', '/contact', 2
) seed
WHERE NOT EXISTS (SELECT 1 FROM packages);

-- Let the built-in roles see/manage the new module (Super Admin has everything already).
INSERT IGNORE INTO role_permissions (role_id, module, can_view, can_create, can_update, can_delete) SELECT id, 'packages', 1, 1, 1, 1 FROM roles WHERE slug = 'editor';

INSERT IGNORE INTO role_permissions (role_id, module, can_view, can_create, can_update, can_delete) SELECT id, 'packages', 1, 0, 0, 0 FROM roles WHERE slug = 'viewer';
