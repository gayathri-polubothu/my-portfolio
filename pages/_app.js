import '../styles/globals.css';
import { ApolloProvider } from '@apollo/client';
import createApolloClient from '../lib/apollo-client';

const client = createApolloClient();

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;

