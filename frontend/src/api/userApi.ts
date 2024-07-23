import { requests } from "./requestTemplate";

export const userApi = {
  getProfileData,
  deleteUser,
  updateUser,
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

async function updateUser(token: string | undefined, updateData: Partial<{ username: string; email: string; password: string }>) {
  const data = await requests.putRequest(token, "/user", updateData);
  return data;
}