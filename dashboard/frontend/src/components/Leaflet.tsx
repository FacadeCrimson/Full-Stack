/* tslint:disable */
import L,{ Map,LayerGroup} from 'leaflet'
import React, { useEffect,useRef,useMemo } from 'react';
import {select,geoTransform,geoPath,json,scaleSequential,interpolateSpectral,schemeSpectral,scaleLinear} from 'd3'
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

export const Leaflet3:React.FC<ContainerProps2>=({entries})=>{
    const mapRef = useRef<Map|null>(null);
    const ticks = useMemo(() => {
        const xScale = scaleLinear()
          .domain([0, 1])
          .range([0, 200])
        return xScale.ticks()
          .map(value => ({
            value,
            xOffset: xScale(value)
          }))
      }, [])
    useEffect(()=>{
        const mapContainer = select('#mapid')
        const svg1=mapContainer.append('svg').attr('class','legend leaflet-top leaflet-right').attr('width',220).attr('height',40).attr('id',"")
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
        .attr('width',220)
        .attr('height',40)
        .attr('fill',"white")
        .style("opacity", 0.9)
        .attr('transform',`translate(0,0)`)

        svg1.append('rect')
        .attr('width',200)
        .attr('height',20)
        .attr('z-index',5)
        .attr('fill',"url(#linear-gradient)")
        .attr('transform',`translate(10, 0)`)

        svg1.append('text')
        .text('Business Score Percentile')
        .attr('transform',`translate(25, 35)`)
        .attr('font-size','15px')

        for(let { value, xOffset }  of ticks){
            let element = svg1.append('g').attr('key',value).attr('transform',`translate(${xOffset+10}, 0)`)
            element.append('line').attr('y2','6').attr('stroke','black')
            element.append('text').attr('key',value).attr('font-size','10px').attr('text-anchor','middle').attr('transform',`translate(0, 20)`).text(value)
        }
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
                                      .attr('r', 10) //change radius
                                    div.transition()		
                                      .duration(200)		
                                      .style("opacity", .9)
                                    div.html(`<p><b>Name: ${d.values[0].name_only}</b></p>`+
                                             `<p><b>Address: ${d.values[0].address_only}</b></p>`+
                                             `<p><i>Most important: ${d.values[0].Census_1}, ${d.values[0].Census_2}</i><p>`+
                                             (d.values[0].Estimate_Median_household_income?`<p>Estimate median household income: ${d.values[0].Estimate_Median_household_income}</p>`+
                                             `<svg height=10 width=280 class="tooltipgraph"><rect height=10 width=${xScale1(d.values[0].Estimate_Median_household_income)} fill="black"></rect></svg>`:
                                             '<p>No estimate median household income data.</p>')+
                                             (d.values[0].Estimate_Total_Income?`<p>Estimate total income: ${d.values[0].Estimate_Total_Income}</p>`+
                                             `<svg height=10 width=280 class="tooltipgraph"><rect height=10 width=${xScale2(d.values[0].Estimate_Total_Income)} fill="black"></rect></svg>`:
                                             '<p>No estimate total income data.</p>')+
                                             (d.values[0].Estimate_Total_eligible_to_work?`<p>Estimate total eligible to work: ${d.values[0].Estimate_Total_eligible_to_work}</p>`+
                                             `<svg height=10 width=280 class="tooltipgraph"><rect height=10 width=${xScale3(d.values[0].Estimate_Total_eligible_to_work)} fill="black"></rect></svg>`:
                                             '<p>No estimate total elegible to work data.</p>')+
                                             (d.values[0].Estimate_Total_mortgage_units?`<p>Estimate total mortgage units: ${d.values[0].Estimate_Total_mortgage_units}</p>`+
                                             `<svg height=10 width=280 class="tooltipgraph"><rect height=10 width=${xScale4(d.values[0].Estimate_Total_mortgage_units)} fill="black"></rect></svg>`:
                                             '<p>No estimate total mortgage units data.</p>')+
                                             (d.values[0].Median_Housing_Value?`<p>Median housing value: ${d.values[0].Median_Housing_Value}</p>`+
                                             `<svg height=10 width=280 class="tooltipgraph"><rect height=10 width=${xScale5(d.values[0].Median_Housing_Value)} fill="black"></rect></svg>`:
                                             '<p>No median housing value data.</p>')+
                                             (d.values[0].Estimate_Total_rent?`<p>Estimate total rent: ${d.values[0].Estimate_Total_rent}</p>`+
                                             `<svg height=10 width=280 class="tooltipgraph"><rect height=10 width=${xScale6(d.values[0].Estimate_Total_rent)} fill="black"></rect></svg>`:
                                             '<p>No estimate total rent data.</p>')+
                                             (d.values[0].Percentage_of_renting?`<p>Percentage of renting: ${d.values[0].Percentage_of_renting}</p>`+
                                             `<svg height=10 width=280 class="tooltipgraph"><rect height=10 width=${xScale7(parseInt(d.values[0].Percentage_of_renting))} fill="black"></rect></svg>`:
                                             '<p>No percentage of renting data.</p>'))
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

const xScale1 = scaleLinear()
.domain([0, 182250])
.range([0, 280])
const xScale2 = scaleLinear()
.domain([0, 3685])
.range([0, 280])
const xScale3 = scaleLinear()
.domain([0, 2821])
.range([0, 280])
const xScale4 = scaleLinear()
.domain([0, 1063])
.range([0, 280])
const xScale5 = scaleLinear()
.domain([0, 1466200])
.range([0, 280])
const xScale6 = scaleLinear()
.domain([0, 1254])
.range([0, 280])
const xScale7 = scaleLinear()
.domain([0, 100])
.range([0, 280])