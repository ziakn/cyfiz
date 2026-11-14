-- Who@m! page content, editable from the admin (Certifications, Core Expertise, Speaking, Research Papers).
-- Seeded with the exact text from the design; each seed only runs while its table is empty.

CREATE TABLE IF NOT EXISTS profile_credentials (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  detail VARCHAR(255) NULL,
  sort_order INT DEFAULT 0,
  status INT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS profile_expertise (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sort_order INT DEFAULT 0,
  icon VARCHAR(30) NOT NULL DEFAULT 'shield',
  title VARCHAR(255) NOT NULL,
  summary TEXT NOT NULL,
  highlight_bold VARCHAR(255) NULL,
  highlight_text VARCHAR(500) NULL,
  bullets TEXT NULL,
  status INT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS profile_speaking (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  sort_order INT DEFAULT 0,
  status INT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS profile_research (
  id INT AUTO_INCREMENT PRIMARY KEY,
  kind VARCHAR(30) NOT NULL DEFAULT 'Published',
  year VARCHAR(20) NULL,
  title VARCHAR(500) NOT NULL,
  venue VARCHAR(500) NULL,
  url VARCHAR(500) NULL,
  links TEXT NULL,
  sort_order INT DEFAULT 0,
  status INT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO profile_credentials (name, detail, sort_order)
SELECT * FROM (SELECT 'CISSP' AS name, 'Certified Information Systems Security Professional' AS detail, 1 AS sort_order UNION ALL SELECT 'OSCP', 'Offensive Security Certified Professional', 2 UNION ALL SELECT 'AIGP', 'Artificial Intelligence Governance Professional', 3 UNION ALL SELECT 'CIPM', 'Certified Information Privacy Manager', 4 UNION ALL SELECT 'ISO/IEC 27001', 'Lead Implementer & Lead Auditor', 5 UNION ALL SELECT 'ISO/IEC 42001', 'Lead Implementer', 6 UNION ALL SELECT 'Microsoft', 'Cybersecurity Architect Expert', 7 UNION ALL SELECT 'Microsoft', 'Azure AI Engineer Associate', 8 UNION ALL SELECT 'Google', 'Professional Machine Learning Engineer', 9 UNION ALL SELECT 'CCSK', 'Certificate of Cloud Security Knowledge', 10 UNION ALL SELECT 'PMP', 'Project Management Professional', 11 UNION ALL SELECT 'NIA', 'NIA Implementer', 12 UNION ALL SELECT 'ITIL', 'ITIL Foundation', 13 UNION ALL SELECT 'PECB', 'Certified Trainer', 14) seed
WHERE NOT EXISTS (SELECT 1 FROM profile_credentials);

INSERT INTO profile_expertise (sort_order, icon, title, summary, highlight_bold, highlight_text, bullets)
SELECT * FROM (SELECT 1 AS sort_order, 'shield' AS icon, 'Cybersecurity Strategy & GRC' AS title, 'Acting as virtual CISO to align security strategy with business goals and regulatory mandates, from first gap analysis to a funded roadmap.' AS summary, 'Virtual CISO' AS highlight_bold, 'for clients across government, oil & gas and financial services' AS highlight_text, 'vCISO advisory, security strategy & roadmaps
ISO/IEC 27001 ISMS design, risk & gap assessment
Compliance programmes: NIS2, QCSF, NIA, PDPPL
Security budgeting and executive reporting' AS bullets UNION ALL SELECT 2, 'chip', 'AI Governance & Data Privacy', 'Helping organizations adopt AI safely, with governance, privacy and security built in, backed by published research on AI regulation.', 'AI governance projects', 'delivered, aligning AI adoption with security, privacy and regulation', 'EU AI Act readiness and ISO/IEC 42001 AI management systems
AI risk and impact assessment, AI security governance
GDPR and privacy programme design as subject matter expert
Policies, procedures and governance toolkits' UNION ALL SELECT 3, 'cloud', 'Security Architecture & Operations', 'Turning policy into protection: designing and reviewing secure cloud and on-premises environments and testing them under real-world pressure.', 'National-level cloud', 'architecture reviews, with recommendations adopted by government entities', 'Secure cloud landing zone design (Microsoft Azure)
NDR, MDM and MAM delivery end to end
Vulnerability assessment, penetration testing & red teaming
Incident response, investigations and playbooks') seed
WHERE NOT EXISTS (SELECT 1 FROM profile_expertise);

INSERT INTO profile_speaking (title, sort_order)
SELECT * FROM (SELECT 'Data Privacy & AI Governance Roundtable, Qatar' AS title, 1 AS sort_order UNION ALL SELECT 'Workshop: Using AI in the Gulf States’ Community, HBKU', 2 UNION ALL SELECT '[Event name, organiser, city · year]', 3 UNION ALL SELECT '[Event name, organiser, city · year]', 4 UNION ALL SELECT '[Topics you speak on: e.g. EU AI Act readiness, AI risk for boards]', 5) seed
WHERE NOT EXISTS (SELECT 1 FROM profile_speaking);

INSERT INTO profile_research (kind, year, title, venue, url, links, sort_order)
SELECT * FROM (SELECT 'Published' AS kind, '2025' AS year, 'Comparative analysis of AI regulation for fintech cybersecurity and privacy in the European Union and Qatar' AS title, 'Discover Artificial Intelligence (Springer Nature), Vol. 6 · with Hira Amin · HBKU' AS venue, 'https://doi.org/10.1007/s44163-025-00736-5' AS url, 'Read the paper on Springer | https://link.springer.com/article/10.1007/s44163-025-00736-5
Read the paper on HBKU | https://elmi.hbku.edu.qa/en/publications/comparative-analysis-of-ai-regulation-for-fintech-cybersecurity-a/' AS links, 1 AS sort_order UNION ALL SELECT 'Under review', '[Year]', 'Holistic Cybersecurity and Privacy Framework for Embodied AI', 'Higher Colleges of Technology (HCT), UAE', NULL, NULL, 2 UNION ALL SELECT 'Under review', '[Year]', 'Autonomous Vehicle Cybersecurity Governance and the Sovereignty Gap for Importing', 'Hamad Bin Khalifa University (HBKU), Qatar', NULL, NULL, 3) seed
WHERE NOT EXISTS (SELECT 1 FROM profile_research);

