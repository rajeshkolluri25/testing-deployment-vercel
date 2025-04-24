"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Search, ChevronDown, Check, MoreHorizontal } from "lucide-react";
import { cn } from "../lib/utils";
import { Badge } from "../components/ui/badge";
import "../index.css";

// Sample messages data
const conversations = [
  {
    id: "1",
    user: {
      name: "John Doe",
      image: "",
      type: "customer",
    },
    seller: {
      name: "Sarah Johnson",
      image: "",
      type: "agent",
    },
    property: "Lakeside Villa",
    lastMessage:
      "I'm interested in scheduling a viewing this weekend. Is Saturday morning available?",
    timestamp: "10:32 AM",
    unread: true,
    date: "Today",
  },
  {
    id: "2",
    user: {
      name: "Michael Brown",
      image: "",
      type: "customer",
    },
    seller: {
      name: "David Wilson",
      image: "",
      type: "owner",
    },
    property: "Downtown Apartment",
    lastMessage:
      "Thanks for the information. I'll get back to you shortly with my decision.",
    timestamp: "Yesterday",
    unread: false,
    date: "Yesterday",
  },
  {
    id: "3",
    user: {
      name: "Emily Wilson",
      image: "",
      type: "customer",
    },
    seller: {
      name: "Robert Garcia",
      image: "",
      type: "builder",
    },
    property: "Sunset Heights Complex",
    lastMessage:
      "Could you please send me the floor plans for the 2-bedroom units?",
    timestamp: "Mon",
    unread: false,
    date: "Monday",
  },
  {
    id: "4",
    user: {
      name: "Jennifer Martinez",
      image: "",
      type: "agent",
    },
    seller: {
      name: "Thomas Clark",
      image: "",
      type: "agent",
    },
    property: "Riverfront Estate",
    lastMessage:
      "I have a client who's very interested in your listing. Can we discuss commission details?",
    timestamp: "Sun",
    unread: true,
    date: "Sunday",
  },
  {
    id: "5",
    user: {
      name: "William Taylor",
      image: "",
      type: "customer",
    },
    seller: {
      name: "Sophia Lee",
      image: "",
      type: "owner",
    },
    property: "Garden Terrace",
    lastMessage:
      "What are the terms for the lease? Is it flexible for a 6-month period?",
    timestamp: "Feb 15",
    unread: false,
    date: "Feb 15, 2023",
  },
];

const Messages = () => {
  const [selectedConversation, setSelectedConversation] = useState(
    conversations[0]
  );

  return (
    <div className="space-y-8 py-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
        <p className="text-muted-foreground mt-1">
          Monitor conversations between customers and sellers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <Card className="md:col-span-1 lg:col-span-1 border shadow-sm">
          <CardHeader className="p-4">
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search messages..."
                className="pl-8 w-full"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-[calc(100vh-300px)] overflow-auto">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={cn(
                    "flex items-start gap-3 p-4 cursor-pointer hover:bg-muted/50 transition-colors",
                    selectedConversation.id === conversation.id && "bg-muted",
                    conversation.id !==
                      conversations[conversations.length - 1].id && "border-b"
                  )}
                  onClick={() => setSelectedConversation(conversation)}
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={conversation.user.image}
                      alt={conversation.user.name}
                    />
                    <AvatarFallback>
                      {conversation.user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-sm truncate">
                        {conversation.user.name}
                      </p>
                      <span className="text-xs text-muted-foreground">
                        {conversation.timestamp}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {conversation.property}
                    </p>
                    <p className="text-xs truncate">
                      {conversation.lastMessage}
                    </p>
                  </div>
                  {conversation.unread && (
                    <div className="h-2 w-2 bg-primary rounded-full flex-shrink-0 mt-2"></div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 lg:col-span-3 border shadow-sm overflow-hidden">
          {selectedConversation ? (
            <>
              <CardHeader className="p-4 border-b flex flex-row items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={selectedConversation.user.image}
                      alt={selectedConversation.user.name}
                    />
                    <AvatarFallback>
                      {selectedConversation.user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-base">
                        {selectedConversation.user.name}
                      </CardTitle>
                      <Badge variant="outline" className="text-xs">
                        {selectedConversation.user.type}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground flex items-center gap-2">
                      <span>Property:</span>
                      <span className="font-medium">
                        {selectedConversation.property}
                      </span>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </CardHeader>

              <div className="h-[calc(100vh-400px)] overflow-auto p-4">
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <Badge variant="outline" className="text-xs">
                      Conversation started on {selectedConversation.date}
                    </Badge>
                  </div>

                  <div className="flex items-start gap-3 max-w-[80%]">
                    <Avatar className="h-8 w-8 mt-1">
                      <AvatarFallback>
                        {selectedConversation.user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="bg-muted p-3 rounded-lg">
                        <p className="text-sm">
                          {selectedConversation.lastMessage}
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {selectedConversation.timestamp}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 max-w-[80%] ml-auto flex-row-reverse">
                    <Avatar className="h-8 w-8 mt-1">
                      <AvatarFallback>
                        {selectedConversation.seller.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <p className="text-sm">
                          Thank you for your interest. Yes, Saturday at 10 AM
                          works for me. I&apos;ll send you the address details.
                        </p>
                      </div>
                      <div className="flex justify-end">
                        <p className="text-xs text-muted-foreground mt-1">
                          10:45 AM
                        </p>
                        <Check className="h-3 w-3 text-primary ml-1 mt-1" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input placeholder="Type a message..." className="flex-1" />
                  <Button>Send</Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Admins can respond to provide support or resolve issues
                </p>
              </div>
            </>
          ) : (
            <div className="h-[calc(100vh-300px)] flex items-center justify-center">
              <p className="text-muted-foreground">
                Select a conversation to view messages
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Messages;
