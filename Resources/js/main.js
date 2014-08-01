var ds = new Datasource("/Data/projection.db");
var defs;
var datasource;
var test;

ds.setup().then(
	function(d){
		defs = d;
		test = $.map(defs, function(value, index) {return [value]});
		
	
		//returns object as array
		
		//$("body").html("<h1>Definitions:</h1><pre>"+JSON.stringify(defs,null,3)+"</pre>");
		
		/*ds.get(defs.Category_1[0]).then(
			function(d){
			data = d;
			console.log("done");
			
		})*/
		makeMenu();
	}
)

makeMenu = function(){
	var menu = d3.select("body").append("div").attr("id", "accordion");
	var cat = menu.selectAll("div").data(Object.keys(defs)).enter().append("h3").text(function(d){return d});
	
	cat.append("div").attr("class", "accord-items")
		.selectAll("p").data(function(d){return defs[d]}).enter().insert("p").text(function(d){return d.chart_name});
	
	
	var items = $(".accord-items").detach();
	var headers = $("h3");
	
	$.each( headers, function( i, val ) {
		$(headers[i]).after(items[i]);
	});
	
	
	$( "p" ).on( "click", function() {
		$("p").removeClass("selected");
		$(this).addClass("selected");
		console.log($(this).prop("__data__"));
	});
	
	
	$( "#accordion" ).accordion({
		heightStyle: "content",
		collapsible: true,
	});
}