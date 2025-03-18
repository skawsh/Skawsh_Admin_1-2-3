
import React from 'react';
import { UserCheck } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CircleCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PersonalInformationSection = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 space-y-6">
      <div className="flex items-center gap-2 pb-2 border-b">
        <UserCheck className="h-5 w-5 text-laundry-blue" />
        <h2 className="text-lg font-semibold">Personal Information</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input id="fullName" placeholder="Enter full name" required />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="dateOfBirth">Date of Birth</Label>
          <Input id="dateOfBirth" type="date" required />
        </div>
        
        <div className="space-y-2 relative">
          <Label htmlFor="primaryContact">Primary Contact Number</Label>
          <div className="relative">
            <Input id="primaryContact" placeholder="Enter primary contact number" required />
            <Button 
              type="button" 
              variant="ghost" 
              size="icon" 
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
            >
              <CircleCheck className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="otp">OTP</Label>
          <Input id="otp" placeholder="Enter OTP" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="secondaryContact">Secondary Contact Number</Label>
          <Input id="secondaryContact" placeholder="Enter secondary contact number" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="Enter email address" required />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" placeholder="Enter password" required />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input id="confirmPassword" type="password" placeholder="Confirm password" required />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="emergencyContactName">Emergency Contact Name</Label>
          <Input id="emergencyContactName" placeholder="Enter emergency contact name" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="relation">Relation with driver</Label>
          <Input id="relation" placeholder="Enter relation" />
        </div>
        
        <div className="space-y-2 md:col-span-1">
          <Label htmlFor="emergencyContactNumber">Emergency Contact Number</Label>
          <Input id="emergencyContactNumber" placeholder="Enter emergency contact number" />
        </div>
      </div>
      
      <div className="space-y-2 md:col-span-2">
        <Label htmlFor="currentAddress">Current Address</Label>
        <Textarea id="currentAddress" placeholder="Enter current address" className="h-20" />
      </div>
      
      <div className="space-y-2 md:col-span-2">
        <Label htmlFor="permanentAddress">Permanent Address</Label>
        <Textarea id="permanentAddress" placeholder="Enter permanent address" className="h-20" />
      </div>
    </div>
  );
};

export default PersonalInformationSection;
