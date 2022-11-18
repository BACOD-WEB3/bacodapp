import usePosition, { useZustandPostion } from '@/hooks/usePosition';
import axios from 'axios';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

import data from './dataset.json';
const ReactForceGraph3d = dynamic(() => import('react-force-graph-3d'), {
  ssr: false,
});

const SAMPLE =
  'https://vasturiano.github.io/3d-force-graph/example/datasets/miserables.json';
const distance = 1400;

const CameraOrbit = ({ data }) => {
  // const fgRef = useRef();
  const { nodes, links } = useZustandPostion();

  const x_data = {
    nodes: [...nodes, ...data?.nodes],
    links: [...links, ...data?.links],
  };

  return (
    <ReactForceGraph3d
      // ref={fgRef}
      graphData={x_data}
      linkDirectionalParticleColor={() => 'blue'}
      linkDirectionalParticleWidth={6}
      linkHoverPrecision={10}
      nodeAutoColorBy='group'
      // .nodeAutoColorBy('group')
      // onLinkClick={(link) => fgRef.current.emitParticle(link)}
    />
  );
};

export default function Graph() {
  // const [data, setData] = useState({});
  // useEffect(() => {
  //   const load = async () => {
  //     try {
  //       const res = await axios.get(SAMPLE);
  //       setData(res?.data);
  //     } catch (error) {}
  //   };
  //   load();
  // }, []);

  return <CameraOrbit data={data} />;
}
