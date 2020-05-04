function init() {
    //1. Use the D3 library to read in samples.json.
    d3.json("static/data/num_firarms.json").then(function(data){
        fiscal_years=data.Fiscal_Year;
        Firearms_Processed=data.Firearms_Processed
        var years=[]
        var num_arms=[]
        Object.values(fiscal_years).forEach(value=>{
            years.push(value)
        })
        console.log(years)
        Object.values(Firearms_Processed).forEach(value=>{
            num_arms.push(value)
        })
        console.log(num_arms)
        function init_graph(){
            var trace = [{
                x: years,
                y: num_arms,
                
                type: "bar"
            }];
            var layout_in = {
                title: "Number of NFA Firearms Processed by Fiscal Year",
                xaxis:{title:{ text:`Fiscal Year`}}

                
            };
            Plotly.newPlot("bar", trace, layout_in);
        }
        init_graph() 
    })
}
init();
