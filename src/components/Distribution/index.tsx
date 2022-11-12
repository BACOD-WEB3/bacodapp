import useFullMode from '@/hooks/useFullMode';
import React from 'react';
import Button from '../Button';

const LEVELS = [
  {
    title: 'Level 1',
    value: '40%',
    bg: 'bg-gradient-to-r from-blue-500 to-blue-300',
  },
  {
    title: 'Level 2',
    value: '30%',

    bg: 'bg-gradient-to-r from-sky-600 to-pink-500',
  },
  {
    title: 'Level 3',
    value: '20%',
    bg: 'bg-gradient-to-r from-cyan-500 to-blue-500',
  },
];
export default function Distribution() {
  const { setFullMode } = useFullMode();
  return (
    <div className='px-2'>
      Current Level (3):
      {LEVELS.map((item, i) => (
        <LevelItem key={i} {...{ item }} />
      ))}
      <br />
      <br />
      Followers (88):
      <br />
      Total earnings (<small>Under development</small>)
      <br />
      <br />
      <br />
      <Button onClick={() => setFullMode(true)}>Full Mode Graph</Button>
    </div>
  );
}

const LevelItem = ({ item }) => {
  return (
    <div
      className={`mb-2 flex justify-between rounded-md align-middle  ${item.bg} p-4`}
    >
      <div>
        {item.title}
        <br />
        {item.value}
      </div>
      <div className='text-right'>
        8,000 USD <br /> 8 people
      </div>
    </div>
  );
};
