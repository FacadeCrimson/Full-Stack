import React,{useEffect,useRef} from 'react'
import {select,max,min,csvParse,axisBottom, scaleLinear, axisLeft,line, curveBasis, mean} from 'd3'
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import './D3Graph.css'

interface ContainerProps1{
    height:number
    width:number
    data:string
    rangeValue:any
}

interface ContainerProps2{
    data:string
    rangeValue:any
}


export const DensityGraph:React.FC<ContainerProps1>=({height,width,data,rangeValue})=>{
    const ref = useRef<any>()
    const margin={left:40,bottom:20,top:10}
    const newData= csvParse(data)
    // var dataMax = max(newData, function(d) { return d.passenger_count; });
    // var dataMin = min(newData, function(d) { return d.passenger_count; });

    useEffect(()=>{
        let svg = select(ref.current as SVGSVGElement)
        svg.selectAll("*").remove()
        console.log(rangeValue)
    // get the data
    const processData = (function process() {
    // add the x Axis
    var x = scaleLinear()
            .range([0, width-margin.left])
            .domain([0, 100])      
    svg.append("g")
    .attr("transform", "translate("+margin.left+"," + (height-margin.bottom) + ")")
    .call(axisBottom(x));

    // add the y Axis
    var y = scaleLinear()
            .range([height-margin.top-margin.bottom, 0])
            .domain([0, 0.02]);
    svg.append("g")
    .attr("transform", "translate(" + margin.left + ","+margin.top+")")
    .call(axisLeft(y));

    // Compute kernel density estimation
    var kde = kernelDensityEstimator(kernelEpanechnikov(3), x.ticks(7))
    
    var density =  kde(newData.filter(
        function(d:any){return d.passenger_count>=rangeValue.lower&& d.passenger_count<=rangeValue.lower})
        .map(function(d:any){ return d.total_amount; }))
   
    // Plot the area
    svg.append("path")
    .attr("className", "mypath")
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
    }());
    })
    return   <svg style={{height:height,width:width}} ref={ref}></svg>

}

export const GraphWrapper:React.FC<ContainerProps2>=({data,rangeValue})=>{
    return <div id="d3graph"><AutoSizer>
    {({height, width}:any) => (
        <DensityGraph height={height} width={width} data={data} rangeValue={rangeValue}></DensityGraph>
    )}</AutoSizer></ div>
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