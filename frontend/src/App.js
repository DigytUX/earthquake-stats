import React, {
  useState, 
  useMemo, 
  useEffect
} from 'react'
import './App.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import EarthquakeMap from './components/EarthquakeMap';

function App() {
  return (
    <>
      <EarthquakeMap style={{width:'100vw', height:'100vh'}} />
    </>
  )
}
     
export default App;