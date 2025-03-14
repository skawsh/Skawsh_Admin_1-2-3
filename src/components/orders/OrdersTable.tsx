
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { OrderStatus, OrdersTableProps } from './types';
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

  const filterOrders = (tab: 'all' | OrderStatus | 'assigned') => {
    setActiveTab(tab);
    
    if (tab === 'all') {
      setFilteredOrders(
        searchQuery ? 
          sampleOrders.filter(order => 
            order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.customer.toLowerCase().includes(searchQuery.toLowerCase())
          ) : 
          sampleOrders
      );
    } else if (tab === 'assigned') {
      setFilteredOrders(
        sampleOrders.filter(order => 
          order.assigned === true && 
          (searchQuery ? 
            order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.customer.toLowerCase().includes(searchQuery.toLowerCase()) :
            true
          )
        )
      );
    } else {
      setFilteredOrders(
        sampleOrders.filter(order => 
          order.status === tab && 
          (searchQuery ? 
            order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.customer.toLowerCase().includes(searchQuery.toLowerCase()) :
            true
          )
        )
      );
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (activeTab === 'all') {
      setFilteredOrders(
        query ? 
          sampleOrders.filter(order => 
            order.id.toLowerCase().includes(query.toLowerCase()) ||
            order.customer.toLowerCase().includes(query.toLowerCase())
          ) : 
          sampleOrders
      );
    } else if (activeTab === 'assigned') {
      setFilteredOrders(
        sampleOrders.filter(order => 
          order.assigned === true && 
          (query ? 
            order.id.toLowerCase().includes(query.toLowerCase()) ||
            order.customer.toLowerCase().includes(query.toLowerCase()) :
            true
          )
        )
      );
    } else {
      setFilteredOrders(
        sampleOrders.filter(order => 
          order.status === activeTab && 
          (query ? 
            order.id.toLowerCase().includes(query.toLowerCase()) ||
            order.customer.toLowerCase().includes(query.toLowerCase()) :
            true
          )
        )
      );
    }
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
