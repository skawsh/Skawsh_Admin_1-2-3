
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import { useIsMobile } from '@/hooks/use-mobile';
import { sampleDrivers } from '@/components/drivers/mockData';
import { Driver } from '@/components/drivers/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Package, MapPin, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

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

const DriverOrdersDetails = () => {
  const { driverId } = useParams();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const [driver, setDriver] = useState<Driver | null>(null);
  const [assignedOrders, setAssignedOrders] = useState<AssignedOrder[]>([]);
  const { toast } = useToast();
  
  useEffect(() => {
    setSidebarOpen(!isMobile);
  }, [isMobile]);
  
  useEffect(() => {
    // Find the driver in our sample data
    const foundDriver = sampleDrivers.find(d => d.id === driverId);
    
    if (foundDriver) {
      setDriver(foundDriver);
      
      // Get assigned orders from localStorage
      try {
        const existingAssignments = localStorage.getItem('driverAssignments');
        if (existingAssignments) {
          const data = JSON.parse(existingAssignments);
          if (data.driverId === driverId && data.orders) {
            setAssignedOrders(data.orders);
          } else {
            // If we don't have orders for this specific driver in localStorage,
            // create some mock orders
            createMockOrders(foundDriver);
          }
        } else {
          // If no orders in localStorage, create mock orders
          createMockOrders(foundDriver);
        }
      } catch (error) {
        console.error('Failed to parse existing driver assignments:', error);
        createMockOrders(foundDriver);
      }
    } else {
      toast({
        title: "Driver Not Found",
        description: "Could not find the selected driver.",
        variant: "destructive"
      });
      // Redirect back to drivers page if driver not found
      navigate('/drivers');
    }
  }, [driverId, navigate, toast]);
  
  const createMockOrders = (driver: Driver) => {
    // Create mock orders based on driver's assignedOrders count
    const mockOrders: AssignedOrder[] = [];
    const orderCount = driver.assignedOrders || 0;
    
    for (let i = 0; i < orderCount; i++) {
      const studioNames = [
        'PKC Laundries', 'MagicKlean', 'Cleanovo', 'UClean', 
        'Tumbledry', 'Washmart', 'We Washh', 'The Laundry Basket'
      ];
      const statusOptions = ['Pending', 'In Progress', 'Delivered', 'Collected'];
      
      mockOrders.push({
        id: `order-${driverId}-${i + 1}`,
        orderId: `ORD-${10000 + parseInt(driverId) * 100 + i}`,
        customer: `Customer ${i + 1}`,
        customerAddress: generateRandomAddress(),
        studio: studioNames[Math.floor(Math.random() * studioNames.length)],
        studioAddress: generateRandomAddress(),
        date: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
        status: statusOptions[Math.floor(Math.random() * statusOptions.length)]
      });
    }
    
    setAssignedOrders(mockOrders);
  };
  
  const generateRandomAddress = (): string => {
    const plots = ['7-1-397', '8-2-120', '9-3-456', '10-4-789', '11-5-234'];
    const areas = ['Ameerpet', 'Banjara Hills', 'Jubilee Hills', 'Madhapur', 'Gachibowli', 'HITEC City', 'Kondapur'];
    const roads = ['Main Road', 'Circle Road', 'Junction Street', 'Cross Road', 'Highway'];
    
    return `${plots[Math.floor(Math.random() * plots.length)]}, ${areas[Math.floor(Math.random() * areas.length)]}, ${roads[Math.floor(Math.random() * roads.length)]}, Hyderabad`;
  };
  
  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };
  
  if (!driver) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Loading driver details...</h2>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex h-screen bg-gray-50">
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
      
      <Sidebar 
        className={`fixed z-20 lg:static transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`} 
      />
      
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <Header 
          toggleSidebar={toggleSidebar} 
        />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="mb-6 flex items-center">
            <Button 
              variant="outline" 
              size="sm" 
              className="mr-4"
              onClick={() => navigate(`/driver/${driverId}`)}
            >
              <ArrowLeft size={16} className="mr-1" />
              Back to Driver
            </Button>
            <h1 className="text-2xl font-bold">Assigned Orders</h1>
          </div>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5 text-laundry-blue" />
                Driver Information
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Driver Name</span>
                <span className="font-medium">{driver.name}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Phone Number</span>
                <span className="font-medium">{driver.phoneNumber}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Total Assigned Orders</span>
                <span className="font-medium">{driver.assignedOrders || 0}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5 text-laundry-blue" />
                Assigned Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              {assignedOrders.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-16">S.NO</TableHead>
                      <TableHead>ORDER ID</TableHead>
                      <TableHead>DATE</TableHead>
                      <TableHead>CUSTOMER</TableHead>
                      <TableHead>PICKUP ADDRESS</TableHead>
                      <TableHead>STUDIO</TableHead>
                      <TableHead>STATUS</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {assignedOrders.map((order, index) => (
                      <TableRow key={order.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell className="font-medium">{order.orderId}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Calendar size={14} className="text-gray-500" />
                            {order.date}
                          </div>
                        </TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2 max-w-xs truncate">
                            <MapPin size={14} className="text-gray-500 shrink-0" />
                            <span className="truncate" title={order.customerAddress}>{order.customerAddress}</span>
                          </div>
                        </TableCell>
                        <TableCell>{order.studio}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium
                            ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                              order.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                              order.status === 'Collected' ? 'bg-purple-100 text-purple-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                            {order.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  This driver has no assigned orders.
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default DriverOrdersDetails;
