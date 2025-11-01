import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    price: 299,
    originalPrice: 399,
    category: 'Electronics',
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=500',
    images: [
      'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/205926/pexels-photo-205926.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'Experience crystal-clear audio with our premium wireless headphones featuring active noise cancellation and 30-hour battery life.',
    features: ['Active Noise Cancellation', '30-hour battery', 'Bluetooth 5.0', 'Premium comfort padding'],
    inStock: true,
    rating: 4.8,
    reviewCount: 234,
    tags: ['trending', 'featured']
  },
  {
    id: '2',
    name: 'Smart Watch Pro',
    price: 449,
    category: 'Electronics',
    image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=500',
    images: [
      'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1420709/pexels-photo-1420709.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'Advanced smartwatch with health monitoring, GPS tracking, and seamless smartphone integration.',
    features: ['Heart rate monitoring', 'GPS tracking', '7-day battery', 'Water resistant'],
    inStock: true,
    rating: 4.6,
    reviewCount: 189,
    tags: ['new', 'featured']
  },
  {
    id: '3',
    name: 'Designer Backpack',
    price: 89,
    originalPrice: 129,
    category: 'Fashion',
    image: 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=500',
    images: [
      'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'Stylish and functional backpack perfect for work, travel, or everyday use. Made with premium materials.',
    features: ['Water-resistant fabric', 'Laptop compartment', 'Multiple pockets', 'Ergonomic design'],
    inStock: true,
    rating: 4.4,
    reviewCount: 167,
    tags: ['sale', 'trending']
  },
  {
    id: '4',
    name: 'Minimalist Desk Setup',
    price: 199,
    category: 'Home & Office',
    image: 'https://images.pexels.com/photos/1181316/pexels-photo-1181316.jpeg?auto=compress&cs=tinysrgb&w=500',
    images: [
      'https://images.pexels.com/photos/1181316/pexels-photo-1181316.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'Clean, modern desk setup with wireless charging pad, cable management, and premium materials.',
    features: ['Wireless charging', 'Cable management', 'Premium wood finish', 'Ergonomic height'],
    inStock: true,
    rating: 4.7,
    reviewCount: 98,
    tags: ['new']
  },
  {
    id: '5',
    name: 'Organic Cotton T-Shirt',
    price: 29,
    category: 'Fashion',
    image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=500',
    images: [
      'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'Soft, comfortable organic cotton t-shirt available in multiple colors. Perfect for everyday wear.',
    features: ['100% organic cotton', 'Pre-shrunk', 'Multiple colors', 'Sustainable production'],
    inStock: true,
    rating: 4.3,
    reviewCount: 312,
    tags: ['eco-friendly']
  },
  {
    id: '6',
    name: 'Coffee Brewing Set',
    price: 79,
    category: 'Home & Kitchen',
    image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=500',
    images: [
      'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1251175/pexels-photo-1251175.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'Complete coffee brewing set with French press, grinder, and premium accessories for the perfect cup.',
    features: ['French press included', 'Manual grinder', 'Measuring spoon', 'Instructions guide'],
    inStock: true,
    rating: 4.5,
    reviewCount: 145,
    tags: ['trending']
  }
];

export const categories = [
  'All',
  'Electronics',
  'Fashion',
  'Home & Office',
  'Home & Kitchen',
  'Sports'
];