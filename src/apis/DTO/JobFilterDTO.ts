import type JobDetailDTO from "./JobDetailDTO";

export default interface JobFilterDTO {
  jobFilterId: string;
  jobFilterName: string;
  isActive: boolean;
  isStarred: boolean;
  averageCompatibility: number;
  filterOccupation: string;
  desireWorkingLocation: string;
  jobLevel: string;
  exp: number;
  technicalKnowledge: string[];
  softSkills: string[];
  tools: string[];
  languages: string[];
  totalJobs: number;
  jobs: JobDetailDTO[];
}
