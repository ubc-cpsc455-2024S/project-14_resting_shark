import { requests } from "./requestTemplate";

export const userApi = {
  getProfileData,
  deleteUser,
  updateUser,
};

// gets data on profile page. takes a start date and end date, both of which are iso date strings in UTC
async function getProfileData(token: string | undefined, start: string, end: string) {
  const requestBody = {
    start: start,
    end: end,
  }
  const data = await requests.postRequest(token, "/user/stats", requestBody);
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