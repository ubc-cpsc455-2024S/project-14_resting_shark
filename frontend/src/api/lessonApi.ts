import { createAsyncThunk } from '@reduxjs/toolkit';
import { requests } from "./requestTemplate";

const fetchLessons = createAsyncThunk('lesson', async (token?: string) => {
  const response = await requests.getRequest(token, "/lesson");
  return response.data;
});

async function getFullLesson(token?: string, lessonId?: string) {
  const data = await requests.getRequest(token, "/lesson/" + lessonId);
  return data;
}

export const lessonApi = {
  fetchLessons,
  getFullLesson,
};
