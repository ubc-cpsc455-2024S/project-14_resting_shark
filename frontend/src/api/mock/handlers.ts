import { http, HttpResponse } from 'msw';
import { BASE_URL } from "../../constants/Config";


export const handlers = [
  // Intercept "GET https://example.com/user" requests...
  http.get(BASE_URL + '/test', () => {
    // ...and respond to them using this JSON response.
    return HttpResponse.json({
      data: "Successful http request",
    });
  }),

  // http.get()
]
