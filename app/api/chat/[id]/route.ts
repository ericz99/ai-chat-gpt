import { NextResponse } from "next/server";
import { prisma } from "@/lib";

export async function GET(req: Request, res: Response) {
  const { searchParams } = new URL(req.url);
  const chatId = searchParams.get("id");

  if (!chatId) {
    return new Response(
      JSON.stringify({
        error: "Invalid Chat Id",
      }),
      {
        status: 400,
        headers: {
          "content-type": "application/json",
        },
      }
    );
  }

  // # return chat data
  const chat = prisma.chatConversation.findFirst({
    where: {
      id: chatId,
    },
  });

  return NextResponse.json({ data: chat });
}
