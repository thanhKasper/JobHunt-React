import type ProjectDTO from "./DTO/ProjectDTO";

export class ProjectApi {

    public static async getProjects(): Promise<ProjectDTO[]> {
        return [
            {
                projectId: "1",
                projectName: "Project Alpha",
                projectDescription: "A groundbreaking project in AI.",
                projectOwner: "Alice Smith",
                roles: ["Developer", "Designer"],
                startDate: "2023-01-01",
                endDate: "2023-12-31",
                techOrSkills: ["AI", "Machine Learning"],
                projectLink: "https://example.com/project-alpha",
                features: ["Feature A", "Feature B"],
                liveDemoLink: "https://example.com/demo-alpha"
            },
            {
                projectId: "2",
                projectName: "Project Beta",
                projectDescription: "An innovative web application.",
                projectOwner: "Bob Johnson",
                roles: ["Frontend Developer", "Backend Developer"],
                startDate: "2023-02-01",
                endDate: "2023-11-30",
                techOrSkills: ["React", "Node.js"],
                projectLink: "https://example.com/project-beta",
                features: ["Feature X", "Feature Y"],
                liveDemoLink: "https://example.com/demo-beta"
            },
            {
                projectId: "3",
                projectName: "Project Gamma",
                projectDescription: "A mobile app for productivity.",
                projectOwner: "Charlie Brown",
                roles: ["Mobile Developer", "UI/UX Designer"],
                startDate: "2023-03-01",
                endDate: "2023-10-31",
                techOrSkills: ["Flutter", "Firebase"],
                projectLink: "https://example.com/project-gamma",
                features: ["Feature 1", "Feature 2"],
                liveDemoLink: "https://example.com/demo-gamma"
            }
        ]
    }

    public static async getTotalProjects(): Promise<number> {
        // Simulate API call to get total projects
        // Replace with actual API call logic
        return 3; // Mocked value, replace with actual API call
    }

    public static async getCompletedProjects(): Promise<number> {
        // Simulate API call to get completed projects
        // Replace with actual API call logic
        return 2; // Mocked value, replace with actual API call
    }

    public static async getMainTechnologies(): Promise<string[]> {
        // Simulate API call to get main technologies
        // Replace with actual API call logic
        return ["AI", "Machine Learning", "React", "Node.js", "Flutter"];
    }

    public static async getToolsCount(): Promise<number> {
        // Simulate API call to get tools count
        // Replace with actual API call logic
        return 5; // Mocked value, replace with actual API call
    }

    public static async getRolesCount(): Promise<number> {
        // Simulate API call to get roles count
        // Replace with actual API call logic
        return 3; // Mocked value, replace with actual API call
    }

}
