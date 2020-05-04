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

const svg = d3.selectAll('#map')
    .append('svg')
    .classed('viewBox', true)
    .attr('height', svgHeight)
    .attr('width', svgWidth);


const geoUrls = ['https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json'];   

const projection = d3.geoAlbersUsa().scale(1300).translate([487.5, 305]);

d3.json(geoUrls).then(function(data) {
    console.log(data)
    
    svg.append('g').classed('map-container', true)
    
    const map = svg.select('.map-container').selectAll('.map')
        .data(topojson.feature(data, data.objects.states).features)
        .join('path')
        .classed('map', true)
        .attr("fill", "none")
        .attr("stroke", "#777")
        .attr("stroke-width", 0.5)
        .attr("stroke-linejoin", "round")
        .attr("d", d3.geoPath(projection))
        .on('click', function(d){
            d3.select(this).attr('fill', 'steelblue')
            console.log(d)
        })
})
