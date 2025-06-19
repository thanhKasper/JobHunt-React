import React from "react";

interface JobFilterForm {
  filterTitle: string;
  ocupation: string;
  workingLocation: string;
  experience: number;
  jobLevel: string;
  technicalKnowledge: string[];
  softSkills: string[];
  tools: string[];
}

export default function useCreateJobFilter() {
  const [jobFilterForm, setJobFilterForm] = React.useState<JobFilterForm>({
    filterTitle: "",
    ocupation: "",
    workingLocation: "",
    experience: 0,
    jobLevel: "",
    technicalKnowledge: [],
    softSkills: [],
    tools: [],
  });

  return {
    jobFilterForm,
    updateFilterTitle: (title: string) => {
      setJobFilterForm((prev) => ({ ...prev, filterTitle: title }));
    },
    updateOccupation: (occupation: string) => {
      setJobFilterForm((prev) => ({ ...prev, ocupation: occupation }));
    },
    updateWorkingLocation: (location: string) => {
      setJobFilterForm((prev) => ({ ...prev, workingLocation: location }));
    },
    updateExperience: (experience: number) => {
      setJobFilterForm((prev) => ({ ...prev, experience }));
    },
    updateJobLevel: (level: string) => {
      setJobFilterForm((prev) => ({ ...prev, jobLevel: level }));
    },
    updateTechnicalKnowledge: (knowledge: string[]) => {
      setJobFilterForm((prev) => ({ ...prev, technicalKnowledge: knowledge }));
    },
    updateSoftSkills: (skills: string[]) => {
      setJobFilterForm((prev) => ({ ...prev, softSkills: skills }));
    },
    updateTools: (tools: string[]) => {
      setJobFilterForm((prev) => ({ ...prev, tools }));
    },
  };
}
