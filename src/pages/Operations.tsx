
import React, { useEffect } from 'react';

const Operations: React.FC = () => {
  useEffect(() => {
    document.title = 'Operations | Air-Buddy';
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Operations</h1>
      <p className="text-muted-foreground">Manage your operations.</p>
      
      <div className="p-6 bg-card text-card-foreground rounded-lg border shadow">
        <h2 className="text-xl font-semibold mb-4">Operations Management</h2>
        <p>Operations content will be displayed here.</p>
      </div>
    </div>
  );
};

export default React.memo(Operations);
