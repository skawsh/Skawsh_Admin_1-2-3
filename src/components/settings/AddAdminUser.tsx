
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { User, Mail, Phone, Lock } from "lucide-react";

const AddAdminUser = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });
  
  const [admins, setAdmins] = useState([
    { id: "1", username: "Saiteja Samala", email: "saitejasamala@skawsh.com", phone: "+918099830308" }
  ]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "The password and confirmation don't match",
        variant: "destructive"
      });
      return;
    }
    
    // Check if email already exists
    if (admins.some(admin => admin.email === formData.email)) {
      toast({
        title: "Email already exists",
        description: "An admin with this email already exists",
        variant: "destructive"
      });
      return;
    }
    
    // Add new admin to the list
    const newAdmin = {
      id: (admins.length + 1).toString(),
      username: formData.username,
      email: formData.email,
      phone: formData.phone
    };
    
    setAdmins([...admins, newAdmin]);
    
    toast({
      title: "Admin user added",
      description: `${formData.username} has been added as an admin user.`
    });
    
    // Reset form
    setFormData({
      username: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: ""
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Admin User</CardTitle>
        <CardDescription>Create a new administrator account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username" className="flex items-center gap-2">
              <User className="h-4 w-4" /> Admin Name
            </Label>
            <Input
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="max-w-md"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4" /> Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="max-w-md"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center gap-2">
              <Phone className="h-4 w-4" /> Phone Number
            </Label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="max-w-md"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="flex items-center gap-2">
              <Lock className="h-4 w-4" /> Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="max-w-md"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="flex items-center gap-2">
              <Lock className="h-4 w-4" /> Confirm Password
            </Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="max-w-md"
              required
            />
          </div>
          
          <Button type="submit">Add Admin User</Button>
        </form>
        
        {admins.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">Current Admin Users</h3>
            <div className="border rounded-md divide-y">
              {admins.map(admin => (
                <div key={admin.id} className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-medium">{admin.username}</p>
                    <p className="text-sm text-gray-500">{admin.email}</p>
                    <p className="text-sm text-gray-500">{admin.phone}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AddAdminUser;
