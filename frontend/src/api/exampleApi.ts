import { requests } from "./requestTemplate";

export const exampleApi = {
  getMessage,
};

async function getMessage(token: string) {
  const data = await requests.getRequest(token, "/test");
  return data;
}
