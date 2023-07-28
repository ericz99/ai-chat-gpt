import { Ref, forwardRef, useEffect, useRef } from "react";

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
  const $scrollToBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (streaming && ref.current) {
      // # to the bottom
      // ref.current.scrollTop = ref.current.scrollHeight;

      ref.current.scrollIntoView();
      $scrollToBottomRef.current?.scrollIntoView();
      // Accessing .current with the correct type
    }
  }, [streaming, ref]);

  return (
    <div className="flex-1 flex flex-col w-full h-full overflow-hidden">
      <div
        className="flex flex-col justify-start items-start h-full w-full overflow-y-scroll"
        ref={ref}
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
