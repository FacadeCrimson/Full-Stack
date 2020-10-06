import React,{useEffect,useRef,useState} from 'react'
import {select, shuffle} from 'd3'
import useInterval from './useInterval'

export const Circles:React.FC = () => {
    const [dataset, setDataset] = useState(
      generateDataset()
    )
    const ref = useRef<any>()
    useEffect(() => {
      const svgElement = select(ref.current)
      svgElement.selectAll("circle")
        .data(dataset)
        .join("circle")
          .attr("cx", d => d[0])
          .attr("cy", d => d[1])
          .attr("fill","purple")
          .attr("r",  3)
    }, [dataset])
    useInterval(() => {
      const newDataset = generateDataset()
      setDataset(newDataset)
    }, 2000)
    return (
      <svg viewBox="0 0 100 50" ref={ref} />
    )
  }

  const generateDataset = () => (
    Array(10).fill(0).map(() => ([
      Math.random() * 80 + 10,
      Math.random() * 35 + 10,
    ]))
  )

export const AnimatedCircles = () => {
    const [visibleCircles, setVisibleCircles] = useState(
      generateCircles()
    )
    const ref = useRef<any>()
    useInterval(() => {
      setVisibleCircles(generateCircles())
    }, 2000)
    useEffect(() => {
      const svgElement = select(ref.current)
      svgElement.selectAll("circle")
        .data(visibleCircles)
        .join(
          enter => (
            enter.append("circle")
                .attr("cx", (d) => d * 15 + 10)
                .attr("cy", 10)
                .attr("r", 0)
                .attr("fill", "cornflowerblue")
              .call(enter => (
                enter.transition().duration(1200)
                  .attr("cy", 10)
                  .attr("r", 6)
                  .style("opacity", 1)
              ))
          ),
          update => (
            update.attr("fill", "lightgrey")
          ),
          exit => (
            exit.attr("fill", "tomato")
              .call(exit => (
                exit.transition().duration(1200)
                  .attr("r", 0)
                  .style("opacity", 0)
                  .remove()
              ))
          ),
        )
    }, [visibleCircles])
    return (
      <svg
        viewBox="0 0 100 20"
        ref={ref}
      />
    )
  }

  const circleList = [0,1,2,3,4,5]

  const generateCircles = () => (
    shuffle(circleList).slice(0, Math.floor(Math.random()*7))
    .sort()
  )

  interface chartSettings{
    width: number,
    height: number,
    marginTop: number,
    marginRight: number,
    marginBottom: number,
    marginLeft: number,
  }

export const ChartWithDimensions:React.FC<chartSettings> = (chartSettings) => {
    const dms = combineChartDimensions(chartSettings)
    return (
      <div
        className="Chart__wrapper"
        style={{ height: "200px" }}>
        <svg width={dms.width} height={dms.height}>
          <g transform={`translate(${[
            dms.marginLeft,
            dms.marginTop
          ].join(",")})`}>
            <rect
              width={dms.boundedWidth}
              height={dms.boundedHeight}
              fill="lavender"
            />
            <g transform={`translate(${[
              0,
              dms.boundedHeight,
            ].join(",")})`}>
      
            </g>
          </g>
        </svg>
      </div>
    )
  }


const combineChartDimensions = (dimensions:chartSettings) => {
  const parsedDimensions = {
      ...dimensions,
      marginTop: dimensions.marginTop || 10,
      marginRight: dimensions.marginRight || 10,
      marginBottom: dimensions.marginBottom || 40,
      marginLeft: dimensions.marginLeft || 75,
  }
  return {
      ...parsedDimensions,
      boundedHeight: Math.max(
        parsedDimensions.height
        - parsedDimensions.marginTop
        - parsedDimensions.marginBottom,
        0,
      ),
      boundedWidth: Math.max(
        parsedDimensions.width
        - parsedDimensions.marginLeft
        - parsedDimensions.marginRight,
        0,
      ),
  }
}