import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../axiosInstance";  
import { PresentationType } from "../types/presentation";

export const fetchMyPresentations = createAsyncThunk(
  "myPresentations/fetch",
  async (_, thunkAPI) => {
    try {
      const response = await API.get("/users/my-presentations"); 
      return response.data as PresentationType[];
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
      });
  },
});

export default myPresentationsSlice;
