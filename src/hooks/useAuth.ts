import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';

// goes to cache
export default function useAuth() {
  const [isLogin, setLogin] = useState(false);
  const [isLoading, setLoading] = useState();
  const router = useRouter();

  useEffect(() => {
    // if (!isLogin) {
    //   router.replace('/');
    //   //   send notif
    // }
    return () => {};
  }, [isLogin]);

  return {
    isLoading,
    isLogin,
  };
}
