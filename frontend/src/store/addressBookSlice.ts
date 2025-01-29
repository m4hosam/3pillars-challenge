import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { AddressBookEntry, Job, Department } from "../types";

interface AddressBookState {
  entries: AddressBookEntry[];
  jobs: Job[];
  departments: Department[];
  loading: boolean;
  error: string | null;
}

const initialState: AddressBookState = {
  entries: [],
  jobs: [],
  departments: [],
  loading: false,
  error: null,
};

export const fetchAddressBook = createAsyncThunk(
  "addressBook/fetchAll",
  async () => {
    const response = await axios.get("http://localhost:5270/api/addressbook");
    return response.data;
  }
);

export const fetchJobs = createAsyncThunk("addressBook/fetchJobs", async () => {
  const response = await axios.get("http://localhost:5270/api/jobs");
  return response.data;
});

export const fetchDepartments = createAsyncThunk(
  "addressBook/fetchDepartments",
  async () => {
    const response = await axios.get("http://localhost:5270/api/departments");
    return response.data;
  }
);

export const addEntry = createAsyncThunk(
  "addressBook/addEntry",
  async (formData: FormData) => {
    const response = await axios.post(
      "http://localhost:5270/api/addressbook",
      formData
    );
    return response.data;
  }
);

export const updateEntry = createAsyncThunk(
  "addressBook/updateEntry",
  async ({ id, formData }: { id: number; formData: FormData }) => {
    const response = await axios.put(
      `http://localhost:5270/api/addressbook/${id}`,
      formData
    );
    return response.data;
  }
);

export const deleteEntry = createAsyncThunk(
  "addressBook/deleteEntry",
  async (id: number) => {
    await axios.delete(`http://localhost:5270/api/addressbook/${id}`);
    return id;
  }
);

const addressBookSlice = createSlice({
  name: "addressBook",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddressBook.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAddressBook.fulfilled, (state, action) => {
        state.entries = action.payload;
        state.loading = false;
      })
      .addCase(fetchAddressBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch address book";
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.jobs = action.payload;
      })
      .addCase(fetchDepartments.fulfilled, (state, action) => {
        state.departments = action.payload;
      })
      .addCase(addEntry.fulfilled, (state, action) => {
        state.entries.push(action.payload);
      })
      .addCase(updateEntry.fulfilled, (state, action) => {
        const index = state.entries.findIndex(
          (entry) => entry.id === action.payload.id
        );
        if (index !== -1) {
          state.entries[index] = action.payload;
        }
      })
      .addCase(deleteEntry.fulfilled, (state, action) => {
        state.entries = state.entries.filter(
          (entry) => entry.id !== action.payload
        );
      });
  },
});

export default addressBookSlice.reducer;
