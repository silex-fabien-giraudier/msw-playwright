import { graphql, HttpResponse } from 'msw';

export const graphqlHandlers = [
  graphql.query('GetUser', () => {
    return HttpResponse.json({ data: { user: { name: 'Alice', role: 'admin' } } });
  }),
];