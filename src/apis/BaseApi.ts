import axios, { AxiosError } from "axios";
export class BaseApi {
  static readonly baseUrl: string = "http://localhost:5221/api";

  public static async revokeToken() {
    try {
      const response = await axios.post(
        `${this.baseUrl}/account/revoke-token`,
        {
          AccessToken: window.localStorage.getItem("token"),
          RefreshToken: window.localStorage.getItem("refreshToken"),
        }
      );
      window.localStorage.setItem("token", response.data.token);
      window.localStorage.setItem("refreshToken", response.data.refreshToken);
    } catch (err) {
      throw err;
    }
  }

  public static async post<T>(
    url: string,
    data: any,
    hasRetried: boolean = false
  ): Promise<T> {
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
      if (axiosError.status === 401 && !hasRetried) {
        try {
          await this.revokeToken();
          return await this.post<T>(url, data, true);
        } catch (revokeError) {
          throw revokeError as AxiosError;
        }
      } else {
        throw axiosError;
      }
    }
  }

  public static async get<T>(
    url: string,
    hasRetried: boolean = false
  ): Promise<T> {
    try {
      const response = await axios.get<T>(`${this.baseUrl}${url}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.status === 401 && !hasRetried) {
        try {
          await this.revokeToken();
          return await this.get<T>(url, true);
        } catch (revokeError) {
          throw revokeError as AxiosError;
        }
      } else {
        throw axiosError;
      }
    }
  }

  public static async put<T>(
    url: string,
    data: any,
    hasRetried: boolean = false
  ): Promise<T> {
    try {
      const response = await axios.put<T>(`${this.baseUrl}${url}`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.status === 401 && !hasRetried) {
        try {
          await this.revokeToken();
          return await this.put<T>(url, data, true);
        } catch (revokeError) {
          throw revokeError as AxiosError;
        }
      } else {
        throw axiosError;
      }
    }
  }

  public static async delete<T>(
    url: string,
    hasRetried: boolean = false
  ): Promise<T> {
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
      if (axiosError.status === 401 && !hasRetried) {
        try {
          await this.revokeToken();
          return await this.delete<T>(url, true);
        } catch (revokeError) {
          throw revokeError as AxiosError;
        }
      } else {
        throw axiosError;
      }
    }
  }
}
