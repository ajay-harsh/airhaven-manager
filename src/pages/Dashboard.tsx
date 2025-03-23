
import React, { useEffect } from 'react';

const Dashboard: React.FC = () => {
  useEffect(() => {
    document.title = 'Dashboard | Air-Buddy';
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      <p className="text-muted-foreground">Welcome to Air-Buddy dashboard.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-6 bg-card text-card-foreground rounded-lg border shadow">
          <h2 className="text-xl font-semibold mb-2">Total Users</h2>
          <p className="text-3xl font-bold">1,234</p>
        </div>
        <div className="p-6 bg-card text-card-foreground rounded-lg border shadow">
          <h2 className="text-xl font-semibold mb-2">Active Sessions</h2>
          <p className="text-3xl font-bold">56</p>
        </div>
        <div className="p-6 bg-card text-card-foreground rounded-lg border shadow">
          <h2 className="text-xl font-semibold mb-2">Total Operations</h2>
          <p className="text-3xl font-bold">892</p>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Dashboard);
