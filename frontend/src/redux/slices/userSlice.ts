import { createSlice, PayloadAction} from "@reduxjs/toolkit";
import { User } from "@/types/user";

// Define the initial state type
interface UserState {
  user: User | null;
  userLoading: boolean;
}

// Define the initial state
const initialState: UserState = {
  user: null,
  userLoading: true,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Typing action.payload as User
    addUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    // No payload for logoutUser, just setting user to null
    logoutUser: (state) => {
      state.user = null;
    },
    // Typing action.payload as boolean for userLoading
    setUserLoading: (state, action: PayloadAction<boolean>) => {
      state.userLoading = action.payload;
    },
  },
});

export const { addUser, logoutUser, setUserLoading } = userSlice.actions;

export default userSlice.reducer;