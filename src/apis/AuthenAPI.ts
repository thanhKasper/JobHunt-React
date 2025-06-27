import type { AxiosError } from "axios";
import { BaseApi } from "./BaseApi";
import type SigninDTO from "./DTO/SigninDTO";
import type SignupDTO from "./DTO/SignupDTO";

export class AuthenAPI extends BaseApi {
  static async signup(signupData: SignupDTO): Promise<any> {
    try {
      const response = await this.post<any>(
        "/api/account/register",
        signupData
      );
      return response;
    } catch (err) {
      const axiosError = err as AxiosError;
      throw {
        title: (axiosError.response?.data as any).title as string,
        description: (axiosError.response?.data as any).detail as string,
      };
    }
  }

  static async signin(signinData: SigninDTO): Promise<any> {
    try {
      const response = await this.post<any>("/api/account/login", signinData);
      return response;
    } catch (err) {
      const axiosError = err as AxiosError;
      throw {
        title: (axiosError.response?.data as any).title as string,
        description: (axiosError.response?.data as any).detail as string,
      };
    }
  }
}
