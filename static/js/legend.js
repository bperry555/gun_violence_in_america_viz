export const legend = (selection, props) => {
    const {
    chartMargin,
    mapWidth,
    mapHeight,
    title,
    selectedMap,
    data
  } = props;

  var defs = selection.append('defs');
  
  const color = d3.scaleSequentialSqrt(d3.interpolateTurbo);

  const incidentMax = d3.max(selectedMap.geometries, d => d.properties.INCIDENT)
  console.log(incidentMax)

  var linearGradient = defs.append('linearGradient')
        .attr('id', 'linear-gradient')

    linearGradient
        .attr("x1", '0%')
        .attr("y1", '0%')
        .attr("x2", '100%')
        .attr("y2", '0%')
      .selectAll("stop")
      .data(d3.ticks(0, 1, 10))
      .join("stop")
        .attr("offset", d => d)
        .attr("stop-color", color.interpolator());
    

  const radius = d3.scaleSqrt().domain(d3.extent(selectedMap.geometries, d => d.properties.INCIDENT)).range([0,15]);
  const legendText = ['small', 'medium', 'large']
  const legendScale = d3.scaleBand()
      .domain(legendText)
      .range([0,200])

  const legendX = d3.axisBottom(legendScale)

  const legendDraw = selection.append('g').classed('legend-box', true)
        .attr('transform', 'translate (525,615)')
        .call(legendX)

  

  



  const circleLegend = legendDraw.append('g').classed('circle-legend', true)
      .attr('transform', 'translate (0,-40)')

    circleLegend.selectAll('.circle-legend')
      .data([incidentMax, incidentMax * .66 , incidentMax * .33])
      .join('circle')
      .attr('fill', 'none')
      .attr('stroke', 'black')
      .attr('cx', d => -radius(d^2))
      .attr('r', radius)
      

  
  legendDraw.append('g').classed('color-legend', true)
      .append('rect')
        .attr('width', 200)
        .attr('height', 10)
        .attr('fill', 'url(#linear-gradient)')
        .attr('rx', 4)
        .attr("gradientUnits", "userSpaceOnUse")

    

    
}