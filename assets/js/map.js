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

const svg = d3.selectAll('#svg')
    .append('svg')
    .classed('viewBox', true)
    .attr('height', svgHeight)
    .attr('width', svgWidth)
    .attr('transform', `translate(${chartWidth}/2, ${chartHeight}/2)`)

const topoJson = ['assets/data/counties-q-topo.json']

const projection = d3.geoAlbersUsa().scale(1300).translate([487.5, 305]);

const colorScale = d3.scaleSequential(d3.interpolateTurbo).domain([0,3233])

d3.json(topoJson).then(function(data) {
    
    svg.append('g').classed('map-container', true)
        .attr('transform', 'translate(10, 10)')

    const map = svg.select('.map-container').selectAll('.map')
        .data(topojson.feature(data, data.objects.counties).features)
        .join('path')
        .attr("fill", d => colorScale(+d.properties.incident))
        .classed('map', true)
        .attr("stroke", "#777")
        .attr("stroke-width", 0.5)
        .attr("stroke-linejoin", "round")
        .attr("d", d3.geoPath(projection))



})
// const year = [2013, 2018]


//     const slider = d3.sliderBottom()
//         .min(d3.min(times))
//         .max(d3.max(times))
//         .marks(times)
//         .width(300)
//         .tickFormat(d3.utcFormat("%Y"))
//         .tickValues(times)
//         .on("onchange", () => svg.dispatch("input"));
  
//     const svg = d3.create("svg")
        
//         .attr("width", 340)
//         .attr("height", 60)
//         .call(slider);
  
//     return Object.defineProperty(
//       svg.node(), 
//       "value", 
//       {get: () => slider.value()}
//     );