
import React, { useEffect } from 'react';

const Users: React.FC = () => {
  useEffect(() => {
    document.title = 'Users | Air-Buddy';
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Users</h1>
      <p className="text-muted-foreground">Manage system users.</p>
      
      <div className="p-6 bg-card text-card-foreground rounded-lg border shadow">
        <h2 className="text-xl font-semibold mb-4">User Management</h2>
        <p>User list and management options will be displayed here.</p>
      </div>
    </div>
  );
};

export default React.memo(Users);
