import React from 'react';

const OVERVIEW = [
  {
    title: 'EARNING',
    value: 9000,
    bg: 'bg-gradient-to-r from-green-500 to-blue-300',
  },
  {
    title: 'TRX',
    value: 9000,
    bg: 'bg-gradient-to-r from-red-600 to-pink-500',
  },
  {
    title: 'TUSD',
    value: 9000,
    bg: 'bg-gradient-to-r from-cyan-500 to-blue-500',
  },
  {
    title: 'POINTS',
    value: 9000,
    bg: 'bg-gradient-to-r from-purple-500 to-beige-500',
  },
];
export default function Overview() {
  return (
    <div className='px-2'>
      {OVERVIEW.map((item, i) => (
        <OverviewItem key={i} {...{ item }} />
      ))}
    </div>
  );
}

const OverviewItem = ({ item }) => {
  return (
    <div className={`mb-2 rounded-md  ${item.bg} p-4`}>
      {item.title}
      <br />
      {item.value}
    </div>
  );
};
