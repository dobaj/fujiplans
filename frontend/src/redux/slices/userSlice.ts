import { createSlice, PayloadAction} from "@reduxjs/toolkit";
import { User } from "@/types/user";

// Define the initial state type
interface UserState {
  user: User | null;
}

// Define the initial state
const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Typing action.payload as User
    addUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    // No payload for logoutUser, just setting user to null
    logoutUser: (state) => {
      state.user = null;
    },
  },
});

export const { addUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;