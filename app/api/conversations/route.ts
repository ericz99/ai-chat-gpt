import { NextResponse } from "next/server";
import { prisma } from "@/lib";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  // # check if user is authenticated
  if (!session?.user) {
    return new Response(
      JSON.stringify({
        error: "Unauthenticated",
      }),
      {
        status: 401,
        headers: {
          "content-type": "application/json",
        },
      }
    );
  }

  // # return chat data
  const chats = prisma.chatConversation.findMany({
    where: {
      userId: session.user.id,
    },
  });

  return NextResponse.json({ data: chats });
}
