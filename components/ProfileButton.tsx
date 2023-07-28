"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { BsThreeDotsVertical } from "react-icons/bs";
import Image from "next/image";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import MenuDropDown from "./MenuDropDown";

export default function Profile() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin");
    },
  });

  return (
    <DropdownMenu.Root>
      {session?.user && (
        <DropdownMenu.Trigger asChild>
          <button
            type="button"
            className="z-10 w-full flex items-center gap-2 text-white border-white border-solid rounded-md border-[1px] py-3 px-4 transition ease-in-out delay-100 hover:bg-slate-700"
            onClick={() => console.log("clicked")}
          >
            <div className="w-full flex gap-2 items-center">
              <div className="flex flex-1 gap-3">
                <Image
                  src={session.user.image!}
                  alt="user-profile"
                  height={25}
                  width={25}
                />

                <p className="font-sm">{session.user.name}</p>
              </div>

              <BsThreeDotsVertical color="#ffffff" />
            </div>
          </button>
        </DropdownMenu.Trigger>
      )}

      <MenuDropDown />
    </DropdownMenu.Root>
  );
}
