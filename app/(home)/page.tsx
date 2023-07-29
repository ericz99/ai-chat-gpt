import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";
import { redirect } from "next/navigation";
import { createId } from "@paralleldrive/cuid2";

import { Chat } from "@/components";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  const id = createId();

  return (
    <div className="flex flex-col flex-1 w-full">
      <Chat id={id} />
    </div>
  );
}
