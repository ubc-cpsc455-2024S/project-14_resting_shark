import { requests } from "./requestTemplate";

export const lessonApi = {
  getLesson,
};

async function getLesson(token: string) {
  const data = await requests.getRequest(token, "/test");
  return data;
}
