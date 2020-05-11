var svg = d3.select("svg"),
    margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = svg.attr("width") - margin.left - margin.right,
    height = svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var x = d3.scaleBand()
    .rangeRound([0, width])
    .paddingInner(0.05)
    .align(0.1);

var y = d3.scaleLinear()
    .rangeRound([height, 0]);

var z = d3.scaleOrdinal()
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

console.log("javascript is loaded")
d3.json("/all").then(function(data){
    console.log(data);

    //var columns = d3.keys(data);  // get the properties of the first item in the data array
    var columns=Object.keys(data[0]);
    var keys = columns.slice(7,10);
    console.log(keys);
    //console.log(columns[keys]);

  data.sort(function(a, b) { return b.total - a.total; });
  x.domain(data.map(function(d,i) { return i; }));
  y.domain([0, d3.max(data, function(d) { return d.age_group_Adult; })]).nice();
  z.domain(keys);

  g.append("g")
    .selectAll("g")
    .data(d3.stack().keys(keys)(data))
    .enter().append("g")
      .attr("fill", function(d) { return z(d.keys); })
    .selectAll("rect")
    .data(function(d) { return d; })
    .enter().append("rect")
      .attr("x", function(d,i) { return x(i); })
      .attr("y", function(d) { return y(d[1]); })
      .attr("height", function(d) { return y(d[0]) - y(d[1]); })
      .attr("width", x.bandwidth());
      //.attr('width', 5);

  g.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).tickFormat(function(d,i) { return data[i].state}));

  g.append("g")
      .attr("class", "axis")
      .call(d3.axisLeft(y).ticks(null, "s"))
    .append("text")
      .attr("x", 2)
      .attr("y", y(y.ticks().pop()) + 0.5)
      .attr("dy", "0.32em")
      .attr("fill", "#000")
      .attr("font-weight", "bold")
      .attr("text-anchor", "start")
      .text("Population");

  var legend = g.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("text-anchor", "end")
    .selectAll("g")
    .data(keys.slice().reverse())
    .enter().append("g")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  legend.append("rect")
      .attr("x", width - 19)
      .attr("width", 19)
      .attr("height", 19)
      .attr("fill", z);

  legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9.5)
      .attr("dy", "0.32em")
      .text(function(d) { return d; });
});



    // data.forEach(function(data) {
    //     data.state = data.state;
    //     data.age_group_Adults = +data.age_group_Adults;
    //     data.Year =+ data.Year;
    // });
    // console.log(data);
    // });

    

    // var age_data= d3.nest()
    // .key(function(d) { return d.state;})
    // .rollup(function(d) { 
    //     return {
    //         age_group_Adult: d3.sum(d, function(e) { return e.age_group_Adult; }),
    //         age_group_Teen: d3.sum(d, function(e) { return e.age_group_Teen; }),
    //         age_group_Child: d3.sum(d, function(e) { return e.age_group_Child;})
    //     };
    // // return d3.sum(d, function(g) {return g.age_group_Adult; });
    // }).entries(data);
    

    // age_data.forEach(d => console.log(d));
    
  // List of subgroups = header of the csv files = soil condition here