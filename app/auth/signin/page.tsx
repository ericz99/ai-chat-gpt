import React from "react";
import { redirect } from "next/navigation";
import { getProviders } from "next-auth/react";
import { getServerSession } from "next-auth/next";

import { GoogleLoginButton } from "@/components";
import { authOptions } from "@/auth";

export default async function SignInPage() {
  const session = await getServerSession(authOptions);
  const providers = await getProviders();
  const { id } = providers!.google;

  if (session) {
    redirect("/");
  }

  return (
    <div className="h-full w-full flex justify-center items-center relative">
      <GoogleLoginButton providerId={id} />
    </div>
  );
}
