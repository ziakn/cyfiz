# Cyfiz

Next.js (App Router) site with a MySQL backend and an admin panel.

- **Public site** (`src/app/(site)`): Home, Insights (+ article pages), Learn, Who@m!, Contact
- **Admin** (`/admin`): Articles, Trainings, Contact Messages, Subscribers, Quizzes, Portal Users, Users, Settings
- **Quiz portal** (`/portal`): learner sign-up, quizzes and attempts

## Deploy (server only needs a pull)

```bash
./deploy.sh        # git pull → npm ci → npm run migrate → npm run build → restart (pm2)
```

Server prerequisites (once): Node 20+, a `.env` with `MYSQL_URL`, `JWT_SECRET`, optional `SMTP_*`, `CONTACT_TO`, `NEXT_PUBLIC_SITE_URL`, and an `admin_users` row.

### Database changes
- Schema changes are SQL files in `database/migrations/` (`001_…`, `002_…`). `npm run migrate` applies each new file once (tracked in `schema_migrations`), so a deploy never needs manual SQL.
- To change the database later: add the next numbered file, commit, push, deploy.
- `database/optional/drop_v1_tables.sql` removes the old v1 tables. It is destructive and never run automatically.

## Local development

`npm run migrate` (first time), then `npm run dev`. `npm run lint` · `npm run typecheck` · `npm run build`

The previous design is kept on the `v1-backup` branch (tag `v1-frontend-backup`).
