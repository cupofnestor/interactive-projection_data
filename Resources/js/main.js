var ds = new Datasource("/Volumes/Pylos/Projects/FED/projection.db");
var defs;
var datasource;
var test;

ds.setup().then(
	function(d){
		defs = d;
		test = $.map(defs, function(value, index) {return [value]});
		
	
		//returns object as array
		
		$("body").html("<h1>Definitions:</h1><pre>"+JSON.stringify(defs,null,3)+"</pre>");
		
		ds.get(defs["Human Capital"][0]).then(
			function(d){
			data = d;
			console.log("done");
			
		})
		makeMenu(defs);
	}
)

