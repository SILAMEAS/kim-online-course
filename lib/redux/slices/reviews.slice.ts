import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Review } from '../../types';

interface ReviewsState {
  items: Review[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ReviewsState = {
  items: [],
  isLoading: false,
  error: null,
};

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setReviews: (state, action: PayloadAction<Review[]>) => {
      state.items = action.payload;
      state.isLoading = false;
    },
    addReview: (state, action: PayloadAction<Review>) => {
      state.items.unshift(action.payload);
    },
    updateReviewHelpful: (state, action: PayloadAction<string>) => {
      const review = state.items.find(r => r.id === action.payload);
      if (review) {
        review.helpful_count += 1;
      }
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setLoading,
  setReviews,
  addReview,
  updateReviewHelpful,
  setError,
  clearError,
} = reviewsSlice.actions;

export default reviewsSlice.reducer;
