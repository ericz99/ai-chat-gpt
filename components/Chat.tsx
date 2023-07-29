"use client";

import { useState, useRef, useEffect } from "react";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { ConversationShared, Message } from "@/lib";

import ChatMessageBox from "./ChatMessageBox";
import ChatMessageList from "./ChatMessageList";
import { createId } from "@paralleldrive/cuid2";

type ChatProps = {
  id: string;
  initialMessages?: Message[];
};

export default function Chat({ initialMessages, id }: ChatProps) {
  const $formRef = useRef<HTMLFormElement>(null);
  const $answerRef = useRef<HTMLParagraphElement>(null);
  const [prompt, setPrompt] = useState<string>("");
  const [cache, setCache] = useState<string | null>(null);
  const [streaming, setStreaming] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [canRegenerate, setCanRegenerate] = useState<boolean>(false);

  useEffect(() => {
    if (initialMessages && initialMessages.length > 0) {
      setChatHistory(initialMessages);
    }
  }, [initialMessages]);

  useEffect(() => {
    if (canRegenerate) {
      console.log("gen?");
      if ($formRef.current) {
        // # directly submit format again
        $formRef.current?.requestSubmit();
      }
    }
  }, [canRegenerate]);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setPrompt(e.target.value);

  const onClose = () => {
    setStreaming(false);
    setChatHistory((prev) => [
      ...prev,
      {
        id: createId(),
        role: "system",
        content: $answerRef.current?.innerHTML!,
      },
    ]);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt) return;
    if ($answerRef.current) $answerRef.current.innerHTML = "";
    setStreaming(true);
    setError(null);

    // # update chat history
    setChatHistory((prev) => [
      ...prev,
      {
        id: createId(),
        role: "user",
        content: `${
          canRegenerate
            ? "Please regenerate new response for: " + prompt
            : prompt
        }`,
      },
    ]);

    fetchEventSource("/api/chat", {
      method: "POST",
      body: JSON.stringify({
        chatId: id,
        messages:
          chatHistory.length === 0
            ? [
                {
                  role: "system",
                  content:
                    "You are an AI with amazing knowledge, please respond back like an human.",
                },
                {
                  role: "user",
                  content: prompt,
                },
              ]
            : [
                {
                  role: "user",
                  content: prompt,
                },
              ],
      }),
      openWhenHidden: true,
      async onopen(res) {
        console.log(res);
      },
      onmessage(msg) {
        const { data } = msg;

        try {
          if (data == "[DONE]") return;
          let text = JSON.parse(data).choices[0].delta.content;
          if (text) {
            $answerRef.current!.innerHTML += text;
          }
        } catch (err) {
          console.log(err);
          console.log(`Failed to parse data: ${data}`);
        }
      },
      onclose() {
        console.log("closed");
        onClose();
      },
      onerror(e) {
        console.log("error");
        console.log(e);
        setStreaming(false);

        if (e) {
          setError(`Invalid request: Error ${e}`);
        }
      },
    });

    setCache(prompt);
    setPrompt("");
    setCanRegenerate(false);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && e.shiftKey == false) {
      e.preventDefault();
      e.stopPropagation();
      $formRef.current?.requestSubmit();
    }
  };

  return (
    <div className="flex flex-col min-h-screen relative w-full">
      <ChatMessageList
        ref={$answerRef}
        error={error}
        streaming={streaming}
        chatHistory={chatHistory}
      />

      <form onSubmit={onSubmit} ref={$formRef}>
        <div className="w-full">
          <ChatMessageBox
            onChange={onChange}
            onKeyDown={onKeyDown}
            value={prompt}
            onHandleRegenerate={() => setCanRegenerate(true)}
            hasInitialResponse={!!$answerRef.current?.innerHTML}
          />
        </div>
      </form>
    </div>
  );
}
