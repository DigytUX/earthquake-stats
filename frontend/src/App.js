import React, {useState, useMemo, useEffect, useCallback} from 'react'
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
  const [loading, isLoading] = useState(true)
  const [popupInfo, setPopupInfo] = useState(null);
  const [data, setData] = useState(null)
  const MAPBOX_TOKEN = 'pk.eyJ1IjoiY2hyaXN0b3BoZXJjbGVtbW9uczIwMjAiLCJhIjoiY2wzN3JtcHowMHNxczNjb3p6cWUzMXVoMSJ9.UnAjwsNqEL0P53xeRrbjUw'

  const loadEarthquakeData = () => {
    isLoading(true)
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
        'X-RapidAPI-Key': '0c569bc259msh607acdabc330e72p169f7cjsnfc26f1a401c5',
        'X-RapidAPI-Host': 'everyearthquake.p.rapidapi.com'
      }
    }
    return axios.request(options).then(function (response) {
      console.log('response.data.data', response.data.data);
      setData(response.data.data)
      isLoading(false)
    }).catch(function (error) {
      console.error(error);
      isLoading(false)
    })
  }

  useEffect(() => {
    loadEarthquakeData()
  }, [])

  const pins = useMemo(
    () => 
      data.map((city, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={parseInt(city.longitude)}
          latitude={parseInt(city.latitude)}
          anchor="bottom"
          onClick={e => {
            e.originalEvent.stopPropagation();
            setPopupInfo(city);
          }}
        >
          <Pin />
        </Marker>
      )),
    []
  )
  
  if(loading) return <p>Loading...</p>
  return (
    <Map
      initialViewState={{
        longitude: -122.4,
        latitude: 37.8,
        zoom: 14
      }}
      style={{width:'100vw', height:'100vh'}}
      mapStyle="mapbox://styles/mapbox/dark-v10"
      mapboxAccessToken={MAPBOX_TOKEN}
    >{pins}</Map>
  )
}
     
export default App;