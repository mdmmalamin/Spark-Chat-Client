import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Search } from "lucide-react";
import { useGetAllChatsQuery } from "@/redux/features/chat/chatApi";

export type Root = {
  _id: string;
  members: Member[];
  unreadMessageCount: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  lastMessage: LastMessage;
};

export type Member = {
  _id: string;
  name: string;
  role: string;
  email: string;
  status: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type LastMessage = {
  _id: string;
  chatId: string;
  sender: string;
  text: string;
  read: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

const MessageChatsList = () => {
  const {
    data: chatsData,
    isLoading,
    isFetching,
  } = useGetAllChatsQuery(undefined);

  console.log(chatsData, isLoading, isFetching);

  return (
    <div className="w-1/4 flex flex-col">
      <div className="p-4 border-b border-gray-800">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search users..."
            className="pl-10 bg-gray-800 border-0 focus-visible:ring-0 text-white placeholder:text-gray-400"
          />
        </div>
      </div>
      <ScrollArea className="flex-1">
        {chatsData?.data?.map((chat: Root) => (
          <div
            key={chat._id}
            className="flex items-center gap-3 p-4 hover:bg-gray-800 cursor-pointer"
          >
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={chat?.members?.[1]?.avatar}
                alt={chat?.members?.[1]?.name}
              />
              <AvatarFallback className="bg-gray-700 font-bold">
                {chat?.members?.[1]?.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline">
                <div className="font-medium truncate">
                  {chat?.members?.[1]?.name}
                </div>
                <div className="text-xs text-gray-400">12:34 PM</div>
              </div>
              <div className="text-sm text-gray-400 truncate">
                {chat?.lastMessage?.text || "No messages yet"}
              </div>
            </div>
            {/* {user.online && (
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            )} */}
          </div>
        ))}
      </ScrollArea>
    </div>
  );
};

export default MessageChatsList;
