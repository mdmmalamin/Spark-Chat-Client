import { Input } from "@/components/ui/input";
import { useGetAllUsersQuery } from "@/redux/features/user/userApi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Search } from "lucide-react";

type TUser = {
  _id: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
  status: "ACTIVE" | "BLOCKED";
  avatar?: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
};

const MessageUsersList = () => {
  const {
    data: usersData,
    isLoading,
    isFetching,
  } = useGetAllUsersQuery(undefined);

  console.log(usersData, isLoading, isFetching);

  // const [users] = useState<TUser[]>([
  //   {
  //     id: 1,
  //     name: "Sofia Davis",
  //     email: "sofia@example.com",
  //     avatar:
  //       "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-AYNkaSfoDA2kkf6BRCbOaoKV20gFye.png",
  //     lastMessage: "Sure, I can help with that.",
  //     online: true,
  //   },
  //   {
  //     id: 2,
  //     name: "John Doe",
  //     email: "john@example.com",
  //     avatar: "/placeholder.svg?height=40&width=40",
  //     lastMessage: "Thanks for your help!",
  //     online: false,
  //   },
  //   {
  //     id: 3,
  //     name: "Alice Smith",
  //     email: "alice@example.com",
  //     avatar: "/placeholder.svg?height=40&width=40",
  //     lastMessage: "See you tomorrow!",
  //     online: true,
  //   },
  // ]);

  return (
    <div className="w-1/3 flex flex-col">
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
        {usersData?.data?.map((user: TUser) => (
          <div
            key={user._id}
            className="flex items-center gap-3 p-4 hover:bg-gray-800 cursor-pointer"
          >
            <Avatar className="h-10 w-10">
              <AvatarImage src={user?.avatar} alt={user.name} />
              <AvatarFallback className="bg-gray-700 font-bold">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline">
                <div className="font-medium truncate">{user.name}</div>
                <div className="text-xs text-gray-400">12:34 PM</div>
              </div>
              <div className="text-sm text-gray-400 truncate">
                last message
                {/* {user.lastMessage} */}
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

export default MessageUsersList;
