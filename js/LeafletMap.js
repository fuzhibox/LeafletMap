var map;
var layer;
var layerLabels;
//地图初始化
function init(){
	//map = L.map('map').setView([30.56486,114.353622 ], 11);  
	map = L.map('map').setView([45.526, -122.667], 13);
	L.esri.basemapLayer('Imagery').addTo(map);

  var trees = L.esri.featureLayer({
    url: 'https://services.arcgis.com/rOo16HdIMeOBI4Mb/arcgis/rest/services/Heritage_Trees_Portland/FeatureServer/0'
  }).addTo(map);

  trees.bindPopup(function (layer) {
    return L.Util.template('<p>{COMMON_NAM}<br>{SCIENTIFIC}<br>{NOTES}</p>', layer.feature.properties);
  });
	
	
	//	L.esri.tiledMapLayer({
	//	  url: 'https://services.arcgisonline.com/ArcGIS/rest/services/USA_Topo_Maps/MapServer',
	//	  maxZoom: 12
	//	}).addTo(map);
	
	//L.esri.basemapLayer('Imagery').addTo(map);
	//L.esri.basemapLayer('ImageryLabels').addTo(map);

	//L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {foo: 'bar'}).addTo(map);

	//  L.tileLayer(	'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
	//	    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	//	    maxZoom: 18,
	//	    id: 'mapbox.streets',
	//	    accessToken: 'pk.eyJ1IjoiY29va2llcyIsImEiOiJjaW9sOGpwYjgwMGJtdmtqYmFieGYwcGR5In0.ot-rN7HEza9xJSijmrAOUQ'
	//	}).addTo(map);
	
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
     || basemap === 'Mapbox_street'
     || basemap === 'TianDiTuSat'
     || basemap === 'GoogleMap'
     || basemap === 'Gray'
     || basemap === 'DarkGray'
     || basemap === 'Imagery'
     || basemap === 'Terrain'
   ) {
      layerLabels = L.esri.basemapLayer(basemap + 'Labels');
      map.addLayer(layerLabels);
    }
  }

 function changeBasemap(basemaps){
    var basemap = basemaps.value;
    setBasemap(basemap);
 }