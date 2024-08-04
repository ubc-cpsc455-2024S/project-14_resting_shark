import { createAsyncThunk } from '@reduxjs/toolkit';
import { requests } from "./requestTemplate";

const fetchLessons = createAsyncThunk('lessons', async (token?: string) => {
  const response = await requests.getRequest(token, "/lesson");
  return response;
});

interface FetchFullLessonArgs {
  token?: string;
  lessonId?: string;
  title?: string;
}

const fetchFullLesson = createAsyncThunk('fullLesson', async(args: FetchFullLessonArgs) => {
  const response = await requests.getRequest(args.token, "/lesson/" + args.lessonId);
  return response;
});

// fetches the current lesson of the day
async function fetchLessonOfTheDay(token: string | undefined) {
  const data = await requests.getRequest(token, "/lesson/lessonOfTheDay");
  return data;
}

export const lessonApi = {
  fetchLessons,
  fetchFullLesson,
  fetchLessonOfTheDay,
};
