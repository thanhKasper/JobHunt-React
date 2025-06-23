import type JobDTO from "./JobDTO";

export default interface JobDetailDTO extends JobDTO {
    companyLogo: string;
    matchingRequirement: string[];
}