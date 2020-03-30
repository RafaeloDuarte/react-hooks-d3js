import React, { useRef, useEffect, useState } from 'react';
import { select, line, curveCardinal, axisBottom, axisRight, scaleLinear } from 'd3';

function CurvedLine() {

    const [data, setData] = useState([25, 30, 45, 60, 20, 65, 75])
    const svgRef = useRef()

    useEffect(() => {
        const svg = select(svgRef.current)
        const xScale = scaleLinear()
            .domain([0, data.length - 1])
            .range([0, 300])

        const yScale = scaleLinear()
            .domain([0, 150])
            .range([150, 0])
        const xAxis = axisBottom(xScale).ticks(data.length)
        svg.select(".x-axis")
            .style("transform", "translateY(150px)")
            .call(xAxis)

        const yAxis = axisRight(yScale)
        svg.select(".y-axis")
            .style("transform", "translateX(300px)")
            .call(yAxis)

        const myLine = line()
            .x((value, index) => xScale(index))
            .y(yScale)
            .curve(curveCardinal)

        svg.selectAll(".line")
            .data([data])
            .join("path")
            .attr("class", "line")
            .attr("d", myLine)
            .attr("fill", "none")
            .attr("stroke", "blue")

    }, [data])

    return (
        <>
            <svg ref={svgRef}>
                <g className="x-axis" />
                <g className="y-axis" />
            </svg>
            <br /><br />
            <button onClick={() => setData(data.map(value => value + 5))}>Update Data</button>
            <button onClick={() => setData(data.filter(value => value <= 35))}>Filter Data</button>

        </>
    );
}

export default CurvedLine;