export type AdminFieldType = "text" | "textarea" | "number" | "date";

export interface AdminFieldConfig {
  key: string;
  label: string;
  type: AdminFieldType;
  required?: boolean;
}

export interface AdminContentModule {
  slug: string;
  title: string;
  table: string;
  description: string;
  listTitleField: string;
  listSubtitleField?: string;
  orderBy?: string;
  fields: AdminFieldConfig[];
}

export const adminContentModules: AdminContentModule[] = [
  {
    slug: "articles",
    title: "Insights Articles",
    table: "articles",
    description: "Manage the articles shown on the Insights page.",
    listTitleField: "title",
    listSubtitleField: "tag",
    orderBy: "date DESC",
    fields: [
      { key: "tag", label: "Tag", type: "text", required: true },
      { key: "date", label: "Date", type: "date", required: true },
      { key: "title", label: "Title", type: "text", required: true },
      { key: "excerpt", label: "Excerpt", type: "textarea", required: true },
      { key: "read_time", label: "Read time", type: "text" },
    ],
  },
  {
    slug: "research-summaries",
    title: "Research Summaries",
    table: "research_summaries",
    description: "Manage research summaries shown on the Summaries page.",
    listTitleField: "title",
    listSubtitleField: "tag",
    orderBy: "date DESC",
    fields: [
      { key: "tag", label: "Tag", type: "text", required: true },
      { key: "date", label: "Date", type: "date", required: true },
      { key: "title", label: "Title", type: "text", required: true },
      { key: "excerpt", label: "Excerpt", type: "textarea", required: true },
      { key: "read_time", label: "Read time", type: "text" },
      { key: "source", label: "Source", type: "text" },
      { key: "citations", label: "Citations", type: "number" },
    ],
  },
  {
    slug: "quiz-leaderboard",
    title: "Quiz Leaderboard",
    table: "quiz_leaderboard",
    description: "Manage top performers on the quiz page.",
    listTitleField: "name",
    listSubtitleField: "rank",
    orderBy: "`rank` ASC",
    fields: [
      { key: "rank", label: "Rank", type: "number", required: true },
      { key: "name", label: "Name", type: "text", required: true },
      { key: "score", label: "Score", type: "number", required: true },
      { key: "streak", label: "Streak", type: "number", required: true },
    ],
  },
  {
    slug: "past-quizzes",
    title: "Past Quizzes",
    table: "past_quizzes",
    description: "Manage previous quiz editions.",
    listTitleField: "topic",
    listSubtitleField: "week",
    orderBy: "id DESC",
    fields: [
      { key: "week", label: "Week", type: "text", required: true },
      { key: "topic", label: "Topic", type: "text", required: true },
      { key: "participants", label: "Participants", type: "number", required: true },
      { key: "avg_score", label: "Average score", type: "text", required: true },
    ],
  },
  {
    slug: "profile-experience",
    title: "Profile Experience",
    table: "profile_experience",
    description: "Manage profile work history entries.",
    listTitleField: "company",
    listSubtitleField: "role",
    orderBy: "id ASC",
    fields: [
      { key: "company", label: "Company", type: "text", required: true },
      { key: "role", label: "Role", type: "text", required: true },
      { key: "period", label: "Period", type: "text", required: true },
      { key: "location", label: "Location", type: "text", required: true },
      { key: "bullets", label: "Bullets", type: "textarea", required: true },
    ],
  },
  {
    slug: "profile-skills",
    title: "Profile Skills",
    table: "profile_skills",
    description: "Manage profile skill groups.",
    listTitleField: "category",
    listSubtitleField: "items",
    orderBy: "id ASC",
    fields: [
      { key: "category", label: "Category", type: "text", required: true },
      { key: "items", label: "Items", type: "textarea", required: true },
    ],
  },
  {
    slug: "profile-projects",
    title: "Profile Projects",
    table: "profile_projects",
    description: "Manage profile projects.",
    listTitleField: "name",
    listSubtitleField: "tags",
    orderBy: "id ASC",
    fields: [
      { key: "name", label: "Name", type: "text", required: true },
      { key: "description", label: "Description", type: "textarea", required: true },
      { key: "tags", label: "Tags", type: "text" },
      { key: "href", label: "Link", type: "text" },
    ],
  },
  {
    slug: "profile-education",
    title: "Profile Education",
    table: "profile_education",
    description: "Manage education entries.",
    listTitleField: "institution",
    listSubtitleField: "degree",
    orderBy: "id ASC",
    fields: [
      { key: "institution", label: "Institution", type: "text", required: true },
      { key: "degree", label: "Degree", type: "text", required: true },
      { key: "period", label: "Period", type: "text", required: true },
      { key: "detail", label: "Detail", type: "textarea" },
    ],
  },
  {
    slug: "profile-certifications",
    title: "Profile Certifications",
    table: "profile_certifications",
    description: "Manage certifications shown on the profile page.",
    listTitleField: "certification",
    orderBy: "id ASC",
    fields: [
      { key: "certification", label: "Certification", type: "text", required: true },
    ],
  },
  {
    slug: "social-links",
    title: "Social Links",
    table: "social_links",
    description: "Manage social cards and profile links.",
    listTitleField: "name",
    listSubtitleField: "handle",
    orderBy: "id ASC",
    fields: [
      { key: "name", label: "Name", type: "text", required: true },
      { key: "handle", label: "Handle", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "icon", label: "Icon", type: "textarea" },
      { key: "href", label: "Link", type: "text" },
      { key: "cta", label: "CTA", type: "text" },
    ],
  },
  {
    slug: "team-members",
    title: "Team Members",
    table: "team_members",
    description: "Manage team entries on the Connect page.",
    listTitleField: "name",
    listSubtitleField: "role",
    orderBy: "id ASC",
    fields: [
      { key: "initials", label: "Initials", type: "text", required: true },
      { key: "name", label: "Name", type: "text", required: true },
      { key: "role", label: "Role", type: "text", required: true },
    ],
  },
  {
    slug: "site-stats",
    title: "Site Stats",
    table: "site_stats",
    description: "Manage reusable site statistics.",
    listTitleField: "label",
    listSubtitleField: "value",
    orderBy: "id ASC",
    fields: [
      { key: "value", label: "Value", type: "text", required: true },
      { key: "label", label: "Label", type: "text", required: true },
    ],
  },
];

export function getAdminContentModule(slug: string) {
  return adminContentModules.find((moduleItem) => moduleItem.slug === slug) ?? null;
}
