
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { 
  User, 
  Shield, 
  Globe, 
  CreditCard, 
  Mail, 
  Bell, 
  Database,
  Lock,
  Save,
  Check
} from 'lucide-react';

const Settings = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      
      toast({
        title: "Settings saved",
        description: "Your settings have been updated successfully",
      });
    }, 1000);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-serif">Settings</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar tabs */}
          <div className="bg-admin-card border border-admin-border rounded-lg overflow-hidden">
            <nav className="space-y-1 p-2">
              <button
                className={`w-full flex items-center px-4 py-3 rounded-md text-sm transition-colors ${
                  activeTab === 'profile' 
                    ? 'bg-admin-accent/10 text-admin-accent' 
                    : 'text-admin-foreground/70 hover:bg-admin-muted/30 hover:text-admin-foreground'
                }`}
                onClick={() => setActiveTab('profile')}
              >
                <User className="h-5 w-5 mr-3" />
                <span>Profile</span>
              </button>
              
              <button
                className={`w-full flex items-center px-4 py-3 rounded-md text-sm transition-colors ${
                  activeTab === 'security' 
                    ? 'bg-admin-accent/10 text-admin-accent' 
                    : 'text-admin-foreground/70 hover:bg-admin-muted/30 hover:text-admin-foreground'
                }`}
                onClick={() => setActiveTab('security')}
              >
                <Shield className="h-5 w-5 mr-3" />
                <span>Security</span>
              </button>
              
              <button
                className={`w-full flex items-center px-4 py-3 rounded-md text-sm transition-colors ${
                  activeTab === 'website' 
                    ? 'bg-admin-accent/10 text-admin-accent' 
                    : 'text-admin-foreground/70 hover:bg-admin-muted/30 hover:text-admin-foreground'
                }`}
                onClick={() => setActiveTab('website')}
              >
                <Globe className="h-5 w-5 mr-3" />
                <span>Website</span>
              </button>
              
              <button
                className={`w-full flex items-center px-4 py-3 rounded-md text-sm transition-colors ${
                  activeTab === 'payment' 
                    ? 'bg-admin-accent/10 text-admin-accent' 
                    : 'text-admin-foreground/70 hover:bg-admin-muted/30 hover:text-admin-foreground'
                }`}
                onClick={() => setActiveTab('payment')}
              >
                <CreditCard className="h-5 w-5 mr-3" />
                <span>Payments</span>
              </button>
              
              <button
                className={`w-full flex items-center px-4 py-3 rounded-md text-sm transition-colors ${
                  activeTab === 'notifications' 
                    ? 'bg-admin-accent/10 text-admin-accent' 
                    : 'text-admin-foreground/70 hover:bg-admin-muted/30 hover:text-admin-foreground'
                }`}
                onClick={() => setActiveTab('notifications')}
              >
                <Bell className="h-5 w-5 mr-3" />
                <span>Notifications</span>
              </button>
              
              <button
                className={`w-full flex items-center px-4 py-3 rounded-md text-sm transition-colors ${
                  activeTab === 'database' 
                    ? 'bg-admin-accent/10 text-admin-accent' 
                    : 'text-admin-foreground/70 hover:bg-admin-muted/30 hover:text-admin-foreground'
                }`}
                onClick={() => setActiveTab('database')}
              >
                <Database className="h-5 w-5 mr-3" />
                <span>Database</span>
              </button>
            </nav>
          </div>
          
          {/* Settings content */}
          <div className="lg:col-span-3 bg-admin-card border border-admin-border rounded-lg overflow-hidden">
            {/* Profile Settings */}
            {activeTab === 'profile' && (
              <div className="p-6">
                <h2 className="text-xl font-medium mb-6">Profile Settings</h2>
                
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <div className="sm:w-1/3">
                      <label className="text-sm font-medium">Profile Photo</label>
                      <p className="text-xs text-admin-foreground/60 mt-1">
                        Your profile picture will be displayed in the admin panel.
                      </p>
                    </div>
                    <div className="sm:w-2/3 mt-2 sm:mt-0">
                      <div className="flex items-center">
                        <div className="h-16 w-16 rounded-full bg-admin-accent text-admin-background flex items-center justify-center text-xl font-medium">
                          A
                        </div>
                        <div className="ml-4">
                          <Button variant="outline" className="border-admin-border text-sm">
                            Upload new photo
                          </Button>
                          <p className="text-xs text-admin-foreground/60 mt-1">
                            JPG, GIF or PNG. Max size 2MB.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <div className="sm:w-1/3">
                      <label htmlFor="name" className="text-sm font-medium">Name</label>
                      <p className="text-xs text-admin-foreground/60 mt-1">
                        Your full name.
                      </p>
                    </div>
                    <div className="sm:w-2/3 mt-2 sm:mt-0">
                      <input
                        id="name"
                        type="text"
                        defaultValue="Admin User"
                        className="w-full px-3 py-2 bg-admin-background border border-admin-border rounded-md focus:outline-none focus:ring-1 focus:ring-admin-accent text-admin-foreground"
                      />
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <div className="sm:w-1/3">
                      <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                      <p className="text-xs text-admin-foreground/60 mt-1">
                        The email address associated with your account.
                      </p>
                    </div>
                    <div className="sm:w-2/3 mt-2 sm:mt-0">
                      <input
                        id="email"
                        type="email"
                        defaultValue="admin@example.com"
                        className="w-full px-3 py-2 bg-admin-background border border-admin-border rounded-md focus:outline-none focus:ring-1 focus:ring-admin-accent text-admin-foreground"
                      />
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <div className="sm:w-1/3">
                      <label htmlFor="role" className="text-sm font-medium">Role</label>
                      <p className="text-xs text-admin-foreground/60 mt-1">
                        Your role within the admin panel.
                      </p>
                    </div>
                    <div className="sm:w-2/3 mt-2 sm:mt-0">
                      <select
                        id="role"
                        defaultValue="admin"
                        className="w-full px-3 py-2 bg-admin-background border border-admin-border rounded-md focus:outline-none focus:ring-1 focus:ring-admin-accent text-admin-foreground appearance-none"
                      >
                        <option value="admin">Admin</option>
                        <option value="editor">Editor</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-admin-foreground/50 pointer-events-none" />
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 flex justify-end space-x-4">
                  <Button variant="outline" className="border-admin-border">
                    Cancel
                  </Button>
                  <Button 
                    className="bg-admin-accent hover:bg-admin-accent-hover text-admin-background"
                    disabled={isSaving}
                    onClick={handleSave}
                  >
                    {isSaving ? (
                      <>
                        <Spinner className="mr-2" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
            
            {/* Security Settings */}
            {activeTab === 'security' && (
              <div className="p-6">
                <h2 className="text-xl font-medium mb-6">Security Settings</h2>
                
                <div className="space-y-6">
                  <div className="pb-6 border-b border-admin-border">
                    <h3 className="text-lg font-medium mb-4">Change Password</h3>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="currentPassword" className="block text-sm font-medium mb-1">
                          Current Password
                        </label>
                        <input
                          id="currentPassword"
                          type="password"
                          className="w-full px-3 py-2 bg-admin-background border border-admin-border rounded-md focus:outline-none focus:ring-1 focus:ring-admin-accent text-admin-foreground"
                        />
                      </div>
                      <div>
                        <label htmlFor="newPassword" className="block text-sm font-medium mb-1">
                          New Password
                        </label>
                        <input
                          id="newPassword"
                          type="password"
                          className="w-full px-3 py-2 bg-admin-background border border-admin-border rounded-md focus:outline-none focus:ring-1 focus:ring-admin-accent text-admin-foreground"
                        />
                      </div>
                      <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
                          Confirm New Password
                        </label>
                        <input
                          id="confirmPassword"
                          type="password"
                          className="w-full px-3 py-2 bg-admin-background border border-admin-border rounded-md focus:outline-none focus:ring-1 focus:ring-admin-accent text-admin-foreground"
                        />
                      </div>
                      <Button className="bg-admin-accent hover:bg-admin-accent-hover text-admin-background">
                        <Lock className="h-4 w-4 mr-2" />
                        Update Password
                      </Button>
                    </div>
                  </div>
                  
                  <div className="pb-6 border-b border-admin-border">
                    <h3 className="text-lg font-medium mb-4">Two-Factor Authentication</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm">Enable two-factor authentication for enhanced security</p>
                        <p className="text-xs text-admin-foreground/60 mt-1">
                          You'll be asked for a code from your authentication app when logging in
                        </p>
                      </div>
                      <div className="flex items-center">
                        <label className="inline-flex relative items-center cursor-pointer">
                          <input type="checkbox" value="" className="sr-only peer" />
                          <div className="w-11 h-6 bg-admin-muted rounded-full peer peer-checked:bg-admin-accent"></div>
                          <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-all peer-checked:translate-x-5"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Login Sessions</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between p-4 bg-admin-background rounded-lg">
                        <div>
                          <p className="font-medium">Current Session</p>
                          <p className="text-xs text-admin-foreground/60 mt-1">
                            Chrome on Windows • New York, USA • 192.168.1.1
                          </p>
                        </div>
                        <div className="flex items-center">
                          <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                            <Check className="h-3 w-3 mr-1" />
                            Active
                          </span>
                        </div>
                      </div>
                      <Button variant="outline" className="text-admin-danger hover:bg-admin-danger/20 border-admin-border">
                        Logout of All Other Sessions
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Website Settings */}
            {activeTab === 'website' && (
              <div className="p-6">
                <h2 className="text-xl font-medium mb-6">Website Settings</h2>
                
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <div className="sm:w-1/3">
                      <label htmlFor="siteName" className="text-sm font-medium">Website Title</label>
                      <p className="text-xs text-admin-foreground/60 mt-1">
                        The name of your website as it appears in browser tabs.
                      </p>
                    </div>
                    <div className="sm:w-2/3 mt-2 sm:mt-0">
                      <input
                        id="siteName"
                        type="text"
                        defaultValue="Raza Perfumes"
                        className="w-full px-3 py-2 bg-admin-background border border-admin-border rounded-md focus:outline-none focus:ring-1 focus:ring-admin-accent text-admin-foreground"
                      />
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-start">
                    <div className="sm:w-1/3">
                      <label htmlFor="description" className="text-sm font-medium">Meta Description</label>
                      <p className="text-xs text-admin-foreground/60 mt-1">
                        Brief description for search engines.
                      </p>
                    </div>
                    <div className="sm:w-2/3 mt-2 sm:mt-0">
                      <textarea
                        id="description"
                        rows={3}
                        defaultValue="Raza Perfumes - Luxury fragrances crafted with rare ingredients and meticulous artistry."
                        className="w-full px-3 py-2 bg-admin-background border border-admin-border rounded-md focus:outline-none focus:ring-1 focus:ring-admin-accent text-admin-foreground"
                      />
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <div className="sm:w-1/3">
                      <label className="text-sm font-medium">Default Theme</label>
                      <p className="text-xs text-admin-foreground/60 mt-1">
                        The default theme visitors will see when visiting your site.
                      </p>
                    </div>
                    <div className="sm:w-2/3 mt-2 sm:mt-0">
                      <div className="grid grid-cols-4 gap-3">
                        {['regal', 'mystic', 'bloom', 'amber'].map((theme) => (
                          <div key={theme} className="relative">
                            <input
                              type="radio"
                              id={theme}
                              name="theme"
                              value={theme}
                              defaultChecked={theme === 'regal'}
                              className="sr-only peer"
                            />
                            <label
                              htmlFor={theme}
                              className={`
                                block p-2 text-center border rounded-md cursor-pointer peer-checked:border-2 peer-checked:font-medium
                                ${theme === 'regal' 
                                  ? 'border-regal-accent peer-checked:border-regal-accent bg-regal-background'
                                  : theme === 'mystic'
                                  ? 'border-mystic-accent peer-checked:border-mystic-accent bg-mystic-background'
                                  : theme === 'bloom'
                                  ? 'border-bloom-accent peer-checked:border-bloom-accent bg-bloom-background'
                                  : 'border-amber-accent peer-checked:border-amber-accent bg-amber-background'
                                }
                              `}
                            >
                              <div className={`
                                text-xs capitalize
                                ${theme === 'regal' 
                                  ? 'text-regal-accent'
                                  : theme === 'mystic'
                                  ? 'text-mystic-accent'
                                  : theme === 'bloom'
                                  ? 'text-bloom-accent'
                                  : 'text-amber-accent'
                                }
                              `}>
                                {theme}
                              </div>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 flex justify-end space-x-4">
                  <Button variant="outline" className="border-admin-border">
                    Cancel
                  </Button>
                  <Button 
                    className="bg-admin-accent hover:bg-admin-accent-hover text-admin-background"
                    disabled={isSaving}
                    onClick={handleSave}
                  >
                    {isSaving ? (
                      <>
                        <Spinner className="mr-2" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
            
            {/* Payment Settings */}
            {activeTab === 'payment' && (
              <div className="p-6">
                <h2 className="text-xl font-medium mb-6">Payment Settings</h2>
                
                <div className="space-y-6">
                  <div className="pb-6 border-b border-admin-border">
                    <h3 className="text-lg font-medium mb-4">Currency</h3>
                    <div className="flex flex-col sm:flex-row sm:items-center">
                      <div className="sm:w-1/3">
                        <label htmlFor="currency" className="text-sm font-medium">Default Currency</label>
                        <p className="text-xs text-admin-foreground/60 mt-1">
                          Select the default currency for your store.
                        </p>
                      </div>
                      <div className="sm:w-2/3 mt-2 sm:mt-0">
                        <select
                          id="currency"
                          defaultValue="USD"
                          className="w-full px-3 py-2 bg-admin-background border border-admin-border rounded-md focus:outline-none focus:ring-1 focus:ring-admin-accent text-admin-foreground appearance-none"
                        >
                          <option value="USD">USD - US Dollar</option>
                          <option value="EUR">EUR - Euro</option>
                          <option value="GBP">GBP - British Pound</option>
                          <option value="AED">AED - UAE Dirham</option>
                          <option value="SAR">SAR - Saudi Riyal</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pb-6 border-b border-admin-border">
                    <h3 className="text-lg font-medium mb-4">Payment Methods</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-admin-background rounded-lg">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex items-center justify-center bg-white rounded mr-4">
                            <CreditCard className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium">Credit Card</p>
                            <p className="text-xs text-admin-foreground/60">Accept Visa, Mastercard, etc.</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <label className="inline-flex relative items-center cursor-pointer">
                            <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-admin-muted rounded-full peer peer-checked:bg-admin-accent"></div>
                            <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-all peer-checked:translate-x-5"></div>
                          </label>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-admin-background rounded-lg">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex items-center justify-center bg-white rounded mr-4">
                            <div className="text-lg font-medium text-blue-500">P</div>
                          </div>
                          <div>
                            <p className="font-medium">PayPal</p>
                            <p className="text-xs text-admin-foreground/60">Accept payments via PayPal</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <label className="inline-flex relative items-center cursor-pointer">
                            <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-admin-muted rounded-full peer peer-checked:bg-admin-accent"></div>
                            <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-all peer-checked:translate-x-5"></div>
                          </label>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-admin-background rounded-lg">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex items-center justify-center bg-white rounded mr-4">
                            <div className="text-lg font-medium text-purple-600">S</div>
                          </div>
                          <div>
                            <p className="font-medium">Stripe</p>
                            <p className="text-xs text-admin-foreground/60">Accept payments via Stripe</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <label className="inline-flex relative items-center cursor-pointer">
                            <input type="checkbox" value="" className="sr-only peer" />
                            <div className="w-11 h-6 bg-admin-muted rounded-full peer peer-checked:bg-admin-accent"></div>
                            <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-all peer-checked:translate-x-5"></div>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 flex justify-end space-x-4">
                  <Button variant="outline" className="border-admin-border">
                    Cancel
                  </Button>
                  <Button 
                    className="bg-admin-accent hover:bg-admin-accent-hover text-admin-background"
                    disabled={isSaving}
                    onClick={handleSave}
                  >
                    {isSaving ? (
                      <>
                        <Spinner className="mr-2" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
            
            {/* Notifications Settings */}
            {activeTab === 'notifications' && (
              <div className="p-6">
                <h2 className="text-xl font-medium mb-6">Notification Settings</h2>
                
                <div className="space-y-6">
                  <div className="pb-6 border-b border-admin-border">
                    <h3 className="text-lg font-medium mb-4">Email Notifications</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">New Order</p>
                          <p className="text-xs text-admin-foreground/60 mt-1">
                            Receive an email when a new order is placed
                          </p>
                        </div>
                        <div className="flex items-center">
                          <label className="inline-flex relative items-center cursor-pointer">
                            <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-admin-muted rounded-full peer peer-checked:bg-admin-accent"></div>
                            <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-all peer-checked:translate-x-5"></div>
                          </label>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Low Inventory</p>
                          <p className="text-xs text-admin-foreground/60 mt-1">
                            Receive an email when product stock is low
                          </p>
                        </div>
                        <div className="flex items-center">
                          <label className="inline-flex relative items-center cursor-pointer">
                            <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-admin-muted rounded-full peer peer-checked:bg-admin-accent"></div>
                            <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-all peer-checked:translate-x-5"></div>
                          </label>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Customer Reviews</p>
                          <p className="text-xs text-admin-foreground/60 mt-1">
                            Receive an email when a customer leaves a review
                          </p>
                        </div>
                        <div className="flex items-center">
                          <label className="inline-flex relative items-center cursor-pointer">
                            <input type="checkbox" value="" className="sr-only peer" />
                            <div className="w-11 h-6 bg-admin-muted rounded-full peer peer-checked:bg-admin-accent"></div>
                            <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-all peer-checked:translate-x-5"></div>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Email Settings</h3>
                    <div className="flex flex-col sm:flex-row sm:items-center">
                      <div className="sm:w-1/3">
                        <label htmlFor="notificationEmail" className="text-sm font-medium">Notification Email</label>
                        <p className="text-xs text-admin-foreground/60 mt-1">
                          Email address where notifications will be sent.
                        </p>
                      </div>
                      <div className="sm:w-2/3 mt-2 sm:mt-0">
                        <input
                          id="notificationEmail"
                          type="email"
                          defaultValue="notifications@razaperfumes.com"
                          className="w-full px-3 py-2 bg-admin-background border border-admin-border rounded-md focus:outline-none focus:ring-1 focus:ring-admin-accent text-admin-foreground"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 flex justify-end space-x-4">
                  <Button variant="outline" className="border-admin-border">
                    Cancel
                  </Button>
                  <Button 
                    className="bg-admin-accent hover:bg-admin-accent-hover text-admin-background"
                    disabled={isSaving}
                    onClick={handleSave}
                  >
                    {isSaving ? (
                      <>
                        <Spinner className="mr-2" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
            
            {/* Database Settings */}
            {activeTab === 'database' && (
              <div className="p-6">
                <h2 className="text-xl font-medium mb-6">Database Management</h2>
                
                <div className="space-y-6">
                  <div className="bg-admin-accent/10 border border-admin-accent/20 rounded-lg p-4">
                    <p className="flex items-start">
                      <Mail className="h-5 w-5 mr-2 text-admin-accent mt-0.5" />
                      <span>
                        This section is for advanced users. Actions performed here may affect your website's data.
                      </span>
                    </p>
                  </div>
                  
                  <div className="pb-6 border-b border-admin-border">
                    <h3 className="text-lg font-medium mb-4">Data Backup</h3>
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center">
                        <div className="sm:w-1/3">
                          <p className="text-sm font-medium">Export Data</p>
                          <p className="text-xs text-admin-foreground/60 mt-1">
                            Create a backup of your website data.
                          </p>
                        </div>
                        <div className="sm:w-2/3 mt-2 sm:mt-0 space-y-3">
                          <div className="flex flex-wrap gap-2">
                            <Button variant="outline" className="border-admin-border text-sm">
                              Export Products
                            </Button>
                            <Button variant="outline" className="border-admin-border text-sm">
                              Export Orders
                            </Button>
                            <Button variant="outline" className="border-admin-border text-sm">
                              Export Customers
                            </Button>
                          </div>
                          <Button variant="outline" className="border-admin-border text-sm">
                            Export All Data
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4 text-admin-danger">Danger Zone</h3>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-base font-medium text-red-800">Clear Database</h4>
                          <p className="text-sm text-red-700 mt-1">
                            This action will delete all data in your database. This cannot be undone.
                          </p>
                        </div>
                        <Button variant="outline" className="bg-white border-red-300 text-red-700 hover:bg-red-50">
                          Clear Database
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

// Helper component for the spinner
const Spinner = ({ className }: { className?: string }) => (
  <svg 
    className={`animate-spin h-4 w-4 ${className || ''}`} 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24"
  >
    <circle 
      className="opacity-25" 
      cx="12" 
      cy="12" 
      r="10" 
      stroke="currentColor" 
      strokeWidth="4"
    />
    <path 
      className="opacity-75" 
      fill="currentColor" 
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

// Helper component for the dropdown arrow
const ChevronDown = ({ className }: { className: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="m6 9 6 6 6-6"/>
  </svg>
);

export default Settings;
