
import React, { useState, useEffect } from 'react';
import { Filter, Search, CalendarIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { WashType } from './types';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { format, startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth, subDays } from 'date-fns';

interface DateRangeFilter {
  label: string;
  value: string;
  getDateRange: () => { start: Date; end: Date } | null;
}

interface SearchFiltersProps {
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDateChange?: (date: Date | undefined) => void;
  onDateRangeChange?: (range: { start: Date; end: Date } | null) => void;
  onWashTypeChange?: (washType: WashType | 'all') => void;
  selectedDate?: Date;
}

const SearchFilters = ({ 
  searchQuery, 
  onSearchChange,
  onDateChange,
  onDateRangeChange,
  onWashTypeChange,
  selectedDate 
}: SearchFiltersProps) => {
  const [washType, setWashType] = useState<WashType | 'all'>('all');
  const [dateFilter, setDateFilter] = useState<string>('all');
  const [calendarOpen, setCalendarOpen] = useState(false);

  const dateFilters: DateRangeFilter[] = [
    {
      label: 'All Dates',
      value: 'all',
      getDateRange: () => null
    },
    {
      label: 'Today',
      value: 'today',
      getDateRange: () => {
        const today = new Date();
        return { 
          start: startOfDay(today), 
          end: endOfDay(today) 
        };
      }
    },
    {
      label: 'Yesterday',
      value: 'yesterday',
      getDateRange: () => {
        const yesterday = subDays(new Date(), 1);
        return { 
          start: startOfDay(yesterday), 
          end: endOfDay(yesterday) 
        };
      }
    },
    {
      label: 'This Week',
      value: 'this-week',
      getDateRange: () => {
        const today = new Date();
        return { 
          start: startOfWeek(today, { weekStartsOn: 1 }), 
          end: endOfWeek(today, { weekStartsOn: 1 }) 
        };
      }
    },
    {
      label: 'This Month',
      value: 'this-month',
      getDateRange: () => {
        const today = new Date();
        return { 
          start: startOfMonth(today), 
          end: endOfMonth(today) 
        };
      }
    },
    {
      label: 'Custom Date',
      value: 'custom',
      getDateRange: () => null
    }
  ];

  useEffect(() => {
    // When dateFilter is set to custom, open the calendar
    if (dateFilter === 'custom') {
      setCalendarOpen(true);
    }
  }, [dateFilter]);

  const handleWashTypeChange = (value: string) => {
    const selectedWashType = value as WashType | 'all';
    setWashType(selectedWashType);
    if (onWashTypeChange) {
      onWashTypeChange(selectedWashType);
    }
  };

  const handleDateFilterChange = (value: string) => {
    setDateFilter(value);
    
    if (value === 'custom') {
      setCalendarOpen(true);
      return;
    }
    
    const selectedFilter = dateFilters.find(filter => filter.value === value);
    if (selectedFilter && onDateRangeChange) {
      onDateRangeChange(selectedFilter.getDateRange());
    }
  };

  const handleCustomDateChange = (date: Date | undefined) => {
    if (onDateChange && date) {
      onDateChange(date);
    }
    // Don't auto-close the calendar to give user more control
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
        <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
          <PopoverTrigger asChild>
            <div className="relative">
              <Select value={dateFilter} onValueChange={handleDateFilterChange}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Date Filter" />
                </SelectTrigger>
                <SelectContent>
                  {dateFilters.map(filter => (
                    <SelectItem key={filter.value} value={filter.value}>
                      {filter.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </PopoverTrigger>
          
          <PopoverContent className="w-auto p-0 z-50" align="end" side="bottom">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleCustomDateChange}
              initialFocus
              className="pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
        
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
