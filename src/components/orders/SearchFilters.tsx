
import React from 'react';
import { Filter, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchFiltersProps {
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchFilters = ({ searchQuery, onSearchChange }: SearchFiltersProps) => {
  return (
    <div className="flex mb-6 justify-between items-center">
      <div className="relative w-full max-w-md">
        <Input
          placeholder="Search orders..."
          value={searchQuery}
          onChange={onSearchChange}
          className="pl-10 pr-4 py-2"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      </div>
      
      <Button variant="outline" className="flex items-center gap-2 ml-4">
        <Filter className="h-4 w-4" />
        Filters
      </Button>
    </div>
  );
};

export default SearchFilters;
