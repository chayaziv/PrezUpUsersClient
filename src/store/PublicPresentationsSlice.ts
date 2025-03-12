import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { PresentationType } from "../types/presentation";

export const fetchPublicPresentations = createAsyncThunk(
  "publicPresentations/fetch",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        "http://localhost:5015/api/presentation/public"
      );
      return response.data as PresentationType[];
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
