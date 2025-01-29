import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AddressBookEntry } from "../../types";
import { api } from "../../api";

// Helper function to extract API errors
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

export const fetchAddressBook = createAsyncThunk(
  "addressBook/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getAddressBook();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const createEntry = createAsyncThunk(
  "addressBook/create",
  async (data: FormData, { rejectWithValue }) => {
    try {
      const response = await api.createAddressBookEntry(data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const updateEntry = createAsyncThunk(
  "addressBook/update",
  async ({ id, data }: { id: number; data: FormData }, { rejectWithValue }) => {
    try {
      const response = await api.updateAddressBookEntry(id, data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const deleteEntry = createAsyncThunk(
  "addressBook/delete",
  async (id: number, { rejectWithValue }) => {
    try {
      await api.deleteAddressBookEntry(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

interface AddressBookState {
  entries: AddressBookEntry[];
  loading: boolean;
  error: string | null;
}

const initialState: AddressBookState = {
  entries: [],
  loading: false,
  error: null,
};

const addressBookSlice = createSlice({
  name: "addressBook",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchAddressBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAddressBook.fulfilled, (state, action) => {
        state.entries = action.payload;
        state.loading = false;
      })
      .addCase(fetchAddressBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Create
      .addCase(createEntry.fulfilled, (state, action) => {
        state.entries.push(action.payload);
      })
      .addCase(createEntry.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      // Update
      .addCase(updateEntry.fulfilled, (state, action) => {
        const index = state.entries.findIndex(
          (entry) => entry.id === action.payload.id
        );
        if (index !== -1) {
          state.entries[index] = action.payload;
        }
      })
      .addCase(updateEntry.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      // Delete
      .addCase(deleteEntry.fulfilled, (state, action) => {
        state.entries = state.entries.filter(
          (entry) => entry.id !== action.payload
        );
      })
      .addCase(deleteEntry.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = addressBookSlice.actions;
export default addressBookSlice.reducer;
