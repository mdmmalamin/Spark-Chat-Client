import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { logout, selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { LogOut } from "lucide-react";

const MessageHeader = () => {
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  const myProfile = useAppSelector(selectCurrentUser);
  console.log(myProfile);

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-800">
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={myProfile?.avatar} alt={myProfile?.name} />
          <AvatarFallback className="bg-gray-700 font-bold">
            {myProfile?.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium">{myProfile?.name}</div>
          <div className="text-sm text-gray-400">{myProfile?.email}</div>
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
