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

const formSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
  gender: z.string().min(2),
  status: z.string().min(2),
});

type UserFormValues = z.infer<typeof formSchema>;

async function createUser(data: UserFormValues) {
  console.log("token ", process.env.ACCESS_TOKEN);
  const res = await fetch(`https://gorest.co.in/public/v2/users`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
    },
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

interface UserFormProps {
  initialData: User | null;
}

interface Errors {
  field: string;
  message: string;
}

const UserForm: React.FC<UserFormProps> = ({ initialData }) => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Errors[]>();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      gender: "",
      status: "",
    },
  });

  const onSubmit = async (data: UserFormValues) => {
    try {
      console.log("Submitt", data);
      console.log("token ", process.env.ACCESS_TOKEN);
      setLoading(true);
      const res = await fetch(`https://gorest.co.in/public/v2/users`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const responseData = await res.json();
        setErrors(responseData);
        throw Error;
      }

      toast.success("Success create user");
      //   await createUser(data).then((res) => console.log(res));
    } catch (error) {
      let errorMessage = "";
      if (errors) {
        for (let index = 0; index < errors.length; index++) {
          errorMessage += `${errors[index].field} ${errors[index].message}`;
        }
      }

      toast.error(errorMessage);
      console.log("[POST_USER]", error);
    }
    setLoading(false);
  };

  return (
    <div>
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
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default UserForm;
