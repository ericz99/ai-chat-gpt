"use server";

import React from "react";
import { getServerSession } from "next-auth/next";
import { BiMessageSquare } from "react-icons/bi";

import { authOptions } from "@/auth";
import { prisma } from "@/lib";
import LoadSpinner from "./LoadSpinner";

export default async function ConversationList() {
  const session = await getServerSession(authOptions);

  const fetchAllMessageConversation = async () => {
    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.findFirst({
        where: {
          email: session?.user?.email,
        },
      });

      if (!user) return null;

      // # return all chat conversations of user
      return tx.chatConversation.findMany({
        where: {
          id: user.id,
        },
        include: {
          messages: true,
          user: true,
        },
      });
    });

    // # if no result, theres no convo
    if (!result) return [];

    // # return convo
    return result;
  };

  // # fetch all conversations
  const conversations = await fetchAllMessageConversation();

  return (
    <div className="flex flex-col h-full flex-1 py-2 px-4 relative w-full">
      {!conversations && (
        <div className="h-full flex flex-col items-center justify-center">
          <LoadSpinner />
        </div>
      )}

      {conversations.map((c, idx) => (
        <div
          key={idx}
          className="rounded-md cursor-pointer flex gap-2 mb-2 px-4 py-3 relative items-center transition ease-in-out duration-100 hover:bg-slate-700"
        >
          <BiMessageSquare color="#ffffff" size={20} />
          <p className="ml-2 text-white text-sm">
            {c.title || `Default Title ${idx}`}
          </p>
        </div>
      ))}
    </div>
  );
}
