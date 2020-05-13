export const slider = (selection, props) => {
const {
    chartMargin,
    svgWidth,
    svgHeight,
    onSelection,
    mapValue
} =  props


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
      d3.select('#value').text(val)
      mapValue = (+val)
      render()
    });
console.log(mapValue)
const sliderBox = selection.append('g').classed('slider', true)

  sliderBox
    .attr('width', 100)
    .attr('height', 100)
    .append('g')
    .attr('transform', 'translate(800,30)')
    .call(slider);

    
  }