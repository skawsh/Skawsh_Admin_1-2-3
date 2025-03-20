
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminProfile from "@/components/settings/AdminProfile";
import UpdatePassword from "@/components/settings/UpdatePassword";
import AddAdminUser from "@/components/settings/AddAdminUser";

const Settings = () => {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
      </div>
      
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="profile">Admin Profile</TabsTrigger>
          <TabsTrigger value="password">Update Password</TabsTrigger>
          <TabsTrigger value="add-admin">Add Admin User</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="space-y-4">
          <AdminProfile />
        </TabsContent>
        
        <TabsContent value="password" className="space-y-4">
          <UpdatePassword />
        </TabsContent>
        
        <TabsContent value="add-admin" className="space-y-4">
          <AddAdminUser />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
