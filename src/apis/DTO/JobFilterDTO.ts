import type JobDetailDTO from "./JobDetailDTO";

export default interface JobFilterDTO {
  jobFilterId: string;
  jobFilterName: string;
  isActive: boolean;
  isStarred: boolean;
  filterOccupation: string;
  matchingPercentage: number;
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
