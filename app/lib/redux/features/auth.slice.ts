// lib/redux/features/auth.slice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  accessToken: string;
  isAuth: boolean;
}

// Fonction pour récupérer l'état initial depuis localStorage
const getInitialState = (): AuthState => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('auth');
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        accessToken: parsed.accessToken,
        isAuth: true
      };
    }
  }
  return {
    accessToken: '',
    isAuth: false
  };
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: getInitialState(),
  reducers: {
    setAuth: (state, action: PayloadAction<AuthState>) => {
      localStorage.setItem('auth', JSON.stringify(action.payload));
      return { ...state, ...action.payload };
    },
    removeAuth: () => {
      localStorage.removeItem('auth');
      return { accessToken: '', isAuth: false };
    }
  }
});

export const { setAuth, removeAuth } = authSlice.actions;
export default authSlice.reducer;
