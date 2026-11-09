-- DESTRUCTIVE and NOT run by deploys. Removes v1-only tables.
-- Back up first, then run manually:  mysql YOUR_DB < database/optional/drop_v1_tables.sql
DROP TABLE IF EXISTS admin_modules;
DROP TABLE IF EXISTS research_summaries;
DROP TABLE IF EXISTS ai_summaries;
DROP TABLE IF EXISTS careers;
DROP TABLE IF EXISTS quiz_leaderboard;
DROP TABLE IF EXISTS past_quizzes;
DROP TABLE IF EXISTS profile_experience;
DROP TABLE IF EXISTS profile_skills;
DROP TABLE IF EXISTS profile_projects;
DROP TABLE IF EXISTS profile_education;
DROP TABLE IF EXISTS profile_certifications;
DROP TABLE IF EXISTS social_links;
DROP TABLE IF EXISTS team_members;
DROP TABLE IF EXISTS site_stats;
DROP TABLE IF EXISTS partners;
