import React, {useState, useMemo} from 'react'
import './App.css';
import Map, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl
} from 'react-map-gl';

import 'mapbox-gl/dist/mapbox-gl.css';
import axios from 'axios'
import CITIES from '../src/data/cities.json'
import Pin from './components/Pin'

function App() {
  const [popupInfo, setPopupInfo] = useState(null);
  const [data, setData] = useState(null)

  const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN

  const options = {
    method: 'GET',
    url: 'https://everyearthquake.p.rapidapi.com/earthquakes',
    params: {
      start: '1',
      count: '100',
      type: 'earthquake',
      latitude: '33.962523',
      longitude: '-118.3706975',
      radius: '1000',
      units: 'miles',
      magnitude: '3',
      intensity: '1'
    },
    headers: {
      'X-RapidAPI-Key': process.env.REACT_APP_X_RapidAPI_Key,
      'X-RapidAPI-Host':process.env.REACT_APP_X_RapidAPI_Host
    }
  };

  const memoizedValue = useMemo(() => 
    axios
    .request(options)
    .then(function (response) {
      setData(response.data)
    })
    .catch(function (error) {
      console.error(error);
    }),[options]
  );

  console.log(',', memoizedValue)

  const pins = useMemo(
  () => 
    CITIES.map((city, index) => (
      <Marker
          key={`marker-${index}`}
          longitude={city.longitude}
          latitude={city.latitude}
          anchor="bottom"
          onClick={e => {
            // If we let the click event propagates to the map, it will immediately close the popup
            // with `closeOnClick: true`
            e.originalEvent.stopPropagation();
            setPopupInfo(city);
          }}
        >
          <Pin />
        </Marker>
      )),
    []
  )

 if(data){
  return (
    <>
    <h1>{data && 'We have data!'}</h1>
      <Map
        initialViewState={{
          longitude: -122.4,
          latitude: 37.8,
          zoom: 14
        }}
        style={{width:'100vw', height:'100vh'}}
        mapStyle="mapbox://styles/mapbox/dark-v10"
        mapboxAccessToken={MAPBOX_TOKEN}
      >
      {pins}
      </Map>
    </>
  );
 }
}

export default App;
