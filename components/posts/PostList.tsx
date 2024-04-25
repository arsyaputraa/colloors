"use client";

import { useState } from "react";

import Modal from "@/components/shared/Modal";
import { type Post, CompletePost } from "@/lib/db/schema/posts";

import { useOptimisticPosts } from "@/app/(app)/posts/useOptimisticPosts";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import PostCard from "./PostCard";
import PostForm from "./PostForm";

type TOpenModal = (post?: Post) => void;

export default function PostList({ posts }: { posts: CompletePost[] }) {
  const { optimisticPosts, addOptimisticPost } = useOptimisticPosts(posts);
  const [open, setOpen] = useState(false);
  const [activePost, setActivePost] = useState<Post | null>(null);
  const openModal = (post?: Post) => {
    setOpen(true);
    post ? setActivePost(post) : setActivePost(null);
  };
  const closeModal = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        setOpen={setOpen}
        title={activePost ? "Edit Post" : "Create Post"}
      >
        <PostForm
          post={activePost}
          addOptimistic={addOptimisticPost}
          openModal={openModal}
          closeModal={closeModal}
        />
      </Modal>
      <div className="absolute right-0 top-0 ">
        <Button onClick={() => openModal()} variant={"outline"}>
          +
        </Button>
      </div>
      {optimisticPosts.length === 0 ? (
        <EmptyState openModal={openModal} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
          {optimisticPosts.map((post) => (
            <PostCard post={post} key={post.id} />
          ))}
        </div>
      )}
    </div>
  );
}

const EmptyState = ({ openModal }: { openModal: TOpenModal }) => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No posts
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new post.
      </p>
      <div className="mt-6">
        <Button onClick={() => openModal()}>
          <PlusIcon className="h-4" /> New Posts{" "}
        </Button>
      </div>
    </div>
  );
};
