/* tslint:disable */
import L,{ Map,LayerGroup} from 'leaflet'
import React, { useEffect,useRef } from 'react';
import {processCsvData} from 'kepler.gl';
import {select,geoTransform,geoPath,json,scaleSequential,interpolateSpectral,schemeSpectral} from 'd3'
import './Leaflet.css'

interface ContainerProps1 {
    mapRef:any
    center:[number,number]
    zoom:number
}

interface ContainerProps2 {
    entries:any
}

interface ContainerProps3 {
    data:string
}

interface input{
    fields:object[]
    rows:[[number,string,string,number,number,number,number,number,number,number,number,number]]
}

export const LeafletMap:React.FC<ContainerProps1>=({mapRef,center,zoom})=>{

    useEffect(()=>{
        if(mapRef.current){
            mapRef.current.remove()
        }
        mapRef.current = L.map('mapid').setView(center, zoom);
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token='+process.env.REACT_APP_MAPBOX_TOKEN, {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: process.env.REACT_APP_MAPBOX_TOKEN
        }).addTo(mapRef.current);

        // let timer = 0
        // let prevent = false
        // mapRef.current.on('click', function(e:any) {
        //      timer = setTimeout(function() {
        //       if (!prevent) {
        //         onMapClick(e)
        //       }
        //       prevent = false;
        //     }, 200);
        //   })
        //   .on("dblclick", function() {
        //     clearTimeout(timer);
        //     prevent = true;
        //     // doDoubleClickAction();
        //   });
    //     mapRef.current.on('locationfound', onLocationFound);
    //     mapRef.current.on('locationerror', onLocationError);
     },)

    // function onMapClick(e:any) {
    //     var popup = L.popup();
    //     popup
    //     .setLatLng(e.latlng)
    //     .setContent("You clicked the map at " + e.latlng.toString())
    //     .openOn(mapRef.current as Map);
    // }

    // function onLocationFound(e:any) {
    //         var radius = e.accuracy;
        
    //         L.marker(e.latlng).addTo(mapRef.current as Map)
    //             .bindPopup("You are within " + radius + " meters from this point").openPopup();
        
    //         L.circle(e.latlng, radius).addTo(mapRef.current as Map);
    //     }
    
    // function onLocationError(e:any) {
    //         alert(e.message);
    //     }

    return <div id="mapid"></div>
}

export const Leaflet1:React.FC=()=>{
   
    const mapRef = useRef<Map|null>(null);
    useEffect(() => {
        async function showLBAreas(){
        const LongBeach:any = await json('/data/LongBeach.json')
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
            .data(LongBeach.features)
            .enter()
            .append('path')
            .attr('fill-opacity', 0.2)
            .attr('stroke', 'black')
            .attr('stroke-width', 1.5)
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
        showLBAreas()
    }
    );
    return <LeafletMap mapRef={mapRef} center={[33.797548, -118.16346]} zoom={12}></LeafletMap>
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
    return <LeafletMap mapRef={mapRef} center={[40.718584, -73.964572]} zoom={13}></LeafletMap>
}


export const Leaflet3:React.FC<ContainerProps2>=({entries})=>{
    const mapRef = useRef<Map|null>(null);
    useEffect(()=>{
        const mapContainer = select('#mapid')
        const svg1=mapContainer.append('svg').attr('class','legend leaflet-top leaflet-right').attr('width',200).attr('height',30)
        let defs = svg1.append("defs")
        let linearGradient = defs.append("linearGradient")
                                .attr("id", "linear-gradient")
                                .attr("x1", "0%")
                                .attr("y1", "0%")
                                .attr("x2", "100%")
                                .attr("y2", "0%");
        //Append multiple color stops by using D3's data/enter step
        linearGradient.selectAll("stop")
        .data(schemeSpectral[11] as any)
        .enter().append("stop")
        .attr("offset", function(d,i) { return `${i*0.1}` })
        .attr("stop-color", function(d:any) { return d });
            
        svg1.append('rect')
        .attr('width',200)
        .attr('height',20)
        .attr('fill',"url(#linear-gradient)")
    })
    useEffect(() => {
            if(mapRef.current){
                L.svg().addTo(mapRef.current)
                const overlay = select(mapRef.current.getPanes().overlayPane)
                const svg = overlay.select('svg').attr("pointer-events", "auto")
                const g = svg.append('g').attr('class', 'leaflet-zoom-hide')

                let div =  select("body").append("div")	
                            .attr("class", "tooltip")				
                            .style("opacity", 0);
                let color = scaleSequential(interpolateSpectral)
                        
                let Dots = g.selectAll('circle')
                                .data(entries)
                                .join('circle')
                                .attr("cx", (d:any) => mapRef.current!.latLngToLayerPoint(JSON.parse(d.key)).x)
                                .attr("cy", (d:any) => mapRef.current!.latLngToLayerPoint(JSON.parse(d.key)).y) 
                                .attr("class", "points")
                                .attr("data",(d:any)=>d.values[0].Percentage_of_renting)
                                .attr("fill", (d:any)=> color(d.values[0].business_final_score_percentile)) 
                                .attr("stroke", "black")
                                .attr("r", 5)
                                .on('mouseover', function(e:any,d:any) { //function to add mouseover event
                                    select(this).transition() //D3 selects the object we have moused over in order to perform operations on it
                                      .duration(150) //how long we are transitioning between the two states (works like keyframes)
                                      .attr("fill", "red") //change the fill
                                      .attr('r', 10) //change radius
                                    div.transition()		
                                      .duration(200)		
                                      .style("opacity", .9)
                                    div.html(`<h6>Name: ${d.values[0].name_only}</h6>`+
                                             `<h6>Address: ${d.values[0].address_only}</h6>`+
                                             `<p>Estimate median household income: ${d.values[0].Estimate_Median_household_income}</p>`+
                                             `<p>Estimate total income: ${d.values[0].Estimate_Total_Income}</p>`+
                                             `<p>Estimate total eligible to work: ${d.values[0].Estimate_Total_eligible_to_work}</p>`+
                                             `<p>Estimate total mortgage units: ${d.values[0].Estimate_Total_mortgage_units}</p>`+
                                             `<p>Median housing value: ${d.values[0].Median_Housing_Value}</p>`+
                                             `<p>Estimate total rent: ${d.values[0].Estimate_Total_rent}</p>`+
                                             `<p>Percentage of renting: ${d.values[0].Percentage_of_renting}</p>`)
                                      .style("left", (e.pageX) + "px")		
                                      .style("top", (e.pageY - 28) + "px");	
                                      
                                  })
                                  .on('mouseout', function() { //reverse the action based on when we mouse off the the circle
                                    select(this).transition()
                                      .duration(150)
                                      .attr("fill", (d:any)=> color(d.values[0].business_final_score_percentile))
                                      .attr('r', 5)
                                      div.transition()		
                                        .duration(500)		
                                        .style("opacity", 0);	
                                  });
                const update = () => Dots
                .attr("cx", (d:any) => mapRef.current!.latLngToLayerPoint(JSON.parse(d.key)).x)
                .attr("cy", (d:any) => mapRef.current!.latLngToLayerPoint(JSON.parse(d.key)).y) 
          
                if(mapRef.current)
                mapRef.current.on("zoomend", update)
        }
       
    },);
    return <LeafletMap mapRef={mapRef} center={[33.797548, -118.16346]} zoom={11}></LeafletMap>
}


export const Leaflet4:React.FC=()=>{
    const mapRef = useRef<Map|null>(null);
    const layerRef = useRef<LayerGroup|null>(null);
    useEffect(() => {
        layerRef.current = L.layerGroup().addTo(mapRef.current as Map)
    }
    );
    useEffect(()=>{
        async function showDMV(){
        const DMV:any = await json('/data/DMV.json')
        DMV.data.geoSearch.forEach((row:any) => {
            L.marker([row.latitude,row.longitude]).addTo(
                layerRef.current as LayerGroup
            ).bindPopup(()=>{return `<h5>Address: ${row.address.addressLine1}</h5>
            <h5>State:${row.address.stateCode}</h5><h5>Phone${row.phoneNumber}</h5>
            <h5>Postal:${row.address.postalCode}</h5><h5>City:${row.address.city}</h5>`})
        });}
        showDMV()

    })
    return <LeafletMap mapRef={mapRef} center={[38.89511, -77.03637]} zoom={13}></LeafletMap>
}