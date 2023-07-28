import React from "react";

import { SideBar, ConversationList, AuthProvider } from "@/components";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex relative h-full w-full">
      <AuthProvider>
        <SideBar>
          <ConversationList />
        </SideBar>

        {children}
      </AuthProvider>
    </div>
  );
}
