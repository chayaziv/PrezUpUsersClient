import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../axiosInstance";
import { TagType } from "../types/tag";

export const fetchTags = createAsyncThunk(
  "tags/fetch",
  async (_, thunkAPI) => {
    try {
      const response = await API.get("/tags");
      return (response.data?.data as TagType[]) ?? ([] as TagType[]);
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

const tagsSlice = createSlice({
  name: "tags",
  initialState: { list: [] as TagType[], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTags.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchTags.rejected, (state) => {
        state.loading = false;
        alert("Failed to load tags");
      });
  },
});

export default tagsSlice;
