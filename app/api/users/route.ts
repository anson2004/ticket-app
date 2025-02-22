import { userSchema } from "@/ValidationSchema/users";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/db";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth/next";
import options from "../auth/[...nextauth]/options";

export async function POST(request: NextRequest) {

  const sessions = await getServerSession(options);
  if (!sessions) {
    return Response.json({ error: "Not authenticated" }, { status: 401 });
  }
  console.log(sessions)
  if (sessions.user?.role !== "Admin"){
    return Response.json({ error: "Not admin" }, { status: 401 });
  }
  
  const body = await request.json();
  const validation = userSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const duplication = await prisma.user.findUnique({
    where: {
      username: body.username,
    },
  });

  if (duplication) {
    return NextResponse.json(
      { message: "duplicated username" },
      { status: 409 }
    );
  }
  const hashedPassword = await bcrypt.hash(body.password, 10);
  body.password = hashedPassword;

  const newUser = await prisma.user.create({
    data: body,
  });
  return NextResponse.json(newUser, { status: 201 });
}
