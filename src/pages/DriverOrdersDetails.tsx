
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
import { Badge } from '@/components/ui/badge';
import { studioAddressMapping } from '@/components/orders/utils/addressUtils';
import StatusBadge from '@/components/orders/StatusBadge';
import { OrderStatus } from '@/components/orders/types';

interface AssignedOrder {
  id: string;
  orderId: string;
  customer?: string;
  customerAddress?: string;
  studio?: string;
  studioAddress?: string;
  date?: string;
  status?: string;
  originalStatus?: OrderStatus;
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
    const foundDriver = sampleDrivers.find(d => d.id === driverId);
    
    if (foundDriver) {
      setDriver(foundDriver);
      
      try {
        const existingAssignments = localStorage.getItem('driverAssignments');
        if (existingAssignments) {
          const data = JSON.parse(existingAssignments);
          if (data.driverId === driverId && data.orders) {
            const orders = data.orders.map((order: AssignedOrder) => ({
              ...order,
              originalStatus: order.originalStatus || order.status
            }));
            setAssignedOrders(orders);
          } else {
            createMockOrders(foundDriver);
          }
        } else {
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
      navigate('/drivers');
    }
  }, [driverId, navigate, toast]);
  
  const createMockOrders = (driver: Driver) => {
    const mockOrders: AssignedOrder[] = [];
    const orderCount = driver.assignedOrders || 0;
    
    const getStudioAddress = (studioName: string) => {
      return studioAddressMapping[studioName] || generateRandomAddress();
    };
    
    const statusOptions = ['New', 'Ready for Collection', 'In Progress', 'Delivered', 'Collected', 'Pending'];
    const studioNames = [
      'PKC Laundries', 'MagicKlean', 'Cleanovo', 'UClean', 
      'Tumbledry', 'Washmart', 'We Washh', 'The Laundry Basket',
      'Laundry Express'
    ];
    
    const customerNames = ['Deepika Reddy', 'Sanjay Mehta', 'Arun Verma', 'Priya Singh', 'Rajesh Kumar'];
    
    if (orderCount > 0) {
      mockOrders.push({
        id: `order-${driverId}-1`,
        orderId: 'ORD-0004',
        customer: 'Deepika Reddy',
        customerAddress: '8-2-120, Ameerpet, Highway, Hyderabad',
        studio: 'UClean',
        studioAddress: '10-4-789, Madhapur, Cross Road, Hyderabad',
        date: '2025-03-03',
        status: 'New'
      });
      
      mockOrders.push({
        id: `order-${driverId}-2`,
        orderId: 'ORD-R001',
        customer: 'Sanjay Mehta',
        customerAddress: '7-1-397, Banjara Hills, Junction Street, Hyderabad',
        studio: 'Laundry Express',
        studioAddress: 'Laundry Express Studio, Hyderabad',
        date: '2025-02-24',
        status: 'New'
      });
      
      mockOrders.push({
        id: `order-${driverId}-3`,
        orderId: 'ORD-0003',
        customer: 'Arun Verma',
        customerAddress: '10-4-789, Gachibowli, Junction Street, Hyderabad',
        studio: 'Cleanovo',
        studioAddress: '9-3-456, Ameerpet, Junction Street, Hyderabad',
        date: '2025-02-24',
        status: 'Ready for Collection'
      });
    }
    
    for (let i = mockOrders.length; i < orderCount; i++) {
      mockOrders.push({
        id: `order-${driverId}-${i + 1}`,
        orderId: `ORD-${10000 + parseInt(driverId || '0') * 100 + i}`,
        customer: customerNames[i % customerNames.length],
        customerAddress: generateRandomAddress(),
        studio: studioNames[i % studioNames.length],
        studioAddress: getStudioAddress(studioNames[i % studioNames.length]),
        date: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
        status: statusOptions[i % statusOptions.length]
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
    const orderStatus = order.originalStatus || order.status;
    
    if (orderStatus === 'new') {
      return {
        pickupAddress: order.customerAddress,
        pickupName: order.customer,
        deliveryAddress: order.studioAddress,
        deliveryName: order.studio
      };
    } else if (orderStatus === 'ready-for-collect') {
      return {
        pickupAddress: order.studioAddress,
        pickupName: order.studio,
        deliveryAddress: order.customerAddress,
        deliveryName: order.customer
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
    switch(status?.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'in progress':
        return 'bg-blue-100 text-blue-800';
      case 'collected':
        return 'bg-purple-100 text-purple-800';
      case 'ready for collection':
        return 'bg-amber-100 text-amber-800';
      case 'new':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getSimplifiedStatus = (status: string | undefined): OrderStatus | undefined => {
    switch(status) {
      case 'Ready for Collection':
        return 'ready-for-collect';
      case 'In Progress':
        return 'in-progress';
      case 'New':
        return 'new';
      case 'Delivered':
        return 'delivered';
      case 'Collected':
        return 'delivered';
      case 'Pending':
        return 'received';
      default:
        return status as OrderStatus | undefined;
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
                variant="ghost" 
                size="icon" 
                className="mr-4"
                onClick={() => navigate('/')}
                aria-label="Back to orders"
              >
                <ArrowLeft size={20} />
              </Button>
              <h1 className="text-2xl font-bold">Assigned Orders</h1>
            </div>
          </div>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5 text-blue-600" />
                Total Assigned Orders: {assignedOrders.length}
              </CardTitle>
            </CardHeader>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {assignedOrders.length > 0 ? (
              assignedOrders.map((order) => {
                const { pickupAddress, pickupName, deliveryAddress, deliveryName } = getAddressInfo(order);
                
                const orderStatus = order.originalStatus || getSimplifiedStatus(order.status);
                
                return (
                  <Card 
                    key={order.id} 
                    className="overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="p-4 border-b flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-blue-600">{order.orderId}</h3>
                        <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">
                          <Calendar size={14} />
                          <span>{order.date}</span>
                        </div>
                      </div>
                      {orderStatus && <StatusBadge status={orderStatus} />}
                    </div>
                    
                    <div className="p-4">
                      <div className="mb-5">
                        <h4 className="flex items-center text-sm font-medium text-gray-700 mb-2">
                          <MapPin size={16} className="text-red-500 mr-2" />
                          Pickup
                        </h4>
                        <div className="ml-6 space-y-1">
                          <div className="flex items-center">
                            <User size={14} className="text-gray-400 mr-2" />
                            <p className="text-sm font-medium">{pickupName}</p>
                          </div>
                          <div className="flex items-start">
                            <Building size={14} className="text-gray-400 mr-2 mt-1" />
                            <p className="text-sm text-gray-600">{pickupAddress}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="flex items-center text-sm font-medium text-gray-700 mb-2">
                          <TruckIcon size={16} className="text-green-500 mr-2" />
                          Delivery
                        </h4>
                        <div className="ml-6 space-y-1">
                          <div className="flex items-center">
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
                    
                    <div className="p-3 bg-gray-50 border-t flex justify-end">
                      <Button variant="outline" size="sm">
                        Trip Details
                      </Button>
                    </div>
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
