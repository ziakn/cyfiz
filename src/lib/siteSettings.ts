// Shared (client-safe) definition of the admin-editable site settings.

export const SETTING_FIELDS = [
  { key: "contact_email", label: "Contact email", hint: "Shown in the footer and on the Contact page. Also receives contact-form messages unless CONTACT_TO is set." },
  { key: "linkedin_url", label: "LinkedIn URL", hint: "Leave empty to hide." },
  { key: "x_url", label: "X (Twitter) URL", hint: "Leave empty to hide." },
  { key: "youtube_url", label: "YouTube URL", hint: "Leave empty to hide." },
  { key: "discord_url", label: "Discord invite URL", hint: "Leave empty to hide the community links." },
  { key: "subscriber_label", label: "Subscriber count text", hint: 'Used in "Join ___ professionals…", e.g. 1,000+' },
] as const;

export type SiteSettingKey = (typeof SETTING_FIELDS)[number]["key"];
export type SiteSettings = Record<SiteSettingKey, string>;

export const DEFAULT_SETTINGS: SiteSettings = {
  contact_email: "cyfiz@cyfiz.com",
  linkedin_url: "",
  x_url: "",
  youtube_url: "",
  discord_url: "",
  subscriber_label: "1,000+",
};

