import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  userLoading: true,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
    },
    setUserLoading: (state, action) => {
      state.userLoading = action.payload;
    },
  },
});

export const { addUser, logoutUser, setUserLoading } = userSlice.actions;

export default userSlice.reducer;
