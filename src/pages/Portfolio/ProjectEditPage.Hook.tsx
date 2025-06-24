import type ProjectDTO from "@/apis/DTO/ProjectDTO";
import React from "react";

interface ProjectForm {
  projectTitle: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  description: string;
  roles: string[];
  technologiesOrSkills: string[];
  features: string[];
  projectLink?: string;
  demoLink?: string;
}

export default function useProjectForm(defaultValue: ProjectForm) {
  const [projectForm, setProjectForm] =
    React.useState<ProjectForm>(defaultValue);

  return {
    projectForm,
    updateProjectTitle: (title: string) =>
      setProjectForm((prev) => ({ ...prev, projectTitle: title })),
    updateStartDate: (date: Date | undefined) =>
      setProjectForm((prev) => ({ ...prev, startDate: date })),
    updateEndDate: (date: Date | undefined) =>
      setProjectForm((prev) => ({ ...prev, endDate: date })),
    updateDescription: (desc: string) =>
      setProjectForm((prev) => ({ ...prev, description: desc })),
    updateRoles: (roles: string[]) =>
      setProjectForm((prev) => ({ ...prev, roles })),
    updateTechnologiesOrSkills: (techs: string[]) =>
      setProjectForm((prev) => ({ ...prev, technologiesOrSkills: techs })),
    updateFeatures: (features: string[]) =>
      setProjectForm((prev) => ({ ...prev, features })),
    updateProjectLink: (link: string) =>
      setProjectForm((prev) => ({ ...prev, projectLink: link })),
    updateDemoLink: (link: string) =>
      setProjectForm((prev) => ({ ...prev, demoLink: link })),
    toProjectDTO: (projectId: string): ProjectDTO => {
      return {
        projectName: projectForm.projectTitle || "",
        startDate: projectForm.startDate
          ? projectForm.startDate.toISOString()
          : new Date().toISOString(),
        endDate: projectForm.endDate
          ? projectForm.endDate.toISOString()
          : undefined,
        projectDescription: projectForm.description,
        roles: projectForm.roles || [],
        techOrSkills: projectForm.technologiesOrSkills || [],
        features: projectForm.features || [],
        projectLink: projectForm.projectLink,
        liveDemoLink: projectForm.demoLink,
        projectId,
      };
    },
  };
}
