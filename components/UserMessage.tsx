import React from "react";
import { useSession } from "next-auth/react";
import { AiOutlineUser } from "react-icons/ai";
import Image from "next/image";
import { redirect } from "next/navigation";

type MessageUserProps = {
  content: string;
  role: string;
};

export default function UserMessage({ content }: MessageUserProps) {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin");
    },
  });

  return (
    <div className="py-8 px-4 w-full border-b border-black/10 bg-white text-white">
      <div className="max-w-6xl mx-auto px-4 flex items-center gap-8">
        <div className="border-2 border-solid rouned-md border-white inline-block p-2">
          {session?.user && (
            <Image
              src={session.user.image!}
              alt="user-profile"
              height={35}
              width={35}
            />
          )}
        </div>

        <p className="text-black flex-1">{content}</p>
      </div>
    </div>
  );
}
