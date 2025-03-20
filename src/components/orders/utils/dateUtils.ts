
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

// Format date and time in the format HH:MM on DD/MM/YYYY
export const formatDateTime = (dateString: string | Date) => {
  const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
  
  // Format hours and minutes
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  
  // Format day, month, and year
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  
  return `${hours}:${minutes} on ${day}/${month}/${year}`;
};

// Get current time as a formatted string
export const getCurrentTime = () => {
  const now = new Date();
  return formatDateTime(now);
};

