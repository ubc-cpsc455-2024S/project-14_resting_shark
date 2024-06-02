import { http, HttpResponse } from 'msw';

export const handlers = [
  // Intercept "GET https://example.com/user" requests...
  http.get('http://localhost:3000/test', () => {
    // ...and respond to them using this JSON response.
    return HttpResponse.json({
      data: "Successful http request",
    });
  }),
]
