
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

// Helper function to format datetime string to a more readable format
export const formatDateTime = (dateTimeString: string) => {
  try {
    const date = new Date(dateTimeString);
    if (isNaN(date.getTime())) {
      // If direct parsing fails, it might be a custom format like "3/17/2025, 9:05:18 PM"
      return dateTimeString;
    }
    
    // Format as "HH:MM on DD/MM/YYYY"
    return `${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} on ${date.toLocaleDateString([], { day: '2-digit', month: '2-digit', year: 'numeric' })}`;
  } catch (error) {
    console.error("Error formatting date time:", error);
    return dateTimeString; // Return original string if parsing fails
  }
};
