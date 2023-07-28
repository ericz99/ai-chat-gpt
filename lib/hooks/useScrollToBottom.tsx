"use client";

import { useState, useEffect } from "react";

export default function useScrollToBottom(offset = 0) {
  const [isAtBottom, setBottom] = useState<boolean>(false);

  useEffect(() => {
    const handleScrollToBottom = () => {
      setBottom(
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - offset
      );
    };

    window.addEventListener("scroll", handleScrollToBottom, { passive: true });
    handleScrollToBottom();

    return () => {
      window.removeEventListener("scroll", handleScrollToBottom);
    };
  }, [offset]);

  return isAtBottom;
}
