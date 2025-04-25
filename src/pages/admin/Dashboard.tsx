
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { 
  Package, 
  ShoppingCart, 
  Users, 
  TrendingUp, 
  Clock,
  ArrowUpRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Stats cards data
const statsData = [
  { title: "Total Products", value: "48", icon: <Package />, change: "+12%", changeType: "positive", link: "/admin/products" },
  { title: "Total Orders", value: "134", icon: <ShoppingCart />, change: "+24%", changeType: "positive", link: "/admin/orders" },
  { title: "Customers", value: "2,856", icon: <Users />, change: "+7%", changeType: "positive", link: "/admin/customers" },
  { title: "Revenue", value: "$24,500", icon: <TrendingUp />, change: "+18%", changeType: "positive", link: "/admin/orders" },
];

// Recent orders data
const recentOrders = [
  { id: "ORD-1293", customer: "Mohammed Ali", date: "2023-04-23", status: "Delivered", total: "$435.00" },
  { id: "ORD-1292", customer: "Sarah Johnson", date: "2023-04-22", status: "Processing", total: "$285.00" },
  { id: "ORD-1291", customer: "Aisha Khan", date: "2023-04-22", status: "Shipped", total: "$750.00" },
  { id: "ORD-1290", customer: "David Miller", date: "2023-04-21", status: "Delivered", total: "$320.00" },
  { id: "ORD-1289", customer: "Fatima Hassan", date: "2023-04-21", status: "Cancelled", total: "$510.00" },
];

// Low stock products data
const lowStockProducts = [
  { id: "2", name: "Royal Oud", category: "woody", stock: 15, threshold: 20 },
  { id: "7", name: "Mystic Oudh", category: "woody", stock: 10, threshold: 15 },
  { id: "4", name: "Silk Road", category: "spicy", stock: 18, threshold: 25 },
  { id: "1", name: "Amber Nights", category: "oriental", stock: 25, threshold: 30 },
];

const Dashboard = () => {
  return (
    <AdminLayout>
      {/* Dashboard grid */}
      <div className="space-y-8">
        {/* Welcome section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-2xl font-serif mb-1">Welcome back, Admin</h1>
            <p className="text-admin-foreground/70">
              Here's what's happening with your store today.
            </p>
          </div>
          <div className="flex items-center space-x-2 mt-4 md:mt-0">
            <span className="text-admin-foreground/70 text-sm flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </span>
          </div>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat, index) => (
            <Link 
              key={index} 
              to={stat.link}
              className="bg-admin-card border border-admin-border rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex justify-between">
                <div>
                  <p className="text-admin-foreground/70 text-sm">{stat.title}</p>
                  <p className="text-2xl font-semibold mt-1">{stat.value}</p>
                  <div className={`flex items-center mt-2 ${
                    stat.changeType === 'positive' ? 'text-admin-success' : 'text-admin-danger'
                  }`}>
                    <span className="text-xs font-medium">{stat.change}</span>
                    {stat.changeType === 'positive' ? (
                      <ArrowUpRight className="h-3 w-3 ml-1" />
                    ) : (
                      <ArrowUpRight className="h-3 w-3 ml-1 transform rotate-90" />
                    )}
                  </div>
                </div>
                <div className="h-12 w-12 bg-admin-accent/10 rounded-md flex items-center justify-center text-admin-accent">
                  {stat.icon}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent orders */}
          <div className="bg-admin-card border border-admin-border rounded-lg overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-admin-border">
              <h2 className="text-lg font-medium">Recent Orders</h2>
              <Link 
                to="/admin/orders" 
                className="text-admin-accent hover:text-admin-accent-hover text-sm flex items-center"
              >
                View all
                <ArrowUpRight className="h-3 w-3 ml-1 transform rotate-45" />
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-admin-background">
                  <tr>
                    <th className="py-3 px-4 text-left text-xs font-medium text-admin-foreground/70 uppercase tracking-wider">Order ID</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-admin-foreground/70 uppercase tracking-wider">Customer</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-admin-foreground/70 uppercase tracking-wider">Date</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-admin-foreground/70 uppercase tracking-wider">Status</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-admin-foreground/70 uppercase tracking-wider">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-admin-border">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-admin-background/50 transition-colors">
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">{order.id}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">{order.customer}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-admin-foreground/70">{order.date}</td>
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
                      <td className="px-4 py-3 whitespace-nowrap text-sm">{order.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Low stock products */}
          <div className="bg-admin-card border border-admin-border rounded-lg overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-admin-border">
              <h2 className="text-lg font-medium">Low Stock Products</h2>
              <Link 
                to="/admin/products" 
                className="text-admin-accent hover:text-admin-accent-hover text-sm flex items-center"
              >
                View all products
                <ArrowUpRight className="h-3 w-3 ml-1 transform rotate-45" />
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-admin-background">
                  <tr>
                    <th className="py-3 px-4 text-left text-xs font-medium text-admin-foreground/70 uppercase tracking-wider">ID</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-admin-foreground/70 uppercase tracking-wider">Product</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-admin-foreground/70 uppercase tracking-wider">Category</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-admin-foreground/70 uppercase tracking-wider">Stock</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-admin-border">
                  {lowStockProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-admin-background/50 transition-colors">
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">{product.id}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">{product.name}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm capitalize">{product.category}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        <div className="flex items-center">
                          <span className={`${
                            product.stock <= product.threshold / 2
                              ? 'text-admin-danger'
                              : 'text-admin-warning'
                          }`}>
                            {product.stock}
                          </span>
                          <span className="text-admin-foreground/50 ml-1">/ {product.threshold}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
