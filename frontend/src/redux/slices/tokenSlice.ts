import { createSlice, PayloadAction} from "@reduxjs/toolkit";

interface TokenState {
  token: string | null;
  tokenLoading: boolean;
}

const initialState: TokenState = {
  token: null,
  tokenLoading: true,
};

export const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.token = null;
    },
    setTokenLoading: (state, action: PayloadAction<boolean>) => {
      state.tokenLoading = action.payload;
    },
  },
});

export const { setToken, logout, setTokenLoading } = tokenSlice.actions;
export default tokenSlice.reducer;
