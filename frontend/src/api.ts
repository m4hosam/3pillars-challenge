import axios from "axios";
import { AddressBookEntry, AddressBookData, Job, Department } from "./types";

const BASE_URL = "http://localhost:5270/api";

export const api = {
  getAddressBook: () => axios.get<AddressBookData[]>(`${BASE_URL}/addressbook`),
  getJobs: () => axios.get<Job[]>(`${BASE_URL}/jobs`),
  getDepartments: () => axios.get<Department[]>(`${BASE_URL}/departments`),
  deleteEntry: (id: number) => axios.delete(`${BASE_URL}/addressbook/${id}`),
  updateEntry: (id: number, data: FormData) => {
    console.log(data);
    axios.put(`${BASE_URL}/addressbook/${id}`, data);
  },
  createEntry: (data: FormData) => axios.post(`${BASE_URL}/addressbook`, data),
};
