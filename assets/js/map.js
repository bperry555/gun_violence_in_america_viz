const svgWidth = 975;
const svgHeight = 610;

const chartMargin = {
    top: 30,
    right: 30,
    bottom: 30,
    left: 30
};

const chartWidth = svgWidth - chartMargin.left - chartMargin.right;
const chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

const zoom = d3.zoom()
      .scaleExtent([1, 8])
    //   .on("zoom", zoomed);

const svg = d3.selectAll('#svg')
    .append('svg')
    .classed('viewBox', true)
    .attr('height', svgHeight)
    .attr('width', svgWidth)
    // .on('click', reset)

const topoJson = ['assets/data/comboTopo.json']

const projection = d3.geoAlbersUsa().scale(1300).translate([svgWidth / 2, svgHeight / 2])
// .translate([487.5, 305]);
const path = d3.geoPath(projection)

const colorScale = d3.scaleSequentialSqrt(d3.interpolateTurbo).domain([0,4000])

const radius = d3.scaleSqrt().domain([0,1683]).range([0,10]);

d3.json(topoJson).then(function(data) {

    let test = data.objects.states.geometries;
    console.log(d3.extent(test, d => d.properties.INCIDENTS))
    

    const countiesMap = svg.append('g').classed('map-container', true)
    
    countiesMap.selectAll('.map')
      .data(topojson.feature(data, data.objects.counties).features
      .sort(function(a,b) {return b.properties.INCIDENT - a.properties.INCIDENT}))
      .join('path')
        .classed('map', true)
        .attr('fill', d => colorScale(+d.properties.DENSITY))
        .attr('stroke', 'grey')
        .attr('stroke-width', 0.5)
        .attr('stroke-linejoin', 'round')
        .attr('d', path)
        .attr('cursor', 'pointer')
        // .on('click', clicked)

    const incidents = svg.append('g').classed('incidents-container', true)

    incidents.selectAll('.circle')
      .data(topojson.feature(data, data.objects.counties).features)
      .join('circle')
        .attr('transform', d=> ('translate(' + path.centroid(d)[0] + ',' + path.centroid(d)[1] + ')') )
        .attr('r', d => radius(+d.properties.INCIDENT))
        .style('fill-opacity', .5)
        .style('fill', 'red')
        .style('stroke', 'white')
        .style('stroke-width', .1)
        
    const legend = svg.append('g').classed('legend-container', true)
        .attr('transform', 'translate(740,60)')

    legend.selectAll('.legend')
        .data([0,8000, 1200, 1683])
        .join('circle')
        .attr('cy', d => -radius(d) * 2)
        // .attr('cx', d => radius(d) * 2)
        .attr('r', radius)
        .attr('fill', 'none')
        .attr('stroke', 'black')
    
    legend.append('text')
        .attr('y', d => -2 * radius(d))
        .attr('dy', '1.3em')
        .text(data)
        // .text(d3.format)
        
    
})

// function reset() {
//     svg.transition().duration(750).call(
//       zoom.transform,
//       d3.zoomIdentity,
//       d3.zoomTransform(svg.node()).invert([svgWidth / 2, svgHeight / 2])
//     );
//   }
//   function clicked(d) {
//     const [[x0, y0], [x1, y1]] = path.bounds(d);
//     d3.event.stopPropagation();
//     svg.transition().duration(1000).call(
//       zoom.transform,
//       d3.zoomIdentity
//         .translate(svgWidth / 2, svgHeight / 2)
//         .scale(Math.min(8, 0.9 / Math.max((x1 - x0) / svgWidth, (y1 - y0) / svgHeight)))
//         .translate(-(x0 + x1) / 2, -(y0 + y1) / 2),
//       d3.mouse(svg.node())
//     );
//   }
//   function zoomed() {
//     const {transform} = d3.event;
//     map.attr("transform", transform);
//     map.attr("stroke-width", 1 / transform.k);
//   }
