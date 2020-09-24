import L,{ LayerGroup, Map} from 'leaflet'
import React, { useEffect,useRef } from 'react';
import {markerData} from '../pages/Dashboard'

interface ContainerProps {
    markersData: markerData[]
}

export const LeafletMap:React.FC<ContainerProps>=({markersData})=>{
    const mapRef = useRef<Map|null>(null);
    useEffect(()=>{
        mapRef.current = L.map('mapid').setView([51.505, -0.09], 13);
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token='+process.env.REACT_APP_MAPBOX_TOKEN, {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: process.env.REACT_APP_MAPBOX_TOKEN
        }).addTo(mapRef.current);

        L.popup()
        .setLatLng([51.5, -0.09])
        .setContent("I am a standalone popup.")
        .openOn(mapRef.current as Map);

        mapRef.current.on('click', onMapClick);
        mapRef.current.on('locationfound', onLocationFound);
        mapRef.current.on('locationerror', onLocationError);
    },[]
    )

    // const marker = L.marker([51.5, -0.09])
    // const markerRef = useRef<Marker|null>(marker);
    // useEffect(() => {
    //   if (markerRef.current) {
    //     markerRef.current.setLatLng(markerPosition);
    //   } else {
    //     markerRef.current = L.marker(markerPosition).addTo(mapRef.current as Map);
    //   }
    // },
    // [markerPosition]);
   
    const layerRef = useRef<LayerGroup|null>(null);
    useEffect(() => {
      layerRef.current = L.layerGroup().addTo(mapRef.current as Map);
    }, []);

    useEffect(
    () => {
        if(layerRef.current){
            layerRef.current.clearLayers();
        }
        markersData.forEach(marker => {
        L.marker(marker.latLng, { title: marker.title }).addTo(
          layerRef.current as LayerGroup
        );
      });
    },
    [markersData]
  );


    useEffect(
    () => {
        var circle = L.circle([51.508, -0.11], {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: 500
        }).addTo(mapRef.current as Map);
        var polygon = L.polygon([
            [51.509, -0.08],
            [51.503, -0.06],
            [51.51, -0.047]
        ]).addTo(mapRef.current as Map);
        circle.bindPopup("I am a circle.");
        polygon.bindPopup("I am a polygon.");
    },
    []
  );

    function onMapClick(e:any) {
        var popup = L.popup();
        popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(mapRef.current as Map);
    }

    function onLocationFound(e:any) {
            var radius = e.accuracy;
        
            L.marker(e.latlng).addTo(layerRef.current as LayerGroup)
                .bindPopup("You are within " + radius + " meters from this point").openPopup();
        
            L.circle(e.latlng, radius).addTo(layerRef.current as LayerGroup);
        }
    
    function onLocationError(e:any) {
            alert(e.message);
        }
        

    return <div id="mapid">
            
            </div>
}