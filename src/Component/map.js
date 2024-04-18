import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

// Replace 'YOUR_ACCESS_TOKEN' with your actual Mapbox access token
mapboxgl.accessToken = 'pk.eyJ1IjoibW9vdGV6ZmFyd2EiLCJhIjoiY2x1Z3BoaTFqMW9hdjJpcGdibnN1djB5cyJ9.It7emRJnE-Ee59ysZKBOJw';

function Map({ selectedCountry }) {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [0, 0],
      zoom: 2,
    });

    // Add a marker based on the selected country
    const marker = new mapboxgl.Marker();

    if (selectedCountry) {
      // Fetch the coordinates of the selected country
      fetch(`https://restcountries.com/v3.1/name/${selectedCountry}`)
        .then((response) => response.json())
        .then((data) => {
          const countryData = data[0];
          const lat = countryData.latlng[0];
          const lng = countryData.latlng[1];

          // Set the map center and add a marker at the selected country's coordinates
          map.setCenter([lng, lat]);
          marker.setLngLat([lng, lat]).addTo(map);
        })
        .catch((error) => console.error('Error fetching country data:', error));
    }

    return () => {
      map.remove();
    };
  }, [selectedCountry]);

  return <div ref={mapContainerRef} style={{ width: '100vw', height: '100vh' }} />;
}

export default Map;