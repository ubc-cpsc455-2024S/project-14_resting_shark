import { requests } from "./requestTemplate";

export const userApi = {
  getProfileData,
  deleteUser,
};

// gets data on profile page
async function getProfileData(token: string | undefined) {
  const data = await requests.getRequest(token, "/user/stats");
  return data;
}

// deletes the currently logged in user
async function deleteUser(token: string | undefined) {
  await requests.deleteRequest(token, "/user");
}