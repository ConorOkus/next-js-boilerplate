import { useMemo } from "react";
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

let apolloClient;

function createApolloClient() {
  return new ApolloClient({
    uri: process.env.WORDPRESS_API_URL,
    cache: new InMemoryCache(),
    headers: {
      authorization: `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`,
    },
    ssrMode: typeof window === "undefined",
  });
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
