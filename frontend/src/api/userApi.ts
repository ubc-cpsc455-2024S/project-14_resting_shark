import { requests } from "./requestTemplate";

export const userApi = {
  getProfileData,
};

async function getProfileData(token: string | undefined) {
  const data = await requests.getRequest(token, "/user/stats");
  return data;
}