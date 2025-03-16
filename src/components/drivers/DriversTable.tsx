
import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { DriversTableProps } from './types';
import { sampleDrivers } from './mockData';
import { MoreHorizontal } from 'lucide-react';
import DriverStatusBadge from './DriverStatusBadge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Driver } from './types';

const DriversTable = ({ className }: DriversTableProps) => {
  const [drivers, setDrivers] = useState(sampleDrivers);
  const [activeTab, setActiveTab] = useState<string>('all');
  
  const handleStatusChange = (driverId: string, newStatus: 'active' | 'inactive') => {
    setDrivers(drivers.map(driver => 
      driver.id === driverId ? { ...driver, status: newStatus } : driver
    ));
  };
  
  const getFilteredDrivers = (): Driver[] => {
    switch (activeTab) {
      case 'active':
        return drivers.filter(driver => driver.status === 'active');
      case 'inactive':
        return drivers.filter(driver => driver.status === 'inactive');
      case 'assignments':
        return drivers.filter(driver => (driver.assignedOrders || 0) > 0);
      case 'available':
        return drivers.filter(driver => driver.status === 'active' && (driver.assignedOrders || 0) === 0);
      default:
        return drivers;
    }
  };
  
  return (
    <div className="bg-white rounded-md shadow-sm">
      <Tabs defaultValue="all" onValueChange={setActiveTab}>
        <div className="border-b px-4">
          <TabsList className="bg-transparent h-14 p-0 w-auto gap-8">
            <TabsTrigger 
              value="all" 
              className="h-14 px-0 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-laundry-blue data-[state=active]:shadow-none data-[state=active]:bg-transparent"
            >
              <div className="flex items-center gap-2">
                <span className="text-base">Drivers List</span>
              </div>
            </TabsTrigger>
            <TabsTrigger 
              value="assignments" 
              className="h-14 px-0 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-laundry-blue data-[state=active]:shadow-none data-[state=active]:bg-transparent"
            >
              <div className="flex items-center gap-2">
                <span className="text-base">Order Assignments</span>
              </div>
            </TabsTrigger>
            <TabsTrigger 
              value="available" 
              className="h-14 px-0 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-laundry-blue data-[state=active]:shadow-none data-[state=active]:bg-transparent"
            >
              <div className="flex items-center gap-2">
                <span className="text-base">Available Drivers</span>
              </div>
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="all" className="p-0 mt-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">DRIVER</TableHead>
                <TableHead>STATUS</TableHead>
                <TableHead>PHONE NUMBER</TableHead>
                <TableHead className="text-right">ACTIONS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {getFilteredDrivers().map((driver) => (
                <TableRow key={driver.id}>
                  <TableCell className="font-medium flex items-center">
                    <div className="w-8 h-8 rounded-full bg-gray-200 mr-3 flex items-center justify-center">
                      <span className="text-gray-500">👤</span>
                    </div>
                    {driver.name}
                  </TableCell>
                  <TableCell>
                    <DriverStatusBadge 
                      status={driver.status} 
                      onChange={(newStatus) => handleStatusChange(driver.id, newStatus)}
                    />
                  </TableCell>
                  <TableCell>{driver.phoneNumber}</TableCell>
                  <TableCell className="text-right">
                    <button className="text-gray-500 hover:text-gray-700">
                      <MoreHorizontal size={20} />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
        
        <TabsContent value="assignments" className="p-0 mt-0">
          <div className="p-8 text-center text-gray-500">
            Order assignment content will go here
          </div>
        </TabsContent>
        
        <TabsContent value="available" className="p-0 mt-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">DRIVER</TableHead>
                <TableHead>STATUS</TableHead>
                <TableHead>PHONE NUMBER</TableHead>
                <TableHead>TOTAL DELIVERIES</TableHead>
                <TableHead className="text-right">ACTIONS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {drivers
                .filter(driver => driver.status === 'active' && (driver.assignedOrders || 0) === 0)
                .map((driver) => (
                  <TableRow key={driver.id}>
                    <TableCell className="font-medium flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-200 mr-3 flex items-center justify-center">
                        <span className="text-gray-500">👤</span>
                      </div>
                      {driver.name}
                    </TableCell>
                    <TableCell>
                      <DriverStatusBadge 
                        status={driver.status} 
                        onChange={(newStatus) => handleStatusChange(driver.id, newStatus)}
                      />
                    </TableCell>
                    <TableCell>{driver.phoneNumber}</TableCell>
                    <TableCell>{driver.totalDeliveries || 0}</TableCell>
                    <TableCell className="text-right">
                      <button className="text-gray-500 hover:text-gray-700">
                        <MoreHorizontal size={20} />
                      </button>
                    </TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DriversTable;
