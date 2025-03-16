
import React from 'react';
import { ArrowLeft, CheckSquare, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

interface AssignmentHeaderProps {
  selectedOrders: string[];
  onSelectAll: () => void;
  onAssignSelected: () => void;
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  washTypeFilter: string;
  onWashTypeChange: (value: string) => void;
}

export const AssignmentHeader: React.FC<AssignmentHeaderProps> = ({
  selectedOrders,
  onSelectAll,
  onAssignSelected,
  searchQuery,
  onSearchChange,
  washTypeFilter,
  onWashTypeChange
}) => {
  return (
    <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4">
      {/* Back button area - fixed width */}
      <div className="flex items-center">
        <Link to="/">
          <Button variant="ghost" size="icon" className="rounded-full h-10 w-10">
            <ArrowLeft size={20} />
          </Button>
        </Link>
      </div>
      
      {/* Title area - takes remaining space */}
      <div>
        <h1 className="text-3xl font-bold mb-1">Order Assignment</h1>
        <p className="text-gray-500">Assign drivers to orders and manage order dispatch</p>
      </div>
      
      {/* Controls area - fixed width with internal flex layout */}
      <div className="flex items-center gap-4 justify-end">
        <Button 
          variant="outline" 
          className="gap-1 whitespace-nowrap"
          onClick={onSelectAll}
        >
          <CheckSquare size={18} />
          Select Multiple
        </Button>
        
        {selectedOrders.length > 0 && (
          <Button 
            className="gap-2 bg-primary text-white whitespace-nowrap"
            onClick={onAssignSelected}
          >
            <UserPlus size={18} />
            Assign Selected ({selectedOrders.length})
          </Button>
        )}
        
        <Select 
          defaultValue="all" 
          value={washTypeFilter}
          onValueChange={onWashTypeChange}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Wash Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Wash Types</SelectItem>
            <SelectItem value="standard">Standard Wash</SelectItem>
            <SelectItem value="express">Express Wash</SelectItem>
            <SelectItem value="both">Both Wash</SelectItem>
          </SelectContent>
        </Select>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            className="pl-10 w-[250px]"
            placeholder="Search orders..."
            value={searchQuery}
            onChange={onSearchChange}
          />
        </div>
      </div>
    </div>
  );
};
