-- Migration: Add status column to all tables
-- Default status = 1 (Active)

ALTER TABLE admin_users ADD COLUMN status INT DEFAULT 1;
ALTER TABLE articles ADD COLUMN status INT DEFAULT 1;
ALTER TABLE past_quizzes ADD COLUMN status INT DEFAULT 1;
ALTER TABLE profile_certifications ADD COLUMN status INT DEFAULT 1;
ALTER TABLE profile_education ADD COLUMN status INT DEFAULT 1;
ALTER TABLE profile_experience ADD COLUMN status INT DEFAULT 1;
ALTER TABLE profile_projects ADD COLUMN status INT DEFAULT 1;
ALTER TABLE profile_skills ADD COLUMN status INT DEFAULT 1;
ALTER TABLE quiz_leaderboard ADD COLUMN status INT DEFAULT 1;
ALTER TABLE research_summaries ADD COLUMN status INT DEFAULT 1;
ALTER TABLE site_stats ADD COLUMN status INT DEFAULT 1;
ALTER TABLE social_links ADD COLUMN status INT DEFAULT 1;
ALTER TABLE team_members ADD COLUMN status INT DEFAULT 1;

-- For admin_modules, it already has an enum status. 
-- Standardizing it to INT to match others if needed, but let's keep it for now unless asked.
-- If we wanted to change it:
-- ALTER TABLE admin_modules MODIFY COLUMN status INT DEFAULT 1;
