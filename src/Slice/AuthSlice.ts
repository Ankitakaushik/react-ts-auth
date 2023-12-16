import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
  token: string;
  userDetails: { email: string, loginTime: Date} | null;
}

const initialState: AuthState = {
  token: '',
  userDetails: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
    signOut: (state) => {
      state.token = '';
      state.userDetails = null;
    },
  },
});

export const { setToken, setUserDetails, signOut } = authSlice.actions;
export const authReducer = authSlice.reducer;