import { choroMap } from './choropleth.js';
import { legend } from './legend.js';
import { slider } from './slider.js';

const svgWidth = 975;
const svgHeight = 610;

const svg = d3.selectAll('#svg')
    .append('svg')
    .classed('viewBox', true)
    .attr('height', svgHeight)
    .attr('width', svgWidth)

let data;
let mapValue;
let mapChoice;

console.log(d3.keys(data))
const counties; 
// const state; = topojson.feature(data, data.objects.state).features

const render = () =>{
    
    svg.call(slider, {
        chartMargin: { top: 30, right: 30, bottom: 30, left: 30 },
        svgWidth,
        svgHeight,
        mapValue,
        
    })
    
    svg.call(choroMap, {
        title: 'Shootings displayed per sq Mile.',
        chartMargin: { top: 30, right: 30, bottom: 30, left: 30 },
        svgWidth,
        svgHeight,
        mapSelection: mapChoice,
        data
    })

    // svg.call(legend, {
    //     color: d3.scaleSequential([0, 100], d3.interpolateViridis),
    //     title: "Temperature (°F)"
    //   })
    // debugger
    const test = d3.select('#value').text()
    console.log(test)
    

}
d3.json("data/comboTopo.json").then(mapData => {

    data = mapData;
    let test = data.objects.states.geometries;
    console.log(d3.extent(test, d => d.properties.INCIDENTS))
    mapChoice = counties
    console.log(d3.keys(data.objects.counties)
    render(); 
    )   
})



