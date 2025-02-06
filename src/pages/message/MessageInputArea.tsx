import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendHorizontal } from "lucide-react";
import { useState } from "react";
import { Message } from "./MessagePage";

const MessageInputArea = ({
  messages,
  setMessages,
}: {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}) => {
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        { id: messages.length + 1, text: newMessage, sender: "user" },
      ]);
      setNewMessage("");
    }
  };
  return (
    <div className="p-4 border-t border-gray-800">
      <div className="flex gap-2">
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 bg-gray-800 border-0 focus-visible:ring-0 text-white placeholder:text-gray-400"
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <Button
          size="icon"
          className="bg-blue-600 hover:bg-blue-700"
          onClick={handleSendMessage}
        >
          <SendHorizontal className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default MessageInputArea;
