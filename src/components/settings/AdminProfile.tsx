
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User, Mail, Phone, Edit2, Save, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const AdminProfile = () => {
  const { toast } = useToast();
  const [profile, setProfile] = useState({
    username: "Saiteja Samala",
    email: "saitejasamala@skawsh.com",
    phone: "+918099830308"
  });
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(profile);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.username.trim() || !formData.email.trim() || !formData.phone.trim()) {
      toast({
        title: "Missing information",
        description: "All fields are required",
        variant: "destructive"
      });
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
      return;
    }
    
    setProfile(formData);
    setIsEditing(false);
    
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully."
    });
  };

  // Get initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Card className="animate-fade-in shadow-md hover:shadow-lg transition-all duration-300">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl font-semibold text-primary">Admin Profile</CardTitle>
        <CardDescription className="text-muted-foreground">
          View and manage your admin profile information
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="flex flex-col items-center space-y-3">
            <Avatar className="h-32 w-32 border-4 border-primary/10">
              <AvatarImage src="" alt={profile.username} />
              <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                {getInitials(profile.username)}
              </AvatarFallback>
            </Avatar>
            <p className="text-sm text-muted-foreground">Admin</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6 flex-1">
            <div className="space-y-4">
              <div className="flex flex-col space-y-2">
                <Label htmlFor="username" className="flex items-center gap-2 text-base">
                  <User className="h-4 w-4 text-primary" /> Admin Name
                </Label>
                {isEditing ? (
                  <Input
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="max-w-md input-enhanced"
                    required
                  />
                ) : (
                  <div className="flex items-center h-10 px-3 text-base rounded-md border border-input bg-background/50">
                    {profile.username}
                  </div>
                )}
              </div>

              <div className="flex flex-col space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2 text-base">
                  <Mail className="h-4 w-4 text-primary" /> Email
                </Label>
                {isEditing ? (
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="max-w-md input-enhanced"
                    required
                  />
                ) : (
                  <div className="flex items-center h-10 px-3 text-base rounded-md border border-input bg-background/50">
                    {profile.email}
                  </div>
                )}
              </div>

              <div className="flex flex-col space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2 text-base">
                  <Phone className="h-4 w-4 text-primary" /> Phone Number
                </Label>
                {isEditing ? (
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="max-w-md input-enhanced"
                    required
                  />
                ) : (
                  <div className="flex items-center h-10 px-3 text-base rounded-md border border-input bg-background/50">
                    {profile.phone}
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              {isEditing ? (
                <>
                  <Button type="submit" className="button-enhanced flex items-center gap-2">
                    <Save size={18} /> Save Changes
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="button-enhanced"
                    onClick={() => {
                      setIsEditing(false);
                      setFormData(profile);
                    }}
                  >
                    <X size={18} className="mr-2" /> Cancel
                  </Button>
                </>
              ) : (
                <Button 
                  type="button" 
                  onClick={() => setIsEditing(true)}
                  className="button-enhanced flex items-center gap-2"
                >
                  <Edit2 size={18} /> Edit Profile
                </Button>
              )}
            </div>
          </form>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminProfile;
