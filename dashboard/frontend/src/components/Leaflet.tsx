import L,{ Map} from 'leaflet'
import React, { useEffect,useRef } from 'react';
import {markerData} from '../pages/Dashboard'
import {processCsvData} from 'kepler.gl';
import {select,geoTransform,geoPath} from 'd3'
import VanAreas from './data/VancouverAreaSize.json'
import './Leaflet.css'

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

        let timer = 0
        let prevent = false
        mapRef.current.on('click', function(e:any) {
             timer = setTimeout(function() {
              if (!prevent) {
                onMapClick(e)
              }
              prevent = false;
            }, 200);
          })
          .on("dblclick", function() {
            clearTimeout(timer);
            prevent = true;
            // doDoubleClickAction();
          });
        mapRef.current.on('locationfound', onLocationFound);
        mapRef.current.on('locationerror', onLocationError);
    },)

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

    return <div id="mapid"></div>
}

export const Leaflet1:React.FC<ContainerProps2>=({markersData})=>{
    const mapRef = useRef<Map|null>(null);
    useEffect(() => {
        if(mapRef.current){
            L.svg().addTo(mapRef.current)
            //Create selection using D3
            const overlay = select(mapRef.current.getPanes().overlayPane)
            const svg = overlay.select('svg').attr("pointer-events", "auto")
            // create a group that is hidden during zooming
            const g = svg.append('g').attr('class', 'leaflet-zoom-hide')

            // Use Leaflets projection API for drawing svg path (creates a stream of projected points)
            const projectPoint = function(this:any,x:number, y:number){
            if(mapRef.current){
                const point = mapRef.current.latLngToLayerPoint(new L.LatLng(y, x))
                    this.stream.point(point.x, point.y)
                
            }}

            // Use d3's custom geo transform method to implement the above
            const projection = geoTransform({point: projectPoint})
            // creates geopath from projected points (SVG)
            const pathCreator = geoPath().projection(projection)

            const areaPaths = g.selectAll('path')
            .data(VanAreas.features)
            .enter()
            .append('path')
            .attr('fill-opacity', 0.3)
            .attr('stroke', 'black')
            .attr('stroke-width', 2.5)
            .on("mouseover", function(d){
                    select(this).attr("fill", "red")
                })
            .on("mouseout", function(d){
                    select(this).attr("fill", "black")
                })

            // Function to place svg based on zoom
            const onZoom = () => areaPaths.attr('d', pathCreator as any)
            // initialize positioning
            onZoom()
            // reset whenever map is moved
            if(mapRef.current)
            mapRef.current.on('zoomend', onZoom)
        }
    }
    );
    return <LeafletMap mapRef={mapRef} center={[49.2527, -123.1207]}></LeafletMap>
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