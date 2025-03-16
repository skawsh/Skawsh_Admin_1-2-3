
import React from 'react';
import { Download, Filter, Plus, Users } from 'lucide-react';
import DriverMetricsCard from './DriverMetricsCard';
import DriversTable from './DriversTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  totalDrivers, 
  activeDrivers, 
  inactiveDrivers
} from './mockData';

const DriverManagement = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-1">Driver Management</h1>
          <p className="text-gray-500">Manage and monitor your delivery staff</p>
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
          <Button 
            variant="outline"
            className="flex items-center gap-2 px-4 h-10"
          >
            <Download size={18} />
            Export
          </Button>
          
          <Button
            className="px-4 h-10 bg-laundry-blue hover:bg-laundry-blue-dark transition-colors"
          >
            <Plus size={18} className="mr-2" />
            Add Driver
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <DriverMetricsCard 
          title="Total Drivers"
          value={totalDrivers.toString()}
          icon="drivers"
          trend={{ value: 3, label: "vs. last period" }}
          className="hover:shadow-md transition-shadow"
        />
        
        <DriverMetricsCard 
          title="Active Drivers"
          value={activeDrivers.toString()}
          icon="active"
          trend={{ value: 5, label: "vs. last period" }}
          className="hover:shadow-md transition-shadow"
        />
        
        <DriverMetricsCard 
          title="Inactive Drivers"
          value={inactiveDrivers.toString()}
          icon="inactive"
          trend={{ value: -3, label: "vs. last period" }}
          className="hover:shadow-md transition-shadow"
        />
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Input 
            type="text" 
            placeholder="Search drivers..." 
            className="pl-10 pr-4 h-11 w-full"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
        </div>
        
        <Button 
          variant="outline"
          className="flex items-center gap-2 px-4 h-11"
        >
          <Filter size={18} />
          Filters
        </Button>
      </div>
      
      <DriversTable />
    </div>
  );
};

export default DriverManagement;
