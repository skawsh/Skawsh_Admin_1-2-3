
import React, { useState } from 'react';
import { Filter, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { WashType } from './types';

interface SearchFiltersProps {
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDateChange?: (date: Date | undefined) => void;
  onWashTypeChange?: (washType: WashType | 'all') => void;
}

const SearchFilters = ({ 
  searchQuery, 
  onSearchChange,
  onDateChange,
  onWashTypeChange 
}: SearchFiltersProps) => {
  const [washType, setWashType] = useState<WashType | 'all'>('all');

  const handleWashTypeChange = (value: string) => {
    const selectedWashType = value as WashType | 'all';
    setWashType(selectedWashType);
    if (onWashTypeChange) {
      onWashTypeChange(selectedWashType);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="relative w-full md:max-w-md">
        <Input
          placeholder="Search orders..."
          value={searchQuery}
          onChange={onSearchChange}
          className="pl-10 pr-4 py-2"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      </div>
      
      <div className="flex gap-3 flex-1 justify-end">
        <Select value={washType} onValueChange={handleWashTypeChange}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Wash Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="standard">Standard</SelectItem>
            <SelectItem value="express">Express</SelectItem>
            <SelectItem value="both">Both</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SearchFilters;
