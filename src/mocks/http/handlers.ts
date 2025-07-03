import { http } from 'msw';

export const httpHandlers = [
  http.get('/api/user', () => {
    return new Response(JSON.stringify({ name: 'Alice', role: 'admin' }), {
      status: 200,
    });
  }),
];
