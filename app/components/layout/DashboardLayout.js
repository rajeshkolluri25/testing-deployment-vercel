"use client";
import React, { useState, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { cn } from "../../lib/utils";



export const DashboardLayout = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Add a slight delay to allow for initial animations
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="h-screen flex overflow-hidden bg-background">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        onToggle={toggleSidebar} 
        className={cn(
          isLoaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4",
          "transition-all duration-500 ease-out"
        )}
      />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header 
          toggleSidebar={toggleSidebar} 
          sidebarCollapsed={sidebarCollapsed}
          className={cn(
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4",
            "transition-all duration-500 ease-out"
          )}
        />
        <main 
          className={cn(
            "flex-1 overflow-y-auto p-6 pt-0",
            "overscroll-none",
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
            "transition-all duration-700 ease-out delay-200"
          )}
          style={{ 
            scrollbarWidth: 'thin',
            scrollbarColor: 'var(--muted-foreground) transparent'
          }}
        >
          <div className="container max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
