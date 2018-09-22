var map;
var layer;
var layerLabels;
//地图初始化
function init(){
	map = L.map("map").setView([30.56486,114.353622 ], 10);  
	L.esri.basemapLayer("Topographic").addTo(map);
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
     || basemap === 'Oceans'
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