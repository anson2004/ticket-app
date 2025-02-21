import { userSchema } from "@/ValidationSchema/users";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/db";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
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
