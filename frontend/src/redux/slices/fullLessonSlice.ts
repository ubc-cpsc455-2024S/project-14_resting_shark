import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

import { lessonApi } from "../../api/lessonApi";

import Content from '../../class/Content';
import Lesson from '../../class/Lesson';

interface FullLessonSliceState {
  lesson: Lesson | null,
  contentList: Content[];
  lessonStatus: string,
  error: string | undefined,
}

const initialState: FullLessonSliceState = {
  lesson: null,
  contentList: [],
  lessonStatus: "idle",
  error: "",
};

const fullLessonSlice = createSlice({
  name: 'fullLesson',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    // GET LESSONS
    .addCase(lessonApi.fetchFullLesson.pending, (state) => {
      state.lessonStatus = "loading";
    })
    .addCase(lessonApi.fetchFullLesson.fulfilled, (state, action) => {
      state.lessonStatus = "suceeded";
      const { content, ...lessonMetadata } = action.payload;
      state.lesson = lessonMetadata;
      state.contentList = content;
    })
    .addCase(lessonApi.fetchFullLesson.rejected, (state, action) => {
      state.lessonStatus = "failed";
      state.error = action.error.message;
    })
  }
});

// Selectors
export const selectLesson = (state: RootState) => state.fullLesson.lesson;
export const selectContentList = (state: RootState) => state.fullLesson.contentList;

export default fullLessonSlice.reducer;
