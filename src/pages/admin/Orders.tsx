
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { 
  Search, 
  Filter, 
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  X,
  Eye
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

// Mock orders data
const mockOrders = [
  { 
    id: 'ORD-1293', 
    customer: 'Mohammed Ali', 
    email: 'mohammed.ali@example.com',
    date: '2023-04-23', 
    status: 'Delivered', 
    total: 435.00,
    items: 3,
    paymentMethod: 'Credit Card'
  },
  { 
    id: 'ORD-1292', 
    customer: 'Sarah Johnson', 
    email: 'sarah.j@example.com',
    date: '2023-04-22', 
    status: 'Processing', 
    total: 285.00,
    items: 2,
    paymentMethod: 'PayPal'
  },
  { 
    id: 'ORD-1291', 
    customer: 'Aisha Khan', 
    email: 'aisha.k@example.com',
    date: '2023-04-22', 
    status: 'Shipped', 
    total: 750.00,
    items: 5,
    paymentMethod: 'Credit Card'
  },
  { 
    id: 'ORD-1290', 
    customer: 'David Miller', 
    email: 'david.m@example.com',
    date: '2023-04-21', 
    status: 'Delivered', 
    total: 320.00,
    items: 2,
    paymentMethod: 'Credit Card'
  },
  { 
    id: 'ORD-1289', 
    customer: 'Fatima Hassan', 
    email: 'fatima.h@example.com',
    date: '2023-04-21', 
    status: 'Cancelled', 
    total: 510.00,
    items: 4,
    paymentMethod: 'Credit Card'
  },
  { 
    id: 'ORD-1288', 
    customer: 'John Smith', 
    email: 'john.s@example.com',
    date: '2023-04-20', 
    status: 'Delivered', 
    total: 199.00,
    items: 1,
    paymentMethod: 'PayPal'
  },
  { 
    id: 'ORD-1287', 
    customer: 'Layla Mahmoud', 
    email: 'layla.m@example.com',
    date: '2023-04-20', 
    status: 'Processing', 
    total: 625.00,
    items: 4,
    paymentMethod: 'Credit Card'
  },
  { 
    id: 'ORD-1286', 
    customer: 'Robert Chen', 
    email: 'robert.c@example.com',
    date: '2023-04-19', 
    status: 'Shipped', 
    total: 380.00,
    items: 3,
    paymentMethod: 'Credit Card'
  },
  { 
    id: 'ORD-1285', 
    customer: 'Zainab Ali', 
    email: 'zainab.a@example.com',
    date: '2023-04-18', 
    status: 'Delivered', 
    total: 845.00,
    items: 6,
    paymentMethod: 'PayPal'
  },
  { 
    id: 'ORD-1284', 
    customer: 'James Wilson', 
    email: 'james.w@example.com',
    date: '2023-04-17', 
    status: 'Cancelled', 
    total: 125.00,
    items: 1,
    paymentMethod: 'Credit Card'
  },
];

const Orders = () => {
  const [orders] = useState(mockOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [sortKey, setSortKey] = useState<'date' | 'total'>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const { toast } = useToast();
  const ordersPerPage = 8;

  // Filter orders
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus ? order.status === selectedStatus : true;
    
    return matchesSearch && matchesStatus;
  });

  // Sort orders
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (sortKey === 'date') {
      return sortDirection === 'asc' 
        ? new Date(a.date).getTime() - new Date(b.date).getTime()
        : new Date(b.date).getTime() - new Date(a.date).getTime();
    } else {
      return sortDirection === 'asc' 
        ? a.total - b.total
        : b.total - a.total;
    }
  });

  // Pagination
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = sortedOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(sortedOrders.length / ordersPerPage);

  // Handle sort toggle
  const toggleSort = (key: 'date' | 'total') => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('desc');
    }
  };

  // View order details
  const viewOrderDetails = (orderId: string) => {
    toast({
      title: "Order details",
      description: `Viewing details for order ${orderId}`,
    });
  };

  // Update order status
  const updateOrderStatus = (orderId: string, newStatus: string) => {
    toast({
      title: "Status updated",
      description: `Order ${orderId} status updated to ${newStatus}`,
    });
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-serif">Orders</h1>
        </div>

        {/* Filters and search */}
        <div className="bg-admin-card border border-admin-border rounded-lg p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-grow relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-admin-foreground/50" />
              <input
                type="text"
                placeholder="Search order ID or customer..."
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
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-admin-foreground/50 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Orders table */}
        <div className="bg-admin-card border border-admin-border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-admin-background">
                <tr>
                  <th className="py-3 px-4 text-left text-xs font-medium text-admin-foreground/70 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-admin-foreground/70 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-admin-foreground/70 uppercase tracking-wider">
                    <button 
                      className="flex items-center space-x-1 focus:outline-none"
                      onClick={() => toggleSort('date')}
                    >
                      <span>Date</span>
                      <ArrowUpDown className="h-3 w-3" />
                    </button>
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-admin-foreground/70 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-admin-foreground/70 uppercase tracking-wider">
                    Items
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-admin-foreground/70 uppercase tracking-wider">
                    <button 
                      className="flex items-center space-x-1 focus:outline-none"
                      onClick={() => toggleSort('total')}
                    >
                      <span>Total</span>
                      <ArrowUpDown className="h-3 w-3" />
                    </button>
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-admin-foreground/70 uppercase tracking-wider">
                    Payment
                  </th>
                  <th className="py-3 px-4 text-right text-xs font-medium text-admin-foreground/70 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-admin-border">
                {currentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-admin-background/50 transition-colors">
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                      {order.id}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div>
                        <div className="font-medium">{order.customer}</div>
                        <div className="text-xs text-admin-foreground/70">{order.email}</div>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-admin-foreground/70">
                      {new Date(order.date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <span className={`inline-flex rounded-full px-2 text-xs font-semibold ${
                        order.status === 'Delivered' 
                          ? 'bg-green-100 text-green-800'
                          : order.status === 'Processing'
                          ? 'bg-blue-100 text-blue-800'
                          : order.status === 'Shipped'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-center">
                      {order.items}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                      ${order.total.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-admin-foreground/70">
                      {order.paymentMethod}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-right">
                      <div className="flex justify-end">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-admin-foreground/70 hover:text-admin-foreground hover:bg-admin-muted/50"
                          onClick={() => viewOrderDetails(order.id)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>

                        <div className="relative ml-2">
                          <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                            className="h-8 pl-2 pr-6 py-0 text-xs bg-admin-background border border-admin-border rounded-md focus:outline-none focus:ring-1 focus:ring-admin-accent text-admin-foreground appearance-none"
                          >
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                          <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-admin-foreground/50 pointer-events-none" />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty state */}
          {currentOrders.length === 0 && (
            <div className="p-8 text-center text-admin-foreground/70">
              No orders found matching your criteria
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-4 py-3 flex items-center justify-between border-t border-admin-border">
              <div className="text-sm text-admin-foreground/70">
                Showing <span className="font-medium">{indexOfFirstOrder + 1}</span> to{' '}
                <span className="font-medium">
                  {Math.min(indexOfLastOrder, sortedOrders.length)}
                </span>{' '}
                of <span className="font-medium">{sortedOrders.length}</span> orders
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

        {/* Order summary stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          <div className="bg-admin-card border border-admin-border rounded-lg p-4">
            <div className="text-sm text-admin-foreground/70">Total Orders</div>
            <div className="text-2xl font-medium mt-1">{orders.length}</div>
          </div>
          <div className="bg-admin-card border border-admin-border rounded-lg p-4">
            <div className="text-sm text-admin-foreground/70">Processing</div>
            <div className="text-2xl font-medium mt-1">{orders.filter(order => order.status === 'Processing').length}</div>
          </div>
          <div className="bg-admin-card border border-admin-border rounded-lg p-4">
            <div className="text-sm text-admin-foreground/70">Shipped</div>
            <div className="text-2xl font-medium mt-1">{orders.filter(order => order.status === 'Shipped').length}</div>
          </div>
          <div className="bg-admin-card border border-admin-border rounded-lg p-4">
            <div className="text-sm text-admin-foreground/70">Delivered</div>
            <div className="text-2xl font-medium mt-1">{orders.filter(order => order.status === 'Delivered').length}</div>
          </div>
        </div>
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

export default Orders;
