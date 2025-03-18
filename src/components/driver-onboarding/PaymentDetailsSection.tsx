
import React from 'react';
import { CreditCard } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface PaymentDetailsSectionProps {
  accountHolderName: string;
  setAccountHolderName: React.Dispatch<React.SetStateAction<string>>;
  bankName: string;
  setBankName: React.Dispatch<React.SetStateAction<string>>;
  accountNumber: string;
  setAccountNumber: React.Dispatch<React.SetStateAction<string>>;
  confirmAccountNumber: string;
  setConfirmAccountNumber: React.Dispatch<React.SetStateAction<string>>;
  ifscCode: string;
  setIfscCode: React.Dispatch<React.SetStateAction<string>>;
  branchName: string;
  setBranchName: React.Dispatch<React.SetStateAction<string>>;
}

const PaymentDetailsSection = ({
  accountHolderName,
  setAccountHolderName,
  bankName,
  setBankName,
  accountNumber,
  setAccountNumber,
  confirmAccountNumber,
  setConfirmAccountNumber,
  ifscCode,
  setIfscCode,
  branchName,
  setBranchName
}: PaymentDetailsSectionProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 space-y-6">
      <div className="flex items-center gap-2 pb-2 border-b">
        <CreditCard className="h-5 w-5 text-laundry-blue" />
        <h2 className="text-lg font-semibold">Payment Details</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="accountHolderName">Account Holder Name</Label>
          <Input 
            id="accountHolderName" 
            placeholder="Enter account holder name" 
            value={accountHolderName}
            onChange={(e) => setAccountHolderName(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="bankName">Bank Name</Label>
          <Input 
            id="bankName" 
            placeholder="Enter bank name" 
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="accountNumber">Account Number</Label>
          <Input 
            id="accountNumber" 
            placeholder="Enter account number" 
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="confirmAccountNumber">Confirm Account Number</Label>
          <Input 
            id="confirmAccountNumber" 
            placeholder="Re-enter account number" 
            value={confirmAccountNumber}
            onChange={(e) => setConfirmAccountNumber(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="ifscCode">IFSC Code</Label>
          <Input 
            id="ifscCode" 
            placeholder="Enter IFSC code" 
            value={ifscCode}
            onChange={(e) => setIfscCode(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="branchName">Branch Name</Label>
          <Input 
            id="branchName" 
            placeholder="Enter branch name" 
            value={branchName}
            onChange={(e) => setBranchName(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentDetailsSection;
