'use client';

import React, { useState } from 'react';
import ActionSelection from './DisableDeleteActionSelection';
import ProcessSteps from './DisableDeleteProcessSteps';

export default function DisableDeleteOrg() {
  const [actionType, setActionType] = useState<'disable' | 'delete' | null>(null);

  const handleActionSelect = (action: 'disable' | 'delete') => {
    setActionType(action);
  };

  const handleBack = () => {
    setActionType(null);
  };

  if (!actionType) {
    return <ActionSelection onActionSelect={handleActionSelect} />;
  }

  return (
    <ProcessSteps 
      actionType={actionType} 
      onBack={handleBack} 
    />
  );
}