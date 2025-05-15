
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { UserPlus, Mail, User, Phone } from "lucide-react";

const AddAdminUser = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "admin"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simple validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      toast({
        title: "Missing information",
        description: "Please complete all fields",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Admin user added",
        description: `${formData.name} has been added as an admin user.`
      });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        role: "admin"
      });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <Card className="animate-fade-in shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserPlus className="h-5 w-5" />
          Add New Admin User
        </CardTitle>
        <CardDescription>Add a new administrator to the system</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center gap-2">
              <User className="h-4 w-4" /> Full Name
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter full name"
              value={formData.name}
              onChange={handleChange}
              className="max-w-md"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4" /> Email Address
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="email@example.com"
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
              placeholder="+1 (555) 555-5555"
              value={formData.phone}
              onChange={handleChange}
              className="max-w-md"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="flex h-10 w-full max-w-md rounded-md border border-input bg-background px-3 py-2"
            >
              <option value="admin">Administrator</option>
              <option value="manager">Manager</option>
              <option value="support">Support Staff</option>
            </select>
          </div>
          
          <Button 
            type="submit" 
            className="mt-4"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Adding..." : "Add Admin User"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddAdminUser;
