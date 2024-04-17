import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

// Replace 'YOUR_ACCESS_TOKEN' with your actual Mapbox access token
mapboxgl.accessToken = 'pk.eyJ1IjoibW9vdGV6ZmFyd2EiLCJhIjoiY2x1Z3BoaTFqMW9hdjJpcGdibnN1djB5cyJ9.It7emRJnE-Ee59ysZKBOJw';

const Map = () => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [0, 0], // [lng, lat]
      zoom: 2
    });

    return () => map.remove(); // Clean up map instance on unmount
  }, []); // Empty dependency array ensures this effect only runs once

  return <div ref={mapContainerRef} style={{ width: '100vw', height: '100vh' }} />;
};

export default Map;