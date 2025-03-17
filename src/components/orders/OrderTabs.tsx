
import React, { useState, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Package, CheckCircle2, Flag } from 'lucide-react';
import OrdersList from './OrdersList';
import { AssignedOrder } from '@/types/order';
import SearchFilters from './SearchFilters';
import { WashType } from './types';
import { formatDateTime } from './utils/dateUtils';

interface OrderTabsProps {
  assignedOrders: AssignedOrder[];
  completedOrders: AssignedOrder[];
  reportedOrders?: AssignedOrder[];
}

const OrderTabs: React.FC<OrderTabsProps> = ({ 
  assignedOrders, 
  completedOrders,
  reportedOrders = [] 
}) => {
  const [activeTab, setActiveTab] = useState('assigned');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredAssignedOrders, setFilteredAssignedOrders] = useState<AssignedOrder[]>(assignedOrders);
  const [filteredCompletedOrders, setFilteredCompletedOrders] = useState<AssignedOrder[]>(completedOrders);
  const [filteredReportedOrders, setFilteredReportedOrders] = useState<AssignedOrder[]>(reportedOrders);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [dateRange, setDateRange] = useState<{ start: Date; end: Date } | null>(null);
  const [washTypeFilter, setWashTypeFilter] = useState<WashType | 'all'>('all');

  // Apply filters whenever the dependencies change
  useEffect(() => {
    applyFilters();
  }, [assignedOrders, completedOrders, reportedOrders, searchQuery, dateRange, washTypeFilter, selectedDate]);

  const applyFilters = () => {
    // Filter function to apply all active filters
    const filterOrders = (orders: AssignedOrder[]) => {
      return orders.filter(order => {
        // Apply search filter
        const matchesSearch = !searchQuery || 
          order.customer?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.orderId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.studio?.toLowerCase().includes(searchQuery.toLowerCase());
        
        // Apply date filter
        let matchesDate = true;
        if (dateRange) {
          const orderDate = order.date ? new Date(order.date) : null;
          if (orderDate) {
            const startOfDay = new Date(dateRange.start);
            startOfDay.setHours(0, 0, 0, 0);
            
            const endOfDay = new Date(dateRange.end);
            endOfDay.setHours(23, 59, 59, 999);
            
            matchesDate = orderDate >= startOfDay && orderDate <= endOfDay;
          }
        } else if (selectedDate) {
          const orderDate = order.date ? new Date(order.date) : null;
          if (orderDate) {
            const selectedStartOfDay = new Date(selectedDate);
            selectedStartOfDay.setHours(0, 0, 0, 0);
            
            const selectedEndOfDay = new Date(selectedDate);
            selectedEndOfDay.setHours(23, 59, 59, 999);
            
            matchesDate = orderDate >= selectedStartOfDay && orderDate <= selectedEndOfDay;
          }
        }
        
        // Apply wash type filter
        const matchesWashType = washTypeFilter === 'all' || order.washType === washTypeFilter;
        
        return matchesSearch && matchesDate && matchesWashType;
      });
    };
    
    setFilteredAssignedOrders(filterOrders(assignedOrders));
    setFilteredCompletedOrders(filterOrders(completedOrders));
    setFilteredReportedOrders(filterOrders(reportedOrders));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleDateChange = (date: Date | undefined) => {
    setSelectedDate(date);
    setDateRange(null); // Clear date range when specific date is selected
  };

  const handleDateRangeChange = (range: { start: Date; end: Date } | null) => {
    setDateRange(range);
    setSelectedDate(undefined); // Clear selected date when date range is selected
  };

  const handleWashTypeChange = (type: WashType | 'all') => {
    setWashTypeFilter(type);
  };
  
  return (
    <div className="space-y-6">
      <SearchFilters 
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onDateChange={handleDateChange}
        onDateRangeChange={handleDateRangeChange}
        onWashTypeChange={handleWashTypeChange}
        selectedDate={selectedDate}
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
            emptyMessage="This driver has no assigned orders."
          />
        </TabsContent>
        
        <TabsContent value="completed">
          <OrdersList 
            orders={filteredCompletedOrders}
            emptyMessage="No completed orders."
          />
        </TabsContent>
        
        <TabsContent value="reported">
          <OrdersList 
            orders={filteredReportedOrders}
            emptyMessage="No reported orders."
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OrderTabs;
