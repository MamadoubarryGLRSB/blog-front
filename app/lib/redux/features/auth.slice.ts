import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  accessToken: string;
  isAuth: boolean;
}

const initialState: AuthState = {
  accessToken: '',
  isAuth: false
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<AuthState>) => {
      localStorage.setItem('auth', JSON.stringify(action.payload));
      return { ...state, ...action.payload };
    },
    removeAuth: () => {
      localStorage.removeItem('auth');
      return initialState;
    }
  },
  extraReducers: () => {}
});

export const { setAuth, removeAuth } = authSlice.actions;

export default authSlice.reducer;
