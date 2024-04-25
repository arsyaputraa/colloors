import { db } from "@/lib/db/index";
import { eq, and, asc } from "drizzle-orm";
import { checkAuth, getUserAuth } from "@/lib/auth/utils";
import { type PostId, postIdSchema, posts } from "@/lib/db/schema/posts";

export const getPosts = async () => {
  await checkAuth();
  const { session } = await getUserAuth();

  const rows = await db
    .select()
    .from(posts)
    .where(eq(posts.userId, session?.user.id!));
  const p = rows;
  return { posts: p };
};

export const getAllPosts = async ({
  limit = 10,
  page = 0,
}: {
  limit?: number;
  page?: number;
}) => {
  await checkAuth();

  const rows = await db
    .select()
    .from(posts)
    .orderBy(asc(posts.createdAt))
    .limit(limit)
    .offset(page);
  const p = rows;
  return { posts: p };
};

export const getPostById = async (id: PostId) => {
  await checkAuth();
  const { id: postId } = postIdSchema.parse({ id });
  const [row] = await db.select().from(posts).where(eq(posts.id, postId));
  if (row === undefined) return {};
  const p = row;
  return { post: p };
};
