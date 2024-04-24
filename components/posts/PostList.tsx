"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { type Post, CompletePost } from "@/lib/db/schema/posts";
import Modal from "@/components/shared/Modal";

import { useOptimisticPosts } from "@/app/(app)/posts/useOptimisticPosts";
import { Button } from "@/components/ui/button";
import PostForm from "./PostForm";
import { PlusIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

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
        <div className="grid grid-cols-3 gap-2">
          {optimisticPosts.map((post) => (
            <Post post={post} key={post.id} openModal={openModal} />
          ))}
        </div>
      )}
    </div>
  );
}

const Post = ({
  post,
  openModal,
}: {
  post: CompletePost;
  openModal: TOpenModal;
}) => {
  const colors = useMemo(() => post.colors.split("-"), [post.colors]);

  const optimistic = post.id === "optimistic";
  const deleting = post.id === "delete";
  const mutating = optimistic || deleting;
  const pathname = usePathname();
  const basePath = pathname.includes("posts") ? pathname : pathname + "/posts/";

  return (
    <Card className={cn(mutating ? "opacity-30 animate-pulse" : "")}>
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
        <CardDescription>{post.desc}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex rounded-md overflow-hidden shadow-md w-full h-32 justify-stretch items-stretch">
          {colors.map((color) => {
            return (
              <div
                key={color}
                style={{ backgroundColor: color }}
                className="w-full h-full"
              />
            );
          })}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button variant={"outline"} asChild>
          <Link href={basePath + "/" + post.id}>Edit</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

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
