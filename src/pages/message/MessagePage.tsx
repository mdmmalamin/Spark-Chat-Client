import { useState } from "react";
import MessageHeader from "./MessageHeader";
import MessageChatContainer from "./MessageChatContainer";
import MessageInputArea from "./MessageInputArea";
import MessageUsersList from "./MessageUsersList";

export type Message = {
  id: number;
  text: string;
  sender: "user" | "partner";
};

const MessagePage = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hi, how can I help you today?", sender: "partner" },
    { id: 2, text: "Hey, I'm having trouble with my account.", sender: "user" },
    { id: 3, text: "What seems to be the problem?", sender: "partner" },
    { id: 4, text: "I can't log in.", sender: "user" },
  ]);

  return (
    <div className="flex h-screen bg-black text-white">
      {/* Left side - Chat */}
      <div className="flex flex-col w-2/3 border-r border-gray-800">
        {/* Chat Header */}
        <MessageHeader />

        {/* Chat Messages */}
        <MessageChatContainer messages={messages} />

        {/* Message Input */}
        <MessageInputArea messages={messages} setMessages={setMessages} />
      </div>

      {/* Right side - Users list */}
      <MessageUsersList />
    </div>
  );
};

export default MessagePage;
