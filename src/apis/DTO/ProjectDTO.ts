export default interface ProjectDTO {
  projectId: string;
  projectName: string;
  projectDescription: string;
  projectOwner: string;
  roles: string[];
  startDate: string;
  endDate: string;
  techOrSkills: string[];
  projectLink: string;
  features: string[];
  liveDemoLink: string;
}
