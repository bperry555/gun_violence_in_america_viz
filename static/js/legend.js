export const legend = (selection, props) => {
    const {
    color,
    radius,
    selectedMap
  } = props;

  const densValues = selectedMap.geometries.map(x => x.properties.DENSITY)

  var defs = selection.append('defs');
  var linearGradient = defs.append('linearGradient')
        .attr('id', 'linear-gradient');
  
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


  const legendColorScale = d3.scaleLinear()
      .domain(d3.extent(densValues)).nice()
      .range([0,200])
      

  const legendX = d3.axisBottom(legendColorScale).ticks(7,'.2~s')

  const legendDraw = selection.append('g').classed('legend-box', true)
        .attr('transform', 'translate (525,615)')

  const colorLegend = legendDraw.append('g').classed('color-legend', true)

  colorLegend
    .append('rect')
      .attr('width', 200)
      .attr('height', 10)
      .attr('fill', 'url(#linear-gradient)')
      .attr('rx', 4)
      .attr("gradientUnits", "userSpaceOnUse")
     
  colorLegend.append('g').classed('color-axis', true)
    .attr('transform', 'translate (0,10)')
    .attr("font-weight", "bold")
    .call(legendX)
  colorLegend.append('text')
    .style('font-size', 12)
    .attr("font-weight", "bold")
    .attr("text-anchor", "start")  
    .text('Population Density per Sq Mile')
  colorLegend.select('.domain').remove()
  
  

  const circleScale = d3.scaleBand()
     .domain([500,1000,3000,5000,10000])
     .range([0,200])

  const circleX = d3.axisBottom(circleScale).ticks(5,',.2r')

  const circleLegend = legendDraw.append('g').classed('circle-legend', true)
     .attr('transform', 'translate (0,-40)')
    
  const circleTitle = circleLegend.append('g').classed('circle-title', true)
    .append('text')
      .text('Sum of Incidents')
      .style('font-size', 12)
      .attr("font-weight", "bold")
      .attr('transform', 'translate (0,-25)')
     
  const circleAxis = circleLegend.append('g').classed('circle-axis', true)
     .attr('font-weight', 'bold')
     .call(circleX)
    circleAxis.selectAll('.domain').remove()
  
    circleLegend.selectAll('.tick')
      .append('circle')
      .attr('stroke', 'black')
      .style('fill-opacity', .7)
      .style('fill', 'orange')
      .attr('cy', d => -radius(d))
      .attr('r', d => radius(d))
    circleLegend.selectAll('line').remove()

  
  

    

    
}