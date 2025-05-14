
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, ExternalLink } from 'lucide-react';

interface OrderDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  orderId: string;
}

const OrderDetailsDialog: React.FC<OrderDetailsDialogProps> = ({ 
  open, 
  onOpenChange,
  orderId
}) => {
  const handleOpenExternalLink = () => {
    window.open("https://preview-bc61d673--section-syncer-51.lovable.app/studios", "_blank");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Order Details: {orderId}</DialogTitle>
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogHeader>
        <div className="p-6">
          <p className="mb-6 text-gray-700">
            For Order details please refer the revenue section of the admin Panel.
          </p>
          <div className="flex justify-end">
            <Button onClick={handleOpenExternalLink} className="flex items-center gap-2">
              <span>Open Admin Panel</span>
              <ExternalLink size={16} />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailsDialog;
