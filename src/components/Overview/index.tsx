import React from 'react';

const OVERVIEW = [
  { title: 'EARNING', value: 9000, bg: 'bg-green-400' },
  { title: 'TRX', value: 9000, bg: 'bg-red-600' },
  { title: 'TUSD', value: 9000, bg: 'bg-cyan-400' },
  { title: 'POINTS', value: 9000, bg: 'bg-orange-400' },
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
