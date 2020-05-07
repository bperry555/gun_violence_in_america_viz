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
        .attr("fill", "rgb(200, 200, 200)")
        .classed('map', true)
        .attr("stroke", "#777")
        .attr("stroke-width", 0.5)
        .attr("stroke-linejoin", "round")
        .attr("d", d3.geoPath(projection))
        
})

d3.json(geoUrls).then(function(data) {
    
    svg.append('g').classed('legend', true)
    
    svg.select('.legend').append('rect')
        .datum(data)
        .join('rect')
        .attr('transform', 'translate(600,10)')
        .attr('x', 20)
        .attr('y', 20)
        .attr('width', 220)
        .attr('height', 20)
        .attr('fill', 'yellow')
})

const year = [2013, 2018]

viewof time = {

    const slider = d3.sliderBottom()
        .min(d3.min(times))
        .max(d3.max(times))
        .marks(times)
        .width(300)
        .tickFormat(d3.utcFormat("%Y"))
        .tickValues(times)
        .on("onchange", () => svg.dispatch("input"));
  
    const svg = d3.create("svg")
        
        .attr("width", 340)
        .attr("height", 60)
        .call(slider);
  
    return Object.defineProperty(
      svg.node(), 
      "value", 
      {get: () => slider.value()}
    );
  }