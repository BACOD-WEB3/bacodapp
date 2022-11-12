import React from 'react';

const OVERVIEW = [
  { title: 'EARNING', value: 9000, bg: 'red' },
  { title: 'TRX', value: 9000 },
  { title: 'TUSD', value: 9000 },
  { title: 'POINTS', value: 9000 },
  { title: 'POINTS', value: 9000 },
  { title: 'POINTS', value: 9000 },
  { title: 'POINTS', value: 9000 },
  { title: 'POINTS', value: 9000 },
];
export default function GiftCodes() {
  return (
    <div className='px-2 '>
      Referral Code: ABCDE
      <br />
      <br />
      GiftCodes ({OVERVIEW.length}):
      {/* visible eyes */}
      {OVERVIEW.map((item, i) => (
        <Code key={i} {...{ item }} />
      ))}
    </div>
  );
}

const Code = ({ item }) => {
  return (
    <div className='mb-2 flex  justify-between rounded-md bg-bg_secondary p-4'>
      <div>RANDOM NUMBER</div>

      <div>Clipboard</div>
    </div>
  );
};
