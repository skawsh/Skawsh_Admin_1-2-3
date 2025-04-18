
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CircleDollarSign, Package, Truck, User, Store } from 'lucide-react';
import { sampleOrders } from '@/components/orders/mockData';
import { Order } from '@/components/orders/types';
import { formatDate, formatCurrency } from '@/components/orders/formatUtils';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import { useIsMobile } from '@/hooks/use-mobile';
import { Card } from '@/components/ui/card';

const OrderDetails = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  
  useEffect(() => {
    setSidebarOpen(!isMobile);
  }, [isMobile]);
  
  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  useEffect(() => {
    // Find the order in the sample data
    const foundOrder = sampleOrders.find(o => o.id === orderId);
    if (foundOrder) {
      setOrder(foundOrder);
    }
  }, [orderId]);

  const handleGoBack = () => {
    navigate('/');
  };

  if (!order) {
    return (
      <div className="flex h-screen bg-gray-50">
        <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
          <div className="p-6">
            <h1 className="text-2xl font-bold">Order not found</h1>
            <Button onClick={handleGoBack} className="mt-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Orders
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Calculate service costs and taxes
  // Core Laundry Services
  const washFoldCost = 83;
  const washIronCost = 99;
  // Clothing Items
  const sareeWithOrnamentCost = 50;
  const blouseWithOrnamentCost = 50;
  // Dry Cleaning Services - Standard
  const shirtDryCleaningCost = 620;
  // Express Wash - Dry Cleaning
  const jeansDryCleaningCost = 400;
  // Shoe Cleaning Services
  const shoeCleaningCost = 1196;
  
  const deliveryFee = 50;
  
  const standardServiceCost = washFoldCost + washIronCost + sareeWithOrnamentCost + blouseWithOrnamentCost + shirtDryCleaningCost;
  const expressServiceCost = jeansDryCleaningCost + shoeCleaningCost;
  
  const serviceTaxRate = 0.18; // 18% GST on services
  const deliveryTaxRate = 0.05; // 5% GST on delivery
  
  const serviceTax = (standardServiceCost + expressServiceCost) * serviceTaxRate;
  const deliveryTax = deliveryFee * deliveryTaxRate;
  
  // Calculate total
  const calculatedTotal = standardServiceCost + expressServiceCost + deliveryFee + serviceTax + deliveryTax;

  // Determine if this is a collection/delivery order or a pickup/drop order
  const isCollectionDelivery = order.id === 'ORD-0001' || order.id === 'ORD-0003' || order.id === 'ORD-0005' || order.id === 'ORD-0007';

  return (
    <div className="flex h-screen bg-gray-50">
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
      
      <Sidebar 
        collapsed={!sidebarOpen}
        className={`fixed z-20 lg:static transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`} 
      />
      
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <Header 
          toggleSidebar={toggleSidebar} 
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center mb-8">
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full mr-4"
                onClick={handleGoBack}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Order Details: {orderId}</h1>
                <p className="text-gray-500">View details for order {orderId}</p>
              </div>
            </div>

            {/* Order Information */}
            <Card className="mb-6 overflow-hidden border-none shadow-sm">
              <div className="bg-green-50 p-4 border-l-4 border-green-500">
                <div className="flex items-center">
                  <Package className="h-5 w-5 text-green-600 mr-2" />
                  <h2 className="text-lg font-semibold text-green-800">Order Information</h2>
                </div>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Order ID</p>
                  <p className="font-medium">{order.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Ordered Date</p>
                  <p className="font-medium">{formatDate(order.orderDate)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Order Delivered date</p>
                  <p className="font-medium">{order.deliveryDate ? formatDate(order.deliveryDate) : 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Wash Type</p>
                  <p className="font-medium text-red-600">
                    {order.washType === 'both' 
                      ? 'Standard & Express Wash' 
                      : order.washType.charAt(0).toUpperCase() + order.washType.slice(1) + ' Wash'}
                  </p>
                </div>
              </div>
            </Card>

            {/* Customer Information */}
            <Card className="mb-6 overflow-hidden border-none shadow-sm">
              <div className="bg-blue-50 p-4 border-l-4 border-blue-500">
                <div className="flex items-center">
                  <User className="h-5 w-5 text-blue-600 mr-2" />
                  <h2 className="text-lg font-semibold text-blue-800">Customer Information</h2>
                </div>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Customer Name</p>
                  <p className="font-medium">{order.customer}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Number</p>
                  <p className="font-medium">{order.phone || '8197739892'}</p>
                </div>
                <div className="col-span-1 md:col-span-2">
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="font-medium">{order.customerAddress || '306, Vasishaya Men\'s PG, Prashant Hills, Hyderabad-500032'}</p>
                </div>
              </div>
            </Card>

            {/* Studio Information */}
            <Card className="mb-6 overflow-hidden border-none shadow-sm">
              <div className="bg-indigo-50 p-4 border-l-4 border-indigo-500">
                <div className="flex items-center">
                  <Store className="h-5 w-5 text-indigo-600 mr-2" />
                  <h2 className="text-lg font-semibold text-indigo-800">Studio Information</h2>
                </div>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Studio Name</p>
                  <p className="font-medium">{order.studio}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Studio ID</p>
                  <p className="font-medium">STD-{order.id.slice(4)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Contact</p>
                  <p className="font-medium">040-23456789</p>
                </div>
                <div className="col-span-1 md:col-span-2">
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="font-medium">{order.studioAddress || `${order.studio}, Jubilee Hills, Hyderabad-500033`}</p>
                </div>
              </div>
            </Card>

            {/* Services Information */}
            <Card className="mb-6 overflow-hidden border-none shadow-sm">
              <div className="bg-yellow-50 p-4 border-l-4 border-yellow-500">
                <div className="flex items-center">
                  <CircleDollarSign className="h-5 w-5 text-yellow-600 mr-2" />
                  <h2 className="text-lg font-semibold text-yellow-800">Services Information</h2>
                </div>
              </div>
              <div className="p-6">
                <p className="text-sm text-gray-500 mb-2">Wash Type</p>
                <p className="font-medium text-red-600 mb-4">
                  {order.washType === 'both' 
                    ? 'Standard & Express Wash' 
                    : order.washType.charAt(0).toUpperCase() + order.washType.slice(1) + ' Wash'}
                </p>
                
                {/* Standard Wash Services */}
                {(order.washType === 'standard' || order.washType === 'both') && (
                  <>
                    <p className="text-blue-600 font-medium mb-4">Standard Wash</p>
                    
                    {/* Core Laundry Services - Updated layout */}
                    <div className="border border-green-300 rounded-lg mb-6 overflow-hidden">
                      <div className="p-4">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="font-medium text-lg">Core Laundry Services</h3>
                        </div>
                        
                        <div className="grid grid-cols-3 border-b py-2">
                          <div className="col-span-1 font-medium">Services</div>
                          <div className="col-span-1 text-center font-medium">Quantity</div>
                          <div className="col-span-1 text-right font-medium">Price</div>
                        </div>
                        
                        <div className="grid grid-cols-3 border-b py-2">
                          <div className="col-span-1">Wash & Fold</div>
                          <div className="col-span-1 text-center">1.3 X 64/KG</div>
                          <div className="col-span-1 text-right">₹83</div>
                        </div>
                        
                        <div className="grid grid-cols-3 border-b py-2">
                          <div className="col-span-1">Wash & Iron</div>
                          <div className="col-span-1 text-center">1 X 99/KG</div>
                          <div className="col-span-1 text-right">₹99</div>
                        </div>
                        
                        <div className="py-2 border-b">
                          <div className="font-medium mb-2">Selected Items</div>
                          <div className="pl-4">1) ShirtX1</div>
                          <div className="pl-4">2) T-Shirt X1</div>
                          <div className="pl-4">3) Cotton SareeX1</div>
                        </div>
                        
                        <div className="border-t border-dashed py-2">
                          <div className="font-medium mb-2">Clothing Items</div>
                          <div className="grid grid-cols-3 py-1">
                            <div className="col-span-1">1) Saree with Ornament</div>
                            <div className="col-span-1 text-center">1 X 50</div>
                            <div className="col-span-1 text-right">₹50</div>
                          </div>
                          <div className="grid grid-cols-3 py-1">
                            <div className="col-span-1">2) Blouse with Ornament</div>
                            <div className="col-span-1 text-center">2 X 25</div>
                            <div className="col-span-1 text-right">₹50</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Dry Cleaning Services - Standard */}
                    <div className="border border-green-300 rounded-lg mb-6 overflow-hidden">
                      <div className="p-4">
                        <h3 className="font-medium text-lg mb-4">Dry Cleaning Services</h3>
                        <div className="font-medium mb-2">Upper Wear</div>
                        <div className="grid grid-cols-3 py-1">
                          <div className="col-span-1">1) Shirt</div>
                          <div className="col-span-1 text-center">2 X 310</div>
                          <div className="col-span-1 text-right">₹620</div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                
                {/* Express Wash Services */}
                {(order.washType === 'express' || order.washType === 'both') && (
                  <>
                    <p className="text-orange-600 font-medium mb-4">Express Wash</p>
                    
                    {/* Dry Cleaning Services - Express */}
                    <div className="border border-green-300 rounded-lg mb-6 overflow-hidden">
                      <div className="p-4">
                        <h3 className="font-medium text-lg mb-4">Dry Cleaning Services</h3>
                        <div className="font-medium mb-2">Bottom Wear</div>
                        <div className="grid grid-cols-3 py-1">
                          <div className="col-span-1">1) Jeans</div>
                          <div className="col-span-1 text-center">2 X 200</div>
                          <div className="col-span-1 text-right">₹400</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Shoe Cleaning Services */}
                    <div className="border border-green-300 rounded-lg mb-6 overflow-hidden">
                      <div className="p-4">
                        <h3 className="font-medium text-lg mb-4">Shoe Cleaning Services</h3>
                        <div className="font-medium mb-2">Regular</div>
                        <div className="grid grid-cols-3 py-1">
                          <div className="col-span-1"></div>
                          <div className="col-span-1 text-center">2 X 598/Pair</div>
                          <div className="col-span-1 text-right">₹1196</div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                
                {/* Delivery Fee */}
                <div className="flex justify-between py-3 border-t">
                  <div>Delivery Fee</div>
                  <div>₹{deliveryFee}</div>
                </div>
                
                {/* Taxes */}
                <div className="py-3 border-t">
                  <div className="font-medium mb-2">Taxes</div>
                  <div className="flex justify-between mb-2">
                    <div>GST on Services (18%)</div>
                    <div>₹{serviceTax.toFixed(2)}</div>
                  </div>
                  <div className="flex justify-between mb-2">
                    <div>GST on Delivery (5%)</div>
                    <div>₹{deliveryTax.toFixed(2)}</div>
                  </div>
                </div>
                
                {/* Total */}
                <div className="flex justify-between font-bold py-3 border-t">
                  <div>Total</div>
                  <div>₹{Math.round(calculatedTotal)}</div>
                </div>
              </div>
            </Card>

            {/* Delivery Information */}
            <Card className="mb-6 overflow-hidden border-none shadow-sm">
              <div className="bg-purple-50 p-4 border-l-4 border-purple-500">
                <div className="flex items-center">
                  <Truck className="h-5 w-5 text-purple-600 mr-2" />
                  <h2 className="text-lg font-semibold text-purple-800">Delivery Information</h2>
                </div>
              </div>
              <div className="p-6">
                {/* Pickup and Drop Section */}
                <div className="mb-6 pb-6 border-b">
                  <h3 className="text-base font-semibold mb-4">Pickup and Drop</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Assigned to</p>
                      <p className="font-medium">Deepak</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Vehicle details</p>
                      <p className="font-medium">Passion Pro - TS02EF0808</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Picked up date & time</p>
                      <p className="font-medium">Jun 10, 2024 at 10:30 AM</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Dropped off date & time</p>
                      <p className="font-medium">Jun 11, 2024 at 04:30 PM</p>
                    </div>
                  </div>
                </div>
                
                {/* Collect and Delivery Section */}
                <div>
                  <h3 className="text-base font-semibold mb-4">Collect and Delivery</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Assigned to</p>
                      <p className="font-medium">Saiteja</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Vehicle details</p>
                      <p className="font-medium">Honda Activa - TS02FF2703</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Collected date & time</p>
                      <p className="font-medium">Jun 12, 2024 at 09:45 AM</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Delivered date & time</p>
                      <p className="font-medium">Jun 15, 2024 at 06:15 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default OrderDetails;
