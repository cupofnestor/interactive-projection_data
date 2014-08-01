var Datasource=function(e){var t=require("sqlite3").verbose(),n=require("when"),r=require("fast-csv");this.db=new t.Database(e,t.OPEN_READONLY);this.db.on("trace",function(e){console.log(e)});var i="chart_definitions.csv",s="line_annotations.csv";this.def;this.annotations=[];self=this;this.setup=function(){this.dfd=n.defer();this.res={};self=this;r.fromPath(i,{headers:!0}).on("record",this.pushResponse).on("end",this.resolveResponse);r.fromPath(s,{headers:!0}).on("record",function(e){var t=e.date;e.date=new Date(t);self.annotations.push(e);console.log(e)});return this.dfd.promise};this.pushResponse=function(e){e.series_hash=e.series_hash.split(",").map(function(e){return e.replace(/\s+/g,"")});self.res.hasOwnProperty(e.category)||(self.res[e.category]=[]);self.res[e.category].push(e)};this.resolveResponse=function(){self.dfd.resolve(self.res)};this.get=function(e){var t=n.defer(),r=e.chart_type;console.log("type ",r);this.getAll(e).then(function(e){console.log("GOT ALL ");r=="usmap"?t.resolve({usmap:{maps:{state:e[0][0],county:e[0][1]},data:e[1][0]}}):r=="worldmap"?t.resolve({worldmap:{map:e[0],data:e[1][0]}}):r=="scatter"?t.resolve({scatter:{x:e[0][0],y:e[0][1],size:e[0][2]}}):r=="line"&&t.resolve({line:{data:e,annotations:self.annotations}})});return t.promise};this.getAll=function(e){var t=[],r=e.chart_type;console.log("type ",r);var i=[];switch(r){case"usmap":t.push(this.getMaps(["state","county"]));break;case"worldmap":t.push(this.getMaps(["country"]))}t.push(this.getObservations(e.series_hash));return n.all(t)};this.getMaps=function(e){var t=[];e.forEach(function(e,n,r){t.push(self.getMap(e))});return n.all(t)};this.getObservations=function(e){var t=[];e.forEach(function(e,n,r){t.push(self.getObservation(e))});return n.all(t)};this.getMap=function(e){var t=n.defer(),r=[];self.db.get("SELECT geometry from geo WHERE region_type = ?",[e],function(e,n){var r=JSON.parse(n.geometry);n=null;t.resolve(r)});return t.promise};this.getObservationTest=function(e){var t=n.defer(),r=[];self.db.all("SELECT observation from observations WHERE series_hash = ?",[e],function(e,n){console.log("error: ",e);t.resolve(n);n=null});return t.promise};this.getObservation=function(e){var t=n.defer(),r=[];self.db.each("SELECT observation from observations WHERE series_hash = ?",[e],function(e,n){if(e)t.reject(e);else{console.log("row");var i=JSON.parse(n.observation);r.push(i)}},function(e,n){if(e)t.reject(e);else{console.log(n+" rows transmitted ");t.resolve(r)}});return t.promise}};