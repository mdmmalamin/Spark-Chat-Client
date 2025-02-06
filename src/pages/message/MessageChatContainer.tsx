import { ScrollArea } from "@radix-ui/react-scroll-area";

type TMessage = {
  id: number;
  text: string;
  sender: "user" | "partner";
};

const MessageChatContainer = ({ messages }: { messages: TMessage[] }) => {
  return (
    <ScrollArea className="flex-1 p-4">
      <div className="space-y-4">
        {messages.map((message: TMessage) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`rounded-lg px-4 py-2 max-w-[70%] ${
                message.sender === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 text-white"
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default MessageChatContainer;
