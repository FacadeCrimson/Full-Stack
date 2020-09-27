import React,{useEffect,useRef} from 'react'
import {select,csv,axisBottom, scaleLinear, axisLeft,line, curveBasis, mean} from 'd3'
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';

interface ContainerProps{
    height:number
    width:number
}
export const DensityGraph:React.FC<ContainerProps>=({height,width})=>{
    let svg=useRef<any>(null)
    useEffect(()=>{
    // append the svg object to the body of the page
    if(select("svg")){
        select("svg").remove()
    }
    svg.current = select("#my_dataviz")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform",
    "translate(" + 0 + "," + 0 + ")");
    })

    useEffect(()=>{
    // get the data
    csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/1_OneNum.csv").then(function(data:any) {
    // add the x Axis
    var x = scaleLinear()
            .domain([0, 1000])
            .range([0, width]);
    svg.current.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(axisBottom(x));

    // add the y Axis
    var y = scaleLinear()
            .range([height, 0])
            .domain([0, 0.01]);
    svg.current.append("g")
    .call(axisLeft(y));

    // Compute kernel density estimation
    var kde = kernelDensityEstimator(kernelEpanechnikov(7), x.ticks(40))
    
    var density =  kde(data.map(function(d:any){  return d.price; }))
   
    // Plot the area
    svg.current.append("path")
    .attr("class", "mypath")
    .datum(density)
    .attr("fill", "#69b3a2")
    .attr("opacity", ".8")
    .attr("stroke", "#000")
    .attr("stroke-width", 1)
    .attr("stroke-linejoin", "round")
    .attr("d", line()
        .curve(curveBasis)
        .x(function(d) { return x(d[0]); })
        .y(function(d) { return y(d[1]); })
    );
    });
    
    },[width,height])
    return   <div id="my_dataviz"></div>


}

export const GraphWrapper:React.FC=()=>{
    return <AutoSizer>
    {({height, width}:any) => (
        <DensityGraph height={height} width={width}></DensityGraph>
    )}</AutoSizer>
}


// Function to compute density
function kernelDensityEstimator(kernel:any, X:any) {
    return function(V:any) {
    return X.map(function(x:any) {
    return [x, mean(V, function(v:any) { return kernel(x - v); })];
    });};}
function kernelEpanechnikov(k:any) {
    return function(v:any) {
    return Math.abs(v /= k) <= 1 ? 0.75 * (1 - v * v) / k : 0;
};}