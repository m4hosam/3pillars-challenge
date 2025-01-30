import axios from "axios";
import { Department, Job } from "./types";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5270/api";

export const api = {
  // Address Book
  getAddressBook: () => axios.get(`${API_BASE_URL}/addressbook`),

  createAddressBookEntry: (data: FormData) =>
    axios.post(`${API_BASE_URL}/addressbook`, data),

  updateAddressBookEntry: (id: number, data: FormData) =>
    axios.put(`${API_BASE_URL}/addressbook/${id}`, data),

  deleteAddressBookEntry: (id: number) =>
    axios.delete(`${API_BASE_URL}/addressbook/${id}`),

  searchAddressBook: (params: {
    searchTerm?: string;
    startDate?: string;
    endDate?: string;
  }) => axios.get(`${API_BASE_URL}/addressbook/search`, { params }),

  // Jobs
  getJobs: () => axios.get(`${API_BASE_URL}/jobs`),

  createJob: (data: Omit<Job, "id">) =>
    axios.post(`${API_BASE_URL}/jobs`, data),

  updateJob: (id: number, data: Omit<Job, "id">) =>
    axios.put(`${API_BASE_URL}/jobs/${id}`, data),

  deleteJob: (id: number) => axios.delete(`${API_BASE_URL}/jobs/${id}`),

  // Departments
  getDepartments: () => axios.get(`${API_BASE_URL}/departments`),

  createDepartment: (data: Omit<Department, "id">) =>
    axios.post(`${API_BASE_URL}/departments`, data),

  updateDepartment: (id: number, data: Omit<Department, "id">) =>
    axios.put(`${API_BASE_URL}/departments/${id}`, data),

  deleteDepartment: (id: number) =>
    axios.delete(`${API_BASE_URL}/departments/${id}`),
};
