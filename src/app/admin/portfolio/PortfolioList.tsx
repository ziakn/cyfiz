"use client";

import { useState } from "react";
import StatusToggle from "@/components/admin/StatusToggle";
import ImageUpload from "@/components/admin/ImageUpload";
import { toggleStatusAction } from "../actions";
import DeleteConfirmationModal from "@/components/admin/DeleteConfirmationModal";
import * as actions from "./actions";

interface ExperienceItem {
  id: number;
  company: string;
  role: string;
  period: string;
  status: number;
}

interface ProjectItem {
  id: number;
  name: string;
  tags: string;
  image_url?: string | null;
  status: number;
}

interface SkillItem {
  id: number;
  category: string;
  items: string;
  status: number;
}

interface PortfolioListProps {
  initialExperience: ExperienceItem[];
  initialSkills: SkillItem[];
  initialProjects: ProjectItem[];
}

type PortfolioModalData = Partial<ExperienceItem & ProjectItem & SkillItem> | null;

export default function PortfolioList({ initialExperience, initialSkills, initialProjects }: PortfolioListProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [modal, setModal] = useState<{ open: boolean; type: 'experience' | 'project' | 'skill'; action: 'add' | 'edit'; data: PortfolioModalData }>({
    open: false,
    type: 'experience',
    action: 'add',
    data: null,
  });

  const handleStatusToggle = async (table: string, id: number, newStatus: number) => {
    const result = await toggleStatusAction(table, id, newStatus, "/admin/portfolio");
    return result.success;
  };

  const confirmDelete = async () => {
    if (!deleteModal.id) return;
    setIsDeleting(true);
    let result;
    if (deleteModal.type === 'experience') result = await actions.deleteExperienceAction(deleteModal.id);
    else if (deleteModal.type === 'project') result = await actions.deleteProjectAction(deleteModal.id);
    else result = await actions.deleteSkillAction(deleteModal.id);

    setIsDeleting(false);
    if (result.success) setDeleteModal({ ...deleteModal, open: false });
    else alert(result.error || "Delete failed");
  };

  const [deleteModal, setDeleteModal] = useState<{ open: boolean; type: 'experience' | 'project' | 'skill'; id: number | null; title: string }>({
    open: false,
    type: 'experience',
    id: null,
    title: "",
  });

  return (
    <div className="space-y-8">
      {/* Work Experience */}
      <div className="space-y-4">
        <div className="flex flex-col gap-4 rounded-lg bg-white p-6 shadow-[0_2px_10px_0_rgba(58,53,65,0.1)] sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-semibold text-[#3A3541] opacity-[0.87]">Work Experience</h2>
          <button 
            onClick={() => setModal({ open: true, type: 'experience', action: 'add', data: null })}
            className="inline-flex items-center gap-2 rounded-md bg-[#9155FD] px-6 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-[0_2px_10px_0_rgba(145,85,253,0.3)] transition-all hover:bg-[#804BDF]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            Add Experience
          </button>
        </div>
        <div className="overflow-hidden rounded-lg bg-white shadow-[0_2px_10px_0_rgba(58,53,65,0.1)]">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-[#F9FAFB] border-b border-[#3A3541] border-opacity-[0.12]">
                <tr>
                  <th className="px-6 py-4">
                    <input type="checkbox" className="h-4 w-4 rounded border-[#3A3541] border-opacity-[0.22] text-[#9155FD]" />
                  </th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#3A3541] opacity-[0.38]">Company</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#3A3541] opacity-[0.38]">Role</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#3A3541] opacity-[0.38]">Status</th>
                  <th className="px-6 py-4 text-right text-[10px] font-bold uppercase tracking-widest text-[#3A3541] opacity-[0.38]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#3A3541] divide-opacity-[0.12]">
                {initialExperience.map((exp) => (
                  <tr key={exp.id} className="transition-colors hover:bg-[#F9FAFB]">
                    <td className="px-6 py-4">
                      <input type="checkbox" className="h-4 w-4 rounded border-[#3A3541] border-opacity-[0.22] text-[#9155FD]" />
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-[#3A3541] opacity-[0.87]">{exp.company}</td>
                    <td className="px-6 py-4 text-sm text-[#3A3541] opacity-[0.6]">{exp.role}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <StatusToggle 
                          initialStatus={exp.status} 
                          onToggle={(newStatus) => handleStatusToggle("profile_experience", exp.id, newStatus)} 
                        />
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${
                          exp.status === 1 ? "text-[#56CA00]" : "text-gray-400"
                        }`}>
                          {exp.status === 1 ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-1.5 text-[#3A3541] opacity-[0.54] hover:text-[#9155FD] hover:opacity-100">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                        </button>
                        <button className="p-1.5 text-[#3A3541] opacity-[0.54] hover:text-[#FF4D49] hover:opacity-100">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Featured Projects */}
      <div className="space-y-4">
        <div className="flex flex-col gap-4 rounded-lg bg-white p-6 shadow-[0_2px_10px_0_rgba(58,53,65,0.1)] sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-semibold text-[#3A3541] opacity-[0.87]">Featured Projects</h2>
          <button 
            onClick={() => setModal({ open: true, type: 'project', action: 'add', data: null })}
            className="inline-flex items-center gap-2 rounded-md bg-[#9155FD] px-6 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-[0_2px_10px_0_rgba(145,85,253,0.3)] transition-all hover:bg-[#804BDF]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            Add Project
          </button>
        </div>
        <div className="overflow-hidden rounded-lg bg-white shadow-[0_2px_10px_0_rgba(58,53,65,0.1)]">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-[#F9FAFB] border-b border-[#3A3541] border-opacity-[0.12]">
                <tr>
                  <th className="px-6 py-4">
                    <input type="checkbox" className="h-4 w-4 rounded border-[#3A3541] border-opacity-[0.22] text-[#9155FD]" />
                  </th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#3A3541] opacity-[0.38]">Image</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#3A3541] opacity-[0.38]">Project Name</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#3A3541] opacity-[0.38]">Status</th>
                  <th className="px-6 py-4 text-right text-[10px] font-bold uppercase tracking-widest text-[#3A3541] opacity-[0.38]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#3A3541] divide-opacity-[0.12]">
                {initialProjects.map((project) => (
                  <tr key={project.id} className="transition-colors hover:bg-[#F9FAFB]">
                    <td className="px-6 py-4">
                      <input type="checkbox" className="h-4 w-4 rounded border-[#3A3541] border-opacity-[0.22] text-[#9155FD]" />
                    </td>
                    <td className="px-6 py-4">
                      <ImageUpload 
                        table="profile_projects" 
                        id={project.id} 
                        folder="projects" 
                        currentImage={project.image_url} 
                      />
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-[#3A3541] opacity-[0.87]">{project.name}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <StatusToggle 
                          initialStatus={project.status} 
                          onToggle={(newStatus) => handleStatusToggle("profile_projects", project.id, newStatus)} 
                        />
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${
                          project.status === 1 ? "text-[#56CA00]" : "text-gray-400"
                        }`}>
                          {project.status === 1 ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button 
                          onClick={() => setModal({ open: true, type: 'project', action: 'edit', data: project })}
                          className="p-1.5 text-[#3A3541] opacity-[0.54] hover:text-[#9155FD] hover:opacity-100"
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                        </button>
                        <button 
                          onClick={() => setDeleteModal({ open: true, type: 'project', id: project.id, title: project.name })}
                          className="p-1.5 text-[#3A3541] opacity-[0.54] hover:text-[#FF4D49] hover:opacity-100"
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Skills */}
      <div className="space-y-4">
        <div className="flex flex-col gap-4 rounded-lg bg-white p-6 shadow-[0_2px_10px_0_rgba(58,53,65,0.1)] sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-semibold text-[#3A3541] opacity-[0.87]">Skills</h2>
          <button 
            onClick={() => setModal({ open: true, type: 'skill', action: 'add', data: null })}
            className="inline-flex items-center gap-2 rounded-md bg-[#9155FD] px-6 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-[0_2px_10px_0_rgba(145,85,253,0.3)] transition-all hover:bg-[#804BDF]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            Add Skill
          </button>
        </div>
        <div className="overflow-hidden rounded-lg bg-white shadow-[0_2px_10px_0_rgba(58,53,65,0.1)]">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-[#F9FAFB] border-b border-[#3A3541] border-opacity-[0.12]">
                <tr>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#3A3541] opacity-[0.38]">Category</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#3A3541] opacity-[0.38]">Items</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#3A3541] opacity-[0.38]">Status</th>
                  <th className="px-6 py-4 text-right text-[10px] font-bold uppercase tracking-widest text-[#3A3541] opacity-[0.38]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#3A3541] divide-opacity-[0.12]">
                {initialSkills.map((skill) => (
                  <tr key={skill.id} className="transition-colors hover:bg-[#F9FAFB]">
                    <td className="px-6 py-4 text-sm font-semibold text-[#3A3541] opacity-[0.87]">{skill.category}</td>
                    <td className="px-6 py-4 text-xs text-[#3A3541] opacity-[0.6]">{skill.items}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <StatusToggle 
                          initialStatus={skill.status} 
                          onToggle={(newStatus) => handleStatusToggle("profile_skills", skill.id, newStatus)} 
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button 
                          onClick={() => setModal({ open: true, type: 'skill', action: 'edit', data: skill })}
                          className="p-1.5 text-[#3A3541] opacity-[0.54] hover:text-[#9155FD] hover:opacity-100"
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                        </button>
                        <button 
                          onClick={() => setDeleteModal({ open: true, type: 'skill', id: skill.id, title: skill.category })}
                          className="p-1.5 text-[#3A3541] opacity-[0.54] hover:text-[#FF4D49] hover:opacity-100"
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Portfolio Modals */}
      {modal.open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#3A3541] bg-opacity-50 p-4 transition-opacity">
          <div className="w-full max-w-lg scale-100 rounded-lg bg-white p-8 shadow-[0_12px_40px_rgba(58,53,65,0.2)] transition-transform">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-xl font-bold text-[#3A3541] opacity-[0.87]">
                {modal.action === 'add' ? 'Add' : 'Edit'} {modal.type.charAt(0).toUpperCase() + modal.type.slice(1)}
              </h3>
              <button onClick={() => setModal({ ...modal, open: false })} className="text-[#3A3541] opacity-[0.54] hover:opacity-100">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>

            <form action={async (formData) => {
              const editId = modal.data?.id;
              let result;
              if (modal.type === 'experience') {
                if (modal.action === 'add') {
                  result = await actions.addExperienceAction(formData);
                } else {
                  if (editId === undefined) {
                    alert("Missing portfolio item id");
                    return;
                  }
                  result = await actions.editExperienceAction(editId, formData);
                }
              } else if (modal.type === 'project') {
                if (modal.action === 'add') {
                  result = await actions.addProjectAction(formData);
                } else {
                  if (editId === undefined) {
                    alert("Missing portfolio item id");
                    return;
                  }
                  result = await actions.editProjectAction(editId, formData);
                }
              } else {
                if (modal.action === 'add') {
                  result = await actions.addSkillAction(formData);
                } else {
                  if (editId === undefined) {
                    alert("Missing portfolio item id");
                    return;
                  }
                  result = await actions.editSkillAction(editId, formData);
                }
              }
              
              if (result.success) setModal({ ...modal, open: false });
              else alert(result.error || "Action failed");
            }} className="space-y-4">
              {modal.type === 'experience' && (
                <>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#3A3541] opacity-[0.6]">Company</label>
                    <input name="company" required defaultValue={modal.data?.company} className="w-full rounded-md border border-[#3A3541] border-opacity-[0.22] px-3 py-2 text-sm outline-none focus:border-[#9155FD]" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#3A3541] opacity-[0.6]">Role</label>
                    <input name="role" required defaultValue={modal.data?.role} className="w-full rounded-md border border-[#3A3541] border-opacity-[0.22] px-3 py-2 text-sm outline-none focus:border-[#9155FD]" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#3A3541] opacity-[0.6]">Period</label>
                    <input name="period" required defaultValue={modal.data?.period} className="w-full rounded-md border border-[#3A3541] border-opacity-[0.22] px-3 py-2 text-sm outline-none focus:border-[#9155FD]" />
                  </div>
                </>
              )}
              {modal.type === 'project' && (
                <>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#3A3541] opacity-[0.6]">Project Name</label>
                    <input name="name" required defaultValue={modal.data?.name} className="w-full rounded-md border border-[#3A3541] border-opacity-[0.22] px-3 py-2 text-sm outline-none focus:border-[#9155FD]" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#3A3541] opacity-[0.6]">Tags (Comma separated)</label>
                    <input name="tags" required defaultValue={modal.data?.tags} className="w-full rounded-md border border-[#3A3541] border-opacity-[0.22] px-3 py-2 text-sm outline-none focus:border-[#9155FD]" />
                  </div>
                </>
              )}
              {modal.type === 'skill' && (
                <>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#3A3541] opacity-[0.6]">Category</label>
                    <input name="category" required defaultValue={modal.data?.category} className="w-full rounded-md border border-[#3A3541] border-opacity-[0.22] px-3 py-2 text-sm outline-none focus:border-[#9155FD]" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#3A3541] opacity-[0.6]">Items (Comma separated)</label>
                    <textarea name="items" required defaultValue={modal.data?.items} className="w-full rounded-md border border-[#3A3541] border-opacity-[0.22] px-3 py-2 text-sm outline-none focus:border-[#9155FD]" />
                  </div>
                </>
              )}

              <div className="mt-8 flex items-center gap-4">
                <button type="button" onClick={() => setModal({ ...modal, open: false })} className="flex-1 rounded-md border border-[#3A3541] border-opacity-[0.22] py-2.5 text-xs font-bold uppercase tracking-wider text-[#3A3541] opacity-[0.6] hover:bg-gray-50">Cancel</button>
                <button type="submit" className="flex-1 rounded-md bg-[#9155FD] py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-[0_2px_10px_0_rgba(145,85,253,0.3)] hover:bg-[#804BDF]">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <DeleteConfirmationModal 
        isOpen={deleteModal.open}
        onClose={() => setDeleteModal({ ...deleteModal, open: false })}
        onConfirm={confirmDelete}
        title={`Delete ${deleteModal.type.charAt(0).toUpperCase() + deleteModal.type.slice(1)}`}
        itemName={deleteModal.title}
        isDeleting={isDeleting}
      />
    </div>
  );
}
