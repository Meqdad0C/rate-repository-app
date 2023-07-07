import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import Constants from 'expo-constants';


const baseUri = Constants.manifest.extra.apolloUri;
const httpLink = createHttpLink({
  // Replace the IP address part with your own IP address!
  uri: baseUri,
});

const createApolloClient = () => {
  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;