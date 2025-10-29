// Cart Service
import apiClient from './api';

export interface CartItem {
  id: number;
  product_id: string;
  product_title: string;
  quantity: number;
}

export interface CartResponse {
  success: boolean;
  message?: string;
  data?: {
    items: CartItem[];
    count: number;
  };
  error?: string;
}

// Get cart
export const getCart = async (): Promise<CartResponse> => {
  try {
    const response = await apiClient.get('/cart');
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.error || 'Failed to fetch cart',
    };
  }
};

// Add to cart
export const addToCart = async (
  productId: string,
  productTitle: string
): Promise<CartResponse> => {
  try {
    const response = await apiClient.post('/cart/add', {
      productId,
      productTitle,
    });
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.error || 'Failed to add to cart',
    };
  }
};

// Increment item
export const incrementItem = async (productId: string): Promise<CartResponse> => {
  try {
    const response = await apiClient.post('/cart/increment', { productId });
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.error || 'Failed to increment item',
    };
  }
};

// Decrement item
export const decrementItem = async (productId: string): Promise<CartResponse> => {
  try {
    const response = await apiClient.post('/cart/decrement', { productId });
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.error || 'Failed to decrement item',
    };
  }
};

// Remove item
export const removeItem = async (productId: string): Promise<CartResponse> => {
  try {
    const response = await apiClient.delete('/cart/remove', {
      data: { productId },
    });
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.error || 'Failed to remove item',
    };
  }
};

// Clear cart
export const clearCart = async (): Promise<CartResponse> => {
  try {
    const response = await apiClient.delete('/cart/clear');
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.error || 'Failed to clear cart',
    };
  }
};