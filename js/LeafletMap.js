var map;
var layer;
var layerLabels;
//地图初始化
function init(){
	map = L.map('map').setView([30.56486,114.353622 ], 11);  
	//map = L.map('map').setView([45.526, -122.667], 13);
	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {foo: 'bar'}).addTo(map);
	
	loadWFS("urbanlayer:HubeiBoundary","EPSG:3857")
	
//	  var trees = L.esri.featureLayer({
//	    url: 'https://services.arcgis.com/rOo16HdIMeOBI4Mb/arcgis/rest/services/Heritage_Trees_Portland/FeatureServer/0'
//	  }).addTo(map);
	
	//http://localhost:8080/geoserver/urbanlayer/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=urbanlayer:HubeiBoundary&maxFeatures=50&outputFormat=application%2Fjson

//	//zoom in all features
//	trees.query().bounds(function (error, latlngbounds) {
//	    map.fitBounds(latlngbounds);
//	  });
//
//	//popup windows
//	trees.bindPopup(function (layer) {
//	    return L.Util.template('<p>{COMMON_NAM}<br>{SCIENTIFIC}<br>{NOTES}</p>', layer.feature.properties);
//	});
	
	
	//	L.esri.tiledMapLayer({
	//	  url: 'https://services.arcgisonline.com/ArcGIS/rest/services/USA_Topo_Maps/MapServer',
	//	  maxZoom: 12
	//	}).addTo(map);
	
	//L.esri.basemapLayer('Imagery').addTo(map);
	//L.esri.basemapLayer('ImageryLabels').addTo(map);

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
//设置底图
function setBasemap(basemap) {
    if (layer) {
      map.removeLayer(layer);
    }

    layer = L.esri.basemapLayer(basemap);
    map.addLayer(layer);

    if (layerLabels) {
      map.removeLayer(layerLabels);
    }

    if (basemap === 'Topographic'
       || basemap === 'Streets'
//   || basemap === 'TianDiTuSat'
//   || basemap === 'GoogleMap'
     || basemap === 'Imagery'
   ) {
      layerLabels = L.esri.basemapLayer(basemap + 'Labels');
      map.addLayer(layerLabels);
    }
  }

 function changeBasemap(basemaps){
    var basemap = basemaps.value;
    setBasemap(basemap);
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
			var rootWFS= 'http://localhost:8080/geoserver/urbanlayer/ows?';
			var u = rootWFS + L.Util.getParamString(param,rootWFS);
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