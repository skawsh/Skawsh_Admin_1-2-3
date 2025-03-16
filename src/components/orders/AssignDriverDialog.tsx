
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MapPin, Package, Truck, User, CheckCircle2, ShoppingBag } from "lucide-react";
import { Order } from './types';
import { Separator } from "@/components/ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface Driver {
  id: string;
  name: string;
  rating: number;
  deliveriesCompleted: number;
  location: string;
  status: 'available' | 'delivering' | 'unavailable';
  assignedOrders?: number;
}

// Mock data for drivers
const mockDrivers: Driver[] = [
  {
    id: "D-1001",
    name: "Raj Kumar",
    rating: 4.8,
    deliveriesCompleted: 245,
    location: "Banjara Hills, Hyderabad",
    status: 'available',
    assignedOrders: 0
  },
  {
    id: "D-1002",
    name: "Priya Sharma",
    rating: 4.9,
    deliveriesCompleted: 189,
    location: "Jubilee Hills, Hyderabad",
    status: 'available',
    assignedOrders: 2
  },
  {
    id: "D-1003",
    name: "Arjun Reddy",
    rating: 4.7,
    deliveriesCompleted: 302,
    location: "Gachibowli, Hyderabad",
    status: 'delivering',
    assignedOrders: 1
  },
  {
    id: "D-1004",
    name: "Ananya Patel",
    rating: 4.6,
    deliveriesCompleted: 156,
    location: "Ameerpet, Hyderabad",
    status: 'delivering',
    assignedOrders: 3
  },
  {
    id: "D-1005",
    name: "Vikram Singh",
    rating: 4.5,
    deliveriesCompleted: 210,
    location: "Madhapur, Hyderabad",
    status: 'unavailable',
    assignedOrders: 0
  },
  {
    id: "D-1006",
    name: "Sneha Reddy",
    rating: 4.8,
    deliveriesCompleted: 178,
    location: "Kondapur, Hyderabad",
    status: 'available',
    assignedOrders: 0
  },
  {
    id: "D-1007",
    name: "Rahul Verma",
    rating: 4.7,
    deliveriesCompleted: 225,
    location: "HITEC City, Hyderabad",
    status: 'available',
    assignedOrders: 0
  },
  {
    id: "D-1008",
    name: "Neha Sharma",
    rating: 4.9,
    deliveriesCompleted: 267,
    location: "Kukatpally, Hyderabad",
    status: 'available',
    assignedOrders: 0
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
  selectedOrders: {
    newOrders: OrderTableData[];
    readyOrders: OrderTableData[];
  } | OrderTableData[];
  onAssignDriver: (driverId: string, orderIds: string[]) => void;
}

export const AssignDriverDialog: React.FC<AssignDriverDialogProps> = ({
  isOpen,
  onOpenChange,
  selectedOrders,
  onAssignDriver,
}) => {
  const [selectedDriverId, setSelectedDriverId] = useState<string | null>(null);
  
  // Check if selectedOrders is an array (for backward compatibility) or an object with two arrays
  const isSelectedOrdersArray = Array.isArray(selectedOrders);
  
  // Extract orders data based on the format
  const newOrdersData = isSelectedOrdersArray ? [] : selectedOrders.newOrders;
  const readyOrdersData = isSelectedOrdersArray ? [] : selectedOrders.readyOrders;
  const allOrdersData = isSelectedOrdersArray 
    ? selectedOrders 
    : [...newOrdersData, ...readyOrdersData];
  
  // Filter drivers - available drivers are those with status not 'unavailable' AND no assigned orders
  const availableDrivers = mockDrivers.filter(driver => 
    driver.status !== 'unavailable' && (!driver.assignedOrders || driver.assignedOrders === 0)
  );
  const totalDrivers = mockDrivers.length;
  
  // Sort drivers: first zero orders at top, then by status, then by name
  const sortedDrivers = [...mockDrivers].sort((a, b) => {
    // First sort by assigned orders (0 first)
    const aOrders = a.assignedOrders || 0;
    const bOrders = b.assignedOrders || 0;
    
    if (aOrders === 0 && bOrders !== 0) return -1;
    if (aOrders !== 0 && bOrders === 0) return 1;
    
    // Then sort by availability
    if (a.status !== 'unavailable' && b.status === 'unavailable') return -1;
    if (a.status === 'unavailable' && b.status !== 'unavailable') return 1;
    
    // Then sort by name
    return a.name.localeCompare(b.name);
  });
  
  const handleAssignDriver = () => {
    if (selectedDriverId) {
      onAssignDriver(
        selectedDriverId, 
        allOrdersData.map(order => order.id)
      );
      onOpenChange(false);
    }
  };

  // Determine which tables to show based on the selected orders
  const showNewOrdersTable = !isSelectedOrdersArray && newOrdersData.length > 0;
  const showReadyOrdersTable = !isSelectedOrdersArray && readyOrdersData.length > 0;
  const showSingleTable = isSelectedOrdersArray;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Truck className="h-5 w-5 text-primary" />
            <DialogTitle className="text-xl">Assign Driver to Orders</DialogTitle>
          </div>
          <DialogDescription>
            Select a driver to assign {allOrdersData.length} {allOrdersData.length === 1 ? 'order' : 'orders'}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1 overflow-y-auto pr-4">
          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-base mb-2">Selected Orders</h3>
              
              {showSingleTable && (
                <div className="border rounded-md">
                  <div className="grid grid-cols-3 p-2 bg-gray-50 border-b">
                    <div className="font-medium text-sm text-gray-700">Order ID</div>
                    <div className="font-medium text-sm text-gray-700">Location</div>
                    <div className="font-medium text-sm text-gray-700">Address</div>
                  </div>
                  <ScrollArea className="h-[120px]">
                    {allOrdersData.map(order => {
                      // For backward compatibility, handle single table case
                      const isFromReadyTab = isSelectedOrdersArray 
                        ? false 
                        : readyOrdersData.some(ro => ro.id === order.id);
                      
                      return (
                        <div key={order.id} className="grid grid-cols-3 p-2 border-b last:border-0">
                          <div className="text-sm">{order.orderId}</div>
                          <div className="text-sm">
                            {isFromReadyTab ? order.studio : order.customer}
                          </div>
                          <div className="text-sm">
                            {isFromReadyTab ? order.studioAddress : order.customerAddress}
                          </div>
                        </div>
                      );
                    })}
                  </ScrollArea>
                </div>
              )}
              
              {/* Show tables based on which orders are selected */}
              {(showNewOrdersTable || showReadyOrdersTable) && (
                <div className="space-y-4">
                  {showNewOrdersTable && (
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Package size={16} className="text-blue-600" />
                        <h4 className="text-sm font-medium">New Orders ({newOrdersData.length})</h4>
                      </div>
                      <div className="border rounded-md">
                        <div className="grid grid-cols-3 p-2 bg-gray-50 border-b">
                          <div className="font-medium text-sm text-gray-700">Order ID</div>
                          <div className="font-medium text-sm text-gray-700">Customer</div>
                          <div className="font-medium text-sm text-gray-700">Customer Address</div>
                        </div>
                        <ScrollArea className="h-[100px]">
                          {newOrdersData.map(order => (
                            <div key={order.id} className="grid grid-cols-3 p-2 border-b last:border-0">
                              <div className="text-sm">{order.orderId}</div>
                              <div className="text-sm">{order.customer}</div>
                              <div className="text-sm">{order.customerAddress}</div>
                            </div>
                          ))}
                        </ScrollArea>
                      </div>
                    </div>
                  )}
                  
                  {showReadyOrdersTable && (
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <ShoppingBag size={16} className="text-green-600" />
                        <h4 className="text-sm font-medium">Ready for Collection Orders ({readyOrdersData.length})</h4>
                      </div>
                      <div className="border rounded-md">
                        <div className="grid grid-cols-3 p-2 bg-gray-50 border-b">
                          <div className="font-medium text-sm text-gray-700">Order ID</div>
                          <div className="font-medium text-sm text-gray-700">Studio</div>
                          <div className="font-medium text-sm text-gray-700">Studio Address</div>
                        </div>
                        <ScrollArea className="h-[100px]">
                          {readyOrdersData.map(order => (
                            <div key={order.id} className="grid grid-cols-3 p-2 border-b last:border-0">
                              <div className="text-sm">{order.orderId}</div>
                              <div className="text-sm">{order.studio}</div>
                              <div className="text-sm">{order.studioAddress}</div>
                            </div>
                          ))}
                        </ScrollArea>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium text-base">Available Drivers</h3>
                <span className="text-sm text-gray-500">
                  {availableDrivers.length} Available / {totalDrivers} Total
                </span>
              </div>
              
              <div className="space-y-2 pb-2">
                {sortedDrivers.map(driver => {
                  const isUnavailable = driver.status === 'unavailable';
                  const hasAssignedOrders = driver.assignedOrders && driver.assignedOrders > 0;
                  const isAvailable = !isUnavailable && !hasAssignedOrders;
                  const hasZeroOrders = driver.assignedOrders === 0;
                  
                  return (
                    <div 
                      key={driver.id}
                      className={`rounded-md p-3 transition-all relative ${
                        selectedDriverId === driver.id 
                          ? 'bg-primary/10 ring-1 ring-primary'
                          : 'hover:bg-gray-100'
                      } ${!isAvailable ? 'opacity-60' : ''}`}
                      onClick={() => isAvailable && setSelectedDriverId(driver.id)}
                    >
                      <div className="flex items-center gap-3">
                        <User className="h-5 w-5 text-gray-700" />
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{driver.name}</h4>
                          <p className="text-xs text-gray-500">ID: {driver.id}</p>
                        </div>
                        
                        {isUnavailable && (
                          <span className="text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded">
                            Unavailable
                          </span>
                        )}
                        
                        {!isUnavailable && hasAssignedOrders && (
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                            {driver.assignedOrders} Orders
                          </span>
                        )}
                        
                        {hasZeroOrders && !isUnavailable && (
                          <span className="text-xs bg-green-100 text-green-800 rounded-full flex items-center justify-center w-8 h-8">
                            <CheckCircle2 className="h-6 w-6 text-green-600" />
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </ScrollArea>

        <DialogFooter className="mt-4 pt-4 border-t">
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

