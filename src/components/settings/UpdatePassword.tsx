
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lock } from "lucide-react";

const UpdatePassword = () => {
  const { toast } = useToast();
  const [adminDrivers, setAdminDrivers] = useState([
    { id: "1", name: "John Doe", email: "john@example.com" },
    { id: "2", name: "Jane Smith", email: "jane@example.com" },
    { id: "3", name: "Mike Johnson", email: "mike@example.com" }
  ]);
  
  const [selectedUser, setSelectedUser] = useState("");

  const [adminPasswordData, setAdminPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [userPasswordData, setUserPasswordData] = useState({
    newPassword: "",
    confirmPassword: ""
  });

  const handleAdminPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAdminPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handleUserPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handleResetAdminPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPasswordData.newPassword !== adminPasswordData.confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "Your new password and confirmation don't match",
        variant: "destructive"
      });
      return;
    }

    // In a real app, you would submit to an API
    toast({
      title: "Password updated",
      description: "Your password has been updated successfully"
    });
    
    setAdminPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
  };

  const handleResetUserPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) {
      toast({
        title: "Select a user",
        description: "Please select a user to update their password",
        variant: "destructive"
      });
      return;
    }

    if (userPasswordData.newPassword !== userPasswordData.confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "The new password and confirmation don't match",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, you would submit to an API
    const targetUser = adminDrivers.find(user => user.id === selectedUser);
    
    toast({
      title: "Password updated",
      description: `${targetUser?.name}'s password has been updated successfully`
    });
    
    setUserPasswordData({
      newPassword: "",
      confirmPassword: ""
    });
    setSelectedUser("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Password Management</CardTitle>
        <CardDescription>Update your password or reset other admin users' passwords</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="your-password">
          <TabsList className="mb-4">
            <TabsTrigger value="your-password">Your Password</TabsTrigger>
            <TabsTrigger value="user-password">Other User Password</TabsTrigger>
          </TabsList>
          
          <TabsContent value="your-password">
            <form onSubmit={handleResetAdminPassword} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword" className="flex items-center gap-2">
                  <Lock className="h-4 w-4" /> Current Password
                </Label>
                <Input
                  id="currentPassword"
                  name="currentPassword"
                  type="password"
                  value={adminPasswordData.currentPassword}
                  onChange={handleAdminPasswordChange}
                  className="max-w-md"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="newPassword" className="flex items-center gap-2">
                  <Lock className="h-4 w-4" /> New Password
                </Label>
                <Input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  value={adminPasswordData.newPassword}
                  onChange={handleAdminPasswordChange}
                  className="max-w-md"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="flex items-center gap-2">
                  <Lock className="h-4 w-4" /> Confirm New Password
                </Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={adminPasswordData.confirmPassword}
                  onChange={handleAdminPasswordChange}
                  className="max-w-md"
                  required
                />
              </div>
              
              <Button type="submit">Update Password</Button>
            </form>
          </TabsContent>
          
          <TabsContent value="user-password">
            <form onSubmit={handleResetUserPassword} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="userSelect">Select User</Label>
                <select
                  id="userSelect"
                  value={selectedUser}
                  onChange={(e) => setSelectedUser(e.target.value)}
                  className="flex h-10 w-full max-w-md rounded-md border border-input bg-background px-3 py-2"
                >
                  <option value="">Select an admin user</option>
                  {adminDrivers.map(user => (
                    <option key={user.id} value={user.id}>
                      {user.name} ({user.email})
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="userNewPassword" className="flex items-center gap-2">
                  <Lock className="h-4 w-4" /> New Password
                </Label>
                <Input
                  id="userNewPassword"
                  name="newPassword"
                  type="password"
                  value={userPasswordData.newPassword}
                  onChange={handleUserPasswordChange}
                  className="max-w-md"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="userConfirmPassword" className="flex items-center gap-2">
                  <Lock className="h-4 w-4" /> Confirm New Password
                </Label>
                <Input
                  id="userConfirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={userPasswordData.confirmPassword}
                  onChange={handleUserPasswordChange}
                  className="max-w-md"
                  required
                />
              </div>
              
              <Button type="submit">Reset User Password</Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default UpdatePassword;
