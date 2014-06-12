var Datasource=function(e){var t=require("sqlite3").verbose(),n=require("when"),r=require("fast-csv");this.db=new t.Database(e,t.OPEN_READONLY);var i="chart_definitions2.csv";this.def;self=this;this.setup=function(){this.dfd=n.defer();this.res={};self=this;r.fromPath(i,{headers:!0}).on("record",this.pushResponse).on("end",this.resolveResponse);return this.dfd.promise};this.pushResponse=function(e){e.series_hash=e.series_hash.split(",").map(function(e){return e.replace(/\s+/g,"")});self.res.hasOwnProperty(e.category)||(self.res[e.category]=[]);self.res[e.category].push(e)};this.resolveResponse=function(){self.dfd.resolve(self.res)};this.get=function(e){var t=n.defer(),r=e.chart_type;this.getAll(e).then(function(e){r=="usmap"?t.resolve({usmap:{maps:{state:e[0][0],county:e[0][1]},data:e[1][0]}}):r=="worldmap"?t.resolve({worldmap:{map:e[0],data:e[1][0]}}):r=="scatter"?t.resolve({scatter:{x:e[0][0],y:e[0][1],size:e[0][2]}}):r=="line"&&t.resolve({line:{data:e}})});return t.promise};this.getAll=function(e){var t=[],r=e.chart_type,i=[];switch(r){case"usmap":t.push(this.getMaps(["state","county"]));break;case"worldmap":t.push(this.getMaps(["country"]))}t.push(this.getObservations(e.series_hash));return n.all(t)};this.getMaps=function(e){var t=[];e.forEach(function(e,n,r){t.push(self.getMap(e))});return n.all(t)};this.getObservations=function(e){var t=[];e.forEach(function(e,n,r){t.push(self.getObservation(e))});return n.all(t)};this.getMap=function(e){var t=n.defer(),r=[];self.db.get("SELECT geometry from geo WHERE region_type = ?",[e],function(e,n){var r=JSON.parse(n.geometry);t.resolve(r)});return t.promise};this.getObservation=function(e){var t=n.defer(),r=[];self.db.each("SELECT metadata from observations WHERE series_hash = ?",[e],function(e,t){var n=JSON.parse(t.metadata);r.push(n)},function(e,n){console.log(n+" rows transmitted ");t.resolve(r)});return t.promise}};