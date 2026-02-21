import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Course } from '../../types';

interface CourseFilters {
  category: string | null;
  level: string | null;
  priceRange: [number, number];
  rating: number | null;
  searchQuery: string;
}

interface CoursesState {
  items: Course[];
  selectedCourse: Course | null;
  filters: CourseFilters;
  isLoading: boolean;
  error: string | null;
}

const initialState: CoursesState = {
  items: [],
  selectedCourse: null,
  filters: {
    category: null,
    level: null,
    priceRange: [0, 200],
    rating: null,
    searchQuery: '',
  },
  isLoading: false,
  error: null,
};

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setCourses: (state, action: PayloadAction<Course[]>) => {
      state.items = action.payload;
      state.isLoading = false;
    },
    setSelectedCourse: (state, action: PayloadAction<Course | null>) => {
      state.selectedCourse = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.filters.searchQuery = action.payload;
    },
    setCategory: (state, action: PayloadAction<string | null>) => {
      state.filters.category = action.payload;
    },
    setLevel: (state, action: PayloadAction<string | null>) => {
      state.filters.level = action.payload;
    },
    setPriceRange: (state, action: PayloadAction<[number, number]>) => {
      state.filters.priceRange = action.payload;
    },
    setRating: (state, action: PayloadAction<number | null>) => {
      state.filters.rating = action.payload;
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setLoading,
  setCourses,
  setSelectedCourse,
  setError,
  setSearchQuery,
  setCategory,
  setLevel,
  setPriceRange,
  setRating,
  resetFilters,
  clearError,
} = coursesSlice.actions;

export default coursesSlice.reducer;
