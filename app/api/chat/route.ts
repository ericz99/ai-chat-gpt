import { Configuration, OpenAIApi } from "openai-edge";
import type { ChatCompletionRequestMessage } from "openai-edge";
import { prisma } from "@/lib";
import { getServerSession } from "next-auth/next";

import { authOptions } from "@/auth";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openAI = new OpenAIApi(configuration);

export const config = {
  runtime: "edge",
  unstable_allowDynamic: ["/node_modules/function-bind/**"],
};

type RequestBody = {
  messages: ChatCompletionRequestMessage[];
  chatId: string;
};

export async function POST(req: Request, res: Response) {
  try {
    const session = await getServerSession(authOptions);
    const { messages, chatId } = (await req.json()) as RequestBody;

    await prisma.$transaction(async (tx) => {
      const chatConversation = await tx.chatConversation.findFirst({
        where: {
          id: chatId,
        },
      });

      if (chatConversation) return chatConversation;

      return tx.chatConversation.create({
        data: {
          id: chatId,
          user: {
            connect: {
              id: session?.user.id,
            },
          },
          title: chatId,
        },
      });
    });

    // # create chat completetion prompt
    const response = await openAI.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: messages,
      user: "user-1-hardcode",
      temperature: 0.5,
      max_tokens: 500,
      top_p: 0.5,
      frequency_penalty: 0.5,
      presence_penalty: 0.2,
      stream: true,
    });

    return new Response(response.body, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "text/event-stream;charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        "X-Accel-Buffering": "no",
      },
    });
  } catch (error: any) {
    console.log("hello");
    console.error(error);
    if (error.response) {
      console.error(error.response.status);
      console.error(error.response.data);
    } else {
      console.error(error.message);
    }

    return new Response(JSON.stringify(error), {
      status: 400,
      headers: {
        "content-type": "application/json",
      },
    });
  }
}
