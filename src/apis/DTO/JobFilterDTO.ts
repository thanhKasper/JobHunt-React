export default interface JobFilterDTO {
  isActive: boolean;
  isStarred: boolean;
  averageCompatibility: number;
  occupation: string;
  location: string;
  level: string;
  yearsOfExperience: number;
  technicalKnowledge: string[];
  softSkills: string[];
  tools: string[];
  languages: string[];
  jobFilterId: string;
  title: string;
  createdAt: string;
  totalJobs: number;
}
