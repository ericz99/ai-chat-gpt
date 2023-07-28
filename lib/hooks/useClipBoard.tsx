"use client";

import { useState } from "react";

export default function useClipBoard(timeout = 2000) {
  const [isCopied, setClipboard] = useState<boolean>(false);

  const copyToClipboard = (value: string) => {
    if (
      typeof window == "undefined" ||
      !window ||
      !navigator.clipboard.writeText
    )
      return;

    if (!value) return;

    navigator.clipboard.writeText(value).then(() => {
      setClipboard(true);

      setTimeout(() => {
        setClipboard(false);
      }, timeout);
    });
  };

  return { isCopied, copyToClipboard };
}
