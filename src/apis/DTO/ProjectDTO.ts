export default interface ProjectDTO {
  projectId: string;
  projectName: string;
  projectDescription: string;
  roles: string[];
  startDate: Date | null;
  endDate: Date | null;
  techOrSkills: string[];
  projectLink?: string;
  features: string[];
  liveDemoLink?: string;
}
