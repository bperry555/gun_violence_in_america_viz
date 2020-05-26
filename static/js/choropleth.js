export const choroMap = (selection, props) => {
    const {
        title,
        mapWidth,
        mapHeight,
        chartMargin,
        selectedMap,
        toolTip,
        radius,
        color,
        data
    } = props;

    console.log(data, selectedMap)
    const projection = d3.geoAlbersUsa().scale(1300).translate([mapWidth / 2, mapHeight / 2]);
    const path = d3.geoPath(projection);
    
    const mapContainer = selection.append('g')
              .classed('map-container', true)
              .attr('translate', `transform(${chartMargin.left}, ${chartMargin.topo})`)
    
    const mapDraw = mapContainer.selectAll('.map')
            .data(topojson.feature(data, selectedMap).features)
            .join('path')
              .classed('map', true)
              .attr('fill', d => color(+d.properties.DENSITY))
              .attr('stroke', 'black')
              .attr('stroke-width', 0.2)
              .attr('stroke-linejoin', 'round')
              .attr('d', path)
              .attr('cursor', 'pointer')
              .on('click', d => console.log(d))
              .on('mouseover', function(d){
                toolTip.html(`${d.properties.NAME} County</br>Incident Count: ${d.properties.INCIDENT}`)
                .style('visibility', 'visible').style('stroke-width', .8).style('stroke', 'black')
              })
              .on('mouseout', function(){
                toolTip.style('visibility', 'hidden')
              })
              .on('mousemove', function(e){
                toolTip
                  .style('visiblity', 'visible')
                  .style('left', d3.event.pageX-140 + 'px')
                  .style('top', d3.event.pageY-45 + 'px')
              })
    
    const incidents = selection.append('g').classed('incidents-container', true);

    incidents.selectAll('.circle')
      .data(topojson.feature(data, selectedMap).features)
      .join('circle')
      .sort(function(a,b) {return b.properties.INCIDENT - a.properties.INCIDENT})
        .attr('transform', d=> ('translate(' + path.centroid(d)[0] + ',' + path.centroid(d)[1] + ')') )
        .attr('r', d => radius(+d.properties.INCIDENT))
        .attr('pointer-events', 'none')
        .style('fill-opacity', .7)
        .style('fill', 'orange')
        .style('stroke', 'white')
        .style('stroke-width', .1)
        
  };
