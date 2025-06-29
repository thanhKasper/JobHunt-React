import { BaseApi } from "./BaseApi";
import type { ProfileDTO } from "./DTO/ProfileDTO";

export class ProfileApi extends BaseApi {
  public static async getSimpleProfile(): Promise<{
    userId: string;
    fullName: string;
    email: string;
  } | null> {
    try {
      const data: any = await this.get("/api/profile/simple-profile");
      return {
        userId: data.UserId,
        fullName: data.FullName,
        email: data.Email,
      };
    } catch {
      return null;
    }
  }

  public static async getProfile(): Promise<ProfileDTO> {
    // More realistic mock ProfileDTO object
    return {
      userId: "user-20240612-abc123",
      fullName: "Nguyen Thanh Kieu",
      workingEmail: "thanh.kieu.nguyen@gmail.com",
      phone: "+84 912 345 678",
      address:
        "12 Nguyen Hue, Ben Nghe Ward, District 1, Ho Chi Minh City, Vietnam",
      dateOfBirth: "1992-08-15",
      aboutMe:
        "A passionate software engineer with a love for coding and problem-solving. I enjoy working on challenging projects and continuously learning new technologies.",
      university: "University of Science, Vietnam National University HCM",
      major: "computerScience",
      degree: "bachelorDegree",
      awards: [
        "Best Student Award 2014",
        "Outstanding Project Award 2015",
        "Hackathon Winner 2016",
      ],
    } as ProfileDTO;
  }

  public static async updateProfile(profile: ProfileDTO): Promise<ProfileDTO> {
    // Simulate a successful update
    console.log("Profile updated successfully:", profile);
    return profile;
  }
}
