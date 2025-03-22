import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../axiosInstance";
import { PresentationType } from "../types/presentation";

export const fetchMyPresentations = createAsyncThunk(
  "myPresentations/fetch",
  async (_, thunkAPI) => {
    try {
      const response = await API.get("/users/my-presentations");
      return (
        (response.data?.data as PresentationType[]) ??
        ([] as PresentationType[])
      );
    } catch (e: any) {
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
      return response.data?.data as PresentationType;
    } catch (e: any) {
      console.log(e);
      return thunkAPI.rejectWithValue(e.response.data);
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
  initialState: { list: [] as PresentationType[], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyPresentations.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMyPresentations.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchMyPresentations.rejected, (state) => {
        state.loading = false;
        alert("Failed to load user presentations");
      })
      .addCase(deletePresentation.fulfilled, (state, action) => {
        state.list = state.list.filter((p) => p.id !== action.payload);
      })
      .addCase(deletePresentation.rejected, () => {
        alert("Failed to delete presentation");
      })
      .addCase(addPresentation.pending, (state) => {
        state.loading = true;
      })
      .addCase(addPresentation.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
      })
      .addCase(addPresentation.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default myPresentationsSlice;
