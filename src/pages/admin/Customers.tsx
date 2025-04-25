
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { 
  Search, 
  Filter, 
  Mail, 
  Phone, 
  MapPin,
  ArrowUpDown,
  X,
  ChevronLeft,
  ChevronRight,
  Eye
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mock customers data
const mockCustomers = [
  { 
    id: '1', 
    name: 'Sarah Johnson', 
    email: 'sarah.johnson@example.com', 
    phone: '+1 (555) 123-4567', 
    location: 'New York, USA',
    totalOrders: 7,
    totalSpent: 1245.00, 
    lastOrder: '2023-04-15',
    status: 'active'
  },
  { 
    id: '2', 
    name: 'Mohammed Al-Farsi', 
    email: 'mohammed.alfarsi@example.com', 
    phone: '+971 50 123 4567', 
    location: 'Dubai, UAE',
    totalOrders: 12,
    totalSpent: 3780.50, 
    lastOrder: '2023-04-20',
    status: 'active'
  },
  { 
    id: '3', 
    name: 'Aisha Khan', 
    email: 'aisha.khan@example.com', 
    phone: '+1 (555) 987-6543', 
    location: 'London, UK',
    totalOrders: 5,
    totalSpent: 890.25, 
    lastOrder: '2023-04-10',
    status: 'active'
  },
  { 
    id: '4', 
    name: 'David Miller', 
    email: 'david.miller@example.com', 
    phone: '+1 (555) 456-7890', 
    location: 'Los Angeles, USA',
    totalOrders: 3,
    totalSpent: 475.00, 
    lastOrder: '2023-04-05',
    status: 'inactive'
  },
  { 
    id: '5', 
    name: 'Fatima Hassan', 
    email: 'fatima.hassan@example.com', 
    phone: '+966 50 987 6543', 
    location: 'Riyadh, Saudi Arabia',
    totalOrders: 9,
    totalSpent: 2350.75, 
    lastOrder: '2023-04-18',
    status: 'active'
  },
  { 
    id: '6', 
    name: 'Robert Chen', 
    email: 'robert.chen@example.com', 
    phone: '+1 (555) 234-5678', 
    location: 'Toronto, Canada',
    totalOrders: 4,
    totalSpent: 695.50, 
    lastOrder: '2023-04-08',
    status: 'active'
  },
  { 
    id: '7', 
    name: 'Layla Mahmoud', 
    email: 'layla.mahmoud@example.com', 
    phone: '+20 10 1234 5678', 
    location: 'Cairo, Egypt',
    totalOrders: 6,
    totalSpent: 1125.00, 
    lastOrder: '2023-04-12',
    status: 'active'
  },
  { 
    id: '8', 
    name: 'James Wilson', 
    email: 'james.wilson@example.com', 
    phone: '+1 (555) 876-5432', 
    location: 'Sydney, Australia',
    totalOrders: 2,
    totalSpent: 320.00, 
    lastOrder: '2023-04-02',
    status: 'inactive'
  },
  { 
    id: '9', 
    name: 'Zainab Ali', 
    email: 'zainab.ali@example.com', 
    phone: '+92 300 1234567', 
    location: 'Lahore, Pakistan',
    totalOrders: 8,
    totalSpent: 1750.25, 
    lastOrder: '2023-04-16',
    status: 'active'
  },
  { 
    id: '10', 
    name: 'John Smith', 
    email: 'john.smith@example.com', 
    phone: '+1 (555) 765-4321', 
    location: 'Chicago, USA',
    totalOrders: 1,
    totalSpent: 199.99, 
    lastOrder: '2023-04-01',
    status: 'active'
  },
];

const Customers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [sortKey, setSortKey] = useState<'name' | 'totalOrders' | 'totalSpent'>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const customersPerPage = 6;

  // Filter and sort customers
  const filteredCustomers = mockCustomers.filter(customer => {
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus ? customer.status === selectedStatus : true;
    
    return matchesSearch && matchesStatus;
  });

  // Sort customers
  const sortedCustomers = [...filteredCustomers].sort((a, b) => {
    if (sortKey === 'name') {
      return sortDirection === 'asc' 
        ? a.name.localeCompare(b.name) 
        : b.name.localeCompare(a.name);
    } else if (sortKey === 'totalOrders') {
      return sortDirection === 'asc' 
        ? a.totalOrders - b.totalOrders 
        : b.totalOrders - a.totalOrders;
    } else {
      return sortDirection === 'asc' 
        ? a.totalSpent - b.totalSpent 
        : b.totalSpent - a.totalSpent;
    }
  });

  // Pagination
  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = sortedCustomers.slice(indexOfFirstCustomer, indexOfLastCustomer);
  const totalPages = Math.ceil(sortedCustomers.length / customersPerPage);

  // Handle sort toggle
  const toggleSort = (key: 'name' | 'totalOrders' | 'totalSpent') => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-serif">Customers</h1>
        </div>

        {/* Filters and search */}
        <div className="bg-admin-card border border-admin-border rounded-lg p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-grow relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-admin-foreground/50" />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-admin-background border border-admin-border rounded-md focus:outline-none focus:ring-1 focus:ring-admin-accent text-admin-foreground"
              />
              {searchTerm && (
                <button 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  onClick={() => setSearchTerm('')}
                >
                  <X className="h-4 w-4 text-admin-foreground/50" />
                </button>
              )}
            </div>
            
            <div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-admin-foreground/50" />
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="pl-10 pr-8 py-2 bg-admin-background border border-admin-border rounded-md focus:outline-none focus:ring-1 focus:ring-admin-accent text-admin-foreground appearance-none"
                >
                  <option value="">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-admin-foreground/50 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Customer grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentCustomers.map((customer) => (
            <div 
              key={customer.id}
              className="bg-admin-card border border-admin-border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-medium text-lg">{customer.name}</h3>
                    <div className="flex items-center mt-1 text-sm text-admin-foreground/70">
                      <Mail className="h-4 w-4 mr-1" />
                      <span>{customer.email}</span>
                    </div>
                  </div>
                  <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                    customer.status === 'active' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                  </span>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-admin-foreground/70">
                    <Phone className="h-4 w-4 mr-2" />
                    <span>{customer.phone}</span>
                  </div>
                  <div className="flex items-center text-admin-foreground/70">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{customer.location}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 mt-6 text-center">
                  <div className="bg-admin-background p-2 rounded">
                    <div className="text-xs text-admin-foreground/70">Orders</div>
                    <div className="font-medium mt-1">{customer.totalOrders}</div>
                  </div>
                  <div className="bg-admin-background p-2 rounded">
                    <div className="text-xs text-admin-foreground/70">Spent</div>
                    <div className="font-medium mt-1">${customer.totalSpent.toFixed(2)}</div>
                  </div>
                  <div className="bg-admin-background p-2 rounded">
                    <div className="text-xs text-admin-foreground/70">Last Order</div>
                    <div className="font-medium mt-1">{new Date(customer.lastOrder).toLocaleDateString()}</div>
                  </div>
                </div>

                <div className="mt-6">
                  <Button 
                    variant="outline" 
                    className="w-full border-admin-border hover:border-admin-accent hover:bg-admin-accent/10"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {currentCustomers.length === 0 && (
          <div className="bg-admin-card border border-admin-border rounded-lg p-8 text-center">
            <div className="text-admin-foreground/70">No customers found matching your criteria</div>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between">
            <div className="text-sm text-admin-foreground/70">
              Showing <span className="font-medium">{indexOfFirstCustomer + 1}</span> to{' '}
              <span className="font-medium">
                {Math.min(indexOfLastCustomer, filteredCustomers.length)}
              </span>{' '}
              of <span className="font-medium">{filteredCustomers.length}</span> customers
            </div>
            <div className="flex space-x-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="border-admin-border"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={page === currentPage ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(page)}
                  className={page === currentPage 
                    ? 'bg-admin-accent text-admin-background' 
                    : 'border-admin-border'
                  }
                >
                  {page}
                </Button>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="border-admin-border"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

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

export default Customers;
