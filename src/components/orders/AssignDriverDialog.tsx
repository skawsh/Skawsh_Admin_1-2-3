import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MapPin, Package, Truck, User, CheckCircle2, ShoppingBag, Clock } from "lucide-react";
import { Order, OrderStatus } from './types';
import { Separator } from "@/components/ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { sampleDrivers } from '@/components/drivers/mockData';
import { Driver } from '@/components/drivers/types';
import { useToast } from '@/hooks/use-toast';

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
  status?: string;
  originalStatus?: OrderStatus; // Field to preserve original status
}

interface AssignDriverDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedOrders: {
    newOrders: OrderTableData[];
    readyOrders: OrderTableData[];
    rescheduledOrders: OrderTableData[];
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
  const { toast } = useToast();
  
  const isSelectedOrdersArray = Array.isArray(selectedOrders);
  
  let newOrdersData: OrderTableData[] = [];
  let readyOrdersData: OrderTableData[] = [];
  let rescheduledOrdersData: OrderTableData[] = [];
  let allOrdersData: OrderTableData[] = [];
  
  if (isSelectedOrdersArray) {
    allOrdersData = selectedOrders;
  } else {
    newOrdersData = [...selectedOrders.newOrders];
    readyOrdersData = [...selectedOrders.readyOrders];
    
    if (selectedOrders.rescheduledOrders && selectedOrders.rescheduledOrders.length > 0) {
      selectedOrders.rescheduledOrders.forEach(order => {
        rescheduledOrdersData.push(order);
        
        if (order.status === 'ready-for-collect') {
          readyOrdersData.push(order);
        } else {
          newOrdersData.push(order);
        }
      });
    }
    
    allOrdersData = [...newOrdersData, ...readyOrdersData];
  }
  
  const driversData = sampleDrivers;
  
  const availableDrivers = driversData.filter(driver => driver.status === 'active');
  const totalDrivers = driversData.length;
  
  const sortedDrivers = [...driversData].sort((a, b) => {
    if (a.status === 'active' && b.status !== 'active') return -1;
    if (a.status !== 'active' && b.status === 'active') return 1;
    
    const aOrders = a.assignedOrders || 0;
    const bOrders = b.assignedOrders || 0;
    
    if (aOrders === 0 && bOrders !== 0) return -1;
    if (aOrders !== 0 && bOrders === 0) return 1;
    
    return a.name.localeCompare(b.name);
  });
  
  const handleAssignDriver = () => {
    if (selectedDriverId) {
      const ordersWithPreservedStatus = allOrdersData.map(order => {
        return {
          ...order,
          originalStatus: order.status as OrderStatus
        };
      });
      
      onAssignDriver(
        selectedDriverId, 
        ordersWithPreservedStatus.map(order => order.id)
      );
      
      const assignmentData = {
        driverId: selectedDriverId,
        orders: ordersWithPreservedStatus
      };
      
      localStorage.setItem('driverAssignments', JSON.stringify(assignmentData));
      
      window.dispatchEvent(new CustomEvent('driverAssignment', { 
        detail: assignmentData 
      }));
      
      toast({
        title: "Orders Assigned",
        description: `${allOrdersData.length} orders assigned to driver successfully`,
      });
      
      onOpenChange(false);
    }
  };

  const isFromReadyTab = (order: OrderTableData) => {
    if (order.status === 'ready-for-collect') return true;
    if (isSelectedOrdersArray) return false;
    return readyOrdersData.some(ro => ro.id === order.id);
  };

  const showNewOrdersTable = !isSelectedOrdersArray && newOrdersData.length > 0;
  const showReadyOrdersTable = !isSelectedOrdersArray && readyOrdersData.length > 0;
  const showSingleTable = isSelectedOrdersArray;

  const uniqueNewOrdersData = newOrdersData.filter((order, index, self) => 
    index === self.findIndex((o) => o.id === order.id)
  );
  
  const uniqueReadyOrdersData = readyOrdersData.filter((order, index, self) => 
    index === self.findIndex((o) => o.id === order.id)
  );

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
                      const isReadyTabOrder = isFromReadyTab(order);
                      
                      return (
                        <div key={order.id} className="grid grid-cols-3 p-2 border-b last:border-0">
                          <div className="text-sm">{order.orderId}</div>
                          <div className="text-sm">
                            {isReadyTabOrder ? order.studio : order.customer}
                          </div>
                          <div className="text-sm">
                            {isReadyTabOrder ? order.studioAddress : order.customerAddress}
                          </div>
                        </div>
                      );
                    })}
                  </ScrollArea>
                </div>
              )}
              
              {(showNewOrdersTable || showReadyOrdersTable) && (
                <div className="space-y-4">
                  {showNewOrdersTable && uniqueNewOrdersData.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Package size={16} className="text-blue-600" />
                        <h4 className="text-sm font-medium">New Orders ({uniqueNewOrdersData.length})</h4>
                      </div>
                      <div className="border rounded-md">
                        <div className="grid grid-cols-3 p-2 bg-gray-50 border-b">
                          <div className="font-medium text-sm text-gray-700">Order ID</div>
                          <div className="font-medium text-sm text-gray-700">Customer</div>
                          <div className="font-medium text-sm text-gray-700">Customer Address</div>
                        </div>
                        <ScrollArea className="h-[100px]">
                          {uniqueNewOrdersData.map(order => (
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
                  
                  {showReadyOrdersTable && uniqueReadyOrdersData.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <ShoppingBag size={16} className="text-green-600" />
                        <h4 className="text-sm font-medium">Ready for Collection Orders ({uniqueReadyOrdersData.length})</h4>
                      </div>
                      <div className="border rounded-md">
                        <div className="grid grid-cols-3 p-2 bg-gray-50 border-b">
                          <div className="font-medium text-sm text-gray-700">Order ID</div>
                          <div className="font-medium text-sm text-gray-700">Studio</div>
                          <div className="font-medium text-sm text-gray-700">Studio Address</div>
                        </div>
                        <ScrollArea className="h-[100px]">
                          {uniqueReadyOrdersData.map(order => (
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
                  const isUnavailable = driver.status !== 'active';
                  const hasAssignedOrders = driver.assignedOrders && driver.assignedOrders > 0;
                  const isAvailable = !isUnavailable && !hasAssignedOrders;
                  const hasZeroOrders = driver.assignedOrders === 0 || driver.assignedOrders === undefined;
                  
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
                            Inactive
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
