import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Job } from "../../types";
import { api } from "../../api";

const handleApiError = (error: any) => {
  if (error.response && error.response.data) {
    const apiError = error.response.data;
    if (apiError.errors) {
      return Object.entries(apiError.errors)
        .map(
          ([key, messages]) => `${key}: ${(messages as string[]).join(", ")}`
        )
        .join("; ");
    }
    return apiError.title || "An error occurred";
  }
  return error.message || "An error occurred";
};

export const fetchJobs = createAsyncThunk(
  "jobs/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getJobs();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const createJob = createAsyncThunk(
  "jobs/create",
  async (data: Omit<Job, "id">, { rejectWithValue }) => {
    try {
      const response = await api.createJob(data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const updateJob = createAsyncThunk(
  "jobs/update",
  async (
    { id, data }: { id: number; data: Omit<Job, "id"> },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.updateJob(id, data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const deleteJob = createAsyncThunk(
  "jobs/delete",
  async (id: number, { rejectWithValue }) => {
    try {
      await api.deleteJob(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

interface JobsState {
  items: Job[];
  loading: boolean;
  error: string | null;
}

const initialState: JobsState = {
  items: [],
  loading: false,
  error: null,
};

const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createJob.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateJob.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (job) => job.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.items = state.items.filter((job) => job.id !== action.payload);
      });
  },
});

export const { clearError } = jobsSlice.actions;
export default jobsSlice.reducer;
