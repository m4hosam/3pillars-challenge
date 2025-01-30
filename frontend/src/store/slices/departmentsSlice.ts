import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Department } from "../../types";
import { api } from "../../services/api";

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

export const fetchDepartments = createAsyncThunk(
  "departments/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getDepartments();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const createDepartment = createAsyncThunk(
  "departments/create",
  async (data: Omit<Department, "id">, { rejectWithValue }) => {
    try {
      const response = await api.createDepartment(data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const updateDepartment = createAsyncThunk(
  "departments/update",
  async (
    { id, data }: { id: number; data: Omit<Department, "id"> },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.updateDepartment(id, data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const deleteDepartment = createAsyncThunk(
  "departments/delete",
  async (id: number, { rejectWithValue }) => {
    try {
      await api.deleteDepartment(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

interface DepartmentsState {
  items: Department[];
  loading: boolean;
  error: string | null;
}

const initialState: DepartmentsState = {
  items: [],
  loading: false,
  error: null,
};

const departmentsSlice = createSlice({
  name: "departments",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDepartments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDepartments.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchDepartments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createDepartment.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateDepartment.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (dept) => dept.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteDepartment.fulfilled, (state, action) => {
        state.items = state.items.filter((dept) => dept.id !== action.payload);
      });
  },
});

export const { clearError } = departmentsSlice.actions;
export default departmentsSlice.reducer;
