-- Seed data for main site content

USE cyfiz_db;

-- Seed articles for insights
INSERT INTO articles (tag, date, title, excerpt, read_time) VALUES
('Deep Dive', '2026-05-07', 'The 2026 State of AI Security: What 500 CISOs told us', 'We surveyed 500 security leaders across Fortune 1000 companies. The results reveal a widening gap between AI adoption speed and security readiness.', NULL),
('AI Security', '2026-05-06', 'How agentic AI systems are reshaping the enterprise attack surface', 'As autonomous agents gain persistent memory and tool access, the threat model fundamentally changes. Here\'s what security teams must prepare for.', '8 min read'),
('Privacy', '2026-05-04', 'The EU AI Act\'s privacy implications: A practical breakdown', 'Beyond compliance checkboxes — what the regulation actually requires from data teams building AI pipelines.', '6 min read'),
('Cybersecurity', '2026-05-01', 'Zero-trust in the age of LLMs: rethinking perimeter assumptions', 'Language models break classical authentication assumptions. This is how the industry is responding.', '7 min read'),
('AI Policy', '2026-04-28', 'NIST\'s AI Risk Management Framework: what practitioners need to know', 'A field guide to applying the RMF to your organisation\'s AI deployment pipeline.', '5 min read'),
('Cybersecurity', '2026-04-24', 'Supply chain attacks targeting ML model registries are rising', 'Adversaries are increasingly poisoning open-source model weights. Detection strategies and mitigations.', '9 min read'),
('Privacy', '2026-04-20', 'Federated learning in practice: lessons from three enterprise deployments', 'Privacy-preserving ML sounds great in theory. Real-world performance trade-offs tell a different story.', '10 min read');

-- Seed research summaries
INSERT INTO research_summaries (tag, date, title, excerpt, read_time, source, citations) VALUES
('AI Security', '2026-05-05', 'Securing LLM Production Pipelines at Scale', 'A deep dive into adversarial attacks and mitigation strategies for enterprise AI deployments. Covers prompt injection, model poisoning, and inference-time defences.', '5 min read', 'arXiv:2405.0234', 127),
('Data Privacy', '2026-04-28', 'Differential Privacy: From Theory to Large-Scale Deployment', 'How tech giants implement privacy-first machine learning at scale. Key trade-offs between privacy budgets and model utility.', '5 min read', 'IEEE S&P 2026', 89),
('Cybersecurity', '2026-04-20', 'The Rise of Autonomous Agents in Cybersecurity Operations', 'Analysing multi-agent system performance in threat detection. Benchmark results across 14 enterprise environments.', '5 min read', 'USENIX Security 2026', 64),
('AI Security', '2026-04-14', 'Backdoor Attacks on Foundation Models: A Systematic Review', 'Comprehensive taxonomy of backdoor attack vectors targeting pre-trained models and the defences that work in practice.', '5 min read', 'arXiv:2404.1892', 203),
('Data Privacy', '2026-04-08', 'Membership Inference Attacks Against Fine-Tuned LLMs', 'Researchers demonstrate that fine-tuning dramatically increases membership inference risk. Practical mitigations evaluated.', '5 min read', 'CCS 2026', 156),
('Regulations', '2026-04-01', 'Auditing AI Systems: A Framework for Independent Evaluators', 'A practical audit methodology bridging the gap between regulatory requirements and technical AI system evaluation.', '5 min read', 'MIT CSAIL Technical Report', 71),
('Embodied AI', '2026-03-25', 'Safety Verification for Autonomous Robotic Systems Using LLMs', 'Novel formal methods approach to verifying safety constraints in LLM-controlled robotic systems across 8 real-world scenarios.', '5 min read', 'ICRA 2026', 45),
('Cybersecurity', '2026-03-18', 'Post-Quantum Key Exchange in Real-World TLS Deployments', 'First large-scale study of post-quantum cryptography migration challenges. Performance overhead analysis across 200 enterprise networks.', '5 min read', 'NDSS 2026', 112),
('Embodied AI', '2026-03-10', 'Multi-Modal Perception for Secure Autonomous Navigation', 'Adversarial robustness evaluation of sensor fusion architectures in self-driving systems. New attack surfaces identified.', '5 min read', 'arXiv:2403.4521', 38);

-- Seed quiz leaderboard
INSERT INTO quiz_leaderboard (rank, name, score, streak) VALUES
(1, 'Sarah K.', 980, 12),
(2, 'Mohammed A.', 960, 8),
(3, 'Priya R.', 945, 15),
(4, 'Daniel M.', 920, 5),
(5, 'Yuki T.', 900, 9);

-- Seed past quizzes
INSERT INTO past_quizzes (week, topic, participants, avg_score) VALUES
('Week 18', 'LLM Security & Prompt Injection', 4821, '72%'),
('Week 17', 'EU AI Act Deep Dive', 5340, '68%'),
('Week 16', 'Zero-Trust Architecture', 4210, '74%'),
('Week 15', 'Federated Learning Fundamentals', 3987, '61%');

-- Seed profile experience
INSERT INTO profile_experience (company, role, period, location, bullets) VALUES
('Cyfiz', 'Founder & Editor-in-Chief', '2024 — Present', 'Remote', 'Built a cybersecurity & AI intelligence platform reaching 50,000+ monthly readers.\nCurates weekly briefings distilling research papers, policy changes, and threat intelligence.\nLeads a distributed team of researchers, writers, and engineers.'),
('Cyfiz Community', 'AI Research Contributor', '2023 — Present', 'Remote', 'Contributed to open-source AI safety and alignment research initiatives.\nCo-authored accessible technical summaries of frontier model research.\nHelped grow the community to 200k+ members across platforms.'),
('Independent Consultant', 'AI & Cybersecurity Advisor', '2022 — Present', 'Remote', 'Advises organisations on AI risk management frameworks and regulatory compliance.\nDesigned threat models for LLM-powered enterprise systems.\nDelivered workshops on privacy-preserving ML and EU AI Act readiness.');

-- Seed profile skills
INSERT INTO profile_skills (category, items) VALUES
('AI & ML', 'LLM Security, AI Red Teaming, Prompt Engineering, AI Agents, Privacy-Preserving ML'),
('Cybersecurity', 'Threat Modeling, Zero-Trust Architecture, Penetration Testing, SOC Operations, Incident Response'),
('Privacy & Policy', 'EU AI Act, GDPR, NIST AI RMF, Data Governance, Risk Assessment'),
('Engineering', 'Next.js, TypeScript, Python, Node.js, AWS / GCP');

-- Seed profile projects
INSERT INTO profile_projects (name, description, tags, href) VALUES
('Cyfiz Platform', 'Full-stack intelligence platform for AI and cybersecurity professionals. Built with Next.js, featuring curated briefings, research summaries, weekly quizzes, and a course academy.', 'Next.js, TypeScript, TailwindCSS', '/'),
('LLM Security Audit Framework', 'Open-source methodology for auditing large language model deployments in enterprise environments. Covers prompt injection, data leakage, and model inversion attacks.', 'Python, AI Security, Open Source', '#'),
('EU AI Act Compliance Toolkit', 'A practical checklist and assessment tool helping organisations map their AI systems to EU AI Act risk categories and compliance requirements.', 'AI Policy, Risk Management', '#');

-- Seed profile education
INSERT INTO profile_education (institution, degree, period, detail) VALUES
('University of [Your University]', 'BSc Computer Science', '2018 — 2022', 'Specialisation in Information Security. Dissertation on adversarial machine learning.');

-- Seed profile certifications
INSERT INTO profile_certifications (certification) VALUES
('CISSP — Certified Information Systems Security Professional'),
('CEH — Certified Ethical Hacker'),
('AWS Certified Security — Specialty'),
('Google Professional Cloud Security Engineer');

-- Seed social links (storing SVG as text)
INSERT INTO social_links (name, handle, description, icon, href, cta) VALUES
('X / Twitter', '@cyfiz_ai', 'Daily threads on AI security, privacy regulations, and emerging research. 48k followers.', '<svg class=\"h-6 w-6\" fill=\"currentColor\" viewBox=\"0 0 24 24\"><path d=\"M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z\"/></svg>', '#', 'Follow on X'),
('LinkedIn', 'Cyfiz AI', 'Professional updates, keynote recaps, and curated industry news for security and AI leaders.', '<svg class=\"h-6 w-6\" fill=\"currentColor\" viewBox=\"0 0 24 24\"><path d=\"M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z\"/></svg>', '#', 'Connect on LinkedIn'),
('GitHub', 'cyfiz-ai', 'Open-source tools, research notebooks, and code from our AI security and privacy projects.', '<svg class=\"h-6 w-6\" fill=\"currentColor\" viewBox=\"0 0 24 24\"><path d=\"M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.469-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12\"/></svg>', '#', 'View Repositories'),
('Discord', 'Cyfiz Community', 'Join 12,000+ members discussing AI, cybersecurity, and privacy in real-time. AMAs every week.', '<svg class=\"h-6 w-6\" fill=\"currentColor\" viewBox=\"0 0 24 24\"><path d=\"M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.001.022.015.04.03.05a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z\"/></svg>', '#', 'Join Server');

-- Seed team members
INSERT INTO team_members (initials, name, role) VALUES
('LW', 'Lewis Walker', 'Founder & Editor-in-Chief'),
('SK', 'Sarah Kim', 'AI Security Researcher'),
('MA', 'Mohammed Al-Rashid', 'Privacy & Compliance Lead');

-- Seed site stats
INSERT INTO site_stats (value, label) VALUES
('140+', 'Countries'),
('50k+', 'Subscribers'),
('8M+', 'Monthly Readers');

-- Seed landing-page settings
INSERT INTO site_settings (setting_key, setting_value) VALUES
('hero_title', 'AI and Cybersecurity Intelligence'),
('hero_subtitle', 'Research, policy, and security briefings for builders'),
('hero_description', 'Stay ahead of AI risk, privacy regulation, and emerging cyber threats with practical, research-backed analysis.'),
('newsletter_title', 'Get the weekly brief'),
('newsletter_description', 'A concise digest of the most important AI and cybersecurity developments.');

-- Seed partners
INSERT INTO partners (name) VALUES
('Google'),
('Meta'),
('OpenAI'),
('Nvidia');
