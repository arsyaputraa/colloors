import Loading from "@/app/loading";
import SignOutBtn from "@/components/auth/SignOutBtn";
import PostCard from "@/components/posts/PostCard";
import { getAllPosts } from "@/lib/api/posts/queries";
import { getUserAuth } from "@/lib/auth/utils";
import { Suspense } from "react";

export default async function Home() {
  const { session } = await getUserAuth();

  return (
    <main className="">
      <h1 className="text-2xl font-bold my-1">Hey {session?.user?.name} </h1>
      <p className="mb-2">Explore color palette</p>

      <AllPosts />
    </main>
  );
}

const AllPosts = async () => {
  const { posts } = await getAllPosts({});

  return (
    <Suspense fallback={<Loading />}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
        {posts.map((post) => (
          <PostCard post={post} key={post.id} />
        ))}
      </div>
    </Suspense>
  );
};
