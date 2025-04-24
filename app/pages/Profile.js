import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import {
  User,
  Mail,
  Phone,
  Shield,
  Bell,
  Layout,
  Palette,
  Sun,
  Moon,
  Monitor,
} from "lucide-react";
import { Switch } from "../components/ui/switch";
import "../index.css";

const Profile = () => {
  return (
    <div className="space-y-8 py-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your account settings and preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card className="border shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle>Profile</CardTitle>
              <CardDescription>
                Manage your personal information
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center py-4">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src="" alt="Admin User" />
                <AvatarFallback className="text-2xl">AU</AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h3 className="font-medium text-lg">Admin User</h3>
                <p className="text-sm text-muted-foreground">
                  System Administrator
                </p>
              </div>
              <div className="w-full mt-6 space-y-2">
                <div className="flex items-center p-2 rounded-md hover:bg-muted transition-colors">
                  <User className="h-4 w-4 mr-3 text-muted-foreground" />
                  <span className="text-sm">Personal Info</span>
                </div>
                <div className="flex items-center p-2 rounded-md hover:bg-muted transition-colors">
                  <Shield className="h-4 w-4 mr-3 text-muted-foreground" />
                  <span className="text-sm">Security</span>
                </div>
                <div className="flex items-center p-2 rounded-md hover:bg-muted transition-colors">
                  <Bell className="h-4 w-4 mr-3 text-muted-foreground" />
                  <span className="text-sm">Notifications</span>
                </div>
                <div className="flex items-center p-2 rounded-md hover:bg-muted transition-colors">
                  <Layout className="h-4 w-4 mr-3 text-muted-foreground" />
                  <span className="text-sm">Appearance</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="w-full grid grid-cols-4">
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="appearance">Appearance</TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    Update your personal details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        defaultValue="Admin User"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="display-name">Display Name</Label>
                      <Input
                        id="display-name"
                        placeholder="johndoe"
                        defaultValue="admin"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="john.doe@example.com"
                        defaultValue="admin@realestate.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        defaultValue="+1 (555) 987-6543"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="avatar">Profile Picture</Label>
                    <Input id="avatar" type="file" className="cursor-pointer" />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>
                    Manage your security preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">
                        Confirm New Password
                      </Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <h3 className="font-medium mb-2">
                      Two-Factor Authentication
                    </h3>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <p className="text-sm">Enhance your account security</p>
                        <p className="text-xs text-muted-foreground">
                          We&apos;ll send you a code via email or authenticator
                          app
                        </p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                  <CardDescription>
                    Configure how you receive notifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <p className="text-sm font-medium">
                          New Property Listings
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Get notified when new properties are listed
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <p className="text-sm font-medium">Property Reports</p>
                        <p className="text-xs text-muted-foreground">
                          Get notified when properties are reported
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <p className="text-sm font-medium">
                          User Registrations
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Get notified when new users register
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <p className="text-sm font-medium">System Updates</p>
                        <p className="text-xs text-muted-foreground">
                          Get notified about system maintenance
                        </p>
                      </div>
                      <Switch />
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <h3 className="font-medium mb-2">Notification Channels</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <p className="text-sm">Email Notifications</p>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm">Browser Notifications</p>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="appearance" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Appearance</CardTitle>
                  <CardDescription>
                    Customize the look and feel of the dashboard
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="font-medium">Theme</h3>
                    <div className="grid grid-cols-3 gap-2">
                      <Button
                        variant="outline"
                        className="flex flex-col items-center justify-center h-24 p-4"
                      >
                        <Sun className="h-8 w-8 mb-2" />
                        <span>Light</span>
                      </Button>
                      <Button
                        variant="outline"
                        className="flex flex-col items-center justify-center h-24 p-4 bg-neutral-950 text-white"
                      >
                        <Moon className="h-8 w-8 mb-2" />
                        <span>Dark</span>
                      </Button>
                      <Button
                        variant="outline"
                        className="flex flex-col items-center justify-center h-24 p-4"
                      >
                        <Monitor className="h-8 w-8 mb-2" />
                        <span>System</span>
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium">Color Scheme</h3>
                    <div className="grid grid-cols-4 gap-2">
                      <div className="h-10 rounded-md bg-blue-500 cursor-pointer ring-2 ring-blue-500 ring-offset-2 ring-offset-background"></div>
                      <div className="h-10 rounded-md bg-purple-500 cursor-pointer"></div>
                      <div className="h-10 rounded-md bg-emerald-500 cursor-pointer"></div>
                      <div className="h-10 rounded-md bg-amber-500 cursor-pointer"></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="space-y-0.5">
                      <p className="text-sm font-medium">Reduced Motion</p>
                      <p className="text-xs text-muted-foreground">
                        Reduce the motion of animations
                      </p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button variant="outline">Reset</Button>
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;
