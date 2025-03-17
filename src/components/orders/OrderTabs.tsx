
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Package, CheckCircle2, Flag } from 'lucide-react';
import OrdersList from './OrdersList';
import { AssignedOrder } from '@/types/order';
import SearchFilters from './SearchFilters';

interface OrderTabsProps {
  assignedOrders: AssignedOrder[];
  completedOrders: AssignedOrder[];
  reportedOrders?: AssignedOrder[];
  // Add filter props
  dateRange: { start: Date | null; end: Date | null } | null;
  setDateRange: (range: { start: Date | null; end: Date | null } | null) => void;
  selectedWashType: string;
  setSelectedWashType: (type: string) => void;
  // Add filtered lists
  filteredAssignedOrders: AssignedOrder[];
  filteredCompletedOrders: AssignedOrder[];
  filteredReportedOrders: AssignedOrder[];
}

const OrderTabs: React.FC<OrderTabsProps> = ({ 
  assignedOrders, 
  completedOrders,
  reportedOrders = [],
  dateRange,
  setDateRange,
  selectedWashType,
  setSelectedWashType,
  filteredAssignedOrders,
  filteredCompletedOrders,
  filteredReportedOrders
}) => {
  const [activeTab, setActiveTab] = useState('assigned');
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleDateRangeChange = (range: { start: Date; end: Date } | null) => {
    setDateRange(range);
  };

  const handleWashTypeChange = (type: string) => {
    setSelectedWashType(type);
  };

  return (
    <div className="space-y-4">
      {/* Add filters component */}
      <SearchFilters 
        searchQuery={searchQuery}
        onSearchChange={(e) => setSearchQuery(e.target.value)}
        onDateRangeChange={handleDateRangeChange}
        onWashTypeChange={handleWashTypeChange}
        selectedDate={dateRange?.start || undefined}
      />
      
      <Tabs defaultValue="assigned" className="mb-6">
        <TabsList>
          <TabsTrigger 
            value="assigned" 
            className="flex items-center gap-2" 
            onClick={() => setActiveTab('assigned')}
          >
            <Package className="h-4 w-4 text-blue-600" />
            Assigned Orders ({filteredAssignedOrders.length})
          </TabsTrigger>
          <TabsTrigger 
            value="completed" 
            className="flex items-center gap-2" 
            onClick={() => setActiveTab('completed')}
          >
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            Completed Orders ({filteredCompletedOrders.length})
          </TabsTrigger>
          <TabsTrigger 
            value="reported" 
            className="flex items-center gap-2" 
            onClick={() => setActiveTab('reported')}
          >
            <Flag className="h-4 w-4 text-red-600" />
            Reported Orders ({filteredReportedOrders.length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="assigned">
          <OrdersList 
            orders={filteredAssignedOrders} 
            emptyMessage="This driver has no assigned orders matching your filters."
          />
        </TabsContent>
        
        <TabsContent value="completed">
          <OrdersList 
            orders={filteredCompletedOrders}
            emptyMessage="No completed orders matching your filters."
          />
        </TabsContent>
        
        <TabsContent value="reported">
          <OrdersList 
            orders={filteredReportedOrders}
            emptyMessage="No reported orders matching your filters."
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OrderTabs;
