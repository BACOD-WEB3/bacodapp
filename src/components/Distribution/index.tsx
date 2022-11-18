import useFullMode from '@/hooks/useFullMode';
import usePosition from '@/hooks/usePosition';
import React from 'react';
import Button from '../Button';

const LEVELS = [
  {
    title: 'Level 1',
    value: '30%',
    bg: 'bg-gradient-to-r from-blue-500 to-blue-300',
  },
  {
    title: 'Level 2',
    value: '20%',

    bg: 'bg-gradient-to-r from-sky-600 to-pink-500',
  },
  {
    title: 'Level 3',
    value: '10%',
    bg: 'bg-gradient-to-r from-cyan-500 to-blue-500',
  },
];
export default function Distribution({ isGraph = true }) {
  const { setFullMode } = useFullMode();
  // const { loading, child } = usePosition();
  return (
    <div className='px-2'>
      Current Level (3):
      {LEVELS.map((item, i) => (
        <LevelItem
          key={i}
          {...{
            ...item,
            index: i,
            // people: loading
            //   ? 'Loading...'
            //   : i === 0
            //   ? child?.length
            //   : '*development',
          }}
        />
      ))}
      <br />
      <br />
      Followers (0):
      <br />
      Total earnings (<small>Under development</small>)
      <br />
      <br />
      <br />
      {isGraph && (
        <Button onClick={() => setFullMode(true)}>Full Mode Graph</Button>
      )}
    </div>
  );
}

const LevelItem = (item) => {
  const { loading, child } = usePosition();

  return (
    <div
      className={`mb-2 flex justify-between rounded-md align-middle  ${item.bg} p-4`}
    >
      <div>
        {item.title}
        <br />
        {item.value}
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className='text-right'>
          - USD <br /> {item?.index === 0 && child?.length} people
        </div>
      )}
    </div>
  );
};
