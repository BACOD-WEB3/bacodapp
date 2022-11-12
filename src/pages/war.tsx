import React from 'react';
// import {render} from 'react-dom';
import dynamic from 'next/dynamic';
import Layout from '@/components/Layout';
import MapWar from '@/components/Map';
// const MapWar = dynamic(() => import('../components/Map'), {
//   suspense: true,
// });

export default function War() {
  return (
    <div>
      <MapWar />

      <Layout>
        <div>under development</div>
      </Layout>
    </div>
  );
}

/* global document */
