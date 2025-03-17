import { useState, useEffect } from 'react';
import { NavigateFunction } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { sampleDrivers } from '@/components/drivers/mockData';
import { Driver } from '@/components/drivers/types';
import { AssignedOrder } from '@/types/order';

interface UseDriverOrdersReturn {
  driver: Driver | null;
  assignedOrders: AssignedOrder[];
  completedOrders: AssignedOrder[];
  reportedOrders: AssignedOrder[];
  isLoading: boolean;
  updateLocalStorage: (orders: AssignedOrder[]) => void;
  simulatePickup: (orderId: string) => void;
  simulateDropped: (orderId: string) => void;
}

export const useDriverOrders = (
  driverId: string | undefined,
  navigate: NavigateFunction
): UseDriverOrdersReturn => {
  const [driver, setDriver] = useState<Driver | null>(null);
  const [assignedOrders, setAssignedOrders] = useState<AssignedOrder[]>([]);
  const [completedOrders, setCompletedOrders] = useState<AssignedOrder[]>([]);
  const [reportedOrders, setReportedOrders] = useState<AssignedOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    if (!driverId) {
      setIsLoading(false);
      return;
    }
    
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
              if (order.orderId === 'ORD-0004') {
                return {
                  ...order,
                  showTripStatus: true
                };
              }
              return order;
            });
            
            const reportedOrder = {
              id: `order-${driverId}-reported`,
              orderId: 'ORD-0005',
              customer: 'Ravi Kumar',
              customerAddress: '45, Madhapur, Hyderabad',
              studio: 'UClean',
              studioAddress: 'UClean, KPHB Colony, Kukatpally',
              date: '2025-03-15',
              status: 'received',
              pickedUp: true,
              pickedUpTime: '3/15/2025, 2:30:18 PM',
              dropped: false,
              reported: true,
              washType: 'express'
            };
            
            const existingReportedOrder = processed.find((order: AssignedOrder) => order.reported);
            
            if (!existingReportedOrder) {
              processed.push(reportedOrder);
            }
            
            const sortedActive = processed
              .filter((order: AssignedOrder) => 
                !order.dropped && !order.reported && order.orderId !== 'ORD-R001' && order.orderId !== 'ORD-R002'
              )
              .sort((a: AssignedOrder, b: AssignedOrder) => {
                if (a.orderId === 'ORD-0004') return -1;
                if (b.orderId === 'ORD-0004') return 1;
                return 0;
              });
            
            const completed = processed.filter((order: AssignedOrder) => 
              order.dropped || order.orderId === 'ORD-R001' || order.orderId === 'ORD-R002'
            );
            
            const reported = processed.filter((order: AssignedOrder) => 
              order.reported === true
            );
            
            setAssignedOrders(sortedActive);
            setCompletedOrders(completed);
            setReportedOrders(reported);
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
    
    setIsLoading(false);
  }, [driverId, navigate, toast]);
  
  const createMockOrders = (driver: Driver) => {
    const mockOrders: AssignedOrder[] = [];
    const orderCount = driver.assignedOrders || 0;
    
    const studioNames = [
      'PKC Laundries', 'MagicKlean', 'Cleanovo', 'UClean', 
      'Tumbledry', 'Washmart', 'We Washh', 'The Laundry Basket',
      'Laundry Express'
    ];
    
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
        droppedTime: '3/17/2025, 9:05:20 PM',
        washType: 'standard'
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
        showTripStatus: true,
        washType: 'express'
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
        dropped: false,
        washType: 'both'
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
        dropped: false,
        washType: 'standard'
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
        dropped: false,
        washType: 'express'
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
        droppedTime: '01:20 on 17/03/2025',
        washType: 'both'
      });
      
      mockOrders.push({
        id: `order-${driverId}-reported`,
        orderId: 'ORD-0005',
        customer: 'Ravi Kumar',
        customerAddress: '45, Madhapur, Hyderabad',
        studio: 'UClean',
        studioAddress: 'UClean, KPHB Colony, Kukatpally',
        date: '2025-03-15',
        status: 'received',
        pickedUp: true,
        pickedUpTime: '3/15/2025, 2:30:18 PM',
        dropped: false,
        reported: true,
        washType: 'express'
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
      if (order.orderId === 'ORD-0004') {
        return {
          ...order,
          showTripStatus: true
        };
      }
      return order;
    });
    
    const active = processedMockOrders
      .filter(order => 
        !order.dropped && !order.reported && order.orderId !== 'ORD-R001' && order.orderId !== 'ORD-R002'
      )
      .sort((a, b) => {
        if (a.orderId === 'ORD-0004') return -1;
        if (b.orderId === 'ORD-0004') return 1;
        return 0;
      });
      
    const completed = processedMockOrders.filter(order => 
      order.dropped || order.orderId === 'ORD-R001' || order.orderId === 'ORD-R002'
    );
    
    const reported = processedMockOrders.filter(order => 
      order.reported === true
    );
    
    setAssignedOrders(active);
    setCompletedOrders(completed);
    setReportedOrders(reported);
  };
  
  const generateRandomAddress = (): string => {
    const plots = ['7-1-397', '8-2-120', '9-3-456', '10-4-789', '11-5-234'];
    const areas = ['Ameerpet', 'Banjara Hills', 'Jubilee Hills', 'Madhapur', 'Gachibowli', 'HITEC City', 'Kondapur'];
    const roads = ['Main Road', 'Circle Road', 'Junction Street', 'Cross Road', 'Highway'];
    
    return `${plots[Math.floor(Math.random() * plots.length)]}, ${areas[Math.floor(Math.random() * areas.length)]}, ${roads[Math.floor(Math.random() * roads.length)]}, Hyderabad`;
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
  
  const studioAddressMapping: Record<string, string> = {
    'PKC Laundries': 'PKC Laundries, Kothaguda X Roads, Kondapur',
    'MagicKlean': 'MagicKlean, Road No. 1, Banjara Hills',
    'Cleanovo': 'Cleanovo, Hitech City Main Road',
    'UClean': 'UClean, KPHB Colony, Kukatpally',
    'Tumbledry': 'Tumbledry, Gachibowli Main Road',
    'Washmart': 'Washmart, Miyapur X Roads',
    'We Washh': 'We Washh, Madhapur',
    'The Laundry Basket': 'The Laundry Basket, Jubilee Hills Road No. 36',
    'Laundry Express': 'Laundry Express, Road No. 12, Banjara Hills'
  };

  return {
    driver,
    assignedOrders,
    completedOrders,
    reportedOrders,
    isLoading,
    updateLocalStorage,
    simulatePickup,
    simulateDropped
  };
};
