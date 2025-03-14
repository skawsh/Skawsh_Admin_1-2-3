
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { OrderStatus } from './types';

interface OrderStatusTabsProps {
  activeTab: 'all' | OrderStatus;
  onTabChange: (value: 'all' | OrderStatus) => void;
}

const OrderStatusTabs = ({ activeTab, onTabChange }: OrderStatusTabsProps) => {
  return (
    <div className="mb-6 w-full">
      <Tabs 
        defaultValue={activeTab} 
        value={activeTab}
        className="w-full" 
        onValueChange={(value) => onTabChange(value as 'all' | OrderStatus)}
      >
        <div className="relative w-full overflow-x-auto no-scrollbar pb-1">
          <TabsList className="bg-gray-100 h-auto p-1.5 w-full flex justify-between">
            <div className="flex space-x-2 overflow-x-auto no-scrollbar">
              <TabsTrigger 
                value="all" 
                className="px-4 py-2 text-xs data-[state=active]:bg-white rounded-md flex-shrink-0 whitespace-nowrap"
              >
                All Orders
              </TabsTrigger>
              <TabsTrigger 
                value="new" 
                className="px-4 py-2 text-xs data-[state=active]:bg-white rounded-md flex-shrink-0 whitespace-nowrap"
              >
                New
              </TabsTrigger>
              <TabsTrigger 
                value="received" 
                className="px-4 py-2 text-xs data-[state=active]:bg-white rounded-md flex-shrink-0 whitespace-nowrap"
              >
                Received
              </TabsTrigger>
              <TabsTrigger 
                value="in-progress" 
                className="px-4 py-2 text-xs data-[state=active]:bg-white rounded-md flex-shrink-0 whitespace-nowrap"
              >
                In Progress
              </TabsTrigger>
              <TabsTrigger 
                value="ready-for-collect" 
                className="px-4 py-2 text-xs data-[state=active]:bg-white rounded-md flex-shrink-0 whitespace-nowrap"
              >
                Ready for Collection
              </TabsTrigger>
              <TabsTrigger 
                value="collected" 
                className="px-4 py-2 text-xs data-[state=active]:bg-white rounded-md flex-shrink-0 whitespace-nowrap"
              >
                Collected
              </TabsTrigger>
              <TabsTrigger 
                value="delivered" 
                className="px-4 py-2 text-xs data-[state=active]:bg-white rounded-md flex-shrink-0 whitespace-nowrap"
              >
                Delivered
              </TabsTrigger>
              <TabsTrigger 
                value="cancelled" 
                className="px-4 py-2 text-xs data-[state=active]:bg-white rounded-md flex-shrink-0 whitespace-nowrap"
              >
                Cancelled
              </TabsTrigger>
            </div>
            <TabsTrigger 
              value="assigned" 
              className="px-4 py-2 text-xs data-[state=active]:bg-white rounded-md flex-shrink-0 ml-2 whitespace-nowrap"
            >
              Assigned
            </TabsTrigger>
          </TabsList>
        </div>
      </Tabs>
    </div>
  );
};

export default OrderStatusTabs;
