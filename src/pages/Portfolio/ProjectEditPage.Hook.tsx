import React from "react";

interface ProjectForm {
  projectTitle: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  description: string;
  roles: string[];
  technologiesOrSkills: string[];
  features: string[];
  projectLink: string;
}

export default function useProjectForm() {
  const [projectForm, setProjectForm] = React.useState<ProjectForm>({
    projectTitle: "",
    startDate: undefined,
    endDate: undefined,
    description: "",
    roles: [],
    technologiesOrSkills: [],
    features: [],
    projectLink: "",
  });

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
  };
}
