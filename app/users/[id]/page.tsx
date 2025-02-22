import React from "react";
import prisma from "@/prisma/db";
import UserForm from "@/components/UserForm";
import { getServerSession } from "next-auth/next";
import options from "@/app/api/auth/[...nextauth]/options";
interface Props {
  params: {
    id: string;
  };
}
const EditUser = async ({ params }: Props) => {
  const session = await getServerSession(options);
  if (session?.user.role !== "ADMIN") {
    return <p className="text-destructive"> ADMIN role is required</p>
  }
  const user = await prisma.user.findUnique({
    where: {
      id: Number(params.id),
    }
    
  });
  if (!user) return <p className="text-destructive">User not found</p>;
  user.password = "";
  return <UserForm user={user} />;
};

export default EditUser;
