import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LayoutDashboard, LogOut, Settings, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import useSessionStore from "@/store/session";

export default function AdminProfile() {
  const navigate = useNavigate();
  const logout = useSessionStore((state) => state.logout);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleLogout = async () => {
    logout();
    navigate("/sign-in");
  };

  return (
    <div className="h-full flex items-center">
      <DropdownMenu>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <div className="cursor-pointer">
                  <img
                    src="/assets/images/profile_Image.jpg"
                    className="w-8 h-8 rounded-full object-cover"
                    alt="profile"
                  />
                </div>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent className="bg-white text-[#41A3FF] border">
              <p>Profile</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>
            <div className="flex flex-col items-start gap-x-2">
              <p>Kazi Mahasin Azim</p>
              <p className="text-xs font-normal text-muted-foreground">
                admin@emeacademy.in
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <Link to="/dashboard/profile">
              <DropdownMenuItem className="text-[#878787] text-xs cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
            </Link>

            <Link to="/dashboard">
              <DropdownMenuItem className="text-[#878787] text-xs cursor-pointer">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                <span>Dashboard</span>
              </DropdownMenuItem>
            </Link>

            <Link to="/dashboard/settings">
              <DropdownMenuItem className="text-[#878787] text-xs cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>

          <DropdownMenuItem
            className="text-[#878787] text-xs cursor-pointer"
            onClick={() => setIsAlertOpen(true)}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Logout Confirmation */}
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent className="max-w-sm flex flex-col gap-y-4">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center text-sm">
              Are you sure you want to Logout?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter className="grid grid-cols-2 gap-4 px-10">
            <AlertDialogCancel className="bg-gray-100">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleLogout}
              className="bg-red-500 text-white"
            >
              Logout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
