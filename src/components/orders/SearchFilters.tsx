import React, { useState, useEffect } from 'react';
import { Filter, Search, CalendarIcon, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { WashType } from './types';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { format, startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth, subDays } from 'date-fns';
import { DateRange } from 'react-day-picker';

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
  const [dateFilter, setDateFilter] = useState<string>('today'); // Default to today
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date()); // Set default date to today
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: undefined
  });
  const [calendarMode, setCalendarMode] = useState<'single' | 'range'>('single');

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

  // Initialize with today's date range
  useEffect(() => {
    const todayFilter = dateFilters.find(filter => filter.value === 'today');
    if (todayFilter && onDateRangeChange) {
      onDateRangeChange(todayFilter.getDateRange());
    }
  }, []);

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

  const handleSingleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    // Don't auto-close the calendar to give user more control
  };

  const handleDateRangeSelect = (range: DateRange | undefined) => {
    setDateRange(range);
  };

  const handleCalendarModeToggle = () => {
    setCalendarMode(prev => prev === 'single' ? 'range' : 'single');
    // Reset selections when switching modes
    if (calendarMode === 'single') {
      setDateRange({ from: new Date(), to: undefined });
    } else {
      setDate(new Date());
    }
  };

  const handleConfirm = () => {
    if (calendarMode === 'single' && date && onDateChange) {
      onDateChange(date);
    } else if (calendarMode === 'range' && dateRange && dateRange.from && dateRange.to && onDateRangeChange) {
      onDateRangeChange({
        start: startOfDay(dateRange.from),
        end: endOfDay(dateRange.to)
      });
    }
    setCalendarOpen(false);
  };

  const handleCancel = () => {
    // Reset to previous selections or defaults
    setCalendarOpen(false);
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
            <div className="flex flex-col p-2">
              <div className="flex justify-between mb-2">
                <Button 
                  variant={calendarMode === 'single' ? 'default' : 'outline'} 
                  size="sm" 
                  onClick={() => setCalendarMode('single')}
                  className="text-xs"
                >
                  Single Date
                </Button>
                <Button 
                  variant={calendarMode === 'range' ? 'default' : 'outline'} 
                  size="sm" 
                  onClick={() => setCalendarMode('range')}
                  className="text-xs"
                >
                  Date Range
                </Button>
              </div>
              
              {calendarMode === 'single' ? (
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={handleSingleDateSelect}
                  initialFocus
                  className="pointer-events-auto"
                />
              ) : (
                <Calendar
                  mode="range"
                  selected={dateRange}
                  onSelect={handleDateRangeSelect}
                  initialFocus
                  numberOfMonths={1}
                  className="pointer-events-auto"
                />
              )}
              
              <div className="flex justify-end gap-2 mt-2">
                <Button variant="outline" size="sm" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button size="sm" onClick={handleConfirm}>
                  OK
                </Button>
              </div>
            </div>
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
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SearchFilters;
