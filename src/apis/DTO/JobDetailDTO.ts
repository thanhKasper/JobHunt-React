import type JobFilterDTO from "./JobFilterDTO";

export default interface JobDetailDTO extends JobFilterDTO {
    companyLogo: string;
    matchingRequirement: string[];
}