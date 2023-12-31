"use client";

import React, { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { User } from "./columns";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
  gender: z.string().min(2),
  status: z.string().min(2),
});

type UserFormValues = z.infer<typeof formSchema>;

interface UserFormProps {
  initialData: User | null;
}

const UserForm: React.FC<UserFormProps> = ({ initialData }) => {
  const routers = useRouter();
  const [loading, setLoading] = useState(false);
  const title = initialData ? "Edit User" : "Create New User";
  const action = initialData ? "Save Changes" : "Submit";
  const successMessage = initialData
    ? "Success Update User"
    : "Success Create User";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      email: "",
      gender: "",
      status: "",
    },
  });

  const onSubmit = async (data: UserFormValues) => {
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
      : await fetch(`https://gorest.co.in/public/v2/users`, {
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
      routers.push(`/users/${responseData.id}`);
    }
  };

  const onDelete = async () => {
    setLoading(true);

    const res = await fetch(
      `https://gorest.co.in/public/v2/users/${initialData?.id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      const responseData = await res.json();

      const errorMessage = responseData.message;

      setLoading(false);
      toast.error(errorMessage);
    } else {
      setLoading(false);
      toast.success("Success delete user");
      routers.push(`/users`);
    }
  };

  return (
    <div>
      <div className="flex justify-between">
        <p className="text-xl font-bold">{title}</p>
        {initialData && (
          <Button variant="destructive" onClick={() => onDelete()}>
            Delete User
          </Button>
        )}
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter name.." {...field} />
                </FormControl>
                <FormDescription>This is user name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter email.." {...field} />
                </FormControl>
                <FormDescription>This is user email.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <Select
                  disabled={loading}
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a gender for the user" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>This is user gender.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select
                  disabled={loading}
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a status for the user" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>This is user status.</FormDescription>
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

export default UserForm;
