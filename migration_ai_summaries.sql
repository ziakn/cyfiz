-- AI Paper Summarizer: uploaded PDFs + AI-generated drafts awaiting review.
-- Verified drafts get published into `research_summaries` (see published_summary_id).
CREATE TABLE ai_summaries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  original_filename VARCHAR(255) NOT NULL,
  pdf_url          VARCHAR(255) NOT NULL,
  source           VARCHAR(255),
  custom_instructions TEXT,            -- optional editor steer for the AI summary
  ai_title         VARCHAR(255),
  ai_tag           VARCHAR(50),
  ai_excerpt       TEXT,               -- editable summary (HTML)
  ai_key_findings  TEXT,               -- editable key findings (HTML list)
  ai_read_time     VARCHAR(20),
  ai_model         VARCHAR(50),        -- e.g. gemini-2.5-flash
  process_status   ENUM('processing','draft','published','error') NOT NULL DEFAULT 'processing',
  error_message    TEXT,
  published_summary_id INT NULL,       -- research_summaries.id once published
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
