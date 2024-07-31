import React, { useEffect, useRef, useState } from 'react';
import mapboxgl, { Popup } from 'mapbox-gl';
import { states } from '../States/states';

import 'mapbox-gl/dist/mapbox-gl.css';
import { Tooltip } from '@mui/material';


const Dashboard = () => {
    const mapContainerRef = useRef();
    const mapRef = useRef();
    const [lng, setLng] = useState(-90.9);
    const [lat, setLat] = useState(34.35);
    const [zoom, setZoom] = useState(4);

    useEffect(() => {
        // mapboxgl.accessToken = `${process.env.REACT_APP_ACCESS_TOKEN_PUBLIC}`;
        mapboxgl.accessToken = 'pk.eyJ1IjoiYWRpdHlhMTcyOHJhbmEiLCJhIjoiY2trMjBrYmFoMHd4cjJwcnUzdDJqamVtYiJ9.Lj7AXin1doWxeTUKtmXXmg';
        if (mapRef.current) return; // initialize map only once
        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/light-v11',
            center: [lng, lat],
            zoom: zoom
        });

        const getcorrds = states.map(data=> data.geometry);

        // console.log(getcorrds);

        mapRef.current.on('load', () => {
            
            states.forEach((data,key)=>{
           

            mapRef.current.addSource('state'+key, {
              type: 'geojson',
              data: {
                type: 'Feature',
                geometry: {
                  type: 'Polygon',
                  // These coordinates outline state.
                  coordinates: data.geometry
                },
                properties: {
                    description:
                    `<h2> ${data?.description?.name}</h2>
                    <p>Capital: ${data?.description?.capital} </p>
                    <p>Population: ${data?.description?.population} <p>
                    <p>Length: ${data?.description?.dimensions?.length} </p>
                    <p>Width: ${data?.description?.dimensions?.width} </p>
                    `
                  },
              }
            });
            mapRef.current.addLayer({
                id: 'state'+key,
                type: 'fill',
                source: 'state'+key,
                layout: {},
                paint: {
                    'fill-color': '#0080ff',
                    'fill-opacity': 0.5
                }
            });
            mapRef.current.addLayer({
                id: 'outline'+key,
                type: 'line',
                source: 'state'+key,
                layout: {},
                paint: {
                    'line-color': '#000',
                    'line-width': 3
                }
            });


      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
      });
            mapRef.current.on('mouseenter','state'+key, (e)=>{
                // console.log(e);
                // console.log(mapRef.current.getCanvas());
                const coordinates = e.features[0].geometry.coordinates.slice();
                const description = e.features[0].properties.description;
        
                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                  coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }

                // console.log(coordinates[0]);
        
                popup.setLngLat(e?.lngLat).setHTML(description).setMaxWidth('200px') .addTo(mapRef.current);
            });


      mapRef.current.on('mouseleave', 'state'+key, () => {
        mapRef.current.getCanvas().style.cursor = '';
        popup.remove();
      });

            

            }); // loop ends

        });

        


    }, []);
    return (
        <>
            <div id="map" ref={mapContainerRef}
                style={{
                    position: 'fixed',
                    top: 70,
                    bottom: 0,
                    width: '100%',
                    height: '100%',
                }} />
              
        </>
    )
};

export default Dashboard;