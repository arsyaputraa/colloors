"use client";

import { useMemo, useOptimistic, useState } from "react";
import { TAddOptimistic } from "@/app/(app)/posts/useOptimisticPosts";
import { type Post } from "@/lib/db/schema/posts";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import Modal from "@/components/shared/Modal";
import PostForm from "@/components/posts/PostForm";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useSession } from "@/app/providers/SessionProviders";

export default function OptimisticPost({ post }: { post: Post }) {
  const { user } = useSession();

  const [open, setOpen] = useState(false);
  const openModal = (_?: Post) => {
    setOpen(true);
  };
  const closeModal = () => setOpen(false);
  const [optimisticPost, setOptimisticPost] = useOptimistic(post);

  const colors = useMemo(() => {
    return optimisticPost.colors.split("-").map((item, idx) => item);
  }, [optimisticPost]);
  const updatePost: TAddOptimistic = (input) =>
    setOptimisticPost({ ...input.data });

  return (
    <div className="m-4">
      <Modal open={open} setOpen={setOpen}>
        <PostForm
          post={optimisticPost}
          closeModal={closeModal}
          openModal={openModal}
          addOptimistic={updatePost}
        />
      </Modal>
      <div className="flex justify-between items-end mb-4">
        <h1 className="font-semibold text-2xl">{optimisticPost.title}</h1>
        {user.id === post.userId && (
          <Button className="" onClick={() => setOpen(true)}>
            Edit
          </Button>
        )}
      </div>
      <div className="mb-4 text-gray-600">{optimisticPost.desc}</div>

      <div
        className={cn(
          "bg-secondary p-4 rounded-lg break-all text-wrap h-[calc(100vh-15rem)] flex justify-stretch items-stretch",
          optimisticPost.id === "optimistic" ? "animate-pulse" : ""
        )}
      >
        {colors.map((item, idx) => {
          return (
            <div
              key={`color-${idx}`}
              onClick={() => {
                const color = item.replace("#", "");
                navigator.clipboard.writeText(color);

                toast.info(`${color} copied to clipboard`);
              }}
              style={{ backgroundColor: item }}
              className="flex-1 flex justify-center items-center cursor-pointer group hover:brightness-75 transition-all"
            >
              <Badge
                variant="secondary"
                className="bg-gray-800 group-hover:bg-gray-200 group-hover:text-black group-hover:font-semibold"
              >
                {item.toUpperCase()}
              </Badge>
            </div>
          );
        })}
      </div>

      {/* <div>
        {colors.map((item, idx) => {
          return (
            <div style={{ backgroundColor: item }}>{item.toLowerCase()}</div>
          );
        })}
      </div> */}
    </div>
  );
}
