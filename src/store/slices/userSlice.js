import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
  user: Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null,
  isAuthenticated: !!Cookies.get('accessToken'),
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;

      // Save user in cookie (7 days)
      Cookies.set('user', JSON.stringify(action.payload));
    },

    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;

      Cookies.remove('user');
      Cookies.remove('accessToken');
      Cookies.remove('refreshToken');
    },

    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      Cookies.remove('user');
      Cookies.remove('accessToken');
      Cookies.remove('refreshToken');
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = userSlice.actions;
export default userSlice.reducer;
