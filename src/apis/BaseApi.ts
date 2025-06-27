import axios from "axios";

export class BaseApi {
  static readonly baseUrl: string = "http://localhost:5221";

  protected static async post<T>(url: string, data: any): Promise<T> {
    const response = await axios.post<T>(`${this.baseUrl}${url}`, data);
    return response.data;
  }

  protected static async get<T>(url: string): Promise<T> {
    const response = await axios.get<T>(`${this.baseUrl}${url}`);
    return response.data;
  }

  protected static async put<T>(url: string, data: any): Promise<T> {
    const response = await axios.put<T>(`${this.baseUrl}${url}`, data);
    return response.data;
  }

  protected static async delete<T>(url: string): Promise<T> {
    const response = await axios.delete<T>(`${this.baseUrl}${url}`);
    return response.data;
  }
}
