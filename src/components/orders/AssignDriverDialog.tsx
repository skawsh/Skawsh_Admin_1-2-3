
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MapPin, Package, Truck, Star, User } from "lucide-react";
import { Order } from './types';

interface Driver {
  id: string;
  name: string;
  rating: number;
  deliveriesCompleted: number;
  location: string;
  status: 'available' | 'delivering' | 'unavailable';
}

// Mock data for drivers
const mockDrivers: Driver[] = [
  {
    id: "D-1001",
    name: "Raj Kumar",
    rating: 4.8,
    deliveriesCompleted: 245,
    location: "Banjara Hills, Hyderabad",
    status: 'available'
  },
  {
    id: "D-1002",
    name: "Priya Sharma",
    rating: 4.9,
    deliveriesCompleted: 189,
    location: "Jubilee Hills, Hyderabad",
    status: 'available'
  },
  {
    id: "D-1003",
    name: "Arjun Reddy",
    rating: 4.7,
    deliveriesCompleted: 302,
    location: "Gachibowli, Hyderabad",
    status: 'delivering'
  },
  {
    id: "D-1004",
    name: "Ananya Patel",
    rating: 4.6,
    deliveriesCompleted: 156,
    location: "Ameerpet, Hyderabad",
    status: 'delivering'
  },
  {
    id: "D-1005",
    name: "Vikram Singh",
    rating: 4.5,
    deliveriesCompleted: 210,
    location: "Madhapur, Hyderabad",
    status: 'unavailable'
  },
  {
    id: "D-1006",
    name: "Sneha Reddy",
    rating: 4.8,
    deliveriesCompleted: 178,
    location: "Kondapur, Hyderabad",
    status: 'available'
  },
  {
    id: "D-1007",
    name: "Rahul Verma",
    rating: 4.7,
    deliveriesCompleted: 225,
    location: "HITEC City, Hyderabad",
    status: 'available'
  },
  {
    id: "D-1008",
    name: "Neha Sharma",
    rating: 4.9,
    deliveriesCompleted: 267,
    location: "Kukatpally, Hyderabad",
    status: 'available'
  }
];

interface OrderTableData {
  id: string;
  orderId: string;
  date: string;
  customer: string;
  phone: string;
  customerAddress: string;
  studio: string;
  studioAddress: string;
  washType: string;
  distance: string;
}

interface AssignDriverDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedOrders: OrderTableData[];
  onAssignDriver: (driverId: string, orderIds: string[]) => void;
}

export const AssignDriverDialog: React.FC<AssignDriverDialogProps> = ({
  isOpen,
  onOpenChange,
  selectedOrders,
  onAssignDriver,
}) => {
  const [selectedDriverId, setSelectedDriverId] = useState<string | null>(null);
  
  const availableDrivers = mockDrivers.filter(driver => driver.status !== 'unavailable');
  const totalDrivers = mockDrivers.length;
  
  const handleAssignDriver = () => {
    if (selectedDriverId) {
      onAssignDriver(
        selectedDriverId, 
        selectedOrders.map(order => order.id)
      );
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Truck className="h-5 w-5 text-primary" />
            <DialogTitle className="text-xl">Assign Driver to Orders</DialogTitle>
          </div>
          <DialogDescription>
            Select a driver to assign {selectedOrders.length} {selectedOrders.length === 1 ? 'order' : 'orders'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 flex-1 overflow-hidden">
          <div>
            <h3 className="font-medium text-base mb-2">Selected Orders</h3>
            <div className="border rounded-md">
              <div className="grid grid-cols-3 p-2 bg-gray-50 border-b">
                <div className="font-medium text-sm text-gray-700">Order ID</div>
                <div className="font-medium text-sm text-gray-700">Customer</div>
                <div className="font-medium text-sm text-gray-700">Address</div>
              </div>
              <ScrollArea className="h-[120px]">
                {selectedOrders.map(order => (
                  <div key={order.id} className="grid grid-cols-3 p-2 border-b last:border-0">
                    <div className="text-sm">{order.orderId}</div>
                    <div className="text-sm">{order.customer}</div>
                    <div className="text-sm">{order.customerAddress}</div>
                  </div>
                ))}
              </ScrollArea>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium text-base">Available Drivers</h3>
              <span className="text-sm text-gray-500">
                {availableDrivers.length} Available / {totalDrivers} Total
              </span>
            </div>
            
            <ScrollArea className="h-[280px]">
              <div className="space-y-2">
                {mockDrivers.map(driver => {
                  const isUnavailable = driver.status === 'unavailable';
                  const isDelivering = driver.status === 'delivering';
                  
                  return (
                    <div 
                      key={driver.id}
                      className={`border rounded-md p-3 transition-all relative ${
                        selectedDriverId === driver.id 
                          ? 'border-primary ring-1 ring-primary bg-primary/5' 
                          : 'hover:border-gray-300'
                      } ${isUnavailable ? 'opacity-60' : ''}`}
                      onClick={() => !isUnavailable && setSelectedDriverId(driver.id)}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <div className="flex items-center gap-1.5">
                          <User className="h-4 w-4 text-gray-700" />
                          <div>
                            <h4 className="font-medium">{driver.name}</h4>
                            <p className="text-xs text-gray-500">ID: {driver.id}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="font-medium">{driver.rating}</span>
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1.5 text-sm text-gray-600 mb-1">
                        <Package className="h-3.5 w-3.5" />
                        <span>{driver.deliveriesCompleted} deliveries completed</span>
                      </div>
                      
                      <div className="flex items-center gap-1.5 text-sm text-gray-600">
                        <MapPin className="h-3.5 w-3.5" />
                        <span>{driver.location}</span>
                      </div>
                      
                      {isDelivering && (
                        <div className="absolute top-3 right-3 bg-amber-100 text-amber-800 px-2 py-0.5 rounded text-xs font-medium">
                          Delivering
                        </div>
                      )}
                      
                      {isUnavailable && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-md">
                          <div className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium">
                            Currently Unavailable
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          </div>
        </div>

        <DialogFooter className="mt-2">
          <DialogClose asChild>
            <Button variant="outline" type="button">
              Cancel
            </Button>
          </DialogClose>
          <Button 
            type="button" 
            onClick={handleAssignDriver}
            disabled={!selectedDriverId}
            className="gap-2"
          >
            <User className="h-4 w-4" />
            Assign Driver
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
