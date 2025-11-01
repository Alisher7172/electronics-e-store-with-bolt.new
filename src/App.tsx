import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ProductCatalog } from './pages/ProductCatalog';
import { ProductDetail } from './pages/ProductDetail';
import { ShoppingCart } from './pages/ShoppingCart';
import { Checkout } from './pages/Checkout';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { OrderHistory } from './pages/OrderHistory';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import { Page } from './types';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');

  const handlePageChange = (page: Page, productId?: string) => {
    setCurrentPage(page);
    if (productId) {
      setSelectedProductId(productId);
    }
    
    // Clear search when navigating away from catalog
    if (page !== 'catalog') {
      setSearchQuery('');
    }

    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onPageChange={handlePageChange} />;
      case 'catalog':
        return (
          <ProductCatalog
            onPageChange={handlePageChange}
            searchQuery={searchQuery}
          />
        );
      case 'product':
        return (
          <ProductDetail
            productId={selectedProductId}
            onPageChange={handlePageChange}
          />
        );
      case 'cart':
        return <ShoppingCart onPageChange={handlePageChange} />;
      case 'checkout':
        return <Checkout onPageChange={handlePageChange} />;
      case 'login':
        return <Login onPageChange={handlePageChange} />;
      case 'signup':
        return <Signup onPageChange={handlePageChange} />;
      case 'orders':
        return <OrderHistory onPageChange={handlePageChange} />;
      default:
        return <HomePage onPageChange={handlePageChange} />;
    }
  };

  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar
            currentPage={currentPage}
            onPageChange={handlePageChange}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
          
          <main className="flex-grow">
            {renderCurrentPage()}
          </main>
          
          <Footer />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;