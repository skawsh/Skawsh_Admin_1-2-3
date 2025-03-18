
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import { useIsMobile } from '@/hooks/use-mobile';
import { sampleDrivers } from '@/components/drivers/mockData';
import { Driver } from '@/components/drivers/types';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import PersonalInfoCard from '@/components/riders/PersonalInfoCard';
import ContactInfoCard from '@/components/riders/ContactInfoCard';
import VehicleInfoCard from '@/components/riders/VehicleInfoCard';
import DeliveryStatsCard from '@/components/riders/DeliveryStatsCard';

// Extended Rider type with additional fields
interface ExtendedRider extends Driver {
  emergencyContact?: string;
  address?: string;
  vehicleDetails?: {
    make: string;
    model: string;
    year: string;
    color: string;
    licensePlate: string;
  };
}

const RiderDetails = () => {
  const { driverId } = useParams();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const [rider, setRider] = useState<ExtendedRider | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    setSidebarOpen(!isMobile);
  }, [isMobile]);
  
  useEffect(() => {
    // Find the rider in our sample data
    // In a real app, you would fetch this from an API
    const foundRider = sampleDrivers.find(d => d.id === driverId);
    
    if (foundRider) {
      // Extend the rider with additional mock data for demo purposes
      const extendedRider = {
        ...foundRider,
        emergencyContact: "+1 (555) 765-4321",
        address: "123 Rider Lane, Los Angeles, CA 90001",
        vehicleDetails: {
          make: "Toyota",
          model: "Prius",
          year: "2020",
          color: "Silver",
          licensePlate: "DRV-1234"
        }
      };
      
      setRider(extendedRider);
    } else {
      toast({
        title: "Rider Not Found",
        description: "Could not find the selected rider.",
        variant: "destructive"
      });
      // Redirect back to riders page if rider not found
      navigate('/riders');
    }
  }, [driverId, navigate, toast]);
  
  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };
  
  if (!rider) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Loading rider details...</h2>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex h-screen bg-gray-50">
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
      
      <Sidebar 
        className={`fixed z-20 lg:static transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`} 
      />
      
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <Header 
          toggleSidebar={toggleSidebar} 
        />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="mb-6 flex items-center">
            <Button 
              variant="outline" 
              size="sm" 
              className="mr-4"
              onClick={() => navigate('/riders')}
            >
              <ArrowLeft size={16} className="mr-1" />
              Back to Riders
            </Button>
            <h1 className="text-2xl font-bold">Rider Details</h1>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PersonalInfoCard rider={rider} />
            <ContactInfoCard 
              phoneNumber={rider.phoneNumber} 
              emergencyContact={rider.emergencyContact} 
            />
            {rider.vehicleDetails && (
              <VehicleInfoCard vehicleDetails={rider.vehicleDetails} />
            )}
            <DeliveryStatsCard rider={rider} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default RiderDetails;
