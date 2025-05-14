
import React from 'react';
import { useNavigate } from 'react-router-dom';
import DriverActionsHeader from '@/components/drivers/DriverActionsHeader';
import DriverDetailsSectionTabs from '@/components/drivers/DriverDetailsSectionTabs';
import { useDriverDetails } from '@/components/drivers/useDriverDetails';
import PasswordResetDialog from '@/components/drivers/PasswordResetDialog';

interface DriverDetailsComponentProps {
  driverId?: string;
}

const DriverDetailsComponent: React.FC<DriverDetailsComponentProps> = ({ driverId }) => {
  const navigate = useNavigate();
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

  if (!driver) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Loading driver details...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      <DriverActionsHeader
        driverName={driver.name}
        onBackClick={() => navigate('/drivers')}
        isEditing={isEditing}
        onEdit={handleEdit}
        onSave={handleSave}
        onCancel={handleCancel}
        onPasswordReset={() => setPasswordDialogOpen(true)}
      />

      <div className="mt-6">
        <DriverDetailsSectionTabs
          driverData={driver}
          editedDriverData={editedDriver}
          isEditing={isEditing}
          activeSection={activeSection}
          onSectionChange={handleSectionChange}
          onInputChange={handleInputChange}
        />
      </div>

      <PasswordResetDialog
        open={passwordDialogOpen}
        onOpenChange={setPasswordDialogOpen}
        onPasswordReset={handlePasswordReset}
      />
    </div>
  );
};

export default DriverDetailsComponent;
