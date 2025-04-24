
"use client";
import React, { useState } from "react";
import { cn } from "../../lib/utils";



export function CardHoverEffect({ items, className }) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", className)}>
      {items.map((item, i) => (
        <CardItem key={i} item={item} index={i} />
      ))}
    </div>
  );
}

function CardItem({ item, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={cn(
        "relative group p-4 h-[180px] rounded-xl border border-neutral-200 dark:border-neutral-800",
        "bg-white dark:bg-neutral-950",
        "overflow-hidden transition-all duration-300",
        "hover:shadow-xl hover:shadow-neutral-100/50 dark:hover:shadow-neutral-900/50 hover:border-neutral-300 dark:hover:border-neutral-700"
      )}
      style={{
        animationDelay: `${index * 50}ms`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative z-10">
        <div className="p-2 inline-block rounded-lg bg-neutral-100 dark:bg-neutral-900 mb-3">
          {item.icon}
        </div>
        <h3 className="font-medium text-lg mb-1 tracking-tight">{item.title}</h3>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
          {item.description}
        </p>
      </div>
      
      {/* Subtle gradient background */}
      <div
        className={cn(
          "absolute inset-0 opacity-0 group-hover:opacity-100",
          "bg-gradient-to-br from-neutral-50/50 to-neutral-100/50 dark:from-neutral-900/50 dark:to-neutral-800/50",
          "transition-opacity duration-500"
        )}
      />
      
      {/* Interactive Dots */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "absolute w-2 h-2 rounded-full bg-primary/20",
              "transform transition-transform duration-500 ease-out",
              hovered ? "scale-100" : "scale-0"
            )}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transitionDelay: `${i * 100}ms`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
