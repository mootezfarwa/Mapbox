import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';


mapboxgl.accessToken = 'pk.eyJ1IjoibW9vdGV6ZmFyd2EiLCJhIjoiY2x1Z3BoaTFqMW9hdjJpcGdibnN1djB5cyJ9.It7emRJnE-Ee59ysZKBOJw';

const Map = ({ selectedRdLocation, productType,companies }) => {
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
        if (selectedRdLocation) {
            fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(selectedRdLocation)}.json?access_token=${mapboxgl.accessToken}`)
                .then(response => response.json())
                .then(data => {
                    const coordinates = data.features[0].center;

                    // Ensure mapRef is available before adding the marker
                    if (mapRef.current) {
                        // Set map center and zoom level to the selected coordinates with easing
                        mapRef.current.flyTo({ center: coordinates, zoom: 10, easing: (t) => t });

                        // Wait for the map to finish moving
                        mapRef.current.once('moveend', () => {
                            // Add marker for the selected R&D location
                            let marker;
                            if (productType === 'sales') {
                                // Customize marker for sales
                                marker = new mapboxgl.Marker({ color: '#ff0000' }) // Red marker for sales
                                    .setLngLat(coordinates)
                                    .addTo(mapRef.current);
                            } else if (productType === 'chokes') {
                                // Customize marker for choose
                                marker = new mapboxgl.Marker({ color: '#00ff00' }) // Green marker for choose
                                    .setLngLat(coordinates)
                                    .addTo(mapRef.current);
                            } else {
                                // Default marker
                                marker = new mapboxgl.Marker()
                                    .setLngLat(coordinates)
                                    .addTo(mapRef.current);
                            }
                            markerRef.current = marker;
                        });
                    } else {
                        console.error('Map reference is not available.');
                    }
                })
                .catch(error => {
                    console.error('Error geocoding selected location:', error);
                });
        }
    }, [selectedRdLocation, productType]);


    return <div ref={mapContainerRef} style={{ width: '100vw', height: '100vh' }} />;
};

export default Map;
