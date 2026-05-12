import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AUTH_COOKIE_NAME, getSessionUserFromCookie } from "@/lib/auth";
import { query } from "@/lib/db";
import { RowDataPacket } from "mysql2";
import PortfolioList from "./PortfolioList";

interface ExperienceRow extends RowDataPacket {
  id: number;
  company: string;
  role: string;
  period: string;
  location: string;
  bullets: string;
  status: number;
}

interface SkillRow extends RowDataPacket {
  id: number;
  category: string;
  items: string;
  status: number;
}

interface ProjectRow extends RowDataPacket {
  id: number;
  name: string;
  description: string;
  tags: string;
  href: string;
  image_url?: string | null;
  status: number;
}

export default async function AdminPortfolioPage() {
  const cookiesStore = await cookies();
  const cookieValue = cookiesStore.get(AUTH_COOKIE_NAME)?.value ?? null;
  const user = getSessionUserFromCookie(cookieValue);
  if (!user) {
    redirect("/admin");
  }

  const [experience, skills, projects] = await Promise.all([
    query<ExperienceRow[]>("SELECT id, company, role, period, location, bullets, status FROM profile_experience ORDER BY id DESC"),
    query<SkillRow[]>("SELECT id, category, items, status FROM profile_skills"),
    query<ProjectRow[]>("SELECT id, name, description, tags, href, image_url, status FROM profile_projects")
  ]);

  return (
    <PortfolioList 
      initialExperience={experience} 
      initialSkills={skills} 
      initialProjects={projects} 
    />
  );
}
