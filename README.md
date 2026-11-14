# Cyfiz

Next.js (App Router) site with a MySQL backend and an admin panel.

- **Public site** (`src/app/(site)`): Home, Insights (+ article pages), Learn, Who@m!, Contact
- **Admin** (`/admin`): Articles, Trainings, Contact Messages, Subscribers, Quizzes, Portal Users, Users, Settings
- **Quiz portal** (`/portal`): learner sign-up, quizzes and attempts

## Roles & permissions

Admin access is role-based and managed in **Admin → Roles & Permissions**. Each role gets view / add / change / delete per module. Super Admin always has full access; Editor and Viewer ship as editable starting points.

**Adding a module** (permissions sync themselves):
1. Add it to `src/lib/modules.json` (key, label, group, link, and optional default grants for `editor` / `viewer` as view/create/update/delete bits, e.g. `"1110"`).
2. Guard its page with `requirePage("key")` and its actions with `guard("key", "create|update|delete")`.
3. Deploy. `npm run migrate` (run by `./deploy.sh`) syncs the module into Roles & Permissions: built-in roles get their defaults if they have none yet, grants for deleted modules are removed, and changes you made in the admin are never overwritten. Custom roles are never auto-granted; tick the new module for them in Roles & Permissions. Run it alone with `npm run sync:permissions`.

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
