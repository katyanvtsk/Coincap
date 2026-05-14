import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../server/api";

const initialState = {
  assets: [],
  loading: false,
  error: null,
  total: 0,
};

export const getAssets = createAsyncThunk(
  "assets/getAssets",
  async (params = { limit: 100, offset: 0 }, thunkAPI) => {
    try {
      const result = await api.get("/assets", { params });
      console.log(result.data);

      return result.data; //[{id, rank: 1, symbol, name, piceUSD, marketCapUsd, vwap24Hr, changePercent24Hr, }]
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const assestSlice = createSlice({
  name: "assets",
  initialState,
  selectors: {
    selectAssets: (state) => state.assets,
    selectLoading: (state) => state.loading,
    selectError: (state) => state.error,
    selectTotal: (state) => state.total,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAssets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAssets.fulfilled, (state, action) => {
        state.loading = false;
        state.assets = action.payload.data;
        state.total = action.payload.data.length;
      })
      .addCase(getAssets.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { selectAssets, selectLoading, selectError, selectTotal } =
  assestSlice.selectors;
export default assestSlice.reducer;
