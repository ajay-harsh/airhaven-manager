
import React, { useEffect } from 'react';

const Analytics: React.FC = () => {
  useEffect(() => {
    document.title = 'Analytics | Air-Buddy';
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
      <p className="text-muted-foreground">View and analyze your data.</p>
      
      <div className="p-6 bg-card text-card-foreground rounded-lg border shadow">
        <h2 className="text-xl font-semibold mb-4">Analytics Dashboard</h2>
        <p>Analytics content will be displayed here.</p>
      </div>
    </div>
  );
};

export default React.memo(Analytics);
