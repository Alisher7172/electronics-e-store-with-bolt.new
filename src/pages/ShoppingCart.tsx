import React from 'react';
import { ArrowLeft, Minus, Plus, X, ShoppingBag, Truck } from 'lucide-react';
import { Page } from '../types';
import { useCart } from '../contexts/CartContext';

interface ShoppingCartProps {
  onPageChange: (page: Page) => void;
}

export const ShoppingCart: React.FC<ShoppingCartProps> = ({ onPageChange }) => {
  const { state, removeItem, updateQuantity } = useCart();
  const { items, total } = state;

  const shipping = total > 50 ? 0 : 9.99;
  const tax = total * 0.08;
  const finalTotal = total + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button
            onClick={() => onPageChange('catalog')}
            className="flex items-center text-gray-600 hover:text-blue-600 mb-8 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Shopping
          </button>

          <div className="text-center py-16">
            <ShoppingBag className="h-24 w-24 text-gray-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Looks like you haven't added anything to your cart yet.</p>
            <button
              onClick={() => onPageChange('catalog')}
              className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
            >
              Start Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => onPageChange('catalog')}
          className="flex items-center text-gray-600 hover:text-blue-600 mb-8 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Continue Shopping
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-200">
                <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
                <p className="text-gray-600">{items.length} item{items.length !== 1 ? 's' : ''} in your cart</p>
              </div>

              <div className="p-6 space-y-6">
                {items.map((item) => (
                  <div key={item.product.id} className="flex flex-col sm:flex-row gap-4 p-4 border border-gray-200 rounded-xl">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full sm:w-24 h-24 object-cover rounded-lg cursor-pointer"
                      onClick={() => onPageChange('product', item.product.id)}
                    />
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h3 
                          className="font-semibold text-gray-900 hover:text-blue-600 cursor-pointer transition-colors"
                          onClick={() => onPageChange('product', item.product.id)}
                        >
                          {item.product.name}
                        </h3>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3">{item.product.category}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-gray-300 rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="p-2 hover:bg-gray-100 transition-colors"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="px-4 py-2 min-w-[3rem] text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-2 hover:bg-gray-100 transition-colors"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-lg font-bold text-gray-900">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </div>
                          <div className="text-sm text-gray-600">
                            ${item.product.price} each
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 sticky top-8">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${total.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <Truck className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-gray-600">Shipping</span>
                    </div>
                    <span className="font-medium">
                      {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  
                  {shipping === 0 && (
                    <div className="text-sm text-emerald-600 bg-emerald-50 p-3 rounded-lg">
                      🎉 You qualify for free shipping!
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-lg">
                      <span className="font-bold text-gray-900">Total</span>
                      <span className="font-bold text-gray-900">${finalTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => onPageChange('checkout')}
                  className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors mb-4"
                >
                  Proceed to Checkout
                </button>
                
                <button
                  onClick={() => onPageChange('catalog')}
                  className="w-full border-2 border-blue-600 text-blue-600 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};