import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import DriverDetailsComponent from '@/components/drivers/DriverDetailsComponent';
import { useIsMobile } from '@/hooks/use-mobile';
import { useParams } from 'react-router-dom';

const DriverDetails = () => {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const { driverId } = useParams<{ driverId: string }>();
  
  useEffect(() => {
    setSidebarOpen(!isMobile);
  }, [isMobile]);
  
  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
      
      <Sidebar 
        collapsed={!sidebarOpen}
        className={`fixed z-20 lg:static transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`} 
      />
      
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <Header 
          toggleSidebar={toggleSidebar} 
        />
        
        <main className="flex-1 overflow-y-auto">
          <DriverDetailsComponent driverId={driverId} />
        </main>
      </div>
    </div>
  );
};

export default DriverDetails;
