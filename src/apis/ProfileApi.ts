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
    try {
      const profile = (await BaseApi.get("profile")) as any;
      return {
        ...profile,
        degree: profile.education || "none",
        phone: profile.phoneNumber,
        awards: profile.awards || [],
      };
    } catch (err) {
      throw err;
    }
  }

  public static async updateProfile(profile: ProfileDTO): Promise<ProfileDTO> {
    try {
      await BaseApi.put("profile", {
        ...profile,
        education: profile.degree,
        phoneNumber: profile.phone,
      });
      return profile;
    } catch (err) {
      throw err;
    }
  }
}
