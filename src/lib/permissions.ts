// Client-safe definition of admin modules and permission actions.
// To add a module: add it to modules.json, protect its pages/actions with the same key; the next deploy syncs it into Roles & Permissions.
import registry from "./modules.json";

export const ACTIONS = ["view", "create", "update", "delete"] as const;
export type Action = (typeof ACTIONS)[number];

export interface ModuleDef {
  key: string;
  label: string;
  group: string;
  href: string;
  description: string;
}

// Defined in modules.json so the deploy-time sync script (scripts/sync-permissions.mjs) can read the same list.
export const MODULES: ModuleDef[] = registry.modules.map(({ key, label, group, href, description }) => ({ key, label, group, href, description }));

export const MODULE_KEYS = MODULES.map((m) => m.key);
export const moduleByKey = (key: string) => MODULES.find((m) => m.key === key);

export type ModulePerms = Record<Action, boolean>;
export type PermissionMap = Record<string, ModulePerms>;

export const NO_PERMS: ModulePerms = { view: false, create: false, update: false, delete: false };
export const ALL_PERMS: ModulePerms = { view: true, create: true, update: true, delete: true };

/** Maps a table used by the shared status toggle to the module that owns it. */
export const TABLE_MODULE: Record<string, string> = {
  articles: "articles",
  trainings: "trainings",
  packages: "packages",
  profile_credentials: "credentials",
  profile_expertise: "expertise",
  profile_speaking: "speaking",
  profile_research: "research",
  contact_messages: "messages",
  newsletter_subscribers: "subscribers",
  quizzes: "quizzes",
  quiz_questions: "quizzes",
  portal_users: "portal_users",
  site_settings: "settings",
};
