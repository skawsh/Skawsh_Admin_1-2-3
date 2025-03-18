
import React from 'react';
import { CalendarIcon, User, Info } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface PersonalInformationSectionProps {
  driverName: string;
  setDriverName: React.Dispatch<React.SetStateAction<string>>;
  phoneNumber: string;
  setPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
}

const PersonalInformationSection = ({
  driverName,
  setDriverName,
  phoneNumber,
  setPhoneNumber
}: PersonalInformationSectionProps) => {
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [otp, setOtp] = React.useState('');
  const [secondaryPhone, setSecondaryPhone] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [emergencyName, setEmergencyName] = React.useState('');
  const [emergencyRelation, setEmergencyRelation] = React.useState('');
  const [emergencyPhone, setEmergencyPhone] = React.useState('');
  const [currentAddress, setCurrentAddress] = React.useState('');
  const [permanentAddress, setPermanentAddress] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 space-y-6">
      <div className="flex items-center gap-2 pb-2 border-b">
        <User className="h-5 w-5 text-laundry-blue" />
        <h2 className="text-lg font-semibold">Personal Information</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input 
            id="fullName" 
            placeholder="Enter full name" 
            value={driverName}
            onChange={(e) => setDriverName(e.target.value)}
            required 
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="dob">Date of Birth</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Select date of birth</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                className="pointer-events-auto p-3"
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="primaryPhone">Primary Contact Number</Label>
          <Input 
            id="primaryPhone" 
            placeholder="Enter primary phone number" 
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required 
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="otp">OTP</Label>
          <Input 
            id="otp" 
            placeholder="Enter OTP" 
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="secondaryPhone">Secondary Contact Number</Label>
          <Input 
            id="secondaryPhone" 
            placeholder="Enter secondary phone number" 
            value={secondaryPhone}
            onChange={(e) => setSecondaryPhone(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            type="email" 
            placeholder="Enter email address" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input 
            id="password" 
            type="password" 
            placeholder="Enter password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input 
            id="confirmPassword" 
            type="password" 
            placeholder="Confirm password" 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="emergencyName">Emergency Contact Name</Label>
          <Input 
            id="emergencyName" 
            placeholder="Enter emergency contact name" 
            value={emergencyName}
            onChange={(e) => setEmergencyName(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="relation">Relation with driver</Label>
          <Input 
            id="relation" 
            placeholder="Enter relation" 
            value={emergencyRelation}
            onChange={(e) => setEmergencyRelation(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="emergencyPhone">Emergency Contact Number</Label>
          <Input 
            id="emergencyPhone" 
            placeholder="Enter emergency contact number" 
            value={emergencyPhone}
            onChange={(e) => setEmergencyPhone(e.target.value)}
          />
        </div>

        <div className="col-span-1 md:col-span-2 space-y-2">
          <Label htmlFor="currentAddress">Current Address</Label>
          <Textarea 
            id="currentAddress" 
            placeholder="Enter current address" 
            value={currentAddress}
            onChange={(e) => setCurrentAddress(e.target.value)}
            className="resize-none min-h-[60px]"
          />
        </div>
        
        <div className="col-span-1 md:col-span-2 space-y-2">
          <Label htmlFor="permanentAddress">Permanent Address</Label>
          <Textarea 
            id="permanentAddress" 
            placeholder="Enter permanent address" 
            value={permanentAddress}
            onChange={(e) => setPermanentAddress(e.target.value)}
            className="resize-none min-h-[60px]"
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInformationSection;
