import type { AxiosError } from "axios";
import { BaseApi } from "./BaseApi";
import type SigninDTO from "./DTO/SigninDTO";
import type SignupDTO from "./DTO/SignupDTO";

interface AuthenticationResponse {
  token: string;
  refreshToken: string;
  fullname: string;
  email: string;
  userId: string;
}

export class AuthenAPI extends BaseApi {
  static async signup(signupData: SignupDTO): Promise<AuthenticationResponse> {
    try {
      const response = await this.post<AuthenticationResponse>(
        "/account/register",
        signupData
      );
      window.localStorage.setItem("token", response.token);
      window.localStorage.setItem("refreshToken", response.refreshToken);
      return response;
    } catch (err) {
      const axiosError = err as AxiosError;
      throw {
        title: (axiosError.response?.data as any).title as string,
        description: (axiosError.response?.data as any).detail as string,
      };
    }
  }

  static async signin(signinData: SigninDTO): Promise<AuthenticationResponse> {
    try {
      const response = await this.post<AuthenticationResponse>(
        "/account/login",
        signinData
      );
      window.localStorage.setItem("token", response.token);
      window.localStorage.setItem("refreshToken", response.refreshToken);
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
