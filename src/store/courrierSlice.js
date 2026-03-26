import { createSlice } from "@reduxjs/toolkit";

const courrierSlice = createSlice({
  name: "courriers",
  initialState: {
    courriers: [],
    loading: false,
  },
  reducers: {
    setCourriers: (state, action) => {
      state.courriers = action.payload;
    },
    addCourrier: (state, action) => {
      state.courriers.push(action.payload);
    },
    deleteCourrier: (state, action) => {
      state.courriers = state.courriers.filter((e) => e.id !== action.payload);
    },
    updateCourrier: (state, action) => {
      const i = state.courriers.findIndex((e) => e.id === action.payload.id);
      if (i !== -1) state.courriers[i] = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setCourriers, addCourrier, deleteCourrier, updateCourrier, setLoading,} = courrierSlice.actions;
export default courrierSlice.reducer;
