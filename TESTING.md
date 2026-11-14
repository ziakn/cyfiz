# Testing before going live

## 1. Automated smoke test (about 30 seconds)
Start the app, then in another terminal:

    BASE_URL=http://localhost:3000 npm run test:smoke

Checks public pages, the contact and newsletter forms, every admin page for a Super Admin, and that a
restricted role is blocked. Temporary rows are deleted afterwards. Run it again on the server after `./deploy.sh`
(`BASE_URL=https://your-domain`).

## 2. Manual checklist (log in at /admin/login)
Articles: add (with body, author, audience), edit, hide with the toggle, upload a cover, delete; open it on /insights.
Trainings: add, edit, reorder, hide, delete; check /learn.
Who@m! lists (Certifications, Core Expertise, Speaking, Research): add, edit, hide, delete; check /profile.
Contact page: send a message; see it in Contact Messages (mark handled, delete); check the email arrives.
Newsletter: subscribe from the footer form; see it in Subscribers; export CSV.
Settings: change the email and a social link; check the footer and Contact page.
Quizzes: add a quiz and a question; take it in /portal.
Roles: create a role with only "view" on Articles; assign it to a new admin user; log in as that user in a private
window and confirm only Articles shows, with no Add/Edit/Delete buttons. Deactivate the user and confirm login fails.
Last Super Admin: try to delete or deactivate yourself, and confirm it is refused.
