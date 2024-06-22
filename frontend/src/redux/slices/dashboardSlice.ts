import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

import { lessonApi } from "../../api/lessonApi";

interface DashboardPageSliceState {
  lessons: any[],
  lessonStatus: string,
  error: string | undefined,
}

const initialState: DashboardPageSliceState = {
  lessons: [
    {
      name: "astronomy lesson",
      id: "astronomy-lesson-id",
    },
    {
      name: "test lesson",
      id: "test-lesson-id",
    },
  ],
  lessonStatus: "idle",
  error: "",
};

const dashboardPageSlice = createSlice({
  name: 'dashboardPage',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    // GET LESSONS
    .addCase(lessonApi.fetchLessons.pending, (state) => {
      state.lessonStatus = "loading";
    })
    .addCase(lessonApi.fetchLessons.fulfilled, (state, action) => {
      state.lessonStatus = "suceeded";
      state.lessons = action.payload;
    })
    .addCase(lessonApi.fetchLessons.rejected, (state, action) => {
      state.lessonStatus = "failed";
      state.error = action.error.message;
    })
  }
});

// Selectors
export const selectLessons = (state: RootState) => state.dashboardPage.lessons;

export default dashboardPageSlice.reducer;
