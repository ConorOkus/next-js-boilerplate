import { initializeApollo } from "../../apollo/client";
import {
  GetPostsWithSlugDocument,
  GetPostsWithSlugQueryResult,
} from "../../types/types";
import { getPost } from "../../helpers/getPost";
import { InferGetStaticPropsType } from "next";
import { PostBody } from "../../components/PostBody";

export default function Post({
  preview,
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <h1>
        {preview ? "This is a preview post" : "This post has been published"}
      </h1>
      <p>{post.title}</p>
      <PostBody content={post.content} />
    </>
  );
}

export async function getStaticProps({ params, preview = false, previewData }) {
  const data = await getPost(params.slug, preview, previewData);

  return {
    props: {
      preview,
      post: data.post,
    },
  };
}

export async function getStaticPaths() {
  const apolloClient = initializeApollo();

  const { data }: GetPostsWithSlugQueryResult = await apolloClient.query({
    query: GetPostsWithSlugDocument,
  });

  return {
    paths: data.posts.edges.map(({ node }) => `/posts/${node.slug}`) || [],
    fallback: true,
  };
}
