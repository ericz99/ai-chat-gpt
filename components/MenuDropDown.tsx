"use client";

import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { signOut } from "next-auth/react";

import { BsTrash, BsGear } from "react-icons/bs";
import { IoMdExit } from "react-icons/io";

export default function MenuDropDown() {
  return (
    <DropdownMenu.Portal>
      <DropdownMenu.Content
        className="min-w-[270px] bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
        sideOffset={5}
      >
        <DropdownMenu.Item className="cursor-pointer group gap-4 text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[50px] px-[5px] relative pl-[10px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1">
          <div className="text-mauve11 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8">
            <BsTrash size={18} />
          </div>
          Clear Conversation
        </DropdownMenu.Item>
        <DropdownMenu.Item className="cursor-pointer group gap-4 text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[50px] px-[5px] relative pl-[10px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1">
          <div className="text-mauve11 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8">
            <BsGear size={18} />
          </div>
          Settings
        </DropdownMenu.Item>

        <DropdownMenu.Separator className="h-[1px] bg-violet6 m-[5px]" />

        <DropdownMenu.Item
          onClick={() => signOut()}
          className="cursor-pointer group text-[13px] gap-4 leading-none text-violet11 rounded-[3px] flex items-center h-[50px] px-[5px] relative pl-[10px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
        >
          <div className=" text-mauve11 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8">
            <IoMdExit size={18} />
          </div>
          Sign Out
        </DropdownMenu.Item>

        <DropdownMenu.Arrow className="fill-white" />
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  );
}
