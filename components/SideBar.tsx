"use client";

import { useState } from "react";
import { TbMessage2Plus } from "react-icons/tb";
import {
  BsLayoutSidebarInsetReverse,
  BsLayoutSidebarInset,
} from "react-icons/bs";

import ProfileButton from "./ProfileButton";
import { redirect } from "next/navigation";

type SideBarProps = {
  children: React.ReactNode;
};

export default function SideBar({ children }: SideBarProps) {
  const [isSidebarToggle, setSidebarToggle] = useState<boolean>(false);

  const createNewChat = () => {
    // # just redirect page if its already on /:chatId -> /
    redirect("/");
  };

  return (
    <div className="relative flex">
      <div
        className={`${
          !isSidebarToggle ? "w-[300px] visible" : "w-0 hidden"
        } relative flex flex-col bg-[#20262E] transition ease-in-out delay-200`}
      >
        <div className="flex gap-3.5 p-4">
          <button
            type="button"
            className="flex items-center gap-2 border-white border-solid rounded-md py-3 px-4 w-full border-[1px] transition ease-in-out delay-100 hover:bg-slate-700"
            onClick={createNewChat}
          >
            <TbMessage2Plus color="#ffffff" />
            <span className="text-sm text-white">New Chat</span>
          </button>

          <button
            type="button"
            className="flex items-center gap-2 border-white border-solid rounded-md border-[1px] py-3 px-4 transition ease-in-out delay-100 hover:bg-slate-700"
            onClick={() => setSidebarToggle(true)}
          >
            <BsLayoutSidebarInsetReverse color="#ffffff" />
          </button>
        </div>

        <div className="flex flex-col flex-1 h-full w-full relative">
          {children}
        </div>
      </div>

      {isSidebarToggle && (
        <div className="absolute left-4 top-4 z-10">
          <button
            type="button"
            className="flex items-center gap-2 border-[#20262E] bg-white border-solid rounded-md border-[1px] py-3 px-4 transition ease-in-out delay-100 hover:bg-slate-200"
            onClick={() => setSidebarToggle(false)}
          >
            <BsLayoutSidebarInset color="#20262E" />
          </button>
        </div>
      )}

      {!isSidebarToggle && (
        <div className="absolute bottom-0 flex w-full p-4">
          <ProfileButton />
        </div>
      )}
    </div>
  );
}
