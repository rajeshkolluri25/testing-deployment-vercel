
import React from "react";
import { Card, CardContent } from "../ui/card";
import { cn } from "../../lib/utils";
import { ArrowDown, ArrowUp } from "lucide-react";


export const StatCard = ({
  title,
  value,
  icon,
  change,
  className,
  contentClassName,
  accentColor = "bg-primary"
}) => {
  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-300 border bg-card shadow-sm",
      "hover:shadow-md hover:border-border/80 hover:scale-[1.02] hover:z-10",
      className
    )}>
      <CardContent className={cn("p-6", contentClassName)}>
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-baseline gap-1">
              <h3 className="text-2xl font-bold tracking-tight">{value}</h3>
              {change && (
                <div className={cn(
                  "flex items-center text-xs font-medium ml-2",
                  change.isPositive ? "text-emerald-500" : "text-red-500"
                )}>
                  {change.isPositive ? (
                    <ArrowUp className="h-3 w-3 mr-0.5" />
                  ) : (
                    <ArrowDown className="h-3 w-3 mr-0.5" />
                  )}
                  {Math.abs(change.value)}%
                </div>
              )}
            </div>
          </div>
          <div className={cn(
            "p-2 rounded-md",
            accentColor
          )}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
