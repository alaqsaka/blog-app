"use client";

import React, { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useRouter } from "next/navigation";
import { User } from "../../../components/columns";

export type Blog = {
  id: number;
  user_id: number;
  title: string;
  body: string;
};

const formSchema = z.object({
  title: z.string().min(1),
  body: z.string().min(1),
});

type BlogFormValues = z.infer<typeof formSchema>;

interface BlogFormProps {
  initialData: Blog | null;
  user: User;
}

const BlogForm: React.FC<BlogFormProps> = ({ initialData, user }) => {
  const routers = useRouter();
  const [loading, setLoading] = useState(false);
  const title = initialData ? "Edit Blog" : "Create New Blog";
  const action = initialData ? "Save Changes" : "Submit";
  const successMessage = initialData
    ? "Success Update Blog"
    : "Success Create Blog";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      title: "",
      body: "",
    },
  });

  const onSubmit = async (data: BlogFormValues) => {
    setLoading(true);

    const res = initialData
      ? await fetch(`https://gorest.co.in/public/v2/users/${initialData.id}`, {
          method: "PATCH",
          body: JSON.stringify(data),
          headers: {
            Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
            "Content-Type": "application/json",
          },
        })
      : await fetch(`https://gorest.co.in/public/v2/users/${user.id}/posts`, {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
            "Content-Type": "application/json",
          },
        });

    if (!res.ok) {
      const responseData = await res.json();

      let errorMessage = "";
      if (responseData.length) {
        for (let index = 0; index < responseData.length; index++) {
          errorMessage += `${responseData[index].field} ${responseData[index].message}`;
        }
      }

      setLoading(false);
      toast.error(errorMessage);
    } else {
      setLoading(false);
      const responseData = await res.json();
      toast.success(successMessage);
      routers.push(`/blog/${responseData.id}`);
    }
  };

  return (
    <div>
      <div className="flex justify-between">
        <p className="text-xl font-bold">{title}</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Blog Title.." {...field} />
                </FormControl>
                <FormDescription>This is blog title.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="body"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Body" {...field} />
                </FormControl>
                <FormDescription>Body</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={loading}>
            {action}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default BlogForm;
