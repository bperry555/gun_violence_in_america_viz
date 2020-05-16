import { choroMap } from './choropleth.js';
import { legend } from './legend.js';
import { slider } from './slider.js';
import { statCircles } from './statCircles.js';

const svgWidth = window.innerWidth;
const svgHeight = window.innerHeight;

const chartMargin = { top: 30, right: 30, bottom: 30, left: 30 };
const chartWidth = svgWidth - chartMargin.left - chartMargin.right;
const chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;
const mapWidth = 975;
const mapHeight = 610;

const svg = d3.selectAll('#svg-container')
    .append('svg')
    // .classed('viewBox', true)
    .attr('height', svgHeight)
    .attr('width', svgWidth);
    

let data;
let mapCounties= [];
let mapState = [];

let selectedMap;

let toolTip = d3.select('#toolTip')
    .style('position', 'absolute')
    .style('visibility', 'hidden')
    .style('stroke-width', 1)
    .style("background", 'grey')
    


const mapView = mapId => {

    switch (+mapId) {
    case 1:
        selectedMap = mapCounties;
        break;
    case 2:
        selectedMap = mapState;
        break;
    default:
        selectedMap = mapCounties;
    }
    renderMap();
};


const renderMap = () =>{  
    svg.call(choroMap, {
        title: 'Shootings displayed per sq Mile.',
        chartMargin,
        mapWidth,
        mapHeight,
        selectedMap,
        toolTip,
        data
    })
    svg.call(legend, {
        chartMargin,
        mapWidth,
        mapHeight,
        title: "Population by Sq Mile",
        data
      })
};


d3.json("data/comboTopo.json").then(mapData => {
    
    data = mapData;
    console.log(data)

    mapCounties = data.objects.counties;
    mapState = data.objects.states;
    
    mapView();
    
    svg.call(slider, {
        mapWidth,
        mapHeight,
        chartMargin,
        mapView
    });
    svg.call(statCircles, {
        mapWidth,
        mapHeight,
        chartMargin,
        data
    });
});



