
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
import RiderStatusBadge from './DriverStatusBadge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Driver } from './types';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

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

const RidersTable = ({ className }: DriversTableProps) => {
  const [riders, setRiders] = useState<Driver[]>([]);
  const [activeTab, setActiveTab] = useState<string>('all');
  const [assignedOrders, setAssignedOrders] = useState<Record<string, AssignedOrder[]>>({});
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Initialize with rider data and load assignments
  useEffect(() => {
    // Start with the sample riders
    setRiders(sampleDrivers);
    
    // Check for existing assignments in localStorage
    const existingAssignments = localStorage.getItem('driverAssignments');
    if (existingAssignments) {
      try {
        const data = JSON.parse(existingAssignments);
        if (data.driverId && Array.isArray(data.orders)) {
          // Store the orders for this rider
          setAssignedOrders(prev => ({
            ...prev,
            [data.driverId]: data.orders
          }));
          
          // Update the rider's assigned orders count
          setRiders(prevRiders => 
            prevRiders.map(rider => 
              rider.id === data.driverId 
                ? { ...rider, assignedOrders: data.orders.length } 
                : rider
            )
          );
        }
      } catch (error) {
        console.error('Failed to parse existing rider assignments:', error);
      }
    }
  }, []);
  
  // Listen for storage events to sync assignment data across components
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'driverAssignments') {
        try {
          const data = JSON.parse(event.newValue || '{}');
          updateRiderAssignments(data.driverId, data.orders);
        } catch (error) {
          console.error('Failed to parse rider assignment data:', error);
        }
      }
    };
    
    const handleRiderAssignment = ((event: CustomEvent) => {
      updateRiderAssignments(event.detail.driverId, event.detail.orders);
    }) as EventListener;
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('driverAssignment', handleRiderAssignment);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('driverAssignment', handleRiderAssignment);
    };
  }, []);
  
  const updateRiderAssignments = (riderId: string, orders: AssignedOrder[]) => {
    if (!riderId || !orders || orders.length === 0) return;
    
    // Update the assigned orders for this rider - store all orders from the event
    setAssignedOrders(prev => ({
      ...prev,
      [riderId]: orders
    }));
    
    // Update the rider's assigned orders count
    setRiders(prevRiders => 
      prevRiders.map(rider => 
        rider.id === riderId 
          ? { ...rider, assignedOrders: orders.length } 
          : rider
      )
    );
    
    toast({
      title: "Orders Updated",
      description: `Rider now has ${orders.length} assigned orders`,
    });
  };
  
  const handleStatusChange = (riderId: string, newStatus: 'active' | 'inactive') => {
    setRiders(riders.map(rider => 
      rider.id === riderId ? { ...rider, status: newStatus } : rider
    ));
  };
  
  const getFilteredRiders = (): Driver[] => {
    switch (activeTab) {
      case 'active':
        return riders.filter(rider => rider.status === 'active');
      case 'inactive':
        return riders.filter(rider => rider.status === 'inactive');
      case 'assignments':
        return riders.filter(rider => (rider.assignedOrders || 0) > 0);
      case 'available':
        return riders.filter(rider => rider.status === 'active' && (rider.assignedOrders || 0) === 0);
      default:
        return riders;
    }
  };

  // Get all assigned orders across all riders
  const getAllAssignedOrders = () => {
    return Object.entries(assignedOrders).flatMap(([riderId, orders]) => 
      orders.map(order => ({
        ...order,
        riderId,
        riderName: riders.find(d => d.id === riderId)?.name || 'Unknown'
      }))
    );
  };

  // Get riders who have assigned orders
  const getRidersWithAssignments = () => {
    return riders.filter(rider => rider.assignedOrders && rider.assignedOrders > 0);
  };
  
  const viewOrderDetails = (riderId: string) => {
    const orders = assignedOrders[riderId] || [];
    if (orders.length === 0) {
      toast({
        title: "No Orders Found",
        description: "This rider has no assigned orders to view.",
      });
      return;
    }
    
    // Navigate to the rider orders details page
    navigate(`/rider/${riderId}/orders`);
  };
  
  const viewRiderDetails = (riderId: string) => {
    // Navigate to the rider details page
    navigate(`/rider/${riderId}`);
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
                <span className="text-base">Riders List</span>
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
                <span className="text-base">Available Riders</span>
              </div>
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="all" className="p-0 mt-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">S.NO</TableHead>
                <TableHead className="w-[300px]">RIDER</TableHead>
                <TableHead>STATUS</TableHead>
                <TableHead>PHONE NUMBER</TableHead>
                <TableHead>ASSIGNED ORDERS</TableHead>
                <TableHead className="text-right">ACTIONS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {getFilteredRiders().map((rider, index) => (
                <TableRow key={rider.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="font-medium flex items-center">
                    <div className="w-8 h-8 rounded-full bg-gray-200 mr-3 flex items-center justify-center">
                      <span className="text-gray-500">👤</span>
                    </div>
                    {rider.name}
                  </TableCell>
                  <TableCell>
                    <RiderStatusBadge 
                      status={rider.status} 
                      onChange={(newStatus) => handleStatusChange(rider.id, newStatus)}
                    />
                  </TableCell>
                  <TableCell>{rider.phoneNumber}</TableCell>
                  <TableCell>{rider.assignedOrders || 0}</TableCell>
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
          {getRidersWithAssignments().length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">S.NO</TableHead>
                  <TableHead>RIDER</TableHead>
                  <TableHead>ASSIGNED ORDERS</TableHead>
                  <TableHead className="text-right">ACTIONS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {getRidersWithAssignments().map((rider, index) => (
                  <TableRow key={rider.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell className="font-medium flex items-center">
                      <div className="w-6 h-6 rounded-full bg-gray-200 mr-2 flex items-center justify-center">
                        <span className="text-gray-500 text-xs">👤</span>
                      </div>
                      {rider.name}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Package size={16} className="text-blue-600" />
                        <span>{rider.assignedOrders} orders</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                          onClick={() => viewOrderDetails(rider.id)}
                        >
                          <FileText size={14} />
                          <span className="hidden sm:inline">Orders</span>
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-green-600 hover:text-green-800 flex items-center gap-1"
                          onClick={() => viewRiderDetails(rider.id)}
                        >
                          <User size={14} />
                          <span className="hidden sm:inline">Rider</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="p-8 text-center text-gray-500">
              No orders have been assigned to riders yet
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="available" className="p-0 mt-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">S.NO</TableHead>
                <TableHead className="w-[300px]">RIDER</TableHead>
                <TableHead>STATUS</TableHead>
                <TableHead>PHONE NUMBER</TableHead>
                <TableHead>TOTAL DELIVERIES</TableHead>
                <TableHead className="text-right">ACTIONS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {riders
                .filter(rider => rider.status === 'active' && (rider.assignedOrders || 0) === 0)
                .map((rider, index) => (
                  <TableRow key={rider.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell className="font-medium flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-200 mr-3 flex items-center justify-center">
                        <span className="text-gray-500">👤</span>
                      </div>
                      {rider.name}
                    </TableCell>
                    <TableCell>
                      <RiderStatusBadge 
                        status={rider.status} 
                        onChange={(newStatus) => handleStatusChange(rider.id, newStatus)}
                      />
                    </TableCell>
                    <TableCell>{rider.phoneNumber}</TableCell>
                    <TableCell>{rider.totalDeliveries || 0}</TableCell>
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

export default RidersTable;
