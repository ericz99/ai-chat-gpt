import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";
import { redirect } from "next/navigation";

import { Chat } from "@/components";
import { prisma } from "@/lib";

export default async function ChatConversation({
  params,
}: {
  params: { chatId: string };
}) {
  const { chatId } = params;
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  const fetchChatById = async () => {
    return prisma.chatConversation.findFirst({
      where: {
        id: chatId,
      },
      include: {
        messages: true,
      },
    });
  };

  // # get chat
  const chat = await fetchChatById();

  if (!chat) {
    redirect("/");
  }

  const { id, messages } = chat!;

  return (
    <div className="flex flex-col flex-1 w-full max-w-4xl mx-auto container">
      <Chat id={id} initialMessages={messages} />
    </div>
  );
}
