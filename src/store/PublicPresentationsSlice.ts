import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PresentationType } from "../types/presentation2";
import API from "../axiosInstance";

export const fetchPublicPresentations = createAsyncThunk(
  "publicPresentations/fetch",
  async (_, thunkAPI) => {
    try {
      const response = await API.get("/presentation/public");
      return response.data.data as PresentationType[]; // גישה לשדה "data"
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

const publicPresentationsSlice = createSlice({
  name: "publicPresentations",
  initialState: { list: [] as PresentationType[], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPublicPresentations.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPublicPresentations.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchPublicPresentations.rejected, (state) => {
        state.loading = false;
        alert("Failed to load public presentations");
      });
  },
});

export default publicPresentationsSlice;
