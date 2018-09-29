var map;
var layer;
var layerLabels;
//地图初始化
function init(){
	map = L.map('map').setView([30.201885, 112.524585 ], 15);  
	//map = L.map('map').setView([45.526, -122.667], 13);
	
	//底图切换
	var openstreetmap=L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {foo: 'bar'});//.addTo(map);
	var mapboxstreet = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
	    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	    maxZoom: 18,
	    id: 'mapbox.streets',
	    accessToken: 'pk.eyJ1IjoibGl6eWFncnMiLCJhIjoiY2owOTAyMHo1MDdyMDJxb3VzOTB2czZmNSJ9.5iZSlr7iLwBh9ebR6KMGeg'
	})
	
	
	//荆州市县界
	var url='http://localhost:8080/geoserver/Hubei/wms'
	const JingzhouCountyBound = L.tileLayer.wms(url, {
		layers: 'Hubei:JingzhouCountyBound',
		format: "image/png",
		crs: L.CRS.EPSG3857,
		opacity: 0.5,
		transparent: true
	});
	
	//三湖农场边界
	const ThreeLakeFarmBound = L.tileLayer.wms(url, {
		layers: 'Hubei:ThreeLakeFarmBound',
		format: "image/png",
		crs: L.CRS.EPSG3857,
		opacity: 0.5,
		transparent: true
	});
	
	//三湖农场天顺合作社实验田块
	const ThreeLakeFarmRiceExperimentalPlot = L.tileLayer.wms(url, {
		layers: 'Hubei:ThreeLakeFarmRiceExperimentalPlot',
		format: "image/png",
		crs: L.CRS.EPSG3857,
		opacity: 0.5,
		transparent: true
	});
	
	//定义底图
	var baseMaps = {
	    "OpenstreetMap": openstreetmap,
	    "MapboxStreets": mapboxstreet
	};
	
	//定义专题图层
	var overlayMaps = {
		"JingzhouCountyBound": JingzhouCountyBound,
		"ThreeLakeFarmBound": ThreeLakeFarmBound,
	    "ThreeLakeFarmRiceExperimentalPlot": ThreeLakeFarmRiceExperimentalPlot
	};
	
	//加载底图与专题图层
	L.control.layers(baseMaps, overlayMaps).addTo(map);
	
	//loadWFS("Hubei:HubeiBoundary","EPSG:3857")

	var arcgisOnline = L.esri.Geocoding.arcgisOnlineProvider();

	  var searchControl = L.esri.Geocoding.geosearch({
	    providers: [
	      arcgisOnline,
	      L.esri.Geocoding.featureLayerProvider({
	        url: 'https://services.arcgis.com/uCXeTVveQzP4IIcx/arcgis/rest/services/gisday/FeatureServer/0/',
	        searchFields: ['Name', 'Organization'],
	        label: 'GIS Day Events',
	        bufferRadius: 5000,
	        formatSuggestion: function(feature){
	          return feature.properties.Name + ' - ' + feature.properties.Organization;
	        }
	      })
	    ]
	  }).addTo(map);
}
 
 //加载WFS服务
function loadWFS(layerName,epsg){
			var param = {
					service:'WFS',
					version:'1.0.0',
					request:'GetFeature',
					typeName:layerName,
					outputFormat:'application/json',
					srsName:epsg
			};
			var rootWFS= 'http://localhost:8080/geoserver/Hubei/ows?';
			var u = rootWFS + L.Util.getParamString(param,rootWFS);
			//alert('u=='+u);
			$.ajax({
				url: u, 
				dataType:'json',
				success:loadWfsHandler,
			});
			var layer;
			function loadWfsHandler(data){
				console.log(data);
				layer = L.geoJson(data,{
// 					style:function(feature){
// 						return {
// 							stroke:true,
// 							color:'#F80909',
// 							opacity: 1,
// 			                fillOpacity: 0.9,
// 			                fillColor: '#F80909',
// 							weight:5
// 						}
// 					},
					pointToLayer:function(featyre,latlng){
						
					}
				}).addTo(map);
			}
	} 
	

function loadwms(){
	var url='http://localhost:8080/geoserver/Hubei/wms?service=WMS?'
	const bounderLayer = L.tileLayer.wms("url", {
		layers: 'Hubei:HubeiBoundary',
		format: "image/png",
		crs: L.CRS.EPSG3857,
		opacity: 0.5,
		transparent: true
	});
	bounderLayer.addTo(map)	
}
