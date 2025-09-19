import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const client = new ApolloClient({
  link: new HttpLink({
    uri: import.meta.env.VITE_GRAPHQL_URI,
    headers: {
      'x-api-key': import.meta.env.VITE_PUBLIC_APPSYNC_API_KEY,
    },
    fetchOptions: {
      mode: 'cors',
    },
  }),
  cache: new InMemoryCache(),
});
// console.log('GraphQL URI:', import.meta.env.VITE_GRAPHQL_URI);
// console.log('API Key:', import.meta.env.VITE_PUBLIC_APPSYNC_API_KEY);


export default client;
