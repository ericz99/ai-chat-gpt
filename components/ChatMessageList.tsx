import { forwardRef, useEffect, useRef, useState } from "react";

import SystemMessage from "./SystemMessage";
import UserMessage from "./UserMessage";
import { Message } from "@/lib";

type ChatConversationProps = {
  streaming: boolean;
  error: string | null;
  chatHistory: Message[];
};

const ChatMessageList = forwardRef(function ChatMessageList(
  { streaming, error, chatHistory }: ChatConversationProps,
  ref: any
) {
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const $messageListRef = useRef<HTMLDivElement>(null);
  const $scrollToBottomRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   if (streaming && $scrollToBottomRef.current) {
  //     // Scroll to the bottom when streaming
  //     $scrollToBottomRef.current.scrollIntoView({
  //       behavior: "smooth",
  //     });
  //   }
  // }, [streaming]);

  useEffect(() => {
    if (ref && streaming) {
      // When streaming and a new message is appended, scroll to the bottom
      const newMessageElement = ref.current;
      if (newMessageElement) {
        ref.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [streaming, ref]);

  useEffect(() => {
    if ($messageListRef.current) {
      // Check if user has manually scrolled up

      const isAtBottom =
        $messageListRef.current.scrollHeight -
          $messageListRef.current.scrollTop ===
        $messageListRef.current.clientHeight;

      // Scroll to the bottom whenever chatHistory changes or streaming starts
      $messageListRef.current.scrollTop = $messageListRef.current.scrollHeight;
    }
  }, [chatHistory, streaming]);

  return (
    <div className="flex-1 flex flex-col w-full h-full overflow-hidden">
      <div
        className="flex flex-col justify-start items-start h-full w-full overflow-y-scroll"
        ref={$messageListRef}
      >
        {chatHistory.length > 0 &&
          chatHistory.map((message, idx) => {
            const { role, content } = message;

            return (
              <div key={idx} className="block w-full">
                {role === "user" ? (
                  <UserMessage role={role} content={content} />
                ) : (
                  <SystemMessage role={role} content={content} />
                )}
              </div>
            );
          })}

        {streaming && <SystemMessage ref={ref} content="" role="" />}
        {error && <p>{error}</p>}
      </div>

      <div ref={$scrollToBottomRef} />
    </div>
  );
});

export default ChatMessageList;
