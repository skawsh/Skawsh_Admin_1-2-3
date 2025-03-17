
import React, { useState } from 'react';
import { Package, ClipboardCheck, Clock } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { sampleOrders, exclusiveRescheduledOrders } from '@/components/orders/mockData';
import { Order } from '@/components/orders/types';
import { AssignDriverDialog } from '@/components/orders/AssignDriverDialog';
import { AssignmentHeader } from '@/components/orders/AssignmentHeader';
import { OrdersAssignmentTable } from '@/components/orders/OrdersAssignmentTable';
import { mapOrdersToTableData, OrderTableData } from '@/components/orders/OrderTableDataMapper';
import { toast } from "sonner";

const OrderAssignment = () => {
  const [selectedNewOrders, setSelectedNewOrders] = useState<string[]>([]);
  const [selectedReadyOrders, setSelectedReadyOrders] = useState<string[]>([]);
  const [selectedRescheduledOrders, setSelectedRescheduledOrders] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [washTypeFilter, setWashTypeFilter] = useState('all');
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [currentOrderToAssign, setCurrentOrderToAssign] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('new');

  const newOrders = sampleOrders.filter(order => order.status === 'new' || order.status === 'received');
  const readyForCollectionOrders = sampleOrders.filter(order => order.status === 'ready-for-collect');
  
  const rescheduledNewOrders = newOrders.filter((_, index) => index % 3 === 0);
  const rescheduledReadyOrders = readyForCollectionOrders.filter((_, index) => index % 3 === 0);
  
  const rescheduledOrders = [...rescheduledNewOrders, ...rescheduledReadyOrders, ...exclusiveRescheduledOrders];

  const pendingOrders = mapOrdersToTableData(newOrders);
  const readyOrders = mapOrdersToTableData(readyForCollectionOrders);
  const rescheduledOrdersData = mapOrdersToTableData(rescheduledOrders);

  const selectedOrders = [...selectedNewOrders, ...selectedReadyOrders, ...selectedRescheduledOrders];

  const filteredPendingOrders = pendingOrders.filter(order => {
    const matchesSearch = !searchQuery || 
      order.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.studio.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesWashType = washTypeFilter === 'all' || 
      order.washType.toLowerCase().includes(washTypeFilter.toLowerCase());
    
    return matchesSearch && matchesWashType;
  });

  const filteredRescheduledOrders = rescheduledOrdersData.filter(order => {
    const matchesSearch = !searchQuery || 
      order.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.studio.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesWashType = washTypeFilter === 'all' || 
      order.washType.toLowerCase().includes(washTypeFilter.toLowerCase());
    
    return matchesSearch && matchesWashType;
  });

  const toggleOrderSelection = (orderId: string) => {
    const isNewOrder = pendingOrders.some(order => order.id === orderId);
    const isReadyOrder = readyOrders.some(order => order.id === orderId);
    const isRescheduledOrder = rescheduledOrdersData.some(order => order.id === orderId);
    
    if (isNewOrder && activeTab === 'new') {
      if (selectedNewOrders.includes(orderId)) {
        setSelectedNewOrders(selectedNewOrders.filter(id => id !== orderId));
      } else {
        setSelectedNewOrders([...selectedNewOrders, orderId]);
      }
    } else if (isReadyOrder && activeTab === 'ready') {
      if (selectedReadyOrders.includes(orderId)) {
        setSelectedReadyOrders(selectedReadyOrders.filter(id => id !== orderId));
      } else {
        setSelectedReadyOrders([...selectedReadyOrders, orderId]);
      }
    } else if (isRescheduledOrder && activeTab === 'rescheduled') {
      if (selectedRescheduledOrders.includes(orderId)) {
        setSelectedRescheduledOrders(selectedRescheduledOrders.filter(id => id !== orderId));
      } else {
        setSelectedRescheduledOrders([...selectedRescheduledOrders, orderId]);
      }
    }
  };

  const handleSelectAll = () => {
    if (activeTab === 'new') {
      if (selectedNewOrders.length === filteredPendingOrders.length) {
        setSelectedNewOrders([]);
      } else {
        setSelectedNewOrders(filteredPendingOrders.map(order => order.id));
      }
    } else if (activeTab === 'ready') {
      if (selectedReadyOrders.length === readyOrders.length) {
        setSelectedReadyOrders([]);
      } else {
        setSelectedReadyOrders(readyOrders.map(order => order.id));
      }
    } else if (activeTab === 'rescheduled') {
      if (selectedRescheduledOrders.length === filteredRescheduledOrders.length) {
        setSelectedRescheduledOrders([]);
      } else {
        setSelectedRescheduledOrders(filteredRescheduledOrders.map(order => order.id));
      }
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleWashTypeChange = (value: string) => {
    setWashTypeFilter(value);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const handleAssignSelected = () => {
    setCurrentOrderToAssign(null);
    setIsAssignDialogOpen(true);
  };

  const handleAssignSingle = (orderId: string) => {
    setSelectedNewOrders([]);
    setSelectedReadyOrders([]);
    setSelectedRescheduledOrders([]);
    
    if (pendingOrders.some(order => order.id === orderId)) {
      setSelectedNewOrders([orderId]);
    } else if (readyOrders.some(order => order.id === orderId)) {
      setSelectedReadyOrders([orderId]);
    } else if (rescheduledOrdersData.some(order => order.id === orderId)) {
      setSelectedRescheduledOrders([orderId]);
    }
    
    setCurrentOrderToAssign(orderId);
    setIsAssignDialogOpen(true);
  };

  const handleAssignDriver = (driverId: string, orderIds: string[]) => {
    console.log('Assigning driver:', driverId, 'to orders:', orderIds);
    
    const orderText = orderIds.length === 1 ? 'order' : 'orders';
    toast.success(`Successfully assigned driver to ${orderIds.length} ${orderText}`);
    
    // Save to localStorage and dispatch event for other components
    const assignmentData = {
      driverId: driverId,
      orders: getOrdersDataById(orderIds)
    };
    
    localStorage.setItem('driverAssignments', JSON.stringify(assignmentData));
    
    // Dispatch a custom event for components that may not have access to the localStorage event
    window.dispatchEvent(new CustomEvent('driverAssignment', { 
      detail: assignmentData 
    }));
    
    setSelectedNewOrders([]);
    setSelectedReadyOrders([]);
    setSelectedRescheduledOrders([]);
  };

  // Helper function to get order data by ids
  const getOrdersDataById = (orderIds: string[]) => {
    const allOrders = [...pendingOrders, ...readyOrders, ...rescheduledOrdersData];
    return orderIds.map(id => allOrders.find(order => order.id === id)).filter(Boolean);
  };

  const getSelectedOrdersData = () => {
    if (currentOrderToAssign) {
      // If assigning a single order, find it from all available orders
      const order = [...pendingOrders, ...readyOrders, ...rescheduledOrdersData]
        .find(o => o.id === currentOrderToAssign);
        
      if (order) {
        // If it's a rescheduled order, categorize it properly
        if (rescheduledOrdersData.some(ro => ro.id === order.id)) {
          return {
            newOrders: order.status && order.status !== 'ready-for-collect' ? [order] : [],
            readyOrders: order.status === 'ready-for-collect' ? [order] : [],
            rescheduledOrders: [order]
          };
        }
        
        // If it's a regular order from new or ready tabs
        return {
          newOrders: pendingOrders.some(po => po.id === order.id) ? [order] : [],
          readyOrders: readyOrders.some(ro => ro.id === order.id) ? [order] : [],
          rescheduledOrders: []
        };
      }
      
      return {
        newOrders: [],
        readyOrders: [],
        rescheduledOrders: []
      };
    }
    
    // Get orders that were selected from the new orders tab
    const selectedNewOrdersData = pendingOrders.filter(order => 
      selectedNewOrders.includes(order.id)
    );
    
    // Get orders that were selected from the ready orders tab
    const selectedReadyOrdersData = readyOrders.filter(order => 
      selectedReadyOrders.includes(order.id)
    );
    
    // Get orders that were selected from the rescheduled orders tab
    const selectedRescheduledOrdersData = rescheduledOrdersData.filter(order => 
      selectedRescheduledOrders.includes(order.id)
    );
    
    return {
      newOrders: selectedNewOrdersData,
      readyOrders: selectedReadyOrdersData,
      rescheduledOrders: selectedRescheduledOrdersData
    };
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 space-y-6 animate-fade-in">
      <AssignmentHeader 
        selectedOrders={selectedOrders}
        onSelectAll={handleSelectAll}
        onAssignSelected={handleAssignSelected}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        washTypeFilter={washTypeFilter}
        onWashTypeChange={handleWashTypeChange}
      />
      
      <Tabs 
        defaultValue="new" 
        className="w-full"
        value={activeTab}
        onValueChange={handleTabChange}
      >
        <TabsList className="mb-4">
          <TabsTrigger value="new" className="flex items-center gap-2">
            <Package size={16} />
            New Orders
          </TabsTrigger>
          <TabsTrigger value="ready" className="flex items-center gap-2">
            <ClipboardCheck size={16} />
            Ready for Collection
          </TabsTrigger>
          <TabsTrigger value="rescheduled" className="flex items-center gap-2">
            <Clock size={16} />
            Rescheduled
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="new" className="space-y-4">
          <OrdersAssignmentTable
            title="New Order Assignments"
            icon={<Package size={20} className="text-laundry-blue" />}
            statusText={<div className="flex items-center gap-1"><Clock size={16} /><span>{newOrders.length} Orders Pending</span></div>}
            orders={filteredPendingOrders}
            selectedOrders={selectedNewOrders}
            onToggleOrderSelection={toggleOrderSelection}
            onSelectAll={handleSelectAll}
            onAssignSingle={handleAssignSingle}
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            showSearch={true}
          />
        </TabsContent>
        
        <TabsContent value="ready">
          {readyOrders.length > 0 ? (
            <OrdersAssignmentTable
              title="Ready for Collection"
              icon={<ClipboardCheck size={20} className="text-green-600" />}
              statusText={<div className="flex items-center gap-1"><Clock size={16} /><span>{readyForCollectionOrders.length} Orders Ready</span></div>}
              orders={readyOrders}
              selectedOrders={selectedReadyOrders}
              onToggleOrderSelection={toggleOrderSelection}
              onSelectAll={handleSelectAll}
              onAssignSingle={handleAssignSingle}
            />
          ) : (
            <div className="bg-white rounded-md p-6 border border-gray-100 flex items-center justify-center text-gray-500 h-64">
              No orders ready for collection
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="rescheduled">
          {filteredRescheduledOrders.length > 0 ? (
            <OrdersAssignmentTable
              title="Rescheduled Orders"
              icon={<Clock size={20} className="text-amber-500" />}
              statusText={<div className="flex items-center gap-1"><Clock size={16} /><span>{rescheduledOrders.length} Orders Rescheduled</span></div>}
              orders={filteredRescheduledOrders}
              selectedOrders={selectedRescheduledOrders}
              onToggleOrderSelection={toggleOrderSelection}
              onSelectAll={handleSelectAll}
              onAssignSingle={handleAssignSingle}
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
              showSearch={true}
              showStatus={true}
            />
          ) : (
            <div className="bg-white rounded-md p-6 border border-gray-100 flex items-center justify-center text-gray-500 h-64">
              No rescheduled orders
            </div>
          )}
        </TabsContent>
      </Tabs>

      <AssignDriverDialog
        isOpen={isAssignDialogOpen}
        onOpenChange={setIsAssignDialogOpen}
        selectedOrders={getSelectedOrdersData()}
        onAssignDriver={handleAssignDriver}
      />
    </div>
  );
};

export default OrderAssignment;
