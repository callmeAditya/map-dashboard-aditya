import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { states } from '../States/states';

import 'mapbox-gl/dist/mapbox-gl.css';

const mapdata = [{
    "id" : "0400000US04",
    "name" : "Arizona",
    "CENSUSAREA": 50645.326000,
    "geometry":[
        [
            [-67.13734, 45.13745],
            [-66.96466, 44.8097],
            [-68.03252, 44.3252],
            [-69.06, 43.98],
            [-70.11617, 43.68405],
            [-70.64573, 43.09008],
            [-70.75102, 43.08003],
            [-70.79761, 43.21973],
            [-70.98176, 43.36789],
            [-70.94416, 43.46633],
            [-71.08482, 45.30524],
            [-70.66002, 45.46022],
            [-70.30495, 45.91479],
            [-70.00014, 46.69317],
            [-69.23708, 47.44777],
            [-68.90478, 47.18479],
            [-68.2343, 47.35462],
            [-67.79035, 47.06624],
            [-67.79141, 45.70258],
            [-67.13734, 45.13745]
        ]
    ]
}];

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

        console.log(getcorrds);

        mapRef.current.on('load', () => {
            
            states.forEach((data,key)=>{
           

            mapRef.current.addSource('maine'+key, {
              type: 'geojson',
              data: {
                type: 'Feature',
                geometry: {
                  type: 'Polygon',
                  // These coordinates outline Maine.
                  coordinates: data.geometry
                //   coordinates: [
                //     [
                //       [-67.13734, 45.13745],
                //       [-66.96466, 44.8097],
                //       [-68.03252, 44.3252],
                //       [-69.06, 43.98],
                //       [-70.11617, 43.68405],
                //       [-70.64573, 43.09008],
                //       [-70.75102, 43.08003],
                //       [-70.79761, 43.21973],
                //       [-70.98176, 43.36789],
                //       [-70.94416, 43.46633],
                //       [-71.08482, 45.30524],
                //       [-70.66002, 45.46022],
                //       [-70.30495, 45.91479],
                //       [-70.00014, 46.69317],
                //       [-69.23708, 47.44777],
                //       [-68.90478, 47.18479],
                //       [-68.2343, 47.35462],
                //       [-67.79035, 47.06624],
                //       [-67.79141, 45.70258],
                //       [-67.13734, 45.13745]
                //     ]
                //   ]
                }
              }
            });
            mapRef.current.addLayer({
                id: 'maine'+key,
                type: 'fill',
                source: 'maine'+key,
                layout: {},
                paint: {
                    'fill-color': '#0080ff',
                    'fill-opacity': 0.5
                }
            });
            mapRef.current.addLayer({
                id: 'outline'+key,
                type: 'line',
                source: 'maine'+key,
                layout: {},
                paint: {
                    'line-color': '#000',
                    'line-width': 3
                }
            });

            });

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