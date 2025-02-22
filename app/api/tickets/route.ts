import { ticketSchema } from "@/ValidationSchema/tickets";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import options from "../auth/[...nextauth]/options";

export async function POST(request: NextRequest) {
  const sessions = await getServerSession(options);
  if (!sessions) {
    return Response.json({ error: "Not authenticated" }, { status: 401 });
  }
  const body = await request.json();

  console.log(body);

  const validation = ticketSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const newTicket = await prisma?.ticket.create({
    data: body,
  });
  return NextResponse.json(newTicket, { status: 201 });
}
