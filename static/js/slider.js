export const slider = (selection, props) => {
const {
    chartMargin,
    mapWidth,
    mapHeight,
    mapView
} =  props;


const slider = d3
    .sliderHorizontal()
    .min(1)
    .max(2)
    .step(1)
    .width(50)
    .default(1)
    .tickValues([1,2])
    .displayValue(false)
    .on('onchange', (val) => {
      d3.select('#value').text(val),
      mapView(val)
      
    });
const sliderBox = selection.append('g').classed('slider-box', true)

  sliderBox
    .attr('width', 100)
    .attr('height', 100)
    .append('g')
    .attr('transform', `translate(${chartMargin.left},${mapHeight})`)
    .call(slider);
  }