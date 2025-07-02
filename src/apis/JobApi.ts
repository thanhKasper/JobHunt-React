import { BaseApi } from "./BaseApi";
import type JobDetailDTO from "./DTO/JobDetailDTO";
import type JobDTO from "./DTO/JobDTO";

export default class JopApi extends BaseApi {
  static async getTotalJobs(): Promise<number> {
    return 160; // Mocked value, replace with actual API call
  }

  static async getTodayNewJobs(): Promise<number> {
    return 5; // Mocked value, replace with actual API call
  }

  static async getTodayCompatibilityPercentage(): Promise<number> {
    return 75; // Mocked value, replace with actual API call
  }

  static async getJobsBaseOnFilter(
    jobFilterId: string
  ): Promise<Array<JobDetailDTO>> {
    try {
      const jobList = await this.get(`jobview/${jobFilterId}`);
      return jobList as JobDetailDTO[];
    } catch (err) {
      throw err;
    }
  }

  static async getFirstTenLatestJobs(): Promise<Array<JobDTO>> {
    return [
      {
        jobFilterId: "1",
        jobFilterName: "Software Engineer",
        jobTitle: "Frontend Developer",
        jobId: "1",
        companyName: "Tech Corp",
        companyLink: "https://techcorp.com",
        jobLink: "https://techcorp.com/jobs/frontend-developer",
        workingLocation: "Remote",
        jobOpenDate: "2023-10-01",
        jobCompatibilityPercentage: 60,
      },
      {
        jobFilterId: "2",
        jobFilterName: "Data Science",
        jobTitle: "Data Analyst",
        jobId: "2",
        companyName: "Data Inc.",
        companyLink: "https://datainc.com",
        jobLink: "https://datainc.com/jobs/data-analyst",
        workingLocation: "On-site",
        jobOpenDate: "2023-10-02",
        jobCompatibilityPercentage: 80,
      },
      {
        jobFilterId: "3",
        jobFilterName: "DevOps",
        jobTitle: "DevOps Engineer",
        jobId: "3",
        companyName: "Cloud Solutions",
        companyLink: "https://cloudsolutions.com",
        jobLink: "https://cloudsolutions.com/jobs/devops-engineer",
        workingLocation: "Hybrid",
        jobOpenDate: "2023-10-03",
        jobCompatibilityPercentage: 75,
      },
      {
        jobFilterId: "4",
        jobFilterName: "Product Management",
        jobTitle: "Product Manager",
        jobId: "4",
        companyName: "Innovatech",
        companyLink: "https://innovatech.com",
        jobLink: "https://innovatech.com/jobs/product-manager",
        workingLocation: "Remote",
        jobOpenDate: "2023-10-04",
        jobCompatibilityPercentage: 80,
      },
      {
        jobFilterId: "5",
        jobFilterName: "Marketing",
        jobTitle: "Marketing Specialist",
        jobId: "5",
        companyName: "Market Leaders",
        companyLink: "https://marketleaders.com",
        jobLink: "https://marketleaders.com/jobs/marketing-specialist",
        workingLocation: "On-site",
        jobOpenDate: "2023-10-05",
        jobCompatibilityPercentage: 55,
      },
      {
        jobFilterId: "6",
        jobFilterName: "UI/UX Design",
        jobTitle: "UI/UX Designer",
        jobId: "6",
        companyName: "Design Studio",
        companyLink: "https://designstudio.com",
        jobLink: "https://designstudio.com/jobs/ui-ux-designer",
        workingLocation: "Remote",
        jobOpenDate: "2023-10-06",
        jobCompatibilityPercentage: 66,
      },
      {
        jobFilterId: "7",
        jobFilterName: "Cybersecurity",
        jobTitle: "Security Analyst",
        jobId: "7",
        companyName: "SecureTech",
        companyLink: "https://securetech.com",
        jobLink: "https://securetech.com/jobs/security-analyst",
        workingLocation: "Hybrid",
        jobOpenDate: "2023-10-07",
        jobCompatibilityPercentage: 90,
      },
      {
        jobFilterId: "8",
        jobFilterName: "Finance",
        jobTitle: "Financial Analyst",
        jobId: "8",
        companyName: "Finance Hub",
        companyLink: "https://financehub.com",
        jobLink: "https://financehub.com/jobs/financial-analyst",
        workingLocation: "On-site",
        jobOpenDate: "2023-10-08",
        jobCompatibilityPercentage: 50,
      },
      {
        jobFilterId: "9",
        jobFilterName: "Sales",
        jobTitle: "Sales Executive",
        jobId: "9",
        companyName: "Sales Pros",
        companyLink: "https://salespros.com",
        jobLink: "https://salespros.com/jobs/sales-executive",
        workingLocation: "Remote",
        jobOpenDate: "2023-10-09",
        jobCompatibilityPercentage: 100,
      },
      {
        jobFilterId: "10",
        jobFilterName: "Human Resources",
        jobTitle: "HR Manager",
        jobId: "10",
        companyName: "People First",
        companyLink: "https://peoplefirst.com",
        jobLink: "https://peoplefirst.com/jobs/hr-manager",
        workingLocation: "On-site",
        jobOpenDate: "2023-10-10",
        jobCompatibilityPercentage: 78,
      },
    ]; // Mocked value, replace with actual API call
  }
  static async getJobsWithSearchAndFilter(
    keyword: string | undefined,
    filterIdList: string[],
    position: number
  ): Promise<{ total: number; position: number; jobs: Array<JobDTO> }> {
    return {
      total: 100,
      position: position,
      jobs: [
        {
          jobFilterId: "1",
          jobFilterName: "Software Engineer",
          jobTitle: "Frontend Developer",
          jobId: "1",
          companyName: "Tech Corp",
          companyLink: "https://techcorp.com",
          jobLink: "https://techcorp.com/jobs/frontend-developer",
          workingLocation: "Remote",
          jobOpenDate: "2023-10-01",
          jobCompatibilityPercentage: 60,
        },
        {
          jobFilterId: "2",
          jobFilterName: "Data Science",
          jobTitle: "Data Analyst",
          jobId: "2",
          companyName: "Data Inc.",
          companyLink: "https://datainc.com",
          jobLink: "https://datainc.com/jobs/data-analyst",
          workingLocation: "On-site",
          jobOpenDate: "2023-10-02",
          jobCompatibilityPercentage: 80,
        },
        {
          jobFilterId: "3",
          jobFilterName: "DevOps",
          jobTitle: "DevOps Engineer",
          jobId: "3",
          companyName: "Cloud Solutions",
          companyLink: "https://cloudsolutions.com",
          jobLink: "https://cloudsolutions.com/jobs/devops-engineer",
          workingLocation: "Hybrid",
          jobOpenDate: "2023-10-03",
          jobCompatibilityPercentage: 75,
        },
        {
          jobFilterId: "4",
          jobFilterName: "Product Management",
          jobTitle: "Product Manager",
          jobId: "4",
          companyName: "Innovatech",
          companyLink: "https://innovatech.com",
          jobLink: "https://innovatech.com/jobs/product-manager",
          workingLocation: "Remote",
          jobOpenDate: "2023-10-04",
          jobCompatibilityPercentage: 80,
        },
        {
          jobFilterId: "5",
          jobFilterName: "Marketing",
          jobTitle: "Marketing Specialist",
          jobId: "5",
          companyName: "Market Leaders",
          companyLink: "https://marketleaders.com",
          jobLink: "https://marketleaders.com/jobs/marketing-specialist",
          workingLocation: "On-site",
          jobOpenDate: "2023-10-05",
          jobCompatibilityPercentage: 55,
        },
        {
          jobFilterId: "6",
          jobFilterName: "UI/UX Design",
          jobTitle: "UI/UX Designer",
          jobId: "6",
          companyName: "Design Studio",
          companyLink: "https://designstudio.com",
          jobLink: "https://designstudio.com/jobs/ui-ux-designer",
          workingLocation: "Remote",
          jobOpenDate: "2023-10-06",
          jobCompatibilityPercentage: 66,
        },
        {
          jobFilterId: "7",
          jobFilterName: "Cybersecurity",
          jobTitle: "Security Analyst",
          jobId: "7",
          companyName: "SecureTech",
          companyLink: "https://securetech.com",
          jobLink: "https://securetech.com/jobs/security-analyst",
          workingLocation: "Hybrid",
          jobOpenDate: "2023-10-07",
          jobCompatibilityPercentage: 90,
        },
        {
          jobFilterId: "8",
          jobFilterName: "Finance",
          jobTitle: "Financial Analyst",
          jobId: "8",
          companyName: "Finance Hub",
          companyLink: "https://financehub.com",
          jobLink: "https://financehub.com/jobs/financial-analyst",
          workingLocation: "On-site",
          jobOpenDate: "2023-10-08",
          jobCompatibilityPercentage: 50,
        },
        {
          jobFilterId: "9",
          jobFilterName: "Sales",
          jobTitle: "Sales Executive",
          jobId: "9",
          companyName: "Sales Pros",
          companyLink: "https://salespros.com",
          jobLink: "https://salespros.com/jobs/sales-executive",
          workingLocation: "Remote",
          jobOpenDate: "2023-10-09",
          jobCompatibilityPercentage: 100,
        },
        {
          jobFilterId: "10",
          jobFilterName: "Human Resources",
          jobTitle: "HR Manager",
          jobId: "10",
          companyName: "People First",
          companyLink: "https://peoplefirst.com",
          jobLink: "https://peoplefirst.com/jobs/hr-manager",
          workingLocation: "On-site",
          jobOpenDate: "2023-10-10",
          jobCompatibilityPercentage: 78,
        },
      ]
        .filter((job) =>
          job.jobTitle.toLowerCase().includes(keyword?.toLowerCase() || "")
        )
        .filter((job) =>
          filterIdList.length != 0
            ? filterIdList.includes(job.jobFilterId)
            : true
        ),
    }; // Mocked value, replace with actual API call
  }
}
