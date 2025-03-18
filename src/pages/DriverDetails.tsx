
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import { useIsMobile } from '@/hooks/use-mobile';
import { useDriverDetails } from '@/components/drivers/useDriverDetails';
import DriverDetailsSectionTabs from '@/components/drivers/DriverDetailsSectionTabs';
import DriverActionsHeader from '@/components/drivers/DriverActionsHeader';
import PersonalInfoSection from '@/components/drivers/PersonalInfoSection';
import DocumentationSection from '@/components/drivers/DocumentationSection';
import VehicleInfoSection from '@/components/drivers/VehicleInfoSection';
import PaymentDetailsSection from '@/components/drivers/PaymentDetailsSection';
import PasswordResetDialog from '@/components/drivers/PasswordResetDialog';

const DriverDetails = () => {
  const { driverId } = useParams();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  
  const {
    driver,
    editedDriver,
    isEditing,
    activeSection,
    passwordDialogOpen,
    setPasswordDialogOpen,
    handleEdit,
    handleCancel,
    handleSave,
    handleInputChange,
    handlePasswordReset,
    handleSectionChange,
  } = useDriverDetails(driverId);
  
  useEffect(() => {
    setSidebarOpen(!isMobile);
  }, [isMobile]);
  
  if (!driver) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Loading driver details...</h2>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex h-screen bg-gray-50">
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      <Sidebar 
        className={`fixed z-20 lg:static transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`} 
      />
      
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <Header 
          toggleSidebar={() => setSidebarOpen(prev => !prev)} 
        />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <DriverActionsHeader 
            isEditing={isEditing}
            driverName={driver.name}
            onEdit={handleEdit}
            onCancel={handleCancel}
            onSave={handleSave}
            openPasswordDialog={() => setPasswordDialogOpen(true)}
          />

          <DriverDetailsSectionTabs 
            activeSection={activeSection}
            onSectionChange={handleSectionChange}
          />
          
          {activeSection === 'personal' && (
            <PersonalInfoSection 
              driver={driver}
              editedDriver={editedDriver}
              isEditing={isEditing}
              handleInputChange={handleInputChange}
            />
          )}
          
          {activeSection === 'documentation' && (
            <DocumentationSection 
              driver={driver}
              editedDriver={editedDriver}
              isEditing={isEditing}
              handleInputChange={handleInputChange}
            />
          )}
          
          {activeSection === 'vehicle' && (
            <VehicleInfoSection 
              driver={driver}
              editedDriver={editedDriver}
              isEditing={isEditing}
              handleInputChange={handleInputChange}
            />
          )}
          
          {activeSection === 'payment' && (
            <PaymentDetailsSection 
              driver={driver}
              editedDriver={editedDriver}
              isEditing={isEditing}
              handleInputChange={handleInputChange}
            />
          )}
          
          <PasswordResetDialog
            open={passwordDialogOpen}
            onOpenChange={setPasswordDialogOpen}
            onResetPassword={handlePasswordReset}
          />
        </main>
      </div>
    </div>
  );
};

export default DriverDetails;
