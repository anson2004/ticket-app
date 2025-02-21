"use client";
import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormControl, FormField, FormItem, FormLabel, Form } from "./ui/form";
import { Input } from "./ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { User } from "@prisma/client";
import { userSchema } from "@/ValidationSchema/users";
type UserFormData = z.infer<typeof userSchema>;

interface Props {
  user?: User;
}

function UserForm({ user }: Props) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string>("");
  const router = useRouter();

  const form = useForm<UserFormData>({ resolver: zodResolver(userSchema) });

  async function onSubmit(values: z.infer<typeof userSchema>) {
    try {
      setIsSubmitting(true);
      setError("");
      if (user) {
        await axios.patch("/api/users/" + user.id, values);
      } else await axios.post("/api/users", values);
      setIsSubmitting(false);
      router.push("/tickets");
      router.refresh();
    } catch (error) {
      setError("error message");
      setIsSubmitting(false);
    }
  }
  return (
    <div className="w-full rounded-md border p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            defaultValue={user?.name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter User Full Name..." {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            defaultValue={user?.username}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter a username..." {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            defaultValue=""
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    required={user ? false : true}
                    placeholder="Enter a password..."
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex w-full space-x-4">
            <FormField
              control={form?.control}
              name="role"
              defaultValue={user?.role}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder="Status..."
                          defaultValue={user?.role}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="USER">USER</SelectItem>
                      <SelectItem value="TECH">TECH</SelectItem>
                      <SelectItem value="ADMIN">ADMIN</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" disabled={isSubmitting}>
            {user ? "Update" : "Create"}
          </Button>
        </form>
      </Form>
      <p className="text-destructive">{error}</p>
    </div>
  );
}

export default UserForm;
