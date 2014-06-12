var ds = new Datasource("/Data/projection.db");
var defs;
var datasource;
ds.setup().then(
	function(d){
		defs = d;
<<<<<<< HEAD
		//$("body").html("<h1>Definitions:</h1><pre>"+JSON.stringify(defs,null,3)+"</pre>");
		
		/*ds.get(defs.Category_1[0]).then(
=======
		$("body").html("<h1>Definitions:</h1><pre>"+JSON.stringify(defs,null,3)+"</pre>");
		ds.get(defs.Category_3[0]).then(
>>>>>>> master
			function(d){
			data = d;
			console.log("done");
			
		})*/
		makeMenu();
	}
		
)

makeMenu = function(){
	var menu = d3.select("body").append("div");
	var cat = menu.selectAll("div").data(Object.keys(defs)).enter().append("div")
	cat.append("h2").text(function(d){return d})
	
	cat.selectAll("p").data(function(d){return defs[d]}).enter().append("p").text(function(d){return d.chart_name})
}