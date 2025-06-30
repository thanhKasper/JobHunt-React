import { BaseApi } from "./BaseApi";
import type JobFilterCreationDTO from "./DTO/JobFilterCreationDTO";
import type JobFilterDTO from "./DTO/JobFilterDTO";

export default class JobFilterApi {
  public static async deleteJobFilter(jobFilterId: string): Promise<string> {
    try {
      console.log(`Deleting job filter with ID: ${jobFilterId}`);
      return jobFilterId;
    } catch (error) {
      throw new Error("Failed to delete job filter"); // Handle error appropriately
    }
  }

  public static async createJobFilter(
    jobFilter: JobFilterCreationDTO
  ): Promise<boolean> {
    const matchingBodyRequest = {
      filterTitle: jobFilter.jobFilterName,
      isActive: true,
      isStarred: false,
      occupation: jobFilter.filterOccupation,
      level: jobFilter.jobLevel,
      yearsOfExperience: jobFilter.expectedExp,
      technicalKnowledge: jobFilter.technicalKnowledge,
      tools: jobFilter.tools,
      softSkills: jobFilter.softSkills,
      languages: jobFilter.languages,
      workingLocation: jobFilter.desireWorkingLocation,
    };
    try {
      await BaseApi.post("/jobfilter", matchingBodyRequest);
      return true;
    } catch (error) {
      console.log("Catching error while creating new job filter");
      throw error;
    }
  }

  public static async getJobFilter(jobFilterId: string): Promise<JobFilterDTO> {
    try {
      // Simulate API call to get job filter by ID
      // Replace with actual API call logic
      console.log(`Fetching job filter with ID: ${jobFilterId}`);
      return {
        jobFilterId,
        jobFilterName: "Sample Job Filter",
        isActive: true,
        isStarred: false,
        filterOccupation: "Engineering",
        averageCompatibility: 85,
        desireWorkingLocation: "Remote",
        jobLevel: "Mid-level",
        exp: 3,
        technicalKnowledge: ["JavaScript", "React"],
        softSkills: ["Communication", "Teamwork"],
        tools: ["Git", "Docker"],
        languages: ["English"],
        totalJobs: 50,
      }; // Mocked value, replace with actual API call
    } catch (error) {
      throw new Error("Failed to fetch job filter"); // Handle error appropriately
    }
  }

  public static async toggleJobFilterStar(
    jobFilterId: string
  ): Promise<boolean> {
    try {
      return await BaseApi.put(`/jobfilter/star/${jobFilterId}`, null);
    } catch (error) {
      throw new Error("Failed to toggle job filter star state"); // Handle error appropriately
    }
  }

  public static async toggleJobFilterActiveState(
    jobFilterId: string
  ): Promise<boolean> {
    try {
      return await BaseApi.put(`/jobfilter/active/${jobFilterId}`, null);
    } catch (error) {
      throw new Error("Failed to toggle job filter active state"); // Handle error appropriately
    }
  }

  public static async getJobFilters(): Promise<{
    totalJobFilters: number;
    activeJobFilters: number;
    jobFilters: JobFilterDTO[];
  }> {
    try {
      const result: any = await BaseApi.get("/jobfilter");
      return {
        totalJobFilters: result.totalJobs,
        activeJobFilters: result.totalActiveJobs,
        jobFilters: result.jobFilters.map((jf: any) => ({
          jobFilterId: jf.id,
          ...jf,
        })),
      };
    } catch (err) {
      throw err;
    }
  }
}
