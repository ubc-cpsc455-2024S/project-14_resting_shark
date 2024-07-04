import { createAsyncThunk } from '@reduxjs/toolkit';
import { requests } from "./requestTemplate";

const fetchLessons = createAsyncThunk('lessons', async (token?: string) => {
  const response = await requests.getRequest(token, "/lesson");
  return response;
});

interface FetchFullLessonArgs {
  token?: string;
  lessonId?: string;
}

const fetchFullLesson = createAsyncThunk('fullLesson', async(args: FetchFullLessonArgs) => {
  const response = await requests.getRequest(args.token, "/lesson/" + args.lessonId);
  return response;
});

export const lessonApi = {
  fetchLessons,
  fetchFullLesson,
};
