// /// app.js
// import React from 'react';
// import DeckGL from '@deck.gl/react';
// import { LineLayer } from '@deck.gl/layers';
// import { Map } from 'react-map-gl';
// import 'mapbox-gl/dist/mapbox-gl.css';

// const MAPBOX_ACCESS_TOKEN =
//   'pk.eyJ1IjoiZGVsbHdhdHNvbiIsImEiOiJjbGE1cnQyNnAwcXNyM3hybmFxMzFjNG04In0.TLc38l7eHQMRBVLFWoTSNw';
// // Viewport settings
// const INITIAL_VIEW_STATE = {
//   longitude: -122.41669,
//   latitude: 37.7853,
//   zoom: 13,
//   pitch: 0,
//   bearing: 0,
// };

// // Data to be used by the LineLayer
// const data = [
//   {
//     sourcePosition: [-122.41669, 37.7853],
//     targetPosition: [-122.41669, 37.781],
//   },
// ];

// // DeckGL react component
// export default function MapWar() {
//   const layers = [new LineLayer({ id: 'line-layer', data })];

//   return (
//     <div className='z-20 h-[500px] w-[500px] border bg-gray-100'>
//       <DeckGL initialViewState={INITIAL_VIEW_STATE} controller={true}>
//         <LineLayer id='line-layer' data={data} />
//       </DeckGL>
//     </div>
//   );
// }
import { useState } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

export default function Map({ locations }) {
  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100%',
    // The latitude and longitude of the center of London
    latitude: 51.5074,
    longitude: -0.1278,
    zoom: 10,
  });
  return (
    <div className='h-screen border'>
      <ReactMapGL
        mapStyle='mapbox://styles/mapbox/streets-v11'
        mapboxApiAccessToken='pk.eyJ1IjoiZGVsbHdhdHNvbiIsImEiOiJjbGE1cnp3MnkweTAxM29vN3gzcTEzeW4wIn0.0uy7zo75ONRXeR2Yb5jsUA'
        {...viewport}
        // onViewportChange={(nextViewport) => setViewport(nextViewport)}
      >
        {locations?.map((location) => (
          <div key={location.id}>
            <Marker
              latitude={location.center[1]}
              longitude={location.center[0]}
              offsetLeft={-20}
              offsetTop={-10}
            >
              <span role='img' aria-label='push-pin'>
                📌
              </span>
            </Marker>
          </div>
        ))}
      </ReactMapGL>
    </div>
  );
}
