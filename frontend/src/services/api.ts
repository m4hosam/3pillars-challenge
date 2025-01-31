import axios from "axios";
import { Department, Job } from "../types";
import Cookies from "js-cookie";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5270/api";

// Create an axios instance with default config
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

// Add request interceptor to add token to all requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle unauthorized responses
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token and redirect to login
      Cookies.get("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const api = {
  // Address Book
  getAddressBook: () => axiosInstance.get("/addressbook"),

  createAddressBookEntry: (data: FormData) =>
    axiosInstance.post("/addressbook", data),

  updateAddressBookEntry: (id: number, data: FormData) =>
    axiosInstance.put(`/addressbook/${id}`, data),

  deleteAddressBookEntry: (id: number) =>
    axiosInstance.delete(`/addressbook/${id}`),

  searchAddressBook: (params: {
    searchTerm?: string;
    startDate?: string;
    endDate?: string;
  }) => axiosInstance.get("/addressbook/search", { params }),

  // Jobs
  getJobs: () => axiosInstance.get("/jobs"),

  createJob: (data: Omit<Job, "id">) => axiosInstance.post("/jobs", data),

  updateJob: (id: number, data: Omit<Job, "id">) =>
    axiosInstance.put(`/jobs/${id}`, data),

  deleteJob: (id: number) => axiosInstance.delete(`/jobs/${id}`),

  // Departments
  getDepartments: () => axiosInstance.get("/departments"),

  createDepartment: (data: Omit<Department, "id">) =>
    axiosInstance.post("/departments", data),

  updateDepartment: (id: number, data: Omit<Department, "id">) =>
    axiosInstance.put(`/departments/${id}`, data),

  deleteDepartment: (id: number) => axiosInstance.delete(`/departments/${id}`),

  // Auth
  login: (credentials: { email: string; password: string }) =>
    axiosInstance.post("/auth/login", credentials),

  register: (data: { username: string; email: string; password: string }) =>
    axiosInstance.post("/auth/register", data),
};

export default api;
