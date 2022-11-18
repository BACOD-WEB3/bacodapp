import useTronContract from '@/hooks/useTronContract';
import React, { useState, useEffect } from 'react';

export default function useStore() {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState(false);
  const { contract } = useTronContract('store');
  useEffect(() => {
    const loadStoreData = async () => {
      // const res = await contract?.
    };
    loadStoreData();
  }, [contract]);
  return {
    loading,
    list,
  };
}

// approve USD
// purchaseProduct / buyProduct
