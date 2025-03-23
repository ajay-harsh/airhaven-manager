import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Avatar } from '@/components/ui/avatar';
import { UserCircle, Shield, History, Smartphone } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface LoginHistoryItem {
  id: number;
  date: string;
  device: string;
  location: string;
  ip: string;
  status: 'success' | 'failed';
}

const Profile: React.FC = () => {
  const { toast } = useToast();
  
  // Mock user data - in a real app, this would come from your auth context
  const [user] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'United States',
    jobTitle: 'Airport Manager',
    department: 'Operations',
  });
  
  // Security settings
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [showTwoFactorSetup, setShowTwoFactorSetup] = useState(false);
  
  // Mock login history data
  const [loginHistory] = useState<LoginHistoryItem[]>([
    {
      id: 1,
      date: '2023-06-01 14:32:15',
      device: 'Chrome on Windows',
      location: 'New York, USA',
      ip: '192.168.1.1',
      status: 'success'
    },
    {
      id: 2,
      date: '2023-05-28 09:15:42',
      device: 'Safari on MacOS',
      location: 'Boston, USA',
      ip: '192.168.1.2',
      status: 'success'
    },
    {
      id: 3,
      date: '2023-05-25 18:45:30',
      device: 'Firefox on Linux',
      location: 'Chicago, USA',
      ip: '192.168.1.3',
      status: 'failed'
    },
    {
      id: 4, 
      date: '2023-05-20 11:22:05',
      device: 'Edge on Windows',
      location: 'New York, USA',
      ip: '192.168.1.4',
      status: 'success'
    },
    {
      id: 5,
      date: '2023-05-15 16:30:12',
      device: 'Chrome on Android',
      location: 'Washington D.C., USA',
      ip: '192.168.1.5',
      status: 'success'
    }
  ]);

  useEffect(() => {
    document.title = 'Profile | Air-Buddy';
  }, []);

  const handleSaveProfile = () => {
    toast({
      title: 'Profile Updated',
      content: 'Your profile information has been updated successfully.',
      duration: 3000,
    });
  };

  const toggleTwoFactor = () => {
    if (!twoFactorEnabled) {
      setShowTwoFactorSetup(true);
    } else {
      setTwoFactorEnabled(false);
      setShowTwoFactorSetup(false);
      toast({
        title: 'Two-Factor Authentication Disabled',
        content: 'Your account is now less secure. We recommend enabling 2FA for better security.',
        variant: 'destructive',
        duration: 5000,
      });
    }
  };

  const handleEnableTwoFactor = () => {
    setTwoFactorEnabled(true);
    setShowTwoFactorSetup(false);
    toast({
      title: 'Two-Factor Authentication Enabled',
      content: 'Your account is now more secure with 2FA enabled.',
      duration: 3000,
    });
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
          <p className="text-muted-foreground">Manage your account settings and security preferences</p>
        </div>
        <Avatar className="h-20 w-20 bg-primary/10">
          <UserCircle className="h-10 w-10 text-primary" />
        </Avatar>
      </div>

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="login-history">Login History</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue={user.firstName} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue={user.lastName} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue={user.email} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" defaultValue={user.phone} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" defaultValue={user.address} />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" defaultValue={user.city} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input id="state" defaultValue={user.state} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode">Zip Code</Label>
                  <Input id="zipCode" defaultValue={user.zipCode} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input id="country" defaultValue={user.country} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="jobTitle">Job Title</Label>
                  <Input id="jobTitle" defaultValue={user.jobTitle} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input id="department" defaultValue={user.department} />
                </div>
              </div>

              <Button onClick={handleSaveProfile}>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your account security</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center">
                      <Shield className="h-5 w-5 mr-2 text-primary" />
                      <Label className="text-base font-medium">Two-Factor Authentication</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                  </div>
                  <Switch checked={twoFactorEnabled} onCheckedChange={toggleTwoFactor} />
                </div>

                {showTwoFactorSetup && (
                  <div className="mt-6 p-4 border rounded-lg">
                    <h3 className="text-lg font-semibold mb-3">Set Up Two-Factor Authentication</h3>
                    <div className="flex flex-col md:flex-row gap-6 items-center">
                      <div className="rounded-lg bg-black p-4 aspect-square w-48 flex items-center justify-center">
                        <p className="text-white text-center text-sm">QR Code Placeholder</p>
                      </div>
                      <div className="space-y-4 flex-1">
                        <div className="space-y-2">
                          <Label htmlFor="verificationCode">Enter Verification Code</Label>
                          <div className="flex gap-2">
                            <Input id="verificationCode" placeholder="Enter 6-digit code" className="flex-1" />
                            <Button onClick={handleEnableTwoFactor}>Verify</Button>
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <p className="font-medium mb-1">How to set up:</p>
                          <ol className="list-decimal ml-5 space-y-1">
                            <li>Download an authenticator app like Google Authenticator or Authy</li>
                            <li>Scan the QR code shown here</li>
                            <li>Enter the 6-digit code provided by your authenticator app</li>
                          </ol>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="pt-6 border-t">
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Smartphone className="h-5 w-5 mr-2 text-primary" />
                      <Label className="text-base font-medium">Password Reset</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">Change your account password</p>
                    <div className="grid gap-3">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <Input id="currentPassword" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input id="newPassword" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <Input id="confirmPassword" type="password" />
                      </div>
                      <Button className="mt-2 w-full md:w-auto">Update Password</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="login-history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <History className="h-5 w-5 mr-2" />
                Login History
              </CardTitle>
              <CardDescription>Recent logins to your account</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {loginHistory.map((item) => (
                  <div key={item.id} className="flex items-start space-x-4 pb-4 border-b last:border-0">
                    <div className={`p-2 rounded-full ${item.status === 'success' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                      {item.status === 'success' ? '✓' : '✗'}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{item.device}</p>
                        <span className={`text-sm ${item.status === 'success' ? 'text-green-600' : 'text-red-600'} font-medium`}>
                          {item.status === 'success' ? 'Successful login' : 'Failed attempt'}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {item.date} • {item.location}
                      </p>
                      <p className="text-sm text-muted-foreground">IP: {item.ip}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default React.memo(Profile);
