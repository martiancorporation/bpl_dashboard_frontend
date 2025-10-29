import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  LogOut,
  ChevronsLeftRight,
  MessageSquareMore,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useSessionStore from "@/store/session";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "react-toastify";

type MenuItem = {
  icon: React.ComponentType<any>;
  label: string;
  href: string;
  matchPaths: string[];
};

const menuItems: MenuItem[] = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    href: "/dashboard",
    matchPaths: ["/dashboard"],
  },
  {
    icon: MessageSquareMore,
    label: "Survey Data",
    href: "/dashboard/survey-data",
    matchPaths: ["/dashboard/survey-data"],
  },
];

const Sidebar: React.FC = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const logout = useSessionStore((state) => state.logout);

  const handleLogout = async () => {
    logout();
    navigate("/sign-in");
    toast.success("Logged out successfully!");
  };

  const isActiveRoute = (item: MenuItem) => {
    if (item.label === "Dashboard") {
      return pathname === "/dashboard" || pathname === "/";
    }
    return item.matchPaths.some((p) => pathname.startsWith(p));
  };

  return (
    <div
      className={cn(
        "bg-white h-screen flex flex-col border-r transition-all duration-500 relative",
        isCollapsed ? "w-20" : "w-48"
      )}
    >
      <div
        className={
          isCollapsed
            ? " flex  flex-col  justify-center items-center"
            : "flex  flex-col gap-y-0 justify-center items-center "
        }
      >
        <div
          className={
            isCollapsed
              ? ` h-[66px] flex flex-col items-center justify-center `
              : ` h-[66px] flex flex-col items-center justify-center`
          }
        >
          {isCollapsed ? (
            <img
              src={logo}
              alt="Logo"
              className="w-[95px] object-contain"
              width={500}
              height={500}
            />
          ) : (
            <img
              src={logo}
              alt="Logo"
              className="w-[95px] object-contain"
              width={500}
              height={500}
            />
          )}
        </div>
        <div
          className="h-px bg-[#eee]"
          style={{ width: isCollapsed ? "70%" : "80%" }}
        ></div>
        <div className="absolute top-6 -right-4 ">
          <div
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-black cursor-pointer bg-white rounded-xl px-2 py-1 border border-[rgb(0,0,0,0.15)]"
          >
            <ChevronsLeftRight className="w-4" />
          </div>
        </div>
      </div>

      <nav className={isCollapsed ? "px-4 py-3" : "px-4 py-3"}>
        <ul>
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link to={item.href}>
                <span
                  className={cn(
                    "flex items-center gap-x-2 text-sm py-2 px-3 my-3 text-[#4A4A4A] rounded-[6px] hover:bg-[#F2F2F2] hover:text-[#131313] cursor-pointer transition-all",
                    isActiveRoute(item) ? "bg-[#F2F2F2] text-[#131313]" : "",
                    isCollapsed ? "justify-center" : ""
                  )}
                >
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <item.icon className="shrink-0 w-4" />
                      </TooltipTrigger>
                      {isCollapsed && (
                        <TooltipContent className="bg-white text-[#131313] border absolute ml-8">
                          <p>{item.label}</p>
                        </TooltipContent>
                      )}
                    </Tooltip>
                  </TooltipProvider>

                  {/* Animated label */}
                  <AnimatePresence initial={false}>
                    {!isCollapsed && (
                      <motion.span
                        className="whitespace-nowrap overflow-hidden"
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div
        className="h-px bg-[#D0D5DD] mx-auto"
        style={{ width: isCollapsed ? "70%" : "80%" }}
      ></div>

      <div className={isCollapsed ? "px-4 pt-4" : "px-4 pt-4"}>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              className={cn(
                "w-full flex items-center gap-x-2 text-sm py-4 px-3 my-2 justify-center bg-[#EBEBEB] text-[#2B2B2B] hover:bg-gray-100",
                isCollapsed ? "p-2" : ""
              )}
            >
              <LogOut
                className={cn("shrink-0", isCollapsed ? "mr-0" : "mr-0")}
              />
              {!isCollapsed && (
                <span className="text-sm font-medium">Log out</span>
              )}
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent className="w-[400px] flex flex-col gap-y-4">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-center text-sm sm:text-base flex flex-col items-center gap-y-1">
                Are you sure, you want to Logout?
              </AlertDialogTitle>
            </AlertDialogHeader>

            <AlertDialogFooter className="w-full grid grid-cols-2 gap-x-4 px-10 place-content-center content-center">
              <AlertDialogCancel className="bg-gray-100 border text-xs sm:text-sm py-4 hover:bg-gray-200">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleLogout}
                className="bg-red-500 py-4 text-white text-xs sm:text-sm hover:bg-red-600"
              >
                Logout
              </AlertDialogAction>
            </AlertDialogFooter>

            <div className="text-[#52544F] font-normal text-xs leading-4 text-center">
              Facing issues?{" "}
              <span className="text-[#004CA3] font-normal text-xs leading-4">
                Talk to our technical person
              </span>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <div className="w-full flex flex-col items-center absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <AnimatePresence mode="wait">
          {isCollapsed ? (
            <motion.p
              key="collapsed-footer"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-blue-700 font-semibold overflow-hidden whitespace-nowrap"
            >
              M
            </motion.p>
          ) : (
            <motion.div
              key="expanded-footer"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.25 }}
              className="text-center overflow-hidden whitespace-nowrap"
            >
              <div className="text-[#656565] text-sm flex items-center gap-x-1 justify-center">
                Developed By
              </div>
              <a
                href="https://martiancorporation.com/"
                target="_blank"
                rel="noreferrer"
                className="text-[#323232] text-sm hover:text-blue-600 transition"
              >
                Martian Corporation
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Sidebar;
