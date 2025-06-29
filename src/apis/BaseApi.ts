import axios, { AxiosError } from "axios";
export class BaseApi {
  static readonly baseUrl: string = "http://localhost:5221";

  public static async revokeToken() {
    try {
      const response = await axios.post(
        `${this.baseUrl}/api/account/revoke-token`,
        {
          AccessToken: window.localStorage.getItem("token"),
          RefreshToken: window.localStorage.getItem("refreshToken"),
        }
      );
      console.log("Revoke Content: ", response.data);
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("refreshToken");
      window.localStorage.setItem("token", response.data.token);
      window.localStorage.setItem("refreshToken", response.data.refreshToken);
    } catch {
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("refreshToken");
      window.location.href = "/login";
    }
  }

  public static async post<T>(url: string, data: any): Promise<T> {
    try {
      const response = await axios.post<T>(`${this.baseUrl}${url}`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.status === 401) {
        await this.revokeToken();
        return await this.post<T>(url, data);
      } else {
        throw error;
      }
    }
  }

  public static async get<T>(url: string): Promise<T> {
    try {
      const response = await axios.get<T>(`${this.baseUrl}${url}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (err) {
      const axiosError = err as AxiosError;
      if (axiosError.status === 401) {
        await this.revokeToken();
        return await this.get<T>(url);
      } else {
        throw err;
      }
    }
  }

  public static async put<T>(url: string, data: any): Promise<T> {
    try {
      const response = await axios.put<T>(`${this.baseUrl}${url}`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (err) {
      const axiosError = err as AxiosError;
      if (axiosError.status === 401) {
        await this.revokeToken();
        return await this.put<T>(url, data);
      } else {
        throw err;
      }
    }
  }

  public static async delete<T>(url: string): Promise<T> {
    try {
      const response = await axios.delete<T>(`${this.baseUrl}${url}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.status === 401) {
        await this.revokeToken();
        return await this.delete<T>(url);
      } else {
        throw error;
      }
    }
  }
}
