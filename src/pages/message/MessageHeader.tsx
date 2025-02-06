import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { logout } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hook";
import { LogOut, Plus } from "lucide-react";
import { useState } from "react";

type User = {
  id: number;
  name: string;
  email: string;
  avatar: string;
  lastMessage: string;
  online: boolean;
};

const MessageHeader = () => {
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  const [users] = useState<User[]>([
    {
      id: 1,
      name: "Sofia Davis",
      email: "sofia@example.com",
      avatar:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-AYNkaSfoDA2kkf6BRCbOaoKV20gFye.png",
      lastMessage: "Sure, I can help with that.",
      online: true,
    },
    {
      id: 2,
      name: "John Doe",
      email: "john@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Thanks for your help!",
      online: false,
    },
    {
      id: 3,
      name: "Alice Smith",
      email: "alice@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "See you tomorrow!",
      online: true,
    },
  ]);
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-800">
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={users[0].avatar} alt={users[0].name} />
          <AvatarFallback>
            {users[0].name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium">{users[0].name}</div>
          <div className="text-sm text-gray-400">{users[0].email}</div>
        </div>
      </div>
      <Button
        onClick={handleLogout}
        variant="ghost"
        size="icon"
        className="text-gray-400"
      >
        <LogOut className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default MessageHeader;
