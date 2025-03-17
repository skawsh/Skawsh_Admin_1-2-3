
// Helper function to get a random date between two dates
export const getRandomDate = (start: Date, end: Date) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

// Helper function to format date to YYYY-MM-DD
export const formatDateString = (date: Date) => {
  return date.toISOString().split('T')[0];
};

// Helper function to ensure the delivery date is always after the order date
export const getDeliveryDate = (orderDate: Date) => {
  // Add 1-3 days to order date for delivery
  const deliveryDate = new Date(orderDate);
  deliveryDate.setDate(orderDate.getDate() + Math.floor(Math.random() * 3) + 1);
  
  // Make sure delivery date is not in the future beyond today
  return deliveryDate > new Date() ? new Date() : deliveryDate;
};
