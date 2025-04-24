
import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";
import { CheckCircle, Building, Home } from "lucide-react";



export const SellerCard = ({ seller, className, onViewProfile }) => {
  // Helper function to get seller type icon
  const getSellerTypeIcon = () => {
    switch (seller.type) {
      case "agent":
        return <Home className="h-3 w-3" />;
      case "builder":
        return <Building className="h-3 w-3" />;
      case "owner":
        return <Home className="h-3 w-3" />;
      default:
        return null;
    }
  };

  // Format seller type text with proper capitalization
  const formatSellerType = (type) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-300 border",
      "hover:shadow-md hover:border-border/80 hover:translate-y-[-4px]",
      className
    )}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 border-2 border-background">
              <AvatarImage src={seller.image} alt={seller.name} />
              <AvatarFallback>
                {seller.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-medium text-base">{seller.name}</h3>
                {seller.verified && (
                  <CheckCircle className="h-4 w-4 text-blue-500 fill-blue-500" />
                )}
              </div>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Badge variant="outline" className="px-1.5 py-0 text-xs font-normal">
                  <span className="flex items-center gap-1">
                    {getSellerTypeIcon()}
                    {formatSellerType(seller.type)}
                  </span>
                </Badge>
                <span className="text-xs">•</span>
                <span className="text-xs">{seller.location}</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1 text-amber-500">
              <span className="text-sm font-medium">{seller.rating.toFixed(1)}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
                  fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Properties</p>
            <p className="font-medium">{seller.properties}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Joined</p>
            <p className="font-medium">{seller.joinDate}</p>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between p-6 pt-3 border-t bg-muted/10">
        <Button 
          variant="outline" 
          size="sm" 
          className="text-xs h-8 w-full"
          onClick={() => onViewProfile?.(seller)}
        >
          View Profile
        </Button>
      </CardFooter>
    </Card>
  );
};
