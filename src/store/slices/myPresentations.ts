import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import API from "../../axiosInstance";
import { PresentationType } from "@/types/presentation";

export const fetchMyPresentations = createAsyncThunk(
  "myPresentations/fetch",
  async (_, thunkAPI) => {
    try {
      const response = await API.get("/users/my-presentations");
      console.log("API Response:", response.data);
      if (!response.data?.data) {
        console.warn("No data received from API");
        return [] as PresentationType[];
      }
      return response.data.data as PresentationType[];
    } catch (e: any) {
      console.error("Error fetching presentations:", e);
      if (e.response) {
        return thunkAPI.rejectWithValue(e.response.data);
      }
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const deletePresentation = createAsyncThunk(
  "myPresentations/delete",
  async (presentationId: number, thunkAPI) => {
    try {
      await API.delete(`/presentation/${presentationId}`);
      return presentationId;
    } catch (e: any) {
      console.error("Error deleting presentation:", e);
      if (e.response) {
        return thunkAPI.rejectWithValue(e.response.data);
      }
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const addPresentation = createAsyncThunk(
  "myPresentations/add",
  async (formData: FormData, thunkAPI) => {
    try {
      const response = await API.post("/presentation/analyze-audio", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (!response.data?.data) {
        console.warn("No data received from API");
        return thunkAPI.rejectWithValue("No data received from server");
      }
      return response.data.data as PresentationType;
    } catch (e: any) {
      console.error("Error adding presentation:", e);
      if (e.response) {
        return thunkAPI.rejectWithValue(e.response.data);
      }
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

// await API.post("presentation/analyze-audio", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//         onUploadProgress: (progressEvent) => {
//           if (progressEvent.total) {
//             const percentCompleted = Math.round(
//               (progressEvent.loaded * 100) / progressEvent.total
//             );
//             setUploadProgress(percentCompleted);
//           }
//         },
//       });

const myPresentationsSlice = createSlice({
  name: "myPresentations",
  initialState: {
    list: [] as PresentationType[],
    loading: false,
    error: null as string | null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyPresentations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyPresentations.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchMyPresentations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        console.error("Failed to load presentations:", action.payload);
      })
      .addCase(deletePresentation.fulfilled, (state, action) => {
        state.list = state.list.filter((p) => p.id !== action.payload);
      })
      .addCase(deletePresentation.rejected, (state, action) => {
        state.error = action.payload as string;
        console.error("Failed to delete presentation:", action.payload);
      })
      .addCase(addPresentation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addPresentation.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
      })
      .addCase(addPresentation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        console.error("Failed to add presentation:", action.payload);
      });
  },
});

export const { clearError } = myPresentationsSlice.actions;
export default myPresentationsSlice;
