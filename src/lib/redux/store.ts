import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth.slice';
import coursesReducer from './slices/courses.slice';
import cartReducer from './slices/cart.slice';
import reviewsReducer from './slices/reviews.slice';
import { apiSlice } from '../api/apiSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    courses: coursesReducer,
    cart: cartReducer,
    reviews: reviewsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
