// no max length
// mapbox
import Layout from '@/components/Layout';
// import Map from '@/components/Map';
// import MapWar from '@/components/Map';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const Map = dynamic(() => import('../components/Map'), {
  loading: () => 'Loading...',
  ssr: false,
});
// const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/greggs.json?access_token=pk.eyJ1IjoiZGVsbHdhdHNvbiIsImEiOiJjbGE1cnQyNnAwcXNyM3hybmFxMzFjNG04In0.TLc38l7eHQMRBVLFWoTSNw&bbox=-0.227654%2C51.464102%2C0.060737%2C51.553421&limit=10`;
export default function IndexPage() {
  // const [locations, setLocations] = useState([]);
  // useEffect(() => {
  //   const fetchLocations = async () => {
  //     await fetch(url)
  //       .then((response) => response.text())
  //       .then((res) => JSON.parse(res))
  //       .then((json) => {
  //         setLocations(json.features);
  //       })
  //       .catch((err) => console.log({ err }));
  //   };
  //   fetchLocations();
  // }, []);
  return (
    <div>
      <Map {...{ locations: locations.features }} />
    </div>
  );
}

const locations = {
  type: 'FeatureCollection',
  query: ['greggs'],
  features: [
    {
      id: 'poi.25769806049',
      type: 'Feature',
      place_type: ['poi'],
      relevance: 1,
      properties: {
        foursquare: '4c135b95a1010f47ef7e4a18',
        landmark: true,
        address: "183 Earl's Court Rd",
        category: 'sandwich, fast food',
      },
      text: 'Greggs',
      place_name:
        "Greggs, 183 Earl's Court Rd, London, England SW5 9RD, United Kingdom",
      center: [-0.192967, 51.492194],
      geometry: { coordinates: [-0.192967, 51.492194], type: 'Point' },
      context: [
        { id: 'neighborhood.13798479', text: "Earl's Court" },
        { id: 'postcode.12230053455', text: 'SW5 9RD' },
        { id: 'locality.95816271', text: 'Kensington and Chelsea' },
        { id: 'place.6957135', wikidata: 'Q84', text: 'London' },
        { id: 'district.591439', wikidata: 'Q23306', text: 'Greater London' },
        {
          id: 'region.9295',
          short_code: 'GB-ENG',
          wikidata: 'Q21',
          text: 'England',
        },
        {
          id: 'country.8783',
          short_code: 'gb',
          wikidata: 'Q145',
          text: 'United Kingdom',
        },
      ],
    },
    {
      id: 'poi.25769907883',
      type: 'Feature',
      place_type: ['poi'],
      relevance: 1,
      properties: {
        foursquare: '4ce697f6595cb1f79e38bd14',
        landmark: true,
        address: '52 Stratford Centre',
        category: 'sandwich, fast food',
      },
      text: 'Greggs',
      place_name:
        'Greggs, 52 Stratford Centre, London, England E15 1AZ, United Kingdom',
      center: [-0.0022275, 51.542165499999996],
      geometry: {
        coordinates: [-0.0022275, 51.542165499999996],
        type: 'Point',
      },
      context: [
        { id: 'neighborhood.45091919', text: 'Stratford' },
        { id: 'postcode.3796848207', text: 'E15 1AZ' },
        { id: 'locality.129264207', text: 'Newham' },
        { id: 'place.6957135', wikidata: 'Q84', text: 'London' },
        { id: 'district.591439', wikidata: 'Q23306', text: 'Greater London' },
        {
          id: 'region.9295',
          short_code: 'GB-ENG',
          wikidata: 'Q21',
          text: 'England',
        },
        {
          id: 'country.8783',
          short_code: 'gb',
          wikidata: 'Q145',
          text: 'United Kingdom',
        },
      ],
    },
    {
      id: 'poi.249108172715',
      type: 'Feature',
      place_type: ['poi'],
      relevance: 1,
      properties: {
        foursquare: '4caeecb7c5e6a1cdc56ec8f6',
        landmark: true,
        address: '273 Walworth Rd',
        category: 'sandwich, fast food',
      },
      text: 'Greggs',
      place_name:
        'Greggs, 273 Walworth Rd, London, England SE17 2TG, United Kingdom',
      center: [-0.095091, 51.48695],
      geometry: { coordinates: [-0.095091, 51.48695], type: 'Point' },
      context: [
        { id: 'neighborhood.49531983', text: 'Walworth' },
        { id: 'postcode.10991472207', text: 'SE17 2TG' },
        { id: 'locality.163695183', text: 'Southwark' },
        { id: 'place.6957135', wikidata: 'Q84', text: 'London' },
        { id: 'district.591439', wikidata: 'Q23306', text: 'Greater London' },
        {
          id: 'region.9295',
          short_code: 'GB-ENG',
          wikidata: 'Q21',
          text: 'England',
        },
        {
          id: 'country.8783',
          short_code: 'gb',
          wikidata: 'Q145',
          text: 'United Kingdom',
        },
      ],
    },
    {
      id: 'poi.42949731101',
      type: 'Feature',
      place_type: ['poi'],
      relevance: 1,
      properties: {
        foursquare: '4eb97ce94901cef9da3fe341',
        landmark: true,
        address: 'Tottenham Court Rd',
        category: 'sandwich, fast food',
      },
      text: 'Greggs',
      place_name:
        'Greggs, Tottenham Court Rd, London, England W1T 4TH, United Kingdom',
      center: [-0.135638, 51.521916],
      geometry: { coordinates: [-0.135638, 51.521916], type: 'Point' },
      context: [
        { id: 'neighborhood.16092239', text: 'Fitzrovia' },
        { id: 'postcode.13318622799', text: 'W1T 4TH' },
        { id: 'locality.31525455', text: 'Camden' },
        { id: 'place.6957135', wikidata: 'Q84', text: 'London' },
        { id: 'district.591439', wikidata: 'Q23306', text: 'Greater London' },
        {
          id: 'region.9295',
          short_code: 'GB-ENG',
          wikidata: 'Q21',
          text: 'England',
        },
        {
          id: 'country.8783',
          short_code: 'gb',
          wikidata: 'Q145',
          text: 'United Kingdom',
        },
      ],
    },
    {
      id: 'poi.541165983454',
      type: 'Feature',
      place_type: ['poi'],
      relevance: 1,
      properties: {
        foursquare: '4f365e62e4b099ca9331ae34',
        landmark: true,
        address: 'Unit 8 Aylesham Shopping Centre',
        category: 'sandwich, fast food',
      },
      text: 'Greggs',
      place_name:
        'Greggs, Unit 8 Aylesham Shopping Centre, London, England SE15 5BT, United Kingdom',
      center: [-0.069961, 51.472618],
      geometry: { coordinates: [-0.069961, 51.472618], type: 'Point' },
      context: [
        { id: 'neighborhood.36531279', text: 'Peckham' },
        { id: 'postcode.10972474959', text: 'SE15 5BT' },
        { id: 'locality.163695183', text: 'Southwark' },
        { id: 'place.6957135', wikidata: 'Q84', text: 'London' },
        { id: 'district.591439', wikidata: 'Q23306', text: 'Greater London' },
        {
          id: 'region.9295',
          short_code: 'GB-ENG',
          wikidata: 'Q21',
          text: 'England',
        },
        {
          id: 'country.8783',
          short_code: 'gb',
          wikidata: 'Q145',
          text: 'United Kingdom',
        },
      ],
    },
    {
      id: 'poi.807453879880',
      type: 'Feature',
      place_type: ['poi'],
      relevance: 1,
      properties: {
        foursquare: '4c650ac45e61d13a32e3ba85',
        landmark: true,
        address: '13 Eastcheap',
        category: 'sandwich, fast food',
      },
      text: 'Greggs',
      place_name:
        'Greggs, 13 Eastcheap, London, England EC3M 1BU, United Kingdom',
      center: [-0.08472, 51.510794],
      geometry: { coordinates: [-0.08472, 51.510794], type: 'Point' },
      context: [
        { id: 'postcode.3913559631', text: 'EC3M 1BU' },
        { id: 'locality.38775375', text: 'City of London' },
        { id: 'place.6957135', wikidata: 'Q84', text: 'London' },
        { id: 'district.591439', wikidata: 'Q23306', text: 'Greater London' },
        {
          id: 'region.9295',
          short_code: 'GB-ENG',
          wikidata: 'Q21',
          text: 'England',
        },
        {
          id: 'country.8783',
          short_code: 'gb',
          wikidata: 'Q145',
          text: 'United Kingdom',
        },
      ],
    },
    {
      id: 'poi.180388684902',
      type: 'Feature',
      place_type: ['poi'],
      relevance: 1,
      properties: {
        foursquare: '50811cefe4b0e99d0a790d88',
        landmark: true,
        address: 'Unit 3 Bow Bells House',
        category: 'sandwich, fast food',
      },
      text: 'Greggs',
      place_name:
        'Greggs, Unit 3 Bow Bells House, London, England EC2V 6AT, United Kingdom',
      center: [-0.094116, 51.51401],
      geometry: { coordinates: [-0.094116, 51.51401], type: 'Point' },
      context: [
        { id: 'postcode.3911446095', text: 'EC2V 6AT' },
        { id: 'locality.38775375', text: 'City of London' },
        { id: 'place.6957135', wikidata: 'Q84', text: 'London' },
        { id: 'district.591439', wikidata: 'Q23306', text: 'Greater London' },
        {
          id: 'region.9295',
          short_code: 'GB-ENG',
          wikidata: 'Q21',
          text: 'England',
        },
        {
          id: 'country.8783',
          short_code: 'gb',
          wikidata: 'Q145',
          text: 'United Kingdom',
        },
      ],
    },
    {
      id: 'poi.111669208045',
      type: 'Feature',
      place_type: ['poi'],
      relevance: 1,
      properties: {
        foursquare: '4c46cd0d34999c7440d400fd',
        landmark: true,
        address: '81 Leather Ln',
        category: 'sandwich, fast food',
      },
      text: 'Greggs',
      place_name:
        'Greggs, 81 Leather Ln, London, England EC1N 7TR, United Kingdom',
      center: [-0.109889, 51.521245],
      geometry: { coordinates: [-0.109889, 51.521245], type: 'Point' },
      context: [
        { id: 'postcode.3894939215', text: 'EC1N 7TR' },
        { id: 'locality.31525455', text: 'Camden' },
        { id: 'place.6957135', wikidata: 'Q84', text: 'London' },
        { id: 'district.591439', wikidata: 'Q23306', text: 'Greater London' },
        {
          id: 'region.9295',
          short_code: 'GB-ENG',
          wikidata: 'Q21',
          text: 'England',
        },
        {
          id: 'country.8783',
          short_code: 'gb',
          wikidata: 'Q145',
          text: 'United Kingdom',
        },
      ],
    },
    {
      id: 'poi.549755844488',
      type: 'Feature',
      place_type: ['poi'],
      relevance: 1,
      properties: {
        foursquare: '4bfe8825e529c9283876bc8c',
        landmark: true,
        address: '145 Strand',
        category: 'sandwich, fast food',
      },
      text: 'Greggs',
      place_name:
        'Greggs, 145 Strand, London, England WC2R 1JD, United Kingdom',
      center: [-0.118445, 51.511518],
      geometry: { coordinates: [-0.118445, 51.511518], type: 'Point' },
      context: [
        { id: 'neighborhood.11127887', text: 'Covent Garden' },
        { id: 'postcode.13562596943', text: 'WC2R 1JD' },
        { id: 'locality.192629327', text: 'Westminster' },
        { id: 'place.6957135', wikidata: 'Q84', text: 'London' },
        { id: 'district.591439', wikidata: 'Q23306', text: 'Greater London' },
        {
          id: 'region.9295',
          short_code: 'GB-ENG',
          wikidata: 'Q21',
          text: 'England',
        },
        {
          id: 'country.8783',
          short_code: 'gb',
          wikidata: 'Q145',
          text: 'United Kingdom',
        },
      ],
    },
    {
      id: 'poi.274877925817',
      type: 'Feature',
      place_type: ['poi'],
      relevance: 1,
      properties: {
        foursquare: '5211f3fa498ee02d2d494948',
        landmark: true,
        address: '76 Southampton Row',
        category: 'sandwich, fast food',
      },
      text: 'Greggs',
      place_name:
        'Greggs, 76 Southampton Row, London, England WC1B 5HP, United Kingdom',
      center: [-0.121885, 51.51964],
      geometry: { coordinates: [-0.121885, 51.51964], type: 'Point' },
      context: [
        { id: 'neighborhood.22441039', text: 'Holborn' },
        { id: 'postcode.13543968335', text: 'WC1B 5HP' },
        { id: 'locality.31525455', text: 'Camden' },
        { id: 'place.6957135', wikidata: 'Q84', text: 'London' },
        { id: 'district.591439', wikidata: 'Q23306', text: 'Greater London' },
        {
          id: 'region.9295',
          short_code: 'GB-ENG',
          wikidata: 'Q21',
          text: 'England',
        },
        {
          id: 'country.8783',
          short_code: 'gb',
          wikidata: 'Q145',
          text: 'United Kingdom',
        },
      ],
    },
  ],
  attribution:
    'NOTICE: © 2022 Mapbox and its suppliers. All rights reserved. Use of this data is subject to the Mapbox Terms of Service (https://www.mapbox.com/about/maps/). This response and the information it contains may not be retained. POI(s) provided by Foursquare.',
};
