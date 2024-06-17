import { requests } from "./requestTemplate";

export const lessonApi = {
  getLessons,
  getFullLesson,
};

async function getLessons(token?: string) {
  const data = await requests.getRequest(token, "/lesson");
  return data;
}

async function getFullLesson(token?: string, lessonId?: string) {
  const data = await requests.getRequest(token, "/lesson/" + lessonId);
  return data;
}
