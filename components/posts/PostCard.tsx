"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CompletePost } from "@/lib/db/schema/posts";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

const PostCard = ({
  post,
  readOnly = true,
}: {
  post: CompletePost;
  readOnly?: boolean;
}) => {
  const colors = useMemo(() => post.colors.split("-"), [post.colors]);

  const optimistic = post.id === "optimistic";
  const deleting = post.id === "delete";
  const mutating = optimistic || deleting;
  const pathname = usePathname();

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
          <Link href={`/posts/${post.id}`}>{readOnly ? "Detail" : "Edit"}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
