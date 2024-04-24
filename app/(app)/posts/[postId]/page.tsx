import { Suspense } from "react";
import { notFound } from "next/navigation";

import { getPostById } from "@/lib/api/posts/queries";
import OptimisticPost from "./OptimisticPost";
import { checkAuth } from "@/lib/auth/utils";


import { BackButton } from "@/components/shared/BackButton";
import Loading from "@/app/loading";


export const revalidate = 0;

export default async function PostPage({
  params,
}: {
  params: { postId: string };
}) {

  return (
    <main className="overflow-auto">
      <Post id={params.postId} />
    </main>
  );
}

const Post = async ({ id }: { id: string }) => {
  await checkAuth();

  const { post } = await getPostById(id);
  

  if (!post) notFound();
  return (
    <Suspense fallback={<Loading />}>
      <div className="relative">
        <BackButton currentResource="posts" />
        <OptimisticPost post={post}  />
      </div>
    </Suspense>
  );
};
