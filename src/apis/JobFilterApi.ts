import { BaseApi } from "./BaseApi";
import type JobFilterCreationDTO from "./DTO/JobFilterCreationDTO";
import type JobFilterDTO from "./DTO/JobFilterDTO";

export default class JobFilterApi {
  public static async deleteJobFilter(jobFilterId: string): Promise<string> {
    try {
      await BaseApi.delete(`/jobfilter/${jobFilterId}`);
      return jobFilterId;
    } catch (error) {
      throw error;
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
      const res = (await BaseApi.get(`/jobfilter/${jobFilterId}`)) as any;
      console.log(res);
      return {
        level: res.level ?? "",
        yearsOfExperience: res.yearsOfExperience ?? 0,
        technicalKnowledge: res.technicalKnowledge ?? [],
        tools: res.tools ?? [],
        softSkills: res.softSkills ?? [],
        languages: res.languages ?? [],
        location: res.workingLocation ?? "",
        jobFilterId: res.id,
        title: res.title ?? "",
        occupation: res.occupation ?? "",
        isStarred: res.isStarred,
        isActive: res.isActive,
        averageCompatibility: res.averageCompatibility, // need to update later on the backend side
        totalJobs: res.totalJobs,
      };
    } catch (error) {
      throw error;
    }
  }

  public static async toggleJobFilterStar(
    jobFilterId: string
  ): Promise<boolean> {
    try {
      return await BaseApi.put(`/jobfilter/star/${jobFilterId}`, null);
    } catch (error) {
      throw error;
    }
  }

  public static async toggleJobFilterActiveState(
    jobFilterId: string
  ): Promise<boolean> {
    try {
      return await BaseApi.put(`/jobfilter/active/${jobFilterId}`, null);
    } catch (error) {
      throw error;
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
