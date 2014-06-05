var ds = new Datasource("/Volumes/Pylos/Projects/FED/projection.db");
var defs;
var datasource;
ds.setup().then(
	function(d){
		defs = d;
		$("body").html("<h1>Definitions:</h1><pre>"+JSON.stringify(defs,null,3)+"</pre>");
		ds.get(defs.Category_1[0]).then(
			function(d){
			data = d;
			console.log("done");
			makeMenu();
		})
	}
		
)

makeMenu = function(){
	var menu = d3.select("body").append("div");
	var cat = menu.selectAll("div").data(Object.keys(defs)).enter().append("div")
	cat.append("h2").text(function(d){return d})
	
	cat.selectAll("a").data(function(d){return defs[d]}).enter().append("a").text(function(d){return d.chart_name})
}