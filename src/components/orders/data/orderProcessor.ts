
import { Order } from '../types';

// Process orders to add proper delivery dates and ensure data consistency
export const processOrders = (orders: Order[]): Order[] => {
  return orders.map(order => {
    const processedOrder = { ...order };
    
    // Create a date object from order date string
    const orderDateObj = new Date(order.orderDate);
    
    // Only delivered status should have delivery dates
    if (order.status === 'delivered' && !order.deliveryDate) {
      const deliveryDate = new Date(orderDateObj);
      deliveryDate.setDate(orderDateObj.getDate() + Math.floor(Math.random() * 3) + 1);
      
      // Make sure delivery date is not in the future beyond today
      if (deliveryDate > new Date()) {
        processedOrder.deliveryDate = orderDateObj.toISOString().split('T')[0];
      } else {
        processedOrder.deliveryDate = deliveryDate.toISOString().split('T')[0];
      }
    }
    
    return processedOrder;
  });
};

// Combine multiple order arrays into a single array
export const combineOrders = (...orderArrays: Order[][]): Order[] => {
  const combinedOrders: Order[] = [];
  
  orderArrays.forEach(orderArray => {
    combinedOrders.push(...orderArray);
  });
  
  return combinedOrders;
};
