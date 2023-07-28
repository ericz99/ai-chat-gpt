import React, { Ref, forwardRef } from "react";
import { AiOutlineRobot } from "react-icons/ai";

type MessageSystemProps = {
  content: string;
  role: string;
};

const SystemMessage = forwardRef(function SystemMessage(
  { content }: MessageSystemProps,
  ref?: Ref<HTMLParagraphElement> | undefined
) {
  return (
    <div className="py-8 px-4 w-full border-b border-black/10 bg-gray-50 text-white">
      <div className="max-w-6xl mx-auto px-4 flex items-center gap-8">
        <div className="border-2 border-solid rouned-md border-black inline-block p-2 ml-2">
          <AiOutlineRobot size={20} color="#000000" />
        </div>

        <p ref={ref} className="text-black">
          {content}
        </p>
      </div>
    </div>
  );
});

export default SystemMessage;
