import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

export const createUser = createAsyncThunk(
  "api/createUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/users`, userData);
      console.log("response", response);
      localStorage.setItem("userID", response.data.userID);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addBeneficiary = createAsyncThunk(
  "api/addBeneficiary",
  async (beneficiaryData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/beneficiaries`,
        beneficiaryData
      );
      console.log("response", response);
      return response.data;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchBeneficiaries = createAsyncThunk(
  "api/fetchBeneficiaries",
  async (userID, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/beneficiaries/${userID}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteBeneficiary = createAsyncThunk(
  "api/deleteBeneficiary",
  async (beneficiaryID, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/beneficiaries/${beneficiaryID}`);
      return beneficiaryID;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateBeneficiary = createAsyncThunk(
  "api/updateBeneficiary",
  async (beneficiaryData, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/beneficiaries/${beneficiaryData.beneficiaryID}`,
        beneficiaryData.updatedData
      );
      return response.data.result;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Slice definition
const apiSlice = createSlice({
  name: "api",
  initialState: {
    userID: null,
    beneficiaries: { result: [] },
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUser.fulfilled, (state, action) => {
        // console.log("action", action);
        state.userID = action.payload.userID;
      })
      .addCase(addBeneficiary.fulfilled, (state, action) => {
        if (state.beneficiaries.result) {
          state.beneficiaries.result.push(action.payload);
        } else {
          state.beneficiaries.result = [action.payload];
        }
      })
      .addCase(fetchBeneficiaries.fulfilled, (state, action) => {
        state.beneficiaries = action.payload;
      })
      .addCase(deleteBeneficiary.fulfilled, (state, action) => {
        if (state.beneficiaries?.result) {
          state.beneficiaries.result = state.beneficiaries.result.filter(
            (beneficiary) => beneficiary._id !== action.payload
          );
        }
      })
      .addCase(updateBeneficiary.fulfilled, (state, action) => {
        const updatedBeneficiary = action.payload;
        if (Array.isArray(state.beneficiaries.result)) {
          const index = state.beneficiaries.result.findIndex(b => b._id === updatedBeneficiary._id);
          if (index !== -1) {
            state.beneficiaries.result[index] = updatedBeneficiary; 
          }
        } else {
          console.error("State beneficiaries.result is not an array:", state.beneficiaries.result);
        }
      }); 
  },
});

export default apiSlice.reducer;
