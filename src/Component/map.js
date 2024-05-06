import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoibW9vdGV6ZmFyd2EiLCJhIjoiY2x1Z3BoaTFqMW9hdjJpcGdibnN1djB5cyJ9.It7emRJnE-Ee59ysZKBOJw';

const Map = ({ selectedLocationCoordinates }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [0, 0], // Default center
      zoom: 4 // Default zoom
    });

    mapRef.current = map;

    // Add navigation controls
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    return () => map.remove(); // Clean up map instance on unmount
  }, []);

  useEffect(() => {
    if (selectedLocationCoordinates) {
      console.log('Selected Location Coordinates:', selectedLocationCoordinates);
      // Ensure mapRef is available before adding the marker
      if (mapRef.current) {
        // Set map center and zoom level to the selected coordinates with easing
        mapRef.current.flyTo({ center: selectedLocationCoordinates, zoom: 10, easing: (t) => t });

        // Wait for the map to finish moving
        mapRef.current.once('moveend', () => {
          // Remove any existing marker
          if (markerRef.current) {
            markerRef.current.remove();
          }

          // Add marker for the selected location
          const marker = new mapboxgl.Marker()
            .setLngLat([selectedLocationCoordinates.longitude, selectedLocationCoordinates.latitude])
            .addTo(mapRef.current);
          markerRef.current = marker;
          console.log('Longitude:', selectedLocationCoordinates.longitude);
          console.log('Latitude:', selectedLocationCoordinates.latitude);
        });
      } else {
        console.error('Map reference is not available.');
      }
    } else {
      console.error('Invalid coordinates: Longitude and latitude must be provided');
    }


  }, [selectedLocationCoordinates]);



  return <div ref={mapContainerRef} style={{ width: '100vw', height: '100vh' }} />;
};

export default Map;
