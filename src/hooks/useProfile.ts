import axios from 'axios';
import create from 'zustand';

const useProfile = create((set, get) => {
  return {
    profile_cache: null,
    tokenID: null,
    addressNOW: null,
    setProfile: (value: any) => set({ profile_cache: value }),
    setTokenID: (value: number) => set({ tokenID: value }),
    setCacheAddress: (value: number) => set({ addressNOW: value }),

    loadSelfProfile: async (tokenURI: string) => {
      const res = await axios.get(tokenURI);
      set({ profile_cache: res?.data });
    },
  };
});

export default useProfile;
