
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminProfile from "@/components/settings/AdminProfile";
import UpdatePassword from "@/components/settings/UpdatePassword";
import { Settings as SettingsIcon } from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";

const Settings = () => {
  // Calculate current time for display
  const currentTime = new Date();
  const hours = currentTime.getHours().toString().padStart(2, '0');
  const minutes = currentTime.getMinutes().toString().padStart(2, '0');
  const seconds = currentTime.getSeconds().toString().padStart(2, '0');
  const timeString = `${hours}:${minutes}:${seconds}`;
  
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar collapsed={false} className="flex-shrink-0" />
      
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto py-6 space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-1 flex items-center gap-2">
                <SettingsIcon className="h-8 w-8" />
                Settings
              </h1>
              <p className="text-gray-500">View and manage admin settings</p>
              <p className="text-sm text-gray-400 mt-1">Last updated: {timeString}</p>
            </div>
          </div>
          
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="profile">Admin Profile</TabsTrigger>
              <TabsTrigger value="password">Update Password</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile" className="space-y-4">
              <AdminProfile />
            </TabsContent>
            
            <TabsContent value="password" className="space-y-4">
              <UpdatePassword />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Settings;

