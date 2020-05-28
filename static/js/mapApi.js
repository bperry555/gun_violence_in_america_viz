import { dropdownMenu } from './dropdownMenu.js';
import { statesMap } from './statesMap.js';
let data;
// Fetch Request Button onClick
  // document.getElementById('selectionBtn').addEventListener('click', getSelections);
  // Radio Button Selection Variatble
  let radioBtns = document.getElementsByTagName('input');
  let value;
  // Dropdown Selection by State Variable
  let stateSelect;
  let stateSelected;
  let stateChoice;
  let incidentData;
  

  const svgHeight = window.innerHeight;
  const svgWidth = window.innerHeight;
  
  const chartMargin = { top: 30, right: 30, bottom: 30, left: 30 };
  const chartWidth = svgWidth - chartMargin.left - chartMargin.right;
  const chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;
  
  
const svg = d3.selectAll('#map-svg')
    .append('svg')
    .attr('height', chartHeight)
    .attr('width', chartWidth)


const dropdown = () => { 
    d3.select('#statesList')
      .call(dropdownMenu, {
      options: d3.keys(data.objects),
    });
  }

const render = () => {
  svg.call(statesMap, {
      title: 'testing',
      incidentList: incidentData,
      stateName: stateChoice,
      chartMargin,
      chartWidth,
      chartHeight,
      data
  })
}

const getSelections = () => {
    for (var i = 0; i < radioBtns.length; i++) {
      if (radioBtns[i].type === 'radio' && radioBtns[i].checked) {
          // get value, set checked flag or do whatever you need to
          value = radioBtns[i].value;   
      }
    }
    stateSelect = document.getElementById('statesList')
    stateChoice = stateSelect.options[stateSelect.selectedIndex].text;
    stateSelected = data.objects[stateChoice]

    var selection = {
      year: value,
      state: stateChoice
    };

    fetch(`${window.origin}/query`, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json'
        },
      body: JSON.stringify(selection),
      cache: 'no-cache'
    })

    .then(response => {
      if (response.status !== 200) {
        console.log('ERROR')
        return;
      } else {
        response.json().then(responseData => {
        incidentData = responseData
        render()
        })
      }
    })
      
}

const searchBtn = d3.selectAll('#selectionBtn')
    searchBtn.on('click', getSelections)

d3.json("../static/data/states.json").then(mapData => {
    data = mapData
    console.log(data)
    dropdown()    

})