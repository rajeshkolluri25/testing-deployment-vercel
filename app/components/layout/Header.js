import React, { useState, useEffect } from "react";
import { Bell, Menu, X, Sun, Moon } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";
import { useIsMobile } from "../../hooks/use-mobile";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { LoginDrawer } from "./LoginDrawer";
import { useSelector, useDispatch } from "react-redux";
import { clearAdminCookie } from "../../components/auth-helpers/cookie";
import { clearAdminData } from "../../../app/redux/authentication/authUserSlice";
import { useRouter } from "next/navigation";

export const Header = ({ toggleSidebar, sidebarCollapsed, className }) => {
  const dispatch = useDispatch();
  const isMobile = useIsMobile();
  const router = useRouter();
  const [theme, setTheme] = useState("light");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const adminData = useSelector((state) => state.authUser.adminData);
  console.log("Admin data", adminData);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsScrolled(offset > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark");
  };
  const handleSignOut = () => {
    dispatch(clearAdminData());
    clearAdminCookie("zenrthAdminToken");
    clearAdminCookie("adminToken");
    router.push("/");
    // console.log("signout", roleId);
  };

  return (
    <header
      className={cn(
        "bg-background/95 backdrop-blur-md sticky top-0 z-10",
        "h-16 flex items-center px-6",
        "transition-all duration-200",
        isScrolled && "border-b shadow-sm",
        className
      )}
    >
      <div className="flex items-center w-full justify-between gap-2">
        <div className="flex items-center gap-4">
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="md:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}
          {!isMobile && sidebarCollapsed && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="hidden md:flex"
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}
          <h1 className="text-xl font-medium animate-fade-in">
            Real Estate Dashboard
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="text-muted-foreground hover:text-foreground"
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>

          {adminData?.unique_id ? (
            <>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative text-muted-foreground hover:text-foreground"
                  >
                    <Bell className="h-5 w-5" />
                    <span className="absolute -top-0.5 -right-0.5 bg-primary h-2 w-2 rounded-full" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0" align="end">
                  <div className="p-4 border-b">
                    <h3 className="font-medium">Notifications</h3>
                  </div>
                  <div className="py-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="px-4 py-3 hover:bg-muted transition-colors"
                      >
                        <div className="flex items-start gap-3">
                          <span className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-primary" />
                          <div className="space-y-1 flex-1">
                            <p className="text-sm font-medium">
                              New property listing
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Jane Cooper submitted a new property for review.
                            </p>
                            <p className="text-xs text-muted-foreground">
                              2 hours ago
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-2 border-t">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-center"
                    >
                      View all notifications
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-2 ml-2"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="Admin"
                      />
                      <AvatarFallback>AD</AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-sm hidden md:block">
                      Admin
                    </span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-60 p-0" align="end">
                  <div className="p-4 border-b">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage
                          src="https://github.com/shadcn.png"
                          alt="Admin"
                        />
                        <AvatarFallback>AD</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">Admin User</h3>
                        <p className="text-xs text-muted-foreground">
                          admin@example.com
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="py-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start pl-4 py-2 h-9 text-destructive hover:text-destructive/90"
                      // onClick={() => setIsLoggedIn(false)}
                      onClick={handleSignOut}
                    >
                      Log out
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </>
          ) : (
            <LoginDrawer onLogin={() => setIsLoggedIn(true)} />
          )}
        </div>
      </div>
    </header>
  );
};
