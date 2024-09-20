import { useState, useEffect } from 'react';

export const useShopId = () => {
  const [shopId, setShopId] = useState<string | null>(null);

  useEffect(() => {
    const storedShopId = localStorage.getItem('shopId');
    setShopId(storedShopId);
  }, []);

  return shopId;
};
