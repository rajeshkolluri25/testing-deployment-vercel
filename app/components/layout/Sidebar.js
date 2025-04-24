
import React, { useState, useEffect } from "react";
import { cn } from "../../lib/utils";
// import { Link, useLocation } from "react-router-dom";
import Link from "next/link";
import { usePathname } from "next/navigation"

import { 
  Home, 
  Building, 
  UserPlus, 
  Users, 
  Activity, 
  MessageSquare, 
  Flag, 
  User, 
  ChevronLeft, 
  ChevronRight,
  LayoutDashboard,
  Settings
} from "lucide-react";
import { Button } from "../ui/button";
import "../../page.module.css"




export const Sidebar = ({ collapsed, onToggle, className }) => {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    { title: "Dashboard", path: "/", icon: LayoutDashboard },
    { title: "Properties", path: "/properties", icon: Building, badge: 5 },
    { title: "Users", path: "/users", icon: Users },
    // { title: "Messages", path: "/messages", icon: MessageSquare, badge: 3 },
    { title: "Reports", path: "/reports", icon: Flag, badge: 2 },
  ];

  // Function to determine if a route is active
  const isActiveRoute = (path)=> {
    if (path === "/" && pathname === "/") return true
    if (path !== "/" && pathname.startsWith(path)) return true
    return false
  };

  return (
    <aside
      className={cn(
        "bg-sidebar relative z-20",
        "border-r border-sidebar-border",
        "transition-all ease-in-out duration-300",
        collapsed ? "w-20" : "w-64",
        className
      )}
    >
      <div className="h-full flex flex-col">
        <div className={cn(
          "flex items-center p-4 h-16",
          collapsed ? "justify-center" : "justify-between",
          "border-b border-sidebar-border"
        )}>
          {!collapsed && (
            <div className="flex items-center gap-2 animate-fade-in">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                <span className="text-white font-semibold text-sm">RE</span>
              </div>
              <span className="font-semibold text-sidebar-foreground">
                RealEstate Admin
              </span>
            </div>
          )}
          {collapsed && (
            <div className="animate-fade-in">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                <span className="text-white font-semibold text-sm">RE</span>
              </div>
            </div>
          )}
          
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "text-sidebar-foreground hover:text-sidebar-primary",
              "hover:bg-sidebar-accent",
              collapsed && "hidden"
            )}
            onClick={onToggle}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>

        <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
          {navItems.map((item, index) => (
            <Link
              key={item.path}
              href={item.path}
              className={cn(
                "flex items-center justify-start px-4 py-3 rounded-md",
                "text-sm font-medium",
                "transition-all duration-200 ease-in-out",
                isActiveRoute(item.path)
                  ? "bg-sidebar-accent text-sidebar-primary font-medium"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-primary",
                collapsed ? "justify-center" : "justify-start",
                !mounted ? "opacity-0" : "opacity-100 transform translate-y-0",
              )}
              style={{
                transitionDelay: `${100 + index * 50}ms`,
              }}
            >
              <item.icon 
                className={cn(
                  "flex-shrink-0",
                  collapsed ? "w-5 h-5" : "w-5 h-5 mr-3",
                )}
              />
              {!collapsed && <span>{item.title}</span>}
              
              {item.badge && !collapsed && (
                <span className="ml-auto bg-primary text-white text-xs font-medium px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
              
              {item.badge && collapsed && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white text-[10px]">{item.badge}</span>
                </span>
              )}
            </Link>
          ))}
        </nav>

       
      </div>
    </aside>
  );
};
