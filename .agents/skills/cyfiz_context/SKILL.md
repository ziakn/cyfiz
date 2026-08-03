---
name: Cyfiz Project Context
description: Provides deep architectural understanding and context of the Cyfiz Next.js project. Use this skill when asked to explain the project or before making architectural changes.
---

# Cyfiz Project Context

## Overview
Cyfiz is a comprehensive, full-stack Next.js web application built for a cybersecurity organization. It includes a marketing website, an educational platform (with a quiz portal), and a content management system. 

## Core Architecture
The project is structured into three main domains within `src/app`:
1. **Public-Facing Site (Root)**: Marketing and informational pages (Hero, Academy, Research, Tools, Frameworks).
2. **Admin Dashboard (`/admin`)**: A backend interface for site administrators to manage articles, portfolio items, team members, users, quizzes, and AI summaries. It has its own login/logout flows.
3. **User Portal (`/portal`)**: A dedicated area for registered users to access educational content, take quizzes, view leaderboards, and manage their profiles.

## Technology Stack
- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS with PostCSS
- **Database:** MySQL accessed via the `mysql2` library. Raw SQL queries are used (e.g., `src/lib/db.ts`) instead of an ORM.
- **Authentication:** Custom native authentication built with `bcryptjs` and `jsonwebtoken` for session management via HTTP-only cookies. (No NextAuth).
- **AI Integration:** Google Gemini API (`src/lib/gemini.ts`) for a "Paper Summarizer" feature that reads PDF cybersecurity research papers and extracts structured summaries.
- **Email:** `nodemailer` for transactional emails.
- **Database Schema:** Managed through raw SQL files in the root (`database_setup.sql`, `quiz_portal_schema.sql`, etc.).
