import Button from '@/components/Button';
import Layout from '@/components/Layout';
import Step1 from '@/components/Onboarding/Step1';
import Step2 from '@/components/Onboarding/Step2';
import Step3 from '@/components/Onboarding/Step3';
import Step4 from '@/components/Onboarding/Step4';
import StepsProgress from '@/components/Onboarding/StepsProgress';
import useSteps from '@/hooks/useSteps';
import { useEffect, useState } from 'react';

export default function Onboarding() {
  // loadStatusStep

  const { step } = useSteps();
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <Layout sideBar={false}>
      <div className='my-32 md:mx-20 lg:mx-32 xl:mx-64'>
        <StepsProgress />
        {[<Step1 />, <Step2 />, <Step3 />].map(
          (item, i) => i + 1 === step && <div key={i}>{item}</div>
        )}
      </div>
    </Layout>
  );
}
