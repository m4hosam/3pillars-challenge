import axios from "axios";
import { LoginCredentials, RegisterCredentials } from "../types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5270/api";

export const authService = {
  async login(credentials: LoginCredentials): Promise<string> {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    const { token } = response.data;
    localStorage.setItem("token", token);
    return token;
  },
  async register(
    credentials: RegisterCredentials
  ): Promise<{ success: boolean; message: string }> {
    try {
      const response = await axios.post(
        `${API_URL}/auth/register`,
        credentials
      );
      return { success: true, message: response.data.message };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Registration failed",
      };
    }
  },
  logout() {
    localStorage.removeItem("token");
  },

  getToken(): string | null {
    return localStorage.getItem("token");
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },
};
