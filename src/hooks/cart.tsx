import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  useEffect,
} from 'react';

import AsyncStorage from '@react-native-community/async-storage';

interface Product {
  id: string;
  title: string;
  image_url: string;
  price: number;
  quantity: number;
}

interface CartContext {
  products: Product[];
  addToCart(item: Omit<Product, 'quantity'>): void;
  increment(id: string): void;
  decrement(id: string): void;
}

const asyncStorageKey = '@GoMarketPlaceCart:Product';

const CartContext = createContext<CartContext | null>(null);

const CartProvider: React.FC = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function loadProducts(): Promise<void> {
      const storagedCartProdutcs = await AsyncStorage.getItem(asyncStorageKey);

      if (storagedCartProdutcs) {
        setProducts([...JSON.parse(storagedCartProdutcs)]);
      }
    }

    loadProducts();
  }, []);

  const increment = useCallback(
    async id => {
      const copyProduct: Product[] = products;
      const findIndex = copyProduct.findIndex(product => product.id === id);
      if (findIndex >= 0) {
        copyProduct[findIndex].quantity += 1;
        setProducts([...copyProduct]);

        await AsyncStorage.setItem(asyncStorageKey, JSON.stringify(products));
      }
    },
    [products],
  );

  const decrement = useCallback(
    async id => {
      const copyProduct: Product[] = products;
      const findIndex = copyProduct.findIndex(product => product.id === id);
      if (findIndex >= 0) {
        if (copyProduct[findIndex].quantity > 1) {
          copyProduct[findIndex].quantity -= 1;
        } else {
          copyProduct.splice(findIndex, 1);
        }

        setProducts([...copyProduct]);
      }

      await AsyncStorage.setItem(asyncStorageKey, JSON.stringify(products));
    },
    [products],
  );

  const addToCart = useCallback(
    async product => {
      const copyProducts: Product[] = products;
      const productIndex = products.findIndex(
        stateProduct => stateProduct.id === product.id,
      );

      if (productIndex >= 0) {
        copyProducts[productIndex].quantity += 1;
        setProducts([...copyProducts]);
        return;
      }

      const newProduct: Product = {
        ...product,
        quantity: 1,
      };

      setProducts([...products, newProduct]);

      await AsyncStorage.setItem(asyncStorageKey, JSON.stringify(products));
    },

    [products],
  );

  const value = React.useMemo(
    () => ({ addToCart, increment, decrement, products }),
    [products, addToCart, increment, decrement],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

function useCart(): CartContext {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(`useCart must be used within a CartProvider`);
  }

  return context;
}

export { CartProvider, useCart };
