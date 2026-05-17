CREATE TABLE IF NOT EXISTS portal_users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(191) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  status INT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS quizzes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  duration_minutes INT DEFAULT 60,
  passing_percentage INT DEFAULT 70,
  question_order ENUM('sequential', 'random') DEFAULT 'sequential',
  status INT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS quiz_questions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  quiz_id INT NOT NULL,
  question TEXT NOT NULL,
  option_a TEXT NOT NULL,
  option_b TEXT NOT NULL,
  option_c TEXT NOT NULL,
  option_d TEXT NOT NULL,
  correct_option CHAR(1) NOT NULL,
  explanation TEXT,
  reference_text TEXT,
  sort_order INT DEFAULT 0,
  status INT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS quiz_registrations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  quiz_id INT NOT NULL,
  status ENUM('active', 'completed', 'revoked') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_user_quiz (user_id, quiz_id),
  FOREIGN KEY (user_id) REFERENCES portal_users(id) ON DELETE CASCADE,
  FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS quiz_attempts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  quiz_id INT NOT NULL,
  mode ENUM('practice', 'exam') DEFAULT 'practice',
  total_questions INT NOT NULL DEFAULT 0,
  correct_answers INT NOT NULL DEFAULT 0,
  score_percentage DECIMAL(5,2) NOT NULL DEFAULT 0,
  passed TINYINT(1) NOT NULL DEFAULT 0,
  started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP NULL,
  status ENUM('in_progress', 'completed') DEFAULT 'completed',
  FOREIGN KEY (user_id) REFERENCES portal_users(id) ON DELETE CASCADE,
  FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS quiz_attempt_answers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  attempt_id INT NOT NULL,
  question_id INT NOT NULL,
  selected_option CHAR(1),
  is_correct TINYINT(1) NOT NULL DEFAULT 0,
  FOREIGN KEY (attempt_id) REFERENCES quiz_attempts(id) ON DELETE CASCADE,
  FOREIGN KEY (question_id) REFERENCES quiz_questions(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS saved_questions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  question_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_saved_question (user_id, question_id),
  FOREIGN KEY (user_id) REFERENCES portal_users(id) ON DELETE CASCADE,
  FOREIGN KEY (question_id) REFERENCES quiz_questions(id) ON DELETE CASCADE
);

INSERT INTO quizzes (title, slug, description, duration_minutes, passing_percentage, question_order, status)
SELECT 'IAPP AIGP', 'iapp-aigp', 'AI governance practice bank with list, flashcard, and exam modes.', 60, 70, 'sequential', 1
WHERE NOT EXISTS (SELECT 1 FROM quizzes WHERE slug = 'iapp-aigp');

INSERT INTO quiz_questions (
  quiz_id,
  question,
  option_a,
  option_b,
  option_c,
  option_d,
  correct_option,
  explanation,
  reference_text,
  sort_order,
  status
)
SELECT q.id,
  'Machine learning is best described as a type of algorithm by which?',
  'Systems can mimic human intelligence with the goal of replacing humans.',
  'Systems can automatically improve from experience through predictive patterns.',
  'Statistical inferences are drawn from a sample with the goal of predicting human intelligence.',
  'Previously unknown properties are discovered in data and used to predict and make improvements in the data.',
  'B',
  'Machine learning systems learn from experience and improve performance by identifying patterns in data.',
  'T. M. Mitchell, Machine Learning, McGraw-Hill.',
  1,
  1
FROM quizzes q
WHERE q.slug = 'iapp-aigp'
AND NOT EXISTS (SELECT 1 FROM quiz_questions qq WHERE qq.quiz_id = q.id AND qq.sort_order = 1);

INSERT INTO quiz_questions (
  quiz_id,
  question,
  option_a,
  option_b,
  option_c,
  option_d,
  correct_option,
  explanation,
  reference_text,
  sort_order,
  status
)
SELECT q.id,
  'A generative AI tool recommends restaurants that do not exist or do not match the user request. This is commonly called what?',
  'Prompt injection.',
  'Model drift.',
  'Hallucination.',
  'Data poisoning.',
  'C',
  'A hallucination occurs when an AI system produces plausible-sounding but false or unsupported information.',
  'NIST AI Risk Management Framework.',
  2,
  1
FROM quizzes q
WHERE q.slug = 'iapp-aigp'
AND NOT EXISTS (SELECT 1 FROM quiz_questions qq WHERE qq.quiz_id = q.id AND qq.sort_order = 2);
