import { PreviewPostQueryResult } from "./../../types/types";
import { initializeApollo } from "../../apollo/client";
import { PreviewPostDocument } from "../../types/types";

export default async function preview(req, res) {
  const { secret, id, slug } = req.query;

  // Check the secret and next parameters
  // This secret should only be known by this API route
  if (
    !process.env.WORDPRESS_PREVIEW_SECRET ||
    secret !== process.env.WORDPRESS_PREVIEW_SECRET ||
    (!id && !slug)
  ) {
    return res.status(401).json({ message: "Invalid token" });
  }

  const apolloClient = initializeApollo();

  // Fetch WordPress to check if the provided `id` or `slug` exists
  const { data }: PreviewPostQueryResult = await apolloClient.query({
    query: PreviewPostDocument,
    variables: {
      id: id || slug,
      idType: id ? "DATABASE_ID" : "SLUG",
    },
  });

  // If the post doesn't exist prevent preview mode from being enabled
  if (!data.post) {
    return res.status(401).json({ message: "Post not found" });
  }

  // Enable Preview Mode by setting the cookies
  res.setPreviewData({
    post: {
      id: data.post.databaseId,
      slug: data.post.slug,
      status: data.post.status,
    },
  });

  // Redirect to the path from the fetched post
  // We don't redirect to `req.query.slug` as that might lead to open redirect vulnerabilities
  res.writeHead(307, {
    Location: `/posts/${data.post.slug || data.post.databaseId}`,
  });
  res.end();
}
