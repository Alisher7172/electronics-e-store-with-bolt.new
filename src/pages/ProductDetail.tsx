import React, { useState } from 'react';
import { ArrowLeft, Star, ShoppingCart, Heart, Share2, Plus, Minus, Truck, Shield, RotateCcw } from 'lucide-react';
import { Product, Page } from '../types';
import { products } from '../data/products';
import { useCart } from '../contexts/CartContext';

interface ProductDetailProps {
  productId: string;
  onPageChange: (page: Page) => void;
}

// Mock reviews data
const mockReviews = [
  {
    id: '1',
    productId: '1',
    userId: '1',
    userName: 'Sarah Johnson',
    rating: 5,
    comment: 'Absolutely love these headphones! The sound quality is incredible and they\'re so comfortable.',
    date: new Date('2024-01-15')
  },
  {
    id: '2',
    productId: '1',
    userId: '2',
    userName: 'Mike Chen',
    rating: 4,
    comment: 'Great headphones, battery life is as advertised. Only minor complaint is they can get a bit warm during long sessions.',
    date: new Date('2024-01-10')
  },
  {
    id: '3',
    productId: '1',
    userId: '3',
    userName: 'Emily Davis',
    rating: 5,
    comment: 'Best purchase I\'ve made in a while. The noise cancellation is perfect for my commute.',
    date: new Date('2024-01-05')
  }
];

export const ProductDetail: React.FC<ProductDetailProps> = ({ productId, onPageChange }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedTab, setSelectedTab] = useState<'description' | 'reviews' | 'specifications'>('description');
  const { addItem } = useCart();
  
  const product = products.find(p => p.id === productId);
  
  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
          <button
            onClick={() => onPageChange('catalog')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Back to Catalog
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
  };

  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const productReviews = mockReviews.filter(r => r.productId === productId);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => onPageChange('catalog')}
          className="flex items-center text-gray-600 hover:text-blue-600 mb-8 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Products
        </button>

        {/* Product Details */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square rounded-xl overflow-hidden bg-gray-100">
                <img
                  src={product.images[selectedImageIndex] || product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex space-x-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImageIndex === index ? 'border-blue-500' : 'border-gray-200'
                    }`}
                  >
                    <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    {product.category}
                  </span>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                      <Heart className="h-5 w-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors">
                      <Share2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
                
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="text-sm text-gray-600 ml-2">
                      {product.rating} ({product.reviewCount} reviews)
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-4 mb-6">
                  <span className="text-3xl font-bold text-gray-900">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
                  )}
                  {product.originalPrice && (
                    <span className="bg-red-100 text-red-700 px-2 py-1 rounded-lg text-sm font-semibold">
                      Save ${product.originalPrice - product.price}
                    </span>
                  )}
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <p className="text-gray-600 mb-6">{product.description}</p>
                
                {/* Features */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h3>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-600">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 flex-shrink-0"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Quantity and Add to Cart */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <span className="text-sm font-medium text-gray-900">Quantity:</span>
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-2 hover:bg-gray-100 transition-colors"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="px-4 py-2 min-w-[3rem] text-center">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-2 hover:bg-gray-100 transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={handleAddToCart}
                      disabled={!product.inStock}
                      className="flex-1 bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                    >
                      <ShoppingCart className="h-5 w-5 mr-2" />
                      {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                    <button className="px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-colors">
                      Buy Now
                    </button>
                  </div>

                  {product.inStock && (
                    <p className="text-sm text-emerald-600 font-medium">✓ In Stock - Ready to Ship</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Product Features */}
          <div className="border-t border-gray-200 p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3">
                <Truck className="h-8 w-8 text-blue-600" />
                <div>
                  <h4 className="font-semibold text-gray-900">Free Shipping</h4>
                  <p className="text-sm text-gray-600">On orders over $50</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="h-8 w-8 text-emerald-600" />
                <div>
                  <h4 className="font-semibold text-gray-900">2 Year Warranty</h4>
                  <p className="text-sm text-gray-600">Full manufacturer warranty</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <RotateCcw className="h-8 w-8 text-orange-600" />
                <div>
                  <h4 className="font-semibold text-gray-900">30-Day Returns</h4>
                  <p className="text-sm text-gray-600">Hassle-free returns</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-t border-gray-200">
            <div className="flex border-b border-gray-200">
              {(['description', 'reviews', 'specifications'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                  className={`px-8 py-4 text-sm font-medium capitalize transition-colors ${
                    selectedTab === tab
                      ? 'border-b-2 border-blue-600 text-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="p-8">
              {selectedTab === 'description' && (
                <div className="prose max-w-none">
                  <p className="text-gray-600 leading-relaxed mb-4">{product.description}</p>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Features & Benefits</h4>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="text-gray-600">• {feature}</li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedTab === 'reviews' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-semibold text-gray-900">Customer Reviews</h4>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                      Write a Review
                    </button>
                  </div>
                  
                  <div className="space-y-6">
                    {productReviews.map((review) => (
                      <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-4">
                            <h5 className="font-medium text-gray-900">{review.userName}</h5>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <span className="text-sm text-gray-500">
                            {review.date.toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-gray-600">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedTab === 'specifications' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Product Details</h4>
                    <dl className="space-y-3">
                      <div className="flex justify-between">
                        <dt className="text-gray-600">Category</dt>
                        <dd className="font-medium text-gray-900">{product.category}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-600">Rating</dt>
                        <dd className="font-medium text-gray-900">{product.rating}/5</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-600">Reviews</dt>
                        <dd className="font-medium text-gray-900">{product.reviewCount}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-600">Availability</dt>
                        <dd className={`font-medium ${product.inStock ? 'text-emerald-600' : 'text-red-600'}`}>
                          {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <div
                  key={relatedProduct.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow cursor-pointer overflow-hidden"
                  onClick={() => onPageChange('product', relatedProduct.id)}
                >
                  <img
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">{relatedProduct.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-gray-900">${relatedProduct.price}</span>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600">{relatedProduct.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};