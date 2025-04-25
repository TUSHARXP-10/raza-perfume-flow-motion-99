
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  ChevronLeft, 
  ChevronRight,
  ArrowUpDown,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { getProductsByCategory, Product } from '@/data/products';

const Products = () => {
  // Get all products by combining different categories
  const allProducts = [
    ...getProductsByCategory('casual'),
    ...getProductsByCategory('premium'),
    ...getProductsByCategory('luxury'),
  ];

  const [products, setProducts] = useState<Product[]>(allProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortKey, setSortKey] = useState<'name' | 'price' | 'stock'>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const { toast } = useToast();
  const productsPerPage = 10;

  // Get unique categories from products
  const categories = Array.from(new Set(allProducts.map(product => product.category)));

  // Filter and sort products
  const filteredProducts = allProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (product.arabicName && product.arabicName.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    
    return matchesSearch && matchesCategory;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortKey === 'name') {
      return sortDirection === 'asc' 
        ? a.name.localeCompare(b.name) 
        : b.name.localeCompare(a.name);
    } else if (sortKey === 'price') {
      return sortDirection === 'asc' 
        ? a.price - b.price 
        : b.price - a.price;
    } else {
      return sortDirection === 'asc' 
        ? a.stock - b.stock 
        : b.stock - a.stock;
    }
  });

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  // Handle sort toggle
  const toggleSort = (key: 'name' | 'price' | 'stock') => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  // Handle delete product
  const handleDeleteProduct = (id: string) => {
    // In a real application, this would call an API to delete the product
    setProducts(products.filter(product => product.id !== id));
    
    toast({
      title: "Product deleted",
      description: `Product with ID ${id} has been deleted`,
    });
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <h1 className="text-2xl font-serif">Products</h1>
          <Button className="bg-admin-accent hover:bg-admin-accent-hover text-admin-background">
            <Plus className="h-4 w-4 mr-2" />
            Add New Product
          </Button>
        </div>

        {/* Filters and search */}
        <div className="bg-admin-card border border-admin-border rounded-lg p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-admin-foreground/50" />
              <input
                type="text"
                placeholder="Search products..."
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
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-admin-foreground/50" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="pl-10 pr-8 py-2 bg-admin-background border border-admin-border rounded-md focus:outline-none focus:ring-1 focus:ring-admin-accent text-admin-foreground appearance-none"
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-admin-foreground/50 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Products table */}
        <div className="bg-admin-card border border-admin-border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-admin-background">
                <tr>
                  <th className="py-3 px-4 text-left text-xs font-medium text-admin-foreground/70 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-admin-foreground/70 uppercase tracking-wider">
                    <button 
                      className="flex items-center space-x-1 focus:outline-none"
                      onClick={() => toggleSort('name')}
                    >
                      <span>Product</span>
                      <ArrowUpDown className="h-3 w-3" />
                    </button>
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-admin-foreground/70 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-admin-foreground/70 uppercase tracking-wider">
                    <button 
                      className="flex items-center space-x-1 focus:outline-none"
                      onClick={() => toggleSort('price')}
                    >
                      <span>Price</span>
                      <ArrowUpDown className="h-3 w-3" />
                    </button>
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-admin-foreground/70 uppercase tracking-wider">
                    <button 
                      className="flex items-center space-x-1 focus:outline-none"
                      onClick={() => toggleSort('stock')}
                    >
                      <span>Stock</span>
                      <ArrowUpDown className="h-3 w-3" />
                    </button>
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-admin-foreground/70 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="py-3 px-4 text-right text-xs font-medium text-admin-foreground/70 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-admin-border">
                {currentProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-admin-background/50 transition-colors">
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                      {product.id}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex items-center">
                        <div className="h-10 w-10 bg-admin-muted rounded flex items-center justify-center text-admin-accent text-xs">
                          IMG
                        </div>
                        <div className="ml-3">
                          <div className="font-medium">{product.name}</div>
                          {product.arabicName && (
                            <div className="text-xs text-admin-foreground/70">{product.arabicName}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm capitalize">
                      {product.category}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      ${product.price.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <span className={`${
                        product.stock < 15
                          ? 'text-admin-danger'
                          : product.stock < 30
                          ? 'text-admin-warning'
                          : 'text-admin-success'
                      }`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <span className={`inline-flex rounded-full px-2 text-xs font-semibold ${
                        product.stock > 0
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-admin-foreground/70 hover:text-admin-foreground hover:bg-admin-muted/50"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-admin-foreground/70 hover:text-admin-danger hover:bg-admin-danger/20"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-4 py-3 flex items-center justify-between border-t border-admin-border">
              <div className="flex-1 flex justify-between sm:hidden">
                <Button
                  variant="ghost"
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-admin-foreground/70">
                    Showing <span className="font-medium">{indexOfFirstProduct + 1}</span> to{' '}
                    <span className="font-medium">
                      {Math.min(indexOfLastProduct, sortedProducts.length)}
                    </span>{' '}
                    of <span className="font-medium">{sortedProducts.length}</span> results
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <Button
                      variant="ghost"
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-admin-border bg-admin-card text-sm font-medium hover:bg-admin-muted/20"
                      onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                    >
                      <span className="sr-only">Previous</span>
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={page === currentPage ? "default" : "ghost"}
                        className={`
                          relative inline-flex items-center px-4 py-2 border border-admin-border text-sm font-medium
                          ${page === currentPage 
                            ? 'bg-admin-accent text-admin-background z-10' 
                            : 'bg-admin-card hover:bg-admin-muted/20 text-admin-foreground'
                          }
                        `}
                        onClick={() => handlePageChange(page)}
                      >
                        {page}
                      </Button>
                    ))}
                    <Button
                      variant="ghost"
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-admin-border bg-admin-card text-sm font-medium hover:bg-admin-muted/20"
                      onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                    >
                      <span className="sr-only">Next</span>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </nav>
                </div>
              </div>
            </div>
          )}
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

export default Products;
