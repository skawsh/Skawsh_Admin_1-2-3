import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import { useIsMobile } from '@/hooks/use-mobile';
import { sampleDrivers } from '@/components/drivers/mockData';
import { Driver } from '@/components/drivers/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { ArrowLeft, Package, MapPin, Calendar, User, Building, TruckIcon, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { studioAddressMapping } from '@/components/orders/utils/addressUtils';
import StatusBadge from '@/components/orders/StatusBadge';
import { OrderStatus } from '@/components/orders/types';
import OrderCard from '@/components/orders/OrderCard';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

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
  showTripStatus?: boolean;
}

const DriverOrdersDetails = () => {
  const { driverId } = useParams();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const [driver, setDriver] = useState<Driver | null>(null);
  const [assignedOrders, setAssignedOrders] = useState<AssignedOrder[]>([]);
  const [completedOrders, setCompletedOrders] = useState<AssignedOrder[]>([]);
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
              showTripStatus: order.orderId === 'ORD-0004'
            }));
            
            const processed = orders.map((order: AssignedOrder) => {
              if (order.orderId === 'ORD-R001') {
                return {
                  ...order,
                  pickedUp: true,
                  pickedUpTime: "06:40 on 17/03/2025",
                  dropped: true,
                  droppedTime: "07:40 on 17/03/2025"
                };
              }
              if (order.orderId === 'ORD-0011') {
                return {
                  ...order,
                  pickedUp: true,
                  pickedUpTime: "06:40 on 17/03/2025"
                };
              }
              if (order.orderId === 'ORD-R002') {
                return {
                  ...order,
                  pickedUp: true,
                  pickedUpTime: "12:40 on 17/03/2025",
                  dropped: true,
                  droppedTime: "01:20 on 17/03/2025"
                };
              }
              if (order.orderId === 'ORD-0012') {
                return {
                  ...order,
                  pickedUp: true,
                  pickedUpTime: "12:40 on 17/03/2025"
                };
              }
              return order;
            });
            
            const sortedActive = processed
              .filter((order: AssignedOrder) => 
                !order.dropped && order.orderId !== 'ORD-R001' && order.orderId !== 'ORD-R002'
              )
              .sort((a: AssignedOrder, b: AssignedOrder) => {
                if (a.orderId === 'ORD-0004') return -1;
                if (b.orderId === 'ORD-0004') return 1;
                return 0;
              });
            
            const completed = processed.filter((order: AssignedOrder) => 
              order.dropped || order.orderId === 'ORD-R001' || order.orderId === 'ORD-R002'
            );
            
            setAssignedOrders(sortedActive);
            setCompletedOrders(completed);
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
        id: `order-${driverId}-complete`,
        orderId: 'ORD-0001',
        customer: 'Deepika Reddy',
        customerAddress: '72, Kukatpally, Hyderabad',
        studio: 'UClean',
        studioAddress: 'UClean, KPHB Colony, Kukatpally',
        date: '2025-03-02',
        status: 'New',
        pickedUp: true,
        pickedUpTime: '3/17/2025, 9:05:18 PM',
        dropped: true,
        droppedTime: '3/17/2025, 9:05:20 PM'
      });
      
      mockOrders.push({
        id: `order-${driverId}-active`,
        orderId: 'ORD-0004',
        customer: 'Deepika Reddy',
        customerAddress: '72, Kukatpally, Hyderabad',
        studio: 'UClean',
        studioAddress: 'UClean, KPHB Colony, Kukatpally',
        date: '2025-03-03',
        status: 'New',
        pickedUp: true,
        pickedUpTime: '3/17/2025, 9:05:18 PM',
        dropped: false,
        showTripStatus: true
      });
      
      mockOrders.push({
        id: `order-${driverId}-new`,
        orderId: 'ORD-R001',
        customer: 'Sanjay Mehta',
        customerAddress: '27, Film Nagar, Hyderabad',
        studio: 'Laundry Express',
        studioAddress: 'Laundry Express, Road No. 12, Banjara Hills',
        date: '2025-02-24',
        status: 'New',
        pickedUp: true,
        pickedUpTime: '3/17/2025, 9:05:18 PM',
        dropped: false
      });
      
      mockOrders.push({
        id: `order-${driverId}-collection`,
        orderId: 'ORD-0003',
        customer: 'Deepika Reddy',
        customerAddress: '72, Kukatpally, Hyderabad',
        studio: 'UClean',
        studioAddress: 'UClean, KPHB Colony, Kukatpally',
        date: '2025-03-05',
        status: 'ready-for-collect',
        pickedUp: false,
        dropped: false
      });
      
      mockOrders.push({
        id: `order-${driverId}-collected`,
        orderId: 'ORD-0012',
        customer: 'Deepika Reddy',
        customerAddress: '72, Kukatpally, Hyderabad',
        studio: 'UClean',
        studioAddress: 'UClean, KPHB Colony, Kukatpally',
        date: '2025-03-06',
        status: 'ready-for-collect',
        pickedUp: true,
        pickedUpTime: '12:40 on 17/03/2025',
        dropped: false
      });
      
      mockOrders.push({
        id: `order-${driverId}-delivery-complete`,
        orderId: 'ORD-R002',
        customer: 'Deepika Reddy',
        customerAddress: '72, Kukatpally, Hyderabad',
        studio: 'UClean',
        studioAddress: 'UClean, KPHB Colony, Kukatpally',
        date: '2025-03-07',
        status: 'ready-for-collect',
        pickedUp: true,
        pickedUpTime: '12:40 on 17/03/2025',
        dropped: true,
        droppedTime: '01:20 on 17/03/2025'
      });
    }
    
    const processedMockOrders = mockOrders.map((order) => {
      if (order.orderId === 'ORD-R001') {
        return {
          ...order,
          pickedUp: true,
          pickedUpTime: "06:40 on 17/03/2025",
          dropped: true,
          droppedTime: "07:40 on 17/03/2025"
        };
      }
      if (order.orderId === 'ORD-0011') {
        return {
          ...order,
          pickedUp: true,
          pickedUpTime: "06:40 on 17/03/2025"
        };
      }
      if (order.orderId === 'ORD-R002') {
        return {
          ...order,
          pickedUp: true,
          pickedUpTime: "12:40 on 17/03/2025",
          dropped: true,
          droppedTime: "01:20 on 17/03/2025"
        };
      }
      if (order.orderId === 'ORD-0012') {
        return {
          ...order,
          pickedUp: true,
          pickedUpTime: "12:40 on 17/03/2025"
        };
      }
      return order;
    });
    
    const active = processedMockOrders
      .filter(order => 
        !order.dropped && order.orderId !== 'ORD-R001' && order.orderId !== 'ORD-R002'
      )
      .sort((a, b) => {
        if (a.orderId === 'ORD-0004') return -1;
        if (b.orderId === 'ORD-0004') return 1;
        return 0;
      });
      
    const completed = processedMockOrders.filter(order => 
      order.dropped || order.orderId === 'ORD-R001' || order.orderId === 'ORD-R002'
    );
    
    setAssignedOrders(active);
    setCompletedOrders(completed);
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
    window.history.back();
  };

  const simulatePickup = (orderId: string) => {
    const now = new Date();
    const formattedTime = now.toLocaleString();
    
    setAssignedOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        return {
          ...order,
          pickedUp: true,
          pickedUpTime: formattedTime
        };
      }
      return order;
    }));
    
    updateLocalStorage([...assignedOrders.map(order => 
      order.id === orderId ? {...order, pickedUp: true, pickedUpTime: formattedTime} : order
    ), ...completedOrders]);
    
    toast({
      title: "Order Picked Up",
      description: `Order ${orderId} has been marked as picked up.`
    });
  };
  
  const simulateDropped = (orderId: string) => {
    const now = new Date();
    const formattedTime = now.toLocaleString();
    
    const orderToMove = assignedOrders.find(order => order.id === orderId);
    if (orderToMove) {
      const updatedOrder = {
        ...orderToMove,
        dropped: true,
        droppedTime: formattedTime
      };
      
      setAssignedOrders(prev => prev.filter(order => order.id !== orderId));
      setCompletedOrders(prev => [...prev, updatedOrder]);
      
      updateLocalStorage([
        ...assignedOrders.filter(order => order.id !== orderId),
        ...completedOrders,
        updatedOrder
      ]);
      
      toast({
        title: "Order Completed",
        description: `Order ${orderId} has been marked as delivered and moved to completed orders.`
      });
    }
  };
  
  const updateLocalStorage = (orders: AssignedOrder[]) => {
    try {
      localStorage.setItem('driverAssignments', JSON.stringify({
        driverId,
        orders
      }));
    } catch (error) {
      console.error('Failed to update local storage:', error);
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
                onClick={handleBackClick}
                aria-label="Go back"
              >
                <ArrowLeft size={20} />
              </Button>
              <h1 className="text-2xl font-bold">Assigned Orders</h1>
            </div>
          </div>
          
          <Tabs defaultValue="assigned" className="mb-6">
            <TabsList>
              <TabsTrigger value="assigned" className="flex items-center gap-2" onClick={() => setActiveTab('assigned')}>
                <Package className="h-4 w-4 text-blue-600" />
                Assigned Orders ({assignedOrders.length})
              </TabsTrigger>
              <TabsTrigger value="completed" className="flex items-center gap-2" onClick={() => setActiveTab('completed')}>
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                Completed Orders ({completedOrders.length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="assigned">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {assignedOrders.length > 0 ? (
                  assignedOrders.map((order) => (
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
                      isDriverOrdersView={true}
                      showOriginalStatus={true}
                      showTripStatus={order.showTripStatus}
                    />
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500 col-span-3">
                    This driver has no assigned orders.
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="completed">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {completedOrders.length > 0 ? (
                  completedOrders.map((order) => (
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
                      isDriverOrdersView={true}
                      showOriginalStatus={true}
                      showTripStatus={order.showTripStatus}
                    />
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500 col-span-3">
                    No completed orders.
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default DriverOrdersDetails;
