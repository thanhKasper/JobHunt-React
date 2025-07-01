import { BaseApi } from "./BaseApi";
import type ProjectDTO from "./DTO/ProjectDTO";

export class ProjectApi {
  public static async getProjects(): Promise<ProjectDTO[]> {
    return [
      {
        projectId: "1",
        projectName: "Project Alpha",
        projectDescription: "A groundbreaking project in AI.",
        roles: ["Developer", "Designer"],
        startDate: "2023-01-01",
        endDate: "2023-12-31",
        techOrSkills: ["AI", "Machine Learning"],
        projectLink: "https://example.com/project-alpha",
        features: ["Feature A", "Feature B"],
        liveDemoLink: "https://example.com/demo-alpha",
      },
      {
        projectId: "2",
        projectName: "Project Beta",
        projectDescription: "An innovative web application.",
        roles: ["Frontend Developer", "Backend Developer"],
        startDate: "2023-02-01",
        endDate: "2023-11-30",
        techOrSkills: ["React", "Node.js"],
        projectLink: "https://example.com/project-beta",
        features: ["Feature X", "Feature Y"],
        liveDemoLink: "https://example.com/demo-beta",
      },
      {
        projectId: "3",
        projectName: "Project Gamma",
        projectDescription: "A mobile app for productivity.",
        roles: ["Mobile Developer", "UI/UX Designer"],
        startDate: "2023-03-01",
        endDate: "2023-10-31",
        techOrSkills: ["Flutter", "Firebase"],
        projectLink: "https://example.com/project-gamma",
        features: ["Feature 1", "Feature 2"],
        liveDemoLink: "https://example.com/demo-gamma",
      },
    ];
  }

  public static async updateProject(project: ProjectDTO): Promise<ProjectDTO> {
    // Simulate API call to update project
    // Replace with actual API call logic
    console.log("Updating project:", project);
    return project; // Mocked response, replace with actual API response
  }

  public static async createProject(project: ProjectDTO): Promise<ProjectDTO> {
    console.log("Creating new project:", project);
    return project;
    // Simulate API call to create a new project
    // Replace with actual API call logic
  }

  public static async getGeneralInfo(): Promise<{
    totalProjects: number,
    totalCompleteProjects: number,
    totalRoles: number,
    totalUsedTools: number,
    mostUsedTech: string[]
  }> {
    try {
      const res = await BaseApi.get("/project/general-info")
      console.log(res)
      return res as any;
    }
    catch (err) {
      throw err;
    }
  }
}
