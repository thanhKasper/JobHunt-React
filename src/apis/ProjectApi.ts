import { BaseApi } from "./BaseApi";
import type ProjectDTO from "./DTO/ProjectDTO";

export class ProjectApi {
  public static async getProjects(): Promise<ProjectDTO[]> {
    try {
      const projectList = (await BaseApi.get("project")) as Array<any>;
      return projectList.map(
        (ele: any) =>
          ({
            ...ele,
            projectName: ele.projectTitle,
            techOrSkills: ele.technologiesOrSkills,
            projectDescription: ele.description,
            liveDemoLink: ele.demoLink,
          } as ProjectDTO)
      );
    } catch (err) {
      throw err;
    }
  }

  public static async getProject(id: string): Promise<ProjectDTO> {
    try {
      const project = (await BaseApi.get("project/" + id)) as any;
      return {
        ...project,
        projectName: project.projectTitle,
        techOrSkills: project.technologiesOrSkills,
        projectDescription: project.description,
        liveDemoLink: project.demoLink,
      } as ProjectDTO;
    } catch (err) {
      throw err;
    }
  }

  public static async updateProject(project: ProjectDTO): Promise<ProjectDTO> {
    try {
      const updatedProject = (await BaseApi.put(
        "project/" + project.projectId,
        {
          ...project,
          projectTitle: project.projectName,
          description: project.projectDescription,
          technologiesOrSkills: project.techOrSkills,
          demoLink: project.liveDemoLink,
        }
      )) as any;
      return {
        ...updatedProject,
        projectName: updatedProject.projectName,
        techOrSkills: updatedProject.techOrSkills,
        projectDescription: updatedProject.projectDescription,
        liveDemoLink: updatedProject.liveDemoLink,
      } as ProjectDTO;
    } catch (err) {
      throw err;
    }
  }

  public static async createProject(project: ProjectDTO): Promise<ProjectDTO> {
    try {
      const sendingBody = {
        ...project,
        projectTitle: project.projectName,
        description: project.projectDescription,
        technologiesOrSkills: project.techOrSkills,
      };
      await BaseApi.post("project", sendingBody);
      return project;
    } catch (err) {
      throw err;
    }
  }

  public static async getGeneralInfo(): Promise<{
    totalProjects: number;
    totalCompleteProjects: number;
    totalRoles: number;
    totalUsedTools: number;
    mostUsedTech: string[];
  }> {
    try {
      const res = await BaseApi.get("/project/general-info");
      return res as any;
    } catch (err) {
      throw err;
    }
  }

  public static async deleteProject(id: string) {
    try {
      const res = await BaseApi.delete("project/" + id);
      return res;
    } catch (err) {
      throw err;
    }
  }
}
