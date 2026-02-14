import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth.slice';
import coursesReducer from './slices/courses.slice';
import cartReducer from './slices/cart.slice';
import reviewsReducer from './slices/reviews.slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    courses: coursesReducer,
    cart: cartReducer,
    reviews: reviewsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
