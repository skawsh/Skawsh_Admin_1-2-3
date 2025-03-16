
export const studioAddressMapping: Record<string, string> = {
  'PKC Laundries': '7-1-397, Jubilee Hills, Main Road, Hyderabad',
  'MagicKlean': '8-2-120, Banjara Hills, Circle Road, Hyderabad',
  'Cleanovo': '9-3-456, Ameerpet, Junction Street, Hyderabad',
  'UClean': '10-4-789, Madhapur, Cross Road, Hyderabad',
  'Tumbledry': '11-5-234, Gachibowli, Highway, Hyderabad',
  'Washmart': '12-6-567, HITEC City, Main Road, Hyderabad',
  'We Washh': '13-7-890, Kondapur, Circle Road, Hyderabad',
  'The Laundry Basket': '14-8-123, Kukatpally, Junction Street, Hyderabad',
  'FABO': '15-9-456, Secunderabad, Cross Road, Hyderabad',
  'Sunshine': '16-10-789, Miyapur, Highway, Hyderabad',
  'Bhavani BAND BOX': '17-11-012, Begumpet, Main Road, Hyderabad',
  'Balus Modern': '18-12-345, Manikonda, Circle Road, Hyderabad'
};

export const calculateDistance = (source: string, destination: string): string => {
  const sourceCode = source.charCodeAt(0) + source.charCodeAt(source.length - 1);
  const destCode = destination.charCodeAt(0) + destination.charCodeAt(destination.length - 1);
  
  const distance = ((sourceCode + destCode) % 140) / 10 + 1;
  
  return distance.toFixed(1) + ' km';
};

export const generateRandomAddress = (): string => {
  const plots = ['7-1-397', '8-2-120', '9-3-456', '10-4-789', '11-5-234'];
  const areas = ['Ameerpet', 'Banjara Hills', 'Jubilee Hills', 'Madhapur', 'Gachibowli'];
  const roads = ['Main Road', 'Circle Road', 'Junction Street', 'Cross Road', 'Highway'];
  
  return `${plots[Math.floor(Math.random() * plots.length)]}, ${areas[Math.floor(Math.random() * areas.length)]}, ${roads[Math.floor(Math.random() * roads.length)]}, Hyderabad`;
};
