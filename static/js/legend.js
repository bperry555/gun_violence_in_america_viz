export const legend = (selection, props) => {
    const {
    chartMargin,
    mapWidth,
    mapHeight,
    title,
    data
  } = props;

  var defs = selection.append('defs');
  
  const color = d3.scaleSequentialSqrt(d3.interpolateTurbo);

  var linearGradient = defs.append('linearGradient')
        .attr('id', 'linear-gradient')

  const legendDraw = selection.append('g').classed('legend-box', true)
        .attr('transform', 'translate (570,615)')
  
  legendDraw
      .append('rect')
        .attr('width', 200)
        .attr('height', 10)
        .attr('fill', 'url(#linear-gradient)')
        .attr('rx', 4)
        .attr("gradientUnits", "userSpaceOnUse")

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
    
}