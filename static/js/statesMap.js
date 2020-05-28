
export const statesMap = (selection, props) => {
    const {
    title,
    incidentList,
    chartMargin,
    chartWidth,
    chartHeight,
    stateName,
    data
    } = props;

    console.log(incidentList)

    let states = topojson.feature(data, data.objects[stateName])
    var projection = d3.geoAlbersUsa().fitSize([chartWidth, chartHeight], states)
    var path = d3.geoPath().projection(projection);
 
    selection.append('g').classed('state-map', true)

    var t = d3.transition()
        .duration(2000)
        .ease(d3.easeLinear);

    const stateMap = selection.select('.state-map').selectAll('path')
        .data(topojson.feature(data, data.objects[stateName]).features)
        .join('path')
            .attr('d', path)
            .transition(t)

    selection.append('g').classed('points', true)

    const incidentPoints = selection.select('.points').selectAll('circle')
        .data(incidentList)
        .join('circle')
        .classed('incident-points', true)
        .attr('r', 2)
        .attr('transform', d => {
            return 'translate(' + projection([d.longitude, d.latitude]) + ')'
        });
}


