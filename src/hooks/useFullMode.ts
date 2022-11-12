import create from 'zustand';

const useFullMode = create((set, get) => {
  return {
    isFull: false,

    setFullMode: (value: boolean) => set({ isFull: value }),
  };
});

export default useFullMode;
