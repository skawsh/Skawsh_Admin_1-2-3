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
import { MoreHorizontal, Package, User, FileText } from 'lucide-react';
import DriverStatusBadge from './DriverStatusBadge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Driver } from './types';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

// Define a type for assigned orders
interface AssignedOrder {
  id: string;
  orderId: string;
  customer?: string;
  customerAddress?: string;
  studio?: string;
  studioAddress?: string;
  date?: string;
  status?: string;
}

const DriversTable = ({ className }: DriversTableProps) => {
  const [drivers, setDrivers] = useState(sampleDrivers);
  const [activeTab, setActiveTab] = useState<string>('all');
  const [assignedOrders, setAssignedOrders] = useState<Record<string, AssignedOrder[]>>({});
  const { toast } = useToast();
  
  // Listen for storage events to sync assignment data across components
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'driverAssignments') {
        try {
          const data = JSON.parse(event.newValue || '{}');
          updateDriverAssignments(data.driverId, data.orders);
        } catch (error) {
          console.error('Failed to parse driver assignment data:', error);
        }
      }
    };
    
    // Check for existing assignments in localStorage
    const existingAssignments = localStorage.getItem('driverAssignments');
    if (existingAssignments) {
      try {
        const data = JSON.parse(existingAssignments);
        updateDriverAssignments(data.driverId, data.orders);
      } catch (error) {
        console.error('Failed to parse existing driver assignments:', error);
      }
    }
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('driverAssignment', ((event: CustomEvent) => {
      updateDriverAssignments(event.detail.driverId, event.detail.orders);
    }) as EventListener);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('driverAssignment', ((event: CustomEvent) => {}) as EventListener);
    };
  }, []);
  
  const updateDriverAssignments = (driverId: string, orders: AssignedOrder[]) => {
    if (!driverId || !orders || orders.length === 0) return;
    
    // Update the assigned orders for this driver
    setAssignedOrders(prev => ({
      ...prev,
      [driverId]: orders
    }));
    
    // Update the driver's assigned orders count
    setDrivers(prevDrivers => 
      prevDrivers.map(driver => 
        driver.id === driverId 
          ? { ...driver, assignedOrders: orders.length } 
          : driver
      )
    );
    
    toast({
      title: "Orders Assigned",
      description: `${orders.length} orders assigned to driver successfully`,
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

  // Get all assigned orders across all drivers
  const getAllAssignedOrders = () => {
    return Object.entries(assignedOrders).flatMap(([driverId, orders]) => 
      orders.map(order => ({
        ...order,
        driverId,
        driverName: drivers.find(d => d.id === driverId)?.name || 'Unknown'
      }))
    );
  };

  // Get drivers who have assigned orders
  const getDriversWithAssignments = () => {
    return drivers.filter(driver => driver.assignedOrders && driver.assignedOrders > 0);
  };
  
  const viewOrderDetails = (driverId: string) => {
    const orders = assignedOrders[driverId] || [];
    if (orders.length === 0) {
      toast({
        title: "No Orders Found",
        description: "This driver has no assigned orders to view.",
      });
      return;
    }
    
    toast({
      title: "Order Details",
      description: `Viewing ${orders.length} orders for this driver`,
    });
    
    // In a real application, you might navigate to a detailed view or open a modal
    console.log("Order details for driver:", driverId, orders);
  };
  
  const viewDriverDetails = (driverId: string) => {
    const driver = drivers.find(d => d.id === driverId);
    if (!driver) {
      toast({
        title: "Driver Not Found",
        description: "Could not find details for this driver.",
      });
      return;
    }
    
    toast({
      title: "Driver Details",
      description: `Viewing details for ${driver.name}`,
    });
    
    // In a real application, you might navigate to a detailed view or open a modal
    console.log("Driver details:", driver);
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
                <TableHead>ASSIGNED ORDERS</TableHead>
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
                  <TableCell>{driver.assignedOrders || 0}</TableCell>
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
          {getDriversWithAssignments().length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">S.NO</TableHead>
                  <TableHead>DRIVER</TableHead>
                  <TableHead>ASSIGNED ORDERS</TableHead>
                  <TableHead className="text-right">ACTIONS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {getDriversWithAssignments().map((driver, index) => (
                  <TableRow key={driver.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell className="font-medium flex items-center">
                      <div className="w-6 h-6 rounded-full bg-gray-200 mr-2 flex items-center justify-center">
                        <span className="text-gray-500 text-xs">👤</span>
                      </div>
                      {driver.name}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Package size={16} className="text-blue-600" />
                        <span>{driver.assignedOrders} orders</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                          onClick={() => viewOrderDetails(driver.id)}
                        >
                          <FileText size={14} />
                          <span className="hidden sm:inline">Orders</span>
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-green-600 hover:text-green-800 flex items-center gap-1"
                          onClick={() => viewDriverDetails(driver.id)}
                        >
                          <User size={14} />
                          <span className="hidden sm:inline">Driver</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="p-8 text-center text-gray-500">
              No orders have been assigned to drivers yet
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
