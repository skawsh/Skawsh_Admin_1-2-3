
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import { useIsMobile } from '@/hooks/use-mobile';
import { sampleDrivers } from '@/components/drivers/mockData';
import { Driver } from '@/components/drivers/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { ArrowLeft, Package, MapPin, Calendar, User, Building, TruckIcon, CheckCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { studioAddressMapping } from '@/components/orders/utils/addressUtils';
import StatusBadge from '@/components/orders/StatusBadge';
import { OrderStatus } from '@/components/orders/types';
import OrderCard from '@/components/orders/OrderCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
  pickedUp?: boolean;
  pickedUpTime?: string | null;
  dropped?: boolean;
  droppedTime?: string | null;
}

const DriverOrdersDetails = () => {
  const { driverId } = useParams();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const [driver, setDriver] = useState<Driver | null>(null);
  const [assignedOrders, setAssignedOrders] = useState<AssignedOrder[]>([]);
  const [activeTab, setActiveTab] = useState('assigned');
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
              originalStatus: order.originalStatus || order.status,
              // Simulate some orders with pickup and drop status for demonstration
              ...(order.id.includes('1') ? {
                pickedUp: true,
                pickedUpTime: new Date(Date.now() - 3600000).toLocaleString(),
                dropped: false,
                droppedTime: null
              } : order.id.includes('2') ? {
                pickedUp: true,
                pickedUpTime: new Date(Date.now() - 7200000).toLocaleString(),
                dropped: true,
                droppedTime: new Date(Date.now() - 3600000).toLocaleString()
              } : {})
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
      // First mock order with pickup simulation
      mockOrders.push({
        id: `order-${driverId}-1`,
        orderId: 'ORD-0004',
        customer: 'Deepika Reddy',
        customerAddress: '8-2-120, Ameerpet, Highway, Hyderabad',
        studio: 'UClean',
        studioAddress: '10-4-789, Madhapur, Cross Road, Hyderabad',
        date: '2025-03-03',
        status: 'New',
        pickedUp: true,
        pickedUpTime: new Date(Date.now() - 3600000).toLocaleString(),
        dropped: false,
        droppedTime: null
      });
      
      // Second mock order with both pickup and drop
      mockOrders.push({
        id: `order-${driverId}-2`,
        orderId: 'ORD-R001',
        customer: 'Sanjay Mehta',
        customerAddress: '7-1-397, Banjara Hills, Junction Street, Hyderabad',
        studio: 'Laundry Express',
        studioAddress: 'Laundry Express Studio, Hyderabad',
        date: '2025-02-24',
        status: 'New',
        pickedUp: true,
        pickedUpTime: new Date(Date.now() - 7200000).toLocaleString(),
        dropped: true,
        droppedTime: new Date(Date.now() - 3600000).toLocaleString()
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
        status: statusOptions[i % statusOptions.length],
        // Add random pickup and drop status for some orders
        ...(Math.random() > 0.6 ? {
          pickedUp: true,
          pickedUpTime: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toLocaleString(),
          dropped: Math.random() > 0.5,
          droppedTime: Math.random() > 0.5 ? new Date(Date.now() - Math.random() * 12 * 60 * 60 * 1000).toLocaleString() : null
        } : {})
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
  
  const handleBackClick = () => {
    // Navigate back to the previous page in history
    window.history.back();
  };
  
  // Filter orders into 'assigned' and 'completed' categories
  const getAssignedOrders = () => {
    return assignedOrders.filter(order => !order.dropped);
  };
  
  const getCompletedOrders = () => {
    return assignedOrders.filter(order => order.dropped);
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
                onClick={handleBackClick}
                aria-label="Go back"
              >
                <ArrowLeft size={20} />
              </Button>
              <h1 className="text-2xl font-bold">Assigned Orders</h1>
            </div>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList>
              <TabsTrigger value="assigned" className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                Assigned Orders ({getAssignedOrders().length})
              </TabsTrigger>
              <TabsTrigger value="completed" className="flex items-center gap-2">
                <CheckCheck className="h-4 w-4" />
                Completed Orders ({getCompletedOrders().length})
              </TabsTrigger>
            </TabsList>
          </Tabs>
          
          <TabsContent value="assigned" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {getAssignedOrders().length > 0 ? (
                getAssignedOrders().map((order) => (
                  <OrderCard
                    key={order.id}
                    id={order.id}
                    orderId={order.orderId || ""}
                    date={order.date || ""}
                    status={order.originalStatus || getSimplifiedStatus(order.status) || "new"}
                    customer={order.customer || ""}
                    customerAddress={order.customerAddress || ""}
                    studio={order.studio || ""}
                    studioAddress={order.studioAddress || ""}
                    pickedUp={order.pickedUp}
                    pickedUpTime={order.pickedUpTime}
                    dropped={order.dropped}
                    droppedTime={order.droppedTime}
                  />
                ))
              ) : (
                <div className="text-center py-8 text-gray-500 col-span-3">
                  This driver has no active assigned orders.
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="completed" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {getCompletedOrders().length > 0 ? (
                getCompletedOrders().map((order) => (
                  <OrderCard
                    key={order.id}
                    id={order.id}
                    orderId={order.orderId || ""}
                    date={order.date || ""}
                    status={order.originalStatus || getSimplifiedStatus(order.status) || "new"}
                    customer={order.customer || ""}
                    customerAddress={order.customerAddress || ""}
                    studio={order.studio || ""}
                    studioAddress={order.studioAddress || ""}
                    pickedUp={order.pickedUp}
                    pickedUpTime={order.pickedUpTime}
                    dropped={order.dropped}
                    droppedTime={order.droppedTime}
                  />
                ))
              ) : (
                <div className="text-center py-8 text-gray-500 col-span-3">
                  This driver has no completed orders.
                </div>
              )}
            </div>
          </TabsContent>
        </main>
      </div>
    </div>
  );
};

export default DriverOrdersDetails;
