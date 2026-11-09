-- Starter data. Safe to re-run.
INSERT INTO site_settings (setting_key, setting_value) VALUES
('contact_email', 'cyfiz@cyfiz.com'),
('linkedin_url', ''),
('x_url', ''),
('youtube_url', ''),
('discord_url', ''),
('subscriber_label', '1,000+')
ON DUPLICATE KEY UPDATE setting_key = setting_key;

INSERT INTO trainings (title, category, format, duration, summary, sort_order)
SELECT * FROM (
  SELECT 'AI Governance Foundations' AS title, 'AI Governance' AS category, 'Online workshop' AS format, '1 day' AS duration,
         'Build an AI governance programme: roles, risk tiers, policies and the EU AI Act basics.' AS summary, 1 AS sort_order
) t WHERE NOT EXISTS (SELECT 1 FROM trainings);
