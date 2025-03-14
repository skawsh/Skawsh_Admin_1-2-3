
import React from 'react';
import { DownloadIcon, Users } from 'lucide-react';
import OrderMetricsCard from './OrderMetricsCard';
import OrdersTable from './OrdersTable';
import { Button } from '@/components/ui/button';
import { 
  totalOrders, 
  newOrders, 
  inProgressOrders, 
  readyForCollectOrders, 
  deliveredOrders,
  collectedOrders,
  cancelledOrders,
  assignedOrders
} from './mockData';
import { formatCurrency } from './formatUtils';

const OrderManagement = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-1">Order Management</h1>
          <p className="text-gray-500">View and manage all customer orders</p>
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
          <Button 
            variant="outline"
            className="flex items-center gap-2 px-4 h-10"
          >
            <DownloadIcon size={18} />
            Export
          </Button>
          
          <Button
            variant="outline"
            className="flex items-center gap-2 px-4 h-10 bg-blue-50 text-laundry-blue border-laundry-blue hover:bg-blue-100 hover:text-laundry-blue-dark"
          >
            <Users size={18} />
            Order Assignment
          </Button>
          
          <Button
            className="px-4 h-10 bg-laundry-blue hover:bg-laundry-blue-dark transition-colors"
          >
            Add New Order
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-4 mb-8">
        <OrderMetricsCard 
          title="Total Orders"
          value={totalOrders.toString()}
          icon="orders"
          className="xl:col-span-2 hover:shadow-md transition-shadow"
        />
        
        <OrderMetricsCard 
          title="New Orders"
          value={newOrders.toString()}
          icon="orders"
          className="xl:col-span-1 hover:shadow-md transition-shadow"
        />
        
        <OrderMetricsCard 
          title="In Progress"
          value={inProgressOrders.toString()}
          icon="progress"
          className="xl:col-span-1 hover:shadow-md transition-shadow"
        />
        
        <OrderMetricsCard 
          title="Ready for Collection"
          value={readyForCollectOrders.toString()}
          icon="ready"
          className="xl:col-span-1 hover:shadow-md transition-shadow"
        />
        
        <OrderMetricsCard 
          title="Collected"
          value={collectedOrders.toString()}
          icon="collected"
          className="xl:col-span-1 hover:shadow-md transition-shadow"
        />
        
        <OrderMetricsCard 
          title="Delivered"
          value={deliveredOrders.toString()}
          icon="delivered"
          className="xl:col-span-1 hover:shadow-md transition-shadow"
        />
        
        <OrderMetricsCard 
          title="Cancelled"
          value={cancelledOrders.toString()}
          icon="cancelled"
          className="xl:col-span-1 hover:shadow-md transition-shadow"
        />

        <OrderMetricsCard 
          title="Assigned"
          value={assignedOrders.toString()}
          icon="assigned"
          className="xl:col-span-1 hover:shadow-md transition-shadow"
        />
      </div>
      
      <OrdersTable />
    </div>
  );
};

export default OrderManagement;
