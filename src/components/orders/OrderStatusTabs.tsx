
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { OrderStatus } from './types';

interface OrderStatusTabsProps {
  activeTab: 'all' | OrderStatus | 'assigned' | 'collected' | 'cancelled';
  onTabChange: (value: 'all' | OrderStatus | 'collected' | 'cancelled') => void;
}

const OrderStatusTabs = ({ activeTab, onTabChange }: OrderStatusTabsProps) => {
  return (
    <div className="mb-6 w-full">
      <Tabs 
        defaultValue={activeTab} 
        value={activeTab}
        className="w-full" 
        onValueChange={(value) => onTabChange(value as 'all' | OrderStatus | 'collected' | 'cancelled')}
      >
        <div className="relative w-full overflow-x-auto no-scrollbar pb-1">
          <TabsList className="bg-gray-100 h-auto p-1.5 w-max min-w-full flex space-x-1">
            <TabsTrigger 
              value="all" 
              className={`px-3 py-1.5 text-xs ${activeTab === 'all' ? 'bg-white text-primary font-medium' : 'data-[state=active]:bg-white'} rounded-md flex-shrink-0`}
            >
              All Orders
            </TabsTrigger>
            <TabsTrigger 
              value="new" 
              className={`px-3 py-1.5 text-xs ${activeTab === 'new' ? 'bg-white text-primary font-medium' : 'data-[state=active]:bg-white'} rounded-md flex-shrink-0`}
            >
              New
            </TabsTrigger>
            <TabsTrigger 
              value="received" 
              className={`px-3 py-1.5 text-xs ${activeTab === 'received' ? 'bg-white text-primary font-medium' : 'data-[state=active]:bg-white'} rounded-md flex-shrink-0`}
            >
              Received
            </TabsTrigger>
            <TabsTrigger 
              value="in-progress" 
              className={`px-3 py-1.5 text-xs ${activeTab === 'in-progress' ? 'bg-white text-primary font-medium' : 'data-[state=active]:bg-white'} rounded-md flex-shrink-0`}
            >
              In Progress
            </TabsTrigger>
            <TabsTrigger 
              value="ready-for-collect" 
              className={`px-3 py-1.5 text-xs ${activeTab === 'ready-for-collect' ? 'bg-white text-primary font-medium' : 'data-[state=active]:bg-white'} rounded-md flex-shrink-0`}
            >
              Ready for Collection
            </TabsTrigger>
            <TabsTrigger 
              value="collected" 
              className={`px-3 py-1.5 text-xs ${activeTab === 'collected' ? 'bg-white text-primary font-medium' : 'data-[state=active]:bg-white'} rounded-md flex-shrink-0`}
            >
              Collected
            </TabsTrigger>
            <TabsTrigger 
              value="delivered" 
              className={`px-3 py-1.5 text-xs ${activeTab === 'delivered' ? 'bg-white text-primary font-medium' : 'data-[state=active]:bg-white'} rounded-md flex-shrink-0`}
            >
              Delivered
            </TabsTrigger>
            <TabsTrigger 
              value="cancelled" 
              className={`px-3 py-1.5 text-xs ${activeTab === 'cancelled' ? 'bg-white text-primary font-medium' : 'data-[state=active]:bg-white'} rounded-md flex-shrink-0`}
            >
              Cancelled
            </TabsTrigger>
          </TabsList>
        </div>
      </Tabs>
    </div>
  );
};

export default OrderStatusTabs;
