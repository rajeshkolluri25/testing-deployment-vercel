
import React from "react";
import { TabsList, TabsTrigger } from "../ui/tabs";
import { UserSearchBar } from "./UserSearchBar";



export const UserTabs= ({ 
  activeTab, 
  onTabChange, 
  searchTerm, 
  onSearchChange,
  mainTab 
}) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between mb-4">
        <TabsList>
          {mainTab === 'sellers' ? (
            <>
              <TabsTrigger value="all">All Sellers</TabsTrigger>
              <TabsTrigger value="agents">Agents</TabsTrigger>
              <TabsTrigger value="owners">Owners</TabsTrigger>
              <TabsTrigger value="builders">Builders</TabsTrigger>
            </>
          ) : (
            <>
              <TabsTrigger value="all">All Customers</TabsTrigger>
              <TabsTrigger value="verified">Verified</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
            </>
          )}
        </TabsList>
        <UserSearchBar 
          searchTerm={searchTerm} 
          onSearchChange={onSearchChange} 
        />
      </div>
    </div>
  );
};
