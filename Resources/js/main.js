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
		})
	}
		
)