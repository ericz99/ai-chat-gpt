"use client";

import React from "react";
import { BiRefresh } from "react-icons/bi";

type ChatMessageBoxProps = {
  onChange: (e: any) => void;
  value: string;
  onKeyDown: (e: any) => void;
  onHandleRegenerate: () => void;
  hasInitialResponse: boolean;
};

export default function ChatMessageBox({
  onChange,
  value,
  onKeyDown,
  hasInitialResponse,
}: ChatMessageBoxProps) {
  return (
    <div className="flex w-full py-12 border-t-2 border-solid flex-col gap-8">
      {hasInitialResponse && (
        <div className="w-full max-w-4xl mx-auto container flex items-center justify-center">
          <button type="button" className="p-4 border-2 border-black/10">
            <div className="flex gap-4">
              <BiRefresh color="gray" size={24} />
              Regenerate Response
            </div>
          </button>
        </div>
      )}

      <div className="relative w-full max-w-4xl mx-auto container">
        <textarea
          style={{ height: "96px", maxHeight: "200px" }}
          className="rounded-lg w-full p-4 border-solid border-2 resize-none"
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={value}
        />
      </div>
    </div>
  );
}
