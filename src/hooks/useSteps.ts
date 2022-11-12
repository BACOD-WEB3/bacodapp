import create from 'zustand';

const useSteps = create((set, get) => {
  return {
    step: 1,
    type2: 'whitelist', //whitelist, code, product
    setType: (value: string) => set({ type2: value }),
    setStep: (value: number) => set({ step: value }),
  };
});

export default useSteps;
