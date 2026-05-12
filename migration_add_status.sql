-- Migration: Add status column to all tables
-- Default status = 1 (Active)

ALTER TABLE admin_users ADD COLUMN IF NOT EXISTS status INT DEFAULT 1;
ALTER TABLE articles ADD COLUMN IF NOT EXISTS status INT DEFAULT 1;
ALTER TABLE articles ADD COLUMN IF NOT EXISTS image_url VARCHAR(255);
ALTER TABLE past_quizzes ADD COLUMN IF NOT EXISTS status INT DEFAULT 1;
ALTER TABLE partners ADD COLUMN IF NOT EXISTS status INT DEFAULT 1;
ALTER TABLE partners ADD COLUMN IF NOT EXISTS image_url VARCHAR(255);
ALTER TABLE profile_certifications ADD COLUMN IF NOT EXISTS status INT DEFAULT 1;
ALTER TABLE profile_education ADD COLUMN IF NOT EXISTS status INT DEFAULT 1;
ALTER TABLE profile_experience ADD COLUMN IF NOT EXISTS status INT DEFAULT 1;
ALTER TABLE profile_projects ADD COLUMN IF NOT EXISTS status INT DEFAULT 1;
ALTER TABLE profile_projects ADD COLUMN IF NOT EXISTS image_url VARCHAR(255);
ALTER TABLE profile_skills ADD COLUMN IF NOT EXISTS status INT DEFAULT 1;
ALTER TABLE quiz_leaderboard ADD COLUMN IF NOT EXISTS status INT DEFAULT 1;
ALTER TABLE research_summaries ADD COLUMN IF NOT EXISTS status INT DEFAULT 1;
ALTER TABLE research_summaries ADD COLUMN IF NOT EXISTS image_url VARCHAR(255);
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS status INT DEFAULT 1;
ALTER TABLE site_stats ADD COLUMN IF NOT EXISTS status INT DEFAULT 1;
ALTER TABLE social_links ADD COLUMN IF NOT EXISTS status INT DEFAULT 1;
ALTER TABLE team_members ADD COLUMN IF NOT EXISTS status INT DEFAULT 1;
ALTER TABLE team_members ADD COLUMN IF NOT EXISTS image_url VARCHAR(255);

-- For admin_modules, it already has an enum status. 
-- Standardizing it to INT to match others if needed, but let's keep it for now unless asked.
-- If we wanted to change it:
-- ALTER TABLE admin_modules MODIFY COLUMN status INT DEFAULT 1;
