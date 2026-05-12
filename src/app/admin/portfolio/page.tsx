import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AUTH_COOKIE_NAME, getSessionUserFromCookie } from "@/lib/auth";
import { query } from "@/lib/db";
import { RowDataPacket } from "mysql2";
import PortfolioList from "./PortfolioList";

export default async function AdminPortfolioPage() {
  const cookiesStore = await cookies();
  const cookieValue = cookiesStore.get(AUTH_COOKIE_NAME)?.value ?? null;
  const user = getSessionUserFromCookie(cookieValue);
  if (!user) {
    redirect("/admin");
  }

  const [experience, skills, projects] = await Promise.all([
    query<RowDataPacket[]>("SELECT id, company, role, period, status FROM profile_experience ORDER BY id DESC"),
    query<RowDataPacket[]>("SELECT id, category, items, status FROM profile_skills"),
    query<RowDataPacket[]>("SELECT id, name, tags, image_url, status FROM profile_projects")
  ]);

  return (
    <PortfolioList 
      initialExperience={experience as any} 
      initialSkills={skills as any} 
      initialProjects={projects as any} 
    />
  );
}
