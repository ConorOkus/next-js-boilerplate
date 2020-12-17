import { initializeApollo } from "../apollo/client";
import {
  GetPostBySlugQueryResult,
  GetPostBySlugDocument,
} from "../types/types";

export async function getPost(slug, preview, previewData) {
  const postPreview = preview && previewData?.post;
  // The slug may be the id of an unpublished post
  const isId = Number.isInteger(Number(slug));
  const isSamePost = isId
    ? Number(slug) === postPreview.id
    : slug === postPreview.slug;
  const isDraft = isSamePost && postPreview?.status === "draft";
  const isRevision = isSamePost && postPreview?.status === "publish";

  const apolloClient = initializeApollo();

  const { data }: GetPostBySlugQueryResult = await apolloClient.query({
    query: GetPostBySlugDocument,
    variables: {
      id: isDraft ? postPreview.id : slug,
      idType: isDraft ? "DATABASE_ID" : "SLUG",
    },
  });

  // Draft posts may not have an slug
  if (isDraft) Object.assign(data.post.slug, postPreview.id);
  // Apply a revision (changes in a published post)
  if (isRevision && data.post.revisions.edges.length > 1) {
    const revision = data.post.revisions.edges[0]?.node;

    if (revision) Object.assign(data.post, revision);
    delete data.post.revisions;
  }

  return data;
}
