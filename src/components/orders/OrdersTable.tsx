
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

const OrdersTable = ({ className }: OrdersTableProps) => {
  const [activeTab, setActiveTab] = useState<'all' | OrderStatus | 'assigned'>('all');
  const [filteredOrders, setFilteredOrders] = useState(sampleOrders);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedWashType, setSelectedWashType] = useState<WashType | 'all'>('all');

  useEffect(() => {
    applyFilters();
  }, [activeTab, searchQuery, selectedDate, selectedWashType]);

  const applyFilters = () => {
    let result = [...sampleOrders];
    
    // Filter by tab (status)
    if (activeTab !== 'all') {
      if (activeTab === 'assigned') {
        result = result.filter(order => order.assigned === true);
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
    
    // Filter by date
    if (selectedDate) {
      const dateStr = formatDate(selectedDate.toISOString());
      result = result.filter(order => formatDate(order.orderDate) === dateStr);
    }
    
    // Filter by wash type
    if (selectedWashType !== 'all') {
      result = result.filter(order => order.washType === selectedWashType);
    }
    
    setFilteredOrders(result);
  };

  const filterOrders = (tab: 'all' | OrderStatus | 'assigned') => {
    setActiveTab(tab);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleDateChange = (date: Date | undefined) => {
    setSelectedDate(date);
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
          onWashTypeChange={handleWashTypeChange}
        />
        
        {/* Tabs section */}
        <OrderStatusTabs 
          activeTab={activeTab as any}
          onTabChange={filterOrders as any}
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
