import React from "react";
import Link from "next/link";
import Head from "../components/Head";
import Nav from "../components/Nav";
import { initializeApollo } from "../apollo/client";
import { GetPostsDocument, useGetPostsQuery } from "../types/types";

export default function Home() {
  const { data } = useGetPostsQuery();

  return (
    <>
      <h1>Hello World</h1>
      {data.posts.edges.map((p) => (
        <>
          <p>{p.node.title}</p>
          <p>{p.node.date}</p>
          <p>{p.node.slug}</p>
        </>
      ))}
    </>
  );
}

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: GetPostsDocument,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
}
