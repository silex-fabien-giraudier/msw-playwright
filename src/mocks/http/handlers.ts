import { http } from 'msw';

export const httpHandlers = [
  http.get('/api/user', ({ request }) => {
    // Simuler une erreur si l'en-tête X-Test-Error est présent
    if (request.headers.get('X-Test-Error')) {
      return new Response('Server Error', {
        status: 500,
      });
    }
    
    // Simuler un utilisateur différent si l'en-tête X-Test-User est présent
    if (request.headers.get('X-Test-User') === 'bob') {
      return new Response(JSON.stringify({ name: 'Bob', role: 'user' }), {
        status: 200,
      });
    }
    
    // Comportement par défaut
    return new Response(JSON.stringify({ name: 'Alice', role: 'admin' }), {
      status: 200,
    });
  }),
];
