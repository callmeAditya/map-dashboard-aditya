import React, { useEffect, useRef, useState } from 'react';
import mapboxgl, { Popup } from 'mapbox-gl';
import { states } from '../States/states';

import 'mapbox-gl/dist/mapbox-gl.css';
import { Tooltip } from '@mui/material';


const Dashboard = ({visibility, slider, state}) => {
    const mapContainerRef = useRef();
    const mapRef = useRef();
    const [lng, setLng] = useState(-90.9);
    const [lat, setLat] = useState(34.35);
    const [zoom, setZoom] = useState(4);
    const [mapLoaded, setMapLoaded] = useState(false);


    useEffect(() => {
        // mapboxgl.accessToken = `${process.env.REACT_APP_ACCESS_TOKEN_PUBLIC}`;
       console.log('my visi',visibility);
       
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
            setMapLoaded(true);
            states.forEach((data,key)=>{
           

            mapRef.current.addSource(data?.name, {
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
                    <p>${visibility} </p>
                    `
                  },
              }
            });
            mapRef.current.addLayer({
                id: data?.name,
                type: visibility == 'none' ? 'none' : 'fill',
                source: data?.name,
                layout: {},
                paint: {
                    'fill-color': '#0080ff',
                    'fill-opacity': 0.5
                }
            });
            mapRef.current.addLayer({
                id: 'outline'+key,
                type: 'line',
                source: data?.name,
                layout: {},
                paint: {
                    'line-color': '#000',
                    'line-width': 2
                }
            });


      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
      });
            mapRef.current.on('mouseenter',data?.name, (e)=>{
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


      mapRef.current.on('mouseleave', data?.name, () => {
        mapRef.current.getCanvas().style.cursor = '';
        popup.remove();
      });

            

            }); // loop ends

        });

        


    }, []);

    useEffect(()=>{
        if(!mapLoaded) return;
        if(mapRef && mapRef?.current && state == 'All'){
            states.forEach((data, key)=>{
                mapRef?.current?.setLayoutProperty(data?.name,'visibility', visibility);
                mapRef?.current?.setPaintProperty(data?.name,'fill-opacity', slider/100);
            })
    }

    else{
        states.forEach((data, key)=>{
            if(data?.name == state){
            mapRef?.current?.setLayoutProperty(data?.name,'visibility', visibility);
            mapRef?.current?.setPaintProperty(data?.name,'fill-opacity', slider/100);

        }
            else{
            mapRef?.current?.setLayoutProperty(data?.name,'visibility', 'visible');

            mapRef?.current?.setPaintProperty(data?.name,'fill-opacity', 1);
            }
            // mapRef?.current?.setPaintProperty(data?.name,'line-color', "#fff");
        })
    }

    },[visibility, slider, state])
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