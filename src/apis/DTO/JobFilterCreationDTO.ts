export default interface JobFilterCreationDTO {
  jobFilterName: string;
  filterOccupation: string;
  desireWorkingLocation: string;
  jobLevel: string;
  expectedExp: number;
  technicalKnowledge: string[];
  softSkills: string[];
  tools: string[];
  languages: string[];
}
