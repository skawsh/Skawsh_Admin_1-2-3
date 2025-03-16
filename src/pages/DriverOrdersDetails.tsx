
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import { useIsMobile } from '@/hooks/use-mobile';
import { sampleDrivers } from '@/components/drivers/mockData';
import { Driver } from '@/components/drivers/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { ArrowLeft, Package, MapPin, Calendar, User, Building, TruckIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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

  const getAddressInfo = (order: AssignedOrder) => {
    // When order is in "Pending" or "New" status, pickup is customer, delivery is studio
    // When order is in "Ready for Collection" or "In Progress", pickup is studio, delivery is customer
    if (order.status === 'Pending' || order.status === 'New') {
      return {
        pickupAddress: order.customerAddress,
        pickupName: order.customer,
        deliveryAddress: order.studioAddress,
        deliveryName: order.studio
      };
    } else {
      return {
        pickupAddress: order.studioAddress,
        pickupName: order.studio,
        deliveryAddress: order.customerAddress,
        deliveryName: order.customer
      };
    }
  };
  
  const getStatusColor = (status: string | undefined) => {
    switch(status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Collected':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
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
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center">
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
          </div>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5 text-laundry-blue" />
                Total Assigned Orders: {assignedOrders.length}
              </CardTitle>
            </CardHeader>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {assignedOrders.length > 0 ? (
              assignedOrders.map((order) => {
                const { pickupAddress, pickupName, deliveryAddress, deliveryName } = getAddressInfo(order);
                
                return (
                  <Card 
                    key={order.id} 
                    className="overflow-hidden border border-gray-200 hover:shadow-md transition-shadow duration-300"
                  >
                    <CardHeader className="pb-2 border-b">
                      <div className="flex justify-between items-center">
                        <div className="flex flex-col">
                          <CardTitle className="text-base md:text-lg font-bold text-laundry-blue">
                            {order.orderId}
                          </CardTitle>
                          <div className="flex items-center mt-1">
                            <Calendar size={14} className="text-gray-500 mr-1" />
                            <span className="text-sm text-gray-600">{order.date}</span>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="p-4">
                      <div className="space-y-4">
                        <div className="bg-gray-50 p-3 rounded-md">
                          <h3 className="flex items-center text-sm font-medium text-gray-700 mb-2">
                            <MapPin size={16} className="text-red-500 mr-2" />
                            Pickup
                          </h3>
                          <div className="pl-6">
                            <div className="flex items-center mb-1">
                              <User size={14} className="text-gray-400 mr-2" />
                              <p className="text-sm font-medium">{pickupName}</p>
                            </div>
                            <div className="flex items-start">
                              <Building size={14} className="text-gray-400 mr-2 mt-1" />
                              <p className="text-sm text-gray-600">{pickupAddress}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 p-3 rounded-md">
                          <h3 className="flex items-center text-sm font-medium text-gray-700 mb-2">
                            <TruckIcon size={16} className="text-green-500 mr-2" />
                            Delivery
                          </h3>
                          <div className="pl-6">
                            <div className="flex items-center mb-1">
                              <User size={14} className="text-gray-400 mr-2" />
                              <p className="text-sm font-medium">{deliveryName}</p>
                            </div>
                            <div className="flex items-start">
                              <Building size={14} className="text-gray-400 mr-2 mt-1" />
                              <p className="text-sm text-gray-600">{deliveryAddress}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    
                    <CardFooter className="bg-gray-50 p-3 border-t flex justify-end">
                      <Button variant="outline" size="sm" className="text-xs">
                        View Details
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })
            ) : (
              <div className="text-center py-8 text-gray-500 col-span-3">
                This driver has no assigned orders.
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DriverOrdersDetails;
