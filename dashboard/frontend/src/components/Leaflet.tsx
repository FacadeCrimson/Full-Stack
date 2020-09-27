import L,{ LayerGroup, Map} from 'leaflet'
import React, { useEffect,useRef } from 'react';
import {markerData} from '../pages/Dashboard'
import {processCsvData} from 'kepler.gl';

interface ContainerProps1 {
    mapRef:any
    center:[number,number]
}

interface ContainerProps2 {
    markersData: markerData[]
}

interface ContainerProps3 {
    data:string
}

interface input{
    fields:object[]
    rows:[[number,string,string,number,number,number,number,number,number,number,number,number]]
}

export const LeafletMap:React.FC<ContainerProps1>=({mapRef,center})=>{

    useEffect(()=>{
        if(mapRef.current){
            mapRef.current.remove()
        }
        mapRef.current = L.map('mapid').setView(center, 13);
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token='+process.env.REACT_APP_MAPBOX_TOKEN, {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: process.env.REACT_APP_MAPBOX_TOKEN
        }).addTo(mapRef.current);

        mapRef.current.on('click', onMapClick);
        mapRef.current.on('locationfound', onLocationFound);
        mapRef.current.on('locationerror', onLocationError);
    },)

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

    function onMapClick(e:any) {
        var popup = L.popup();
        popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(mapRef.current as Map);
    }

    function onLocationFound(e:any) {
            var radius = e.accuracy;
        
            L.marker(e.latlng).addTo(mapRef.current as Map)
                .bindPopup("You are within " + radius + " meters from this point").openPopup();
        
            L.circle(e.latlng, radius).addTo(mapRef.current as Map);
        }
    
    function onLocationError(e:any) {
            alert(e.message);
        }

    return <div id="mapid">
            
            </div>
}

export const Leaflet1:React.FC<ContainerProps2>=({markersData})=>{
    const mapRef = useRef<Map|null>(null);
    const layerRef = useRef<LayerGroup|null>(null);
    useEffect(() => {
    layerRef.current = L.layerGroup().addTo(mapRef.current as Map);
    });

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
    },);

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
    },);
    return <LeafletMap mapRef={mapRef} center={[51.505, -0.09]}></LeafletMap>
}

export const Leaflet2:React.FC<ContainerProps3>=({data})=>{
    const mapRef = useRef<Map|null>(null);
    const csv = processCsvData(data) as input;
    useEffect(
    () => {
        var myRenderer = L.canvas({ padding: 0.5 });
        csv.rows.forEach(marker => {
        L.circleMarker([marker[6],marker[5]], { renderer: myRenderer,color: '#3388ff' }).addTo(
        mapRef.current as Map
        );
    });
    }, );
    return <LeafletMap mapRef={mapRef} center={[40.718584, -73.964572]}></LeafletMap>
}