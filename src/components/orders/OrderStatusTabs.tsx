
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { OrderStatus } from './types';

interface OrderStatusTabsProps {
  activeTab: 'all' | OrderStatus;
  onTabChange: (value: 'all' | OrderStatus) => void;
}

const OrderStatusTabs = ({ activeTab, onTabChange }: OrderStatusTabsProps) => {
  return (
    <div className="mb-6 w-full overflow-hidden">
      <Tabs 
        defaultValue={activeTab} 
        value={activeTab}
        className="w-full" 
        onValueChange={(value) => onTabChange(value as 'all' | OrderStatus)}
      >
        <div className="overflow-x-auto no-scrollbar">
          <TabsList className="bg-gray-100 h-auto p-1 w-max min-w-full inline-flex">
            <TabsTrigger 
              value="all" 
              className="whitespace-nowrap px-6 py-2 data-[state=active]:bg-white rounded-md flex-shrink-0"
            >
              All Orders
            </TabsTrigger>
            <TabsTrigger 
              value="new" 
              className="whitespace-nowrap px-6 py-2 data-[state=active]:bg-white rounded-md flex-shrink-0"
            >
              New Orders
            </TabsTrigger>
            <TabsTrigger 
              value="received" 
              className="whitespace-nowrap px-6 py-2 data-[state=active]:bg-white rounded-md flex-shrink-0"
            >
              Orders Received
            </TabsTrigger>
            <TabsTrigger 
              value="in-progress" 
              className="whitespace-nowrap px-6 py-2 data-[state=active]:bg-white rounded-md flex-shrink-0"
            >
              Orders In Progress
            </TabsTrigger>
            <TabsTrigger 
              value="ready-for-collect" 
              className="whitespace-nowrap px-6 py-2 data-[state=active]:bg-white rounded-md flex-shrink-0"
            >
              Ready for collection
            </TabsTrigger>
            <TabsTrigger 
              value="delivered" 
              className="whitespace-nowrap px-6 py-2 data-[state=active]:bg-white rounded-md flex-shrink-0"
            >
              Orders Delivered
            </TabsTrigger>
            <TabsTrigger 
              value="collected" 
              className="whitespace-nowrap px-6 py-2 data-[state=active]:bg-white rounded-md flex-shrink-0"
            >
              Orders collected
            </TabsTrigger>
            <TabsTrigger 
              value="cancelled" 
              className="whitespace-nowrap px-6 py-2 data-[state=active]:bg-white rounded-md flex-shrink-0"
            >
              Orders cancelled
            </TabsTrigger>
          </TabsList>
        </div>
      </Tabs>
    </div>
  );
};

export default OrderStatusTabs;
