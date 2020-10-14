import React,{useEffect,useRef} from 'react'
import {select,axisBottom, scaleLinear, axisLeft,line, area, curveBasis, mean} from 'd3'
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import './D3Graph.css'

interface ContainerProps1{
    height:number
    width:number
    entries:any
}

interface ContainerProps2{
    entries:any
}


export const DensityGraph:React.FC<ContainerProps1>=({height,width,entries})=>{
    const ref = useRef<any>()
    const margin={left:40,bottom:20,top:10,right:20}
    // var dataMax = max(newData, function(d) { return d.passenger_count; });
    // var dataMin = min(newData, function(d) { return d.passenger_count; });

    useEffect(()=>{
        let svg = select(ref.current as SVGSVGElement)
        svg.selectAll("*").remove()
    // get the data
    const processData = (function process() {
    // add the x Axis
    svg.append('rect')
        .attr('height',height-margin.top-margin.bottom)
        .attr('width',width-margin.left-margin.right)
        .attr('fill','white')
        .attr('transform',"translate("+margin.left+"," + margin.top + ")")

    var x = scaleLinear()
            .range([0, width-margin.left-margin.right])
            .domain([0, 5])      
    svg.append("g")
    .attr("transform", "translate("+margin.left+"," + (height-margin.bottom) + ")")
    .call(axisBottom(x));

    // add the y Axis
    var y = scaleLinear()
            .range([height-margin.top-margin.bottom, 0])
            .domain([0, 0.4]);
    svg.append("g")
    .attr("transform", "translate(" + margin.left + ","+margin.top+")")
    .call(axisLeft(y));

    // Compute kernel density estimation
    var kde = kernelDensityEstimator(kernelEpanechnikov(2), x.ticks(100))
    console.log(entries[0])
    var density =  kde(entries.map(function(d:any){ return d.values[0].avg_review }))

    // Plot the area
    svg.append("path")
    .attr("className", "mypath")
    .datum(density)
    .attr("opacity", ".8")
    .attr("fill","none")
    .attr("stroke", "#000")
    .attr("stroke-width", 1)
    .attr("stroke-linejoin", "round")
    .attr("d", line()
        .curve(curveBasis)
        .x(function(d) { return x(d[0])+margin.left; })
        .y(function(d) { return y(d[1])+margin.top; })
    );

    svg.append("path")
    .datum(density)
    .attr("opacity", ".8")
    .attr("fill","#6699ff")
    .attr("d", area()
        .curve(curveBasis)
        .x(function(d) { return x(d[0])+margin.left; })
        .y0(height-margin.bottom)
        .y1(function(d) { return y(d[1])+margin.top; })
    );
    }());
    })
    return   <svg style={{height:height,width:width}} ref={ref}></svg>

}

export const GraphWrapper:React.FC<ContainerProps2>=({entries})=>{
    return <div id="d3graph"><AutoSizer>
    {({height, width}:any) => (
        <DensityGraph height={height} width={width} entries={entries}></DensityGraph>
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