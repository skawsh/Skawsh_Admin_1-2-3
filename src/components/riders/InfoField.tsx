
import React from 'react';

interface InfoFieldProps {
  label: string;
  value: string | number;
  className?: string;
  valueClassName?: string;
}

const InfoField = ({ label, value, className, valueClassName }: InfoFieldProps) => {
  return (
    <div className={`flex flex-col ${className || ''}`}>
      <span className="text-sm text-gray-500">{label}</span>
      <span className={`font-medium ${valueClassName || ''}`}>{value}</span>
    </div>
  );
};

export default InfoField;
