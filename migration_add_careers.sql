CREATE TABLE IF NOT EXISTS careers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  department VARCHAR(100),
  location VARCHAR(255) NOT NULL,
  type VARCHAR(50) DEFAULT 'Full-time',
  description TEXT NOT NULL,
  requirements TEXT,
  salary_range VARCHAR(100),
  apply_url VARCHAR(255),
  external_id VARCHAR(100) UNIQUE, -- For future SERP API jobs
  source VARCHAR(100) DEFAULT 'internal', -- 'internal' or 'serp'
  status INT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
