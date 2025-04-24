
import React from "react";
import { Filter } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";


export const UserSearchBar = ({ 
  searchTerm, 
  onSearchChange 
}) => {
  return (
    <div className="flex items-center gap-2">
      <Input 
        placeholder="Search users..." 
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="max-w-sm"
      />
      <Button variant="outline" size="icon">
        <Filter className="h-4 w-4" />
      </Button>
    </div>
  );
};
