console.log("javascript is loaded")
// just the name of column
d3.json("/all").then(function(data){
    console.log(data)
    })