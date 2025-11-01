import React, { useState } from 'react';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { Page } from '../types';

interface NavbarProps {
  currentPage: Page;
  onPageChange: (page: Page) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  currentPage, 
  onPageChange, 
  searchQuery, 
  onSearchChange 
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { getItemCount } = useCart();
  const { state: authState, logout } = useAuth();
  const itemCount = getItemCount();

  const handlePageChange = (page: Page) => {
    onPageChange(page);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    onPageChange('home');
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer"
            onClick={() => handlePageChange('home')}
          >
            <div className="flex-shrink-0 flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900">EliteStore</span>
            </div>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Search products..."
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => handlePageChange('home')}
              className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                currentPage === 'home' ? 'text-blue-600' : 'text-gray-700'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handlePageChange('catalog')}
              className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                currentPage === 'catalog' ? 'text-blue-600' : 'text-gray-700'
              }`}
            >
              Products
            </button>
            
            {/* Cart Icon */}
            <button
              onClick={() => handlePageChange('cart')}
              className="relative p-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center font-medium">
                  {itemCount}
                </span>
              )}
            </button>

            {/* User Menu */}
            <div className="relative">
              {authState.isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handlePageChange('orders')}
                    className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    Orders
                  </button>
                  <button
                    onClick={handleLogout}
                    className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    Logout
                  </button>
                  <div className="flex items-center">
                    <User className="h-6 w-6 text-gray-700" />
                    <span className="ml-1 text-sm text-gray-700">{authState.user?.name}</span>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handlePageChange('login')}
                    className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => handlePageChange('signup')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none transition-colors"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* Mobile Search */}
              <div className="px-3 py-2">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Search products..."
                  />
                </div>
              </div>
              
              <button
                onClick={() => handlePageChange('home')}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md w-full text-left transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => handlePageChange('catalog')}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md w-full text-left transition-colors"
              >
                Products
              </button>
              <button
                onClick={() => handlePageChange('cart')}
                className="flex items-center px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Cart {itemCount > 0 && <span className="ml-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">{itemCount}</span>}
              </button>
              
              {authState.isAuthenticated ? (
                <>
                  <button
                    onClick={() => handlePageChange('orders')}
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md w-full text-left transition-colors"
                  >
                    Orders
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md w-full text-left transition-colors"
                  >
                    Logout
                  </button>
                  <div className="px-3 py-2 text-sm text-gray-600">
                    Welcome, {authState.user?.name}
                  </div>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handlePageChange('login')}
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md w-full text-left transition-colors"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => handlePageChange('signup')}
                    className="block px-3 py-2 text-base font-medium bg-blue-600 text-white hover:bg-blue-700 rounded-md transition-colors"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};