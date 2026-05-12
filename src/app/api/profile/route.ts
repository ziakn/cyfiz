import { NextResponse } from "next/server";
import { query } from "@/lib/db";

interface ExperienceRow {
  company: string;
  role: string;
  period: string;
  location: string;
  bullets: string;
}

interface SkillRow {
  category: string;
  items: string;
}

interface ProjectRow {
  name: string;
  description: string;
  tags?: string | null;
  href?: string | null;
  image_url?: string | null;
}

interface CertificationRow {
  certification: string;
}

interface SocialLinkRow {
  name: string;
  href?: string | null;
}

export async function GET() {
  try {
    const [experience, skills, projects, education, certifications, socialLinks, stats] = await Promise.all([
      query<ExperienceRow[]>("SELECT company, role, period, location, bullets FROM profile_experience WHERE status = 1 ORDER BY period DESC"),
      query<SkillRow[]>("SELECT category, items FROM profile_skills WHERE status = 1"),
      query<ProjectRow[]>("SELECT name, description, tags, href, image_url FROM profile_projects WHERE status = 1"),
      query("SELECT institution, degree, period, detail FROM profile_education WHERE status = 1"),
      query<CertificationRow[]>("SELECT certification FROM profile_certifications WHERE status = 1"),
      query<SocialLinkRow[]>("SELECT name, href FROM social_links WHERE status = 1 ORDER BY id ASC"),
      query("SELECT value, label FROM site_stats WHERE status = 1 ORDER BY id ASC")
    ]);

    // Process bullets from JSON-like string to array
    const processedExperience = experience.map((exp) => ({
      ...exp,
      bullets: exp.bullets.split('\n')
    }));

    // Process items from comma-separated string to array
    const processedSkills = skills.map((skill) => ({
      ...skill,
      items: skill.items.split(', ')
    }));

    // Process tags from comma-separated string to array
    const processedProjects = projects.map((project) => ({
      ...project,
      tags: project.tags ? project.tags.split(', ') : []
    }));

    return NextResponse.json({
      experience: processedExperience,
      skills: processedSkills,
      projects: processedProjects,
      education,
      certifications: certifications.map((cert) => cert.certification),
      socialLinks: socialLinks.map((link) => ({ label: link.name, href: link.href })),
      stats
    });
  } catch (error) {
    console.error("Error fetching profile data:", error);
    return NextResponse.json({ error: "Failed to fetch profile data" }, { status: 500 });
  }
}
