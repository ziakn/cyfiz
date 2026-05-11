import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
  try {
    const [experience, skills, projects, education, certifications, socialLinks, stats] = await Promise.all([
      query("SELECT company, role, period, location, bullets FROM profile_experience ORDER BY period DESC"),
      query("SELECT category, items FROM profile_skills"),
      query("SELECT name, description, tags, href FROM profile_projects"),
      query("SELECT institution, degree, period, detail FROM profile_education"),
      query("SELECT certification FROM profile_certifications"),
      query("SELECT name, href FROM social_links ORDER BY id ASC"),
      query("SELECT value, label FROM site_stats ORDER BY id ASC")
    ]);

    // Process bullets from JSON-like string to array
    const processedExperience = (experience as any[]).map((exp) => ({
      ...exp,
      bullets: exp.bullets.split('\n')
    }));

    // Process items from comma-separated string to array
    const processedSkills = (skills as any[]).map((skill) => ({
      ...skill,
      items: skill.items.split(', ')
    }));

    // Process tags from comma-separated string to array
    const processedProjects = (projects as any[]).map((project) => ({
      ...project,
      tags: project.tags ? project.tags.split(', ') : []
    }));

    return NextResponse.json({
      experience: processedExperience,
      skills: processedSkills,
      projects: processedProjects,
      education,
      certifications: (certifications as any[]).map((cert) => cert.certification),
      socialLinks: (socialLinks as any[]).map((link) => ({ label: link.name, href: link.href })),
      stats: stats as any[]
    });
  } catch (error) {
    console.error("Error fetching profile data:", error);
    return NextResponse.json({ error: "Failed to fetch profile data" }, { status: 500 });
  }
}