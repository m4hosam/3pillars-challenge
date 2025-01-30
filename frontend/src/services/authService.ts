import axios from "axios";
import Cookies from "js-cookie";
import { LoginCredentials, RegisterCredentials } from "../types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5270/api";

export const authService = {
  async login(credentials: LoginCredentials): Promise<string> {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);

    const { token } = response.data;
    Cookies.set("token", token); // Store in cookies
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
    Cookies.remove("token"); // Remove token from cookies
  },

  getToken(): string | null {
    return Cookies.get("token") || null; // Retrieve token from cookies
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },
};
