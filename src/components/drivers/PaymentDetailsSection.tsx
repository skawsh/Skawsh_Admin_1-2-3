
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreditCard } from 'lucide-react';
import { Driver } from './types';

interface PaymentDetailsSectionProps {
  driver: Driver;
  editedDriver: Driver | null;
  isEditing: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const PaymentDetailsSection = ({ driver, editedDriver, isEditing, handleInputChange }: PaymentDetailsSectionProps) => {
  return (
    <div className="grid grid-cols-1 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-laundry-blue" />
            Payment Details
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col space-y-2">
            <Label htmlFor="paymentDetails.accountHolderName">Account Holder Name</Label>
            {isEditing ? (
              <Input 
                id="paymentDetails.accountHolderName"
                name="paymentDetails.accountHolderName"
                value={editedDriver?.paymentDetails?.accountHolderName || ''}
                onChange={handleInputChange}
                placeholder="Enter account holder name"
              />
            ) : (
              <div className="p-2 border rounded-md bg-gray-50">{driver.paymentDetails?.accountHolderName || 'Not provided'}</div>
            )}
          </div>
          
          <div className="flex flex-col space-y-2">
            <Label htmlFor="paymentDetails.bankName">Bank Name</Label>
            {isEditing ? (
              <Input 
                id="paymentDetails.bankName"
                name="paymentDetails.bankName"
                value={editedDriver?.paymentDetails?.bankName || ''}
                onChange={handleInputChange}
                placeholder="Enter bank name"
              />
            ) : (
              <div className="p-2 border rounded-md bg-gray-50">{driver.paymentDetails?.bankName || 'Not provided'}</div>
            )}
          </div>
          
          <div className="flex flex-col space-y-2">
            <Label htmlFor="paymentDetails.accountNumber">Account Number</Label>
            {isEditing ? (
              <Input 
                id="paymentDetails.accountNumber"
                name="paymentDetails.accountNumber"
                value={editedDriver?.paymentDetails?.accountNumber || ''}
                onChange={handleInputChange}
                placeholder="Enter account number"
              />
            ) : (
              <div className="p-2 border rounded-md bg-gray-50">{driver.paymentDetails?.accountNumber || 'Not provided'}</div>
            )}
          </div>
          
          {isEditing && (
            <div className="flex flex-col space-y-2">
              <Label htmlFor="paymentDetails.confirmAccountNumber">Confirm Account Number</Label>
              <Input 
                id="paymentDetails.confirmAccountNumber"
                name="paymentDetails.confirmAccountNumber"
                value={editedDriver?.paymentDetails?.confirmAccountNumber || ''}
                onChange={handleInputChange}
                placeholder="Re-enter account number"
              />
            </div>
          )}
          
          <div className="flex flex-col space-y-2">
            <Label htmlFor="paymentDetails.ifscCode">IFSC Code</Label>
            {isEditing ? (
              <Input 
                id="paymentDetails.ifscCode"
                name="paymentDetails.ifscCode"
                value={editedDriver?.paymentDetails?.ifscCode || ''}
                onChange={handleInputChange}
                placeholder="Enter IFSC code"
              />
            ) : (
              <div className="p-2 border rounded-md bg-gray-50">{driver.paymentDetails?.ifscCode || 'Not provided'}</div>
            )}
          </div>
          
          <div className="flex flex-col space-y-2">
            <Label htmlFor="paymentDetails.branchName">Branch Name</Label>
            {isEditing ? (
              <Input 
                id="paymentDetails.branchName"
                name="paymentDetails.branchName"
                value={editedDriver?.paymentDetails?.branchName || ''}
                onChange={handleInputChange}
                placeholder="Enter branch name"
              />
            ) : (
              <div className="p-2 border rounded-md bg-gray-50">{driver.paymentDetails?.branchName || 'Not provided'}</div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentDetailsSection;
