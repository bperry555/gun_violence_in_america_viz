export const statCircles = (selection, props) => {
    const {
        mapWidth,
        mapHight,
        chartMargin,
        data
    } = props;

    const statContainer = selection.append('g')
        .classed('stat-container', true)
        .attr('translate', `transform(${chartMargin.left}, ${chartMargin.topo})`)
        
        var dataset = [{
            "label": "test",
            "test-score": 45
          },{
            "label": "test2",
            "test-score": 90
          },
          ]
          
          var width = 105,
            height = 105,
            innerRadius = 85;
          
        var drawArc = d3.arc()
            .innerRadius(innerRadius / 2)
            .outerRadius(width / 2)
            .startAngle(0);

          statContainer
            .attr("class", "svgCircle")
            .attr('width', width)
            .attr('height', height)
            .append('g')
            
          
          statContainer.append("circle")
            .classed('stat-circle', true)
            .attr("transform", `translate(${mapWidth}, ${height})`)
            .attr("fill", "#ffffff")
            .attr("stroke", "#dfe5e6")
            .attr("stroke-width", 1)
            .attr('r', width / 2)
          
        //   d3.selectAll(".svgCircle")
        //     .append("text")
        //     .text(function(d) {
        //       return d.label
        //     })
        //     .style("stroke","black")
        //     .attr("dy", "1em");
          
          
          
        //   vis.append("path")
        //     .attr("fill", "#21addd")
        //     .attr('class', 'arc')
        //     .each(function(d) {
        //       d.endAngle = 0;
        //     })
        //     .attr('d', drawArc)
          
        //   .transition()
        //     .duration(1200)
        //     .ease('linear')
        //     .call(arcTween);
          
        //   vis.append('text')
        //     .text(0)
        //     .attr("class", "perc")
        //     .attr("text-anchor", "middle")
        //     .attr('font-size', '36px')
        //     .attr("y", +10)
        //     .transition()
        //     .duration(1200)
        //     .tween(".percentage", function(d) {
        //       var i = d3.interpolate(this.textContent, d['test-score']),
        //         prec = (d.value + "").split("."),
        //         round = (prec.length > 1) ? Math.pow(10, prec[1].length) : 1;
        //       return function(t) {
        //         this.textContent = Math.round(i(t) * round) / round + "%";
        //       };
        //     });
          
          
          
          
        //   function arcTween(transition, newAngle) {
          
        //     transition.attrTween("d", function(d) {
          
        //       var interpolate = d3.interpolate(0, 360 * (d['test-score'] / 100) * Math.PI / 180);
          
        //       return function(t) {
          
        //         d.endAngle = interpolate(t)
          
        //         return drawArc(d);
        //       };
        //     });
        //   }
}


