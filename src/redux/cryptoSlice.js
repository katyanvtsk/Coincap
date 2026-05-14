import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../server/api";

const initialState = {
  info: null,
  loading: false,
  error: null,
  chart: [], //[{data, price}]
};

export const getAssetsInfo = createAsyncThunk(
  "assets/getInfo",
  async (id, thunkAPI) => {
    try {
      const result = await api.get(`/assets/${id}`);
      console.log(result.data);

      return result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const getHistory = createAsyncThunk(
  "assets/getHistory",
  async ({ id, interval = "d1" }, thunkAPI) => {
    try {
      const result = await api.get(`/assets/${id}/history`, {
        params: { interval },
      });
      console.log(result.data); // []

      return result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const cryptoSlice = createSlice({
  name: "crypto",
  initialState,
  selectors: {
    selectError: (state) => state.error,
    selectLoading: (state) => state.loading,
    selectInfo: (state) => state.info,
    selectChart: (state) => state.chart,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAssetsInfo.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAssetsInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.info = action.payload.data;
      })
      .addCase(getAssetsInfo.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(getHistory.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getHistory.fulfilled, (state, action) => {
        state.loading = false;
        const res = action.payload.data;
        state.chart = res.map((item) => {
          return {
            data: item.date,
            price: item.priceUsd,
          };
        });
      })
      .addCase(getHistory.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { selectInfo, selectLoading, selectError, selectChart } =
  cryptoSlice.selectors;
export default cryptoSlice.reducer;
