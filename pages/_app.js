import '../styles/globals.css';
import { ApolloProvider } from '@apollo/client';
import createApolloClient from '../lib/apollo-client';
import { ThemeProvider } from '../contexts/ThemeContext';

const client = createApolloClient();

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default MyApp;

