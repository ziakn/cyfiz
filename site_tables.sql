-- Additional tables for main site content

USE cyfiz_db;

-- Table for insights/articles
CREATE TABLE articles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tag VARCHAR(50) NOT NULL,
  date DATE NOT NULL,
  title VARCHAR(255) NOT NULL,
  excerpt TEXT NOT NULL,
  read_time VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table for research summaries
CREATE TABLE research_summaries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tag VARCHAR(50) NOT NULL,
  date DATE NOT NULL,
  title VARCHAR(255) NOT NULL,
  excerpt TEXT NOT NULL,
  read_time VARCHAR(20),
  source VARCHAR(255),
  citations INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table for quiz leaderboard
CREATE TABLE quiz_leaderboard (
  id INT AUTO_INCREMENT PRIMARY KEY,
  rank INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  score INT NOT NULL,
  streak INT NOT NULL
);

-- Table for past quizzes
CREATE TABLE past_quizzes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  week VARCHAR(20) NOT NULL,
  topic VARCHAR(255) NOT NULL,
  participants INT NOT NULL,
  avg_score VARCHAR(10) NOT NULL
);

-- Table for profile experience
CREATE TABLE profile_experience (
  id INT AUTO_INCREMENT PRIMARY KEY,
  company VARCHAR(100) NOT NULL,
  role VARCHAR(100) NOT NULL,
  period VARCHAR(50) NOT NULL,
  location VARCHAR(50) NOT NULL,
  bullets TEXT NOT NULL
);

-- Table for profile skills
CREATE TABLE profile_skills (
  id INT AUTO_INCREMENT PRIMARY KEY,
  category VARCHAR(100) NOT NULL,
  items TEXT NOT NULL
);

-- Table for profile projects
CREATE TABLE profile_projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  tags VARCHAR(255),
  href VARCHAR(255)
);

-- Table for profile education
CREATE TABLE profile_education (
  id INT AUTO_INCREMENT PRIMARY KEY,
  institution VARCHAR(255) NOT NULL,
  degree VARCHAR(255) NOT NULL,
  period VARCHAR(50) NOT NULL,
  detail TEXT
);

-- Table for profile certifications
CREATE TABLE profile_certifications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  certification VARCHAR(255) NOT NULL
);

-- Table for connect socials
CREATE TABLE connect_socials (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  handle VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  icon_svg TEXT NOT NULL,
  href VARCHAR(255),
  cta VARCHAR(100) NOT NULL
);

-- Table for connect team
CREATE TABLE connect_team (
  id INT AUTO_INCREMENT PRIMARY KEY,
  initials VARCHAR(10) NOT NULL,
  name VARCHAR(100) NOT NULL,
  role VARCHAR(100) NOT NULL
);

-- Table for connect stats
CREATE TABLE connect_stats (
  id INT AUTO_INCREMENT PRIMARY KEY,
  value VARCHAR(20) NOT NULL,
  label VARCHAR(50) NOT NULL
);