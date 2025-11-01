import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, Order } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

interface AuthContextType {
  state: AuthState;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  getOrders: () => Order[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock orders data
const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    userId: '1',
    items: [],
    total: 299,
    status: 'delivered',
    orderDate: new Date('2024-01-15'),
    estimatedDelivery: new Date('2024-01-18')
  },
  {
    id: 'ORD-002',
    userId: '1',
    items: [],
    total: 89,
    status: 'shipped',
    orderDate: new Date('2024-01-20'),
    estimatedDelivery: new Date('2024-01-25')
  }
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false
  });

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login - in real app, this would be an API call
    if (email && password) {
      const user: User = {
        id: '1',
        name: 'John Doe',
        email: email
      };
      setState({ user, isAuthenticated: true });
      return true;
    }
    return false;
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    // Mock signup - in real app, this would be an API call
    if (name && email && password) {
      const user: User = {
        id: Date.now().toString(),
        name,
        email
      };
      setState({ user, isAuthenticated: true });
      return true;
    }
    return false;
  };

  const logout = () => {
    setState({ user: null, isAuthenticated: false });
  };

  const getOrders = (): Order[] => {
    if (!state.isAuthenticated) return [];
    return mockOrders.filter(order => order.userId === state.user?.id);
  };

  return (
    <AuthContext.Provider value={{
      state,
      login,
      signup,
      logout,
      getOrders
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};