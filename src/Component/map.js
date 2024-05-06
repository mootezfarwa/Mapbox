import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoibW9vdGV6ZmFyd2EiLCJhIjoiY2x1Z3BoaTFqMW9hdjJpcGdibnN1djB5cyJ9.It7emRJnE-Ee59ysZKBOJw';

const Map = ({ rAndDLocation }) => {
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);

    useEffect(() => {
      const map = new mapboxgl.Map({
          container: mapContainerRef.current,
          style: 'mapbox://styles/mapbox/streets-v11',
          center: [10.1815, 36.8065], // Default center (Tunis, Tunisia)
          zoom: 10 // Default zoom level
      });
  
      mapRef.current = map;
  
      // Add a marker for R&D location if provided
      if (rAndDLocation) {
          // Log the location here
          console.log('R&D Location:', rAndDLocation);
  
          // Extract coordinates based on the type of location data
          let coordinates;
          if (typeof rAndDLocation === 'string') {
              // Assume rAndDLocation is a string in the format "longitude,latitude"
              const [longitude, latitude] = rAndDLocation.split(',').map(parseFloat);
              if (!isNaN(longitude) && !isNaN(latitude)) {
                  coordinates = [longitude, latitude];
              }
          } else if (rAndDLocation.geometry && rAndDLocation.geometry.coordinates) {
              // Assume rAndDLocation is a GeoJSON feature
              const [longitude, latitude] = rAndDLocation.geometry.coordinates;
              if (!isNaN(longitude) && !isNaN(latitude)) {
                  coordinates = [longitude, latitude];
              }
          }
  
          if (coordinates) {
              // Accessing latitude and longitude here
              const [longitude, latitude] = coordinates;
              // Use longitude and latitude as needed
  
              new mapboxgl.Marker()
                  .setLngLat(coordinates)
                  .addTo(map);
              // Center the map on the marker
              map.setCenter(coordinates);
          }
      }
  
      return () => map.remove(); // Clean up map instance on unmount
  }, [rAndDLocation]); // Re-render the map when the R&D location changes
  
  
  

    return <div ref={mapContainerRef} style={{ width: '100vw', height: '100vh' }} />;
};

export default Map;