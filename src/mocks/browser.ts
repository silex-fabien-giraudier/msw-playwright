import { setupWorker } from 'msw/browser';
import { graphqlHandlers } from './graphql/handlers';
import { httpHandlers } from './http/handlers';

export const worker = setupWorker(...httpHandlers, ...graphqlHandlers);
