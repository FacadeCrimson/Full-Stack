import React,{useEffect,useRef} from 'react'
import {select,axisBottom, axisTop, scaleLinear, axisLeft, axisRight, line, area, curveBasis, mean, histogram, scaleBand} from 'd3'
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import './D3Graph.css'

interface ContainerProps1{
    height:number
    width:number
    entries:any
}

interface ContainerProps2{
    entries:any
    type:string
}


export const DensityGraph:React.FC<ContainerProps1>=({height,width,entries})=>{
    const ref = useRef<any>()
    const margin={left:30,bottom:20,top:10,right:30}
    // var dataMax = max(newData, function(d) { return d.passenger_count; });
    // var dataMin = min(newData, function(d) { return d.passenger_count; });

    useEffect(()=>{
        let svg = select(ref.current as SVGSVGElement)
        svg.selectAll("*").remove()
    // add the x Axis
    if(width>60){
    svg.append('rect')
        .attr('height',height-margin.top-margin.bottom)
        .attr('width',width-margin.left-margin.right)
        .attr('fill','white')
        .attr('transform',"translate("+margin.left+"," + margin.top + ")")
    }

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

    if(width>60){
        // set the parameters for the histogram
        var hist = histogram()
        .value(function(d:any) { return d.values[0].avg_review; })   // I need to give the vector of value
        .domain(x.domain() as any)  // then the domain of the graphic
        .thresholds(x.ticks(50)); // then the numbers of bins
        
        // And apply this function to data to get the bins
        var bins = hist(entries);
        var y2 = scaleLinear()
          .range([height-margin.top-margin.bottom, 0]);
          y2.domain([0, 300]);
        svg.append("g")
          .attr("transform", "translate(" + (width-margin.right) + ","+margin.top+")")
          .call(axisRight(y2));
        // append the bar rectangles to the svg element
        svg.selectAll("rect")
        .data(bins)
        .enter()
        .append("rect")
            .attr("x",30)
            .attr("stroke","black")
            .attr("stroke-width","1px")
            .attr("transform", function(d:any) { return "translate(" + x(d.x0)+margin.left + "," + y2(d.length)+margin.top + ")"; })
            .attr("width", function(d:any) { return x(0.1); })
            .attr("height", function(d) { return (height-margin.bottom-y2(d.length)) })
            .style("fill", "#ef4e6e")
        }
    
    svg.append('text')
        .text('Average Review Histogram and Density Curve')
        .attr("transform", "translate("+(margin.left+10)+"," + (margin.top+20) + ")")
        .attr('font-size','15px')
  
    })
    return   <svg style={{height:height,width:width}} ref={ref}></svg>

}

export const GraphWrapper:React.FC<ContainerProps2>=({entries,type})=>{
    switch(type){
        case "density":
            return <div id="d3graph">
                        <AutoSizer>
                        {({height, width}:any) => (
                            <DensityGraph height={height} width={width} entries={entries}></DensityGraph>
                        )}</AutoSizer>
                    </ div>
        case "side":
            return <div id="d3sidegraph">
                        <AutoSizer>
                        {({height,width}:any) => (
                            <SideGraph height={height} width={width} entries={entries}></SideGraph>
                        )}</AutoSizer>
                    </ div>
        default:
            return <></>

    }
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


export const SideGraph:React.FC<ContainerProps1>=({height,width,entries})=>{
    const ref = useRef<any>()
    const margin={left:25,bottom:20,top:30,right:10}

    useEffect(()=>{
        let data={}
        for (let x of entries){
            if(x.values[0].sub_sub_group in data){
                data[x.values[0].sub_sub_group].push(x.values[0].business_final_score_percentile)
            }
            else{
                data[x.values[0].sub_sub_group]=[x.values[0].business_final_score_percentile]
            }
        }
        const names = Object.keys(data)
        const newHeight = names.length*16
        let div = select(ref.current as SVGSVGElement)
        div.selectAll("*").remove()
        let svg=div.append("svg").attr("height",newHeight+margin.top+margin.bottom).attr("width",width)
                .attr("viewbox",`${width},${newHeight+margin.top+margin.bottom},${width},${newHeight+margin.top+margin.bottom}`)

        var x = scaleLinear()
        .range([0, width-margin.left-margin.right])
        .domain([0, 1])      
        svg.append("g")
        .attr("transform", "translate("+margin.left+"," + margin.top + ")")
        .attr("position","sticky")
        .call(axisTop(x));

        // var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),

        var y = scaleBand()
        .range([0,newHeight])
        .domain(names.map((v,i)=>{return i as any}))

        svg.append("g")
        .attr("transform", "translate("+margin.left+"," + margin.top + ")")
        .call(axisLeft(y as any));

        if(width>60){
            svg.append('rect')
                .attr('height',newHeight)
                .attr('width',width-margin.left-margin.right)
                .attr('fill','white')
                .attr('transform',"translate("+margin.left+"," + margin.top + ")")
            
            const onMouseEnter=(e:any,d:any)=>{
                div.append('text')
                .attr("id","info")
                .text(d)
                .attr('font-size','15px')
                .style("transform", `translate(calc( -${width-margin.left}px),calc( ${margin.top}px))`)
            }

            const onMouseLeave=(d:any)=>{
                select('#info').remove()
            }

            svg.selectAll(".listeners")
                .data(names)
                .enter().append("rect")
                .attr("class", "listeners")
                .attr('height',16)
                .attr("fill","transparent")
                .attr('width',width-margin.left-margin.right)
                .attr('transform',(d,i)=>"translate("+margin.left+"," + (margin.top+i*16) + ")")
                .on("mouseenter", onMouseEnter)
                .on("mouseleave", onMouseLeave)
        

            for (const [index,entry] of names.entries()){
                for(let point of data[entry]){
                    svg.append("line")
                        .attr("x1", x(point))
                        .attr("x2", x(point))
                        .attr("y1", (y(index.toString()) as number-4))
                        .attr("y2", (y(index.toString()) as number+4))
                        .attr("stroke", "black")
                        .attr("opacity","0.6")
                        .attr('transform',"translate("+margin.left+"," + (margin.top+8) + ")")
                }
            }
        }
    })
    return   <div style={{height:height,width:width,overflow:"scroll"}} ref={ref}></div>

}