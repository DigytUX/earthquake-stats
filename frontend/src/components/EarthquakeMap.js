  import React, {
    useState, 
    useMemo, 
    useEffect,
    useCallback,
    useRef
  } from 'react'
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
  import Pin from './Pin'
  
  function EarthquakeMap({earthquakData}) {
    const mounted = useRef(false)
    const [loading, isLoading] = useState(true)
    const [popupInfo, setPopupInfo] = useState(null);
    const [data, setData] = useState([])
    const MAPBOX_TOKEN = process.env.API_KEY

    const fetchData = async () => {
      isLoading(true)
      const response = await axios.get('http://localhost:8080/')
      console.log('response', response.data.data)
      setData(response.data.data)
      isLoading(false)
    }

    useEffect(() => {
      mounted.current = true
      if(mounted.current) fetchData()
      return () => mounted.current = false
    },[])

    // const pins = () => 
    //     data.map((city, index) => (
    //       <Marker
    //         key={`marker-${index}`}
    //         longitude={parseInt(city.longitude)}
    //         latitude={parseInt(city.latitude)}
    //         anchor="bottom"
    //         onClick={e => {
    //           e.originalEvent.stopPropagation();
    //           setPopupInfo(city);
    //         }}
    //       >
    //         <Pin />
    //       </Marker>
    //     ))

    if(!data.length > 0 || loading ) return <p>Loading...</p>
    
    return (
      <>
        {data.length > 0 && (
          <Map
            initialViewState={{
              longitude: -118.2437,
              latitude: 34.0522, 
              zoom: 4
            }}
            style={{width:'50%', height:'100vh'}}
            mapStyle="mapbox://styles/mapbox/dark-v10"
            mapboxAccessToken={MAPBOX_TOKEN}
          >{data.map((city, index) => (
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
          ))}</Map>
        )}
      </>
    )
  }
       
  export default EarthquakeMap;