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
    d3.json("static/data/gun_own_by_state.json").then(function(data){
        dataset=data.data
        console.log(dataset)
        var state=[]
        var gunOwnership=[]
        var pop=[]
        var totalGuns=[]
        for (var i=0; i<dataset.length; i++){
            state.push(dataset[i].State)
            pop.push(dataset[i].Pop)
            gunOwnership.push(dataset[i].gunOwnership)
            totalGuns.push(dataset[i].totalGuns)
        }
        console.log(state)
        console.log(pop)
        console.log(gunOwnership)
        console.log(totalGuns)
        
        
        // title: "By 2020, Gun Ownership By State by Population 2020",
        
    })
}
init();
