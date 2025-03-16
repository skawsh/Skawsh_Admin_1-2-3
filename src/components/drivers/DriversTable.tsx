
import React, { useState, useEffect } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { DriversTableProps } from './types';
import { sampleDrivers } from './mockData';
import { MoreHorizontal, Package } from 'lucide-react';
import DriverStatusBadge from './DriverStatusBadge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Driver } from './types';
import { useToast } from '@/hooks/use-toast';

// Define the interface for assigned order data
interface AssignedOrder {
  id: string;
  orderId: string;
  driverId: string;
  customerName: string;
  customerAddress: string;
  studio: string;
  studioAddress: string;
}

const DriversTable = ({ className }: DriversTableProps) => {
  const [drivers, setDrivers] = useState(sampleDrivers);
  const [activeTab, setActiveTab] = useState<string>('all');
  const [assignedOrders, setAssignedOrders] = useState<AssignedOrder[]>([]);
  const { toast } = useToast();
  
  // Listen for order assignment events from the localStorage
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'driverAssignment') {
        try {
          const assignmentData = JSON.parse(e.newValue || '{}');
          if (assignmentData.driverId && assignmentData.orders) {
            updateDriverAssignments(assignmentData.driverId, assignmentData.orders);
          }
        } catch (error) {
          console.error('Error parsing driver assignment data:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Check for any existing assignments
    const existingAssignment = localStorage.getItem('driverAssignment');
    if (existingAssignment) {
      try {
        const assignmentData = JSON.parse(existingAssignment);
        if (assignmentData.driverId && assignmentData.orders) {
          updateDriverAssignments(assignmentData.driverId, assignmentData.orders);
        }
      } catch (error) {
        console.error('Error parsing existing driver assignment data:', error);
      }
    }
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
  
  // Update driver assignments when receiving new data
  const updateDriverAssignments = (driverId: string, orders: any[]) => {
    // Update the driver's assigned orders count
    setDrivers(prevDrivers => 
      prevDrivers.map(driver => 
        driver.id === driverId 
          ? { 
              ...driver, 
              assignedOrders: (driver.assignedOrders || 0) + orders.length 
            } 
          : driver
      )
    );
    
    // Add the orders to the assigned orders list
    const newAssignedOrders = orders.map(order => ({
      id: order.id,
      orderId: order.orderId,
      driverId: driverId,
      customerName: order.customer,
      customerAddress: order.customerAddress,
      studio: order.studio,
      studioAddress: order.studioAddress
    }));
    
    setAssignedOrders(prev => [...prev, ...newAssignedOrders]);
    
    // Show a success toast notification
    toast({
      title: "Orders Assigned",
      description: `${orders.length} orders assigned to ${drivers.find(d => d.id === driverId)?.name}`,
    });
  };
  
  const handleStatusChange = (driverId: string, newStatus: 'active' | 'inactive') => {
    setDrivers(drivers.map(driver => 
      driver.id === driverId ? { ...driver, status: newStatus } : driver
    ));
  };
  
  const getFilteredDrivers = (): Driver[] => {
    switch (activeTab) {
      case 'active':
        return drivers.filter(driver => driver.status === 'active');
      case 'inactive':
        return drivers.filter(driver => driver.status === 'inactive');
      case 'assignments':
        return drivers.filter(driver => (driver.assignedOrders || 0) > 0);
      case 'available':
        return drivers.filter(driver => driver.status === 'active' && (driver.assignedOrders || 0) === 0);
      default:
        return drivers;
    }
  };
  
  // Get orders assigned to a specific driver
  const getDriverOrders = (driverId: string): AssignedOrder[] => {
    return assignedOrders.filter(order => order.driverId === driverId);
  };
  
  return (
    <div className="bg-white rounded-md shadow-sm">
      <Tabs defaultValue="all" onValueChange={setActiveTab}>
        <div className="border-b px-4">
          <TabsList className="bg-transparent h-14 p-0 w-auto gap-8">
            <TabsTrigger 
              value="all" 
              className="h-14 px-0 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-laundry-blue data-[state=active]:shadow-none data-[state=active]:bg-transparent"
            >
              <div className="flex items-center gap-2">
                <span className="text-base">Drivers List</span>
              </div>
            </TabsTrigger>
            <TabsTrigger 
              value="assignments" 
              className="h-14 px-0 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-laundry-blue data-[state=active]:shadow-none data-[state=active]:bg-transparent"
            >
              <div className="flex items-center gap-2">
                <span className="text-base">Order Assignments</span>
              </div>
            </TabsTrigger>
            <TabsTrigger 
              value="available" 
              className="h-14 px-0 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-laundry-blue data-[state=active]:shadow-none data-[state=active]:bg-transparent"
            >
              <div className="flex items-center gap-2">
                <span className="text-base">Available Drivers</span>
              </div>
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="all" className="p-0 mt-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">DRIVER</TableHead>
                <TableHead>STATUS</TableHead>
                <TableHead>PHONE NUMBER</TableHead>
                <TableHead className="text-right">ACTIONS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {getFilteredDrivers().map((driver) => (
                <TableRow key={driver.id}>
                  <TableCell className="font-medium flex items-center">
                    <div className="w-8 h-8 rounded-full bg-gray-200 mr-3 flex items-center justify-center">
                      <span className="text-gray-500">👤</span>
                    </div>
                    {driver.name}
                  </TableCell>
                  <TableCell>
                    <DriverStatusBadge 
                      status={driver.status} 
                      onChange={(newStatus) => handleStatusChange(driver.id, newStatus)}
                    />
                  </TableCell>
                  <TableCell>{driver.phoneNumber}</TableCell>
                  <TableCell className="text-right">
                    <button className="text-gray-500 hover:text-gray-700">
                      <MoreHorizontal size={20} />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
        
        <TabsContent value="assignments" className="p-0 mt-0">
          {getFilteredDrivers().length > 0 ? (
            <div className="divide-y">
              {getFilteredDrivers().map(driver => {
                const driverOrders = getDriverOrders(driver.id);
                return (
                  <div key={driver.id} className="p-4">
                    <div className="flex items-center mb-3">
                      <div className="w-8 h-8 rounded-full bg-gray-200 mr-3 flex items-center justify-center">
                        <span className="text-gray-500">👤</span>
                      </div>
                      <div>
                        <h3 className="font-medium">{driver.name}</h3>
                        <p className="text-sm text-gray-500">
                          {driver.assignedOrders || 0} assigned orders
                        </p>
                      </div>
                    </div>
                    
                    {driverOrders.length > 0 ? (
                      <div className="ml-11">
                        <h4 className="text-sm font-medium mb-2">Assigned Orders</h4>
                        <div className="bg-gray-50 rounded-md">
                          {driverOrders.map(order => (
                            <div key={order.id} className="border-b last:border-0 p-3">
                              <div className="flex items-start gap-3">
                                <div className="bg-blue-100 h-8 w-8 rounded-md flex items-center justify-center mt-1">
                                  <Package size={16} className="text-blue-600" />
                                </div>
                                <div>
                                  <div className="font-medium">{order.orderId}</div>
                                  <div className="text-sm">
                                    <div className="text-gray-700">Customer: {order.customerName}</div>
                                    <div className="text-gray-500">{order.customerAddress}</div>
                                  </div>
                                  <div className="text-sm mt-1">
                                    <div className="text-gray-700">Studio: {order.studio}</div>
                                    <div className="text-gray-500">{order.studioAddress}</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="ml-11 text-sm text-gray-500 italic">
                        No orders data available for this driver
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500">
              No drivers with assigned orders found
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="available" className="p-0 mt-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">DRIVER</TableHead>
                <TableHead>STATUS</TableHead>
                <TableHead>PHONE NUMBER</TableHead>
                <TableHead>TOTAL DELIVERIES</TableHead>
                <TableHead className="text-right">ACTIONS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {drivers
                .filter(driver => driver.status === 'active' && (driver.assignedOrders || 0) === 0)
                .map((driver) => (
                  <TableRow key={driver.id}>
                    <TableCell className="font-medium flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-200 mr-3 flex items-center justify-center">
                        <span className="text-gray-500">👤</span>
                      </div>
                      {driver.name}
                    </TableCell>
                    <TableCell>
                      <DriverStatusBadge 
                        status={driver.status} 
                        onChange={(newStatus) => handleStatusChange(driver.id, newStatus)}
                      />
                    </TableCell>
                    <TableCell>{driver.phoneNumber}</TableCell>
                    <TableCell>{driver.totalDeliveries || 0}</TableCell>
                    <TableCell className="text-right">
                      <button className="text-gray-500 hover:text-gray-700">
                        <MoreHorizontal size={20} />
                      </button>
                    </TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DriversTable;
