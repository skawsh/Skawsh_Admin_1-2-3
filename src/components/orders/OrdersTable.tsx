
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { OrderStatus, OrdersTableProps, WashType } from './types';
import { sampleOrders } from './mockData';
import { formatDate, formatCurrency } from './formatUtils';
import SearchFilters from './SearchFilters';
import OrderStatusTabs from './OrderStatusTabs';
import OrdersTableContent from './OrdersTableContent';
import './OrdersBadge.css';
import { startOfDay, endOfDay, isWithinInterval, parseISO } from 'date-fns';

const OrdersTable = ({ className }: OrdersTableProps) => {
  const [activeTab, setActiveTab] = useState<'all' | OrderStatus | 'assigned' | 'completed'>('all');
  const [filteredOrders, setFilteredOrders] = useState(sampleOrders);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [dateRange, setDateRange] = useState<{ start: Date; end: Date } | null>(null);
  const [selectedWashType, setSelectedWashType] = useState<WashType | 'all'>('all');

  useEffect(() => {
    applyFilters();
  }, [activeTab, searchQuery, selectedDate, dateRange, selectedWashType]);

  const applyFilters = () => {
    let result = [...sampleOrders];
    
    // Filter by tab (status)
    if (activeTab !== 'all') {
      if (activeTab === 'assigned') {
        result = result.filter(order => order.assigned === true);
      } else if (activeTab === 'completed') {
        result = result.filter(order => order.status === 'delivered' || order.status === 'completed');
      } else {
        result = result.filter(order => order.status === activeTab);
      }
    }
    
    // Filter by search query
    if (searchQuery) {
      result = result.filter(order => 
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter by specific date
    if (selectedDate) {
      const start = startOfDay(selectedDate);
      const end = endOfDay(selectedDate);
      result = result.filter(order => {
        const orderDate = parseISO(order.orderDate);
        return isWithinInterval(orderDate, { start, end });
      });
    }
    
    // Filter by date range
    if (dateRange) {
      result = result.filter(order => {
        const orderDate = parseISO(order.orderDate);
        return isWithinInterval(orderDate, { start: dateRange.start, end: dateRange.end });
      });
    }
    
    // Filter by wash type
    if (selectedWashType !== 'all') {
      result = result.filter(order => order.washType === selectedWashType);
    }
    
    setFilteredOrders(result);
  };

  const filterOrders = (tab: 'all' | OrderStatus | 'assigned' | 'completed') => {
    setActiveTab(tab);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleDateChange = (date: Date | undefined) => {
    setSelectedDate(date);
    setDateRange(null); // Clear date range when selecting a specific date
  };

  const handleDateRangeChange = (range: { start: Date; end: Date } | null) => {
    setDateRange(range);
    setSelectedDate(undefined); // Clear selected date when selecting a date range
  };

  const handleWashTypeChange = (washType: WashType | 'all') => {
    setSelectedWashType(washType);
  };

  const handleViewDetails = (orderId: string) => {
    console.log(`Viewing details for order: ${orderId}`);
    // This would typically navigate to an order details page
  };

  return (
    <div className={cn("bg-white rounded-md shadow-sm animate-slide-up", className)}>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Orders Overview</h2>
        
        {/* Search and Filter section */}
        <SearchFilters
          searchQuery={searchQuery}
          onSearchChange={handleSearch}
          onDateChange={handleDateChange}
          onDateRangeChange={handleDateRangeChange}
          onWashTypeChange={handleWashTypeChange}
          selectedDate={selectedDate}
        />
        
        {/* Tabs section */}
        <OrderStatusTabs 
          activeTab={activeTab}
          onTabChange={filterOrders}
        />
        
        <div className="mt-6">
          <OrdersTableContent
            filteredOrders={filteredOrders}
            formatDate={formatDate}
            formatCurrency={formatCurrency}
            onViewDetails={handleViewDetails}
          />
        </div>
      </div>
    </div>
  );
};

export default OrdersTable;
