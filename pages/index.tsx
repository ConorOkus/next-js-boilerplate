import React from "react";
import Link from "next/link";
import Head from "../components/Head";
import Nav from "../components/Nav";
import Heading from "../components/Heading";
import { useGetPostsQuery } from "../types/types";

const Home = () => {
  const { data, loading, error } = useGetPostsQuery();

  if (error) {
    return <p>Error</p>;
  }

  if (loading) {
    return <p>loading</p>;
  }

  return (
    <>
      <Link href="/about">
        <a>About</a>
      </Link>
      <Heading title="Hello World" />
      {data.posts.edges.map((p) => {
        return (
          <>
            <p>{p.node.title}</p>
            <p>{p.node.slug}</p>
          </>
        );
      })}
    </>
  );
};

export default Home;
