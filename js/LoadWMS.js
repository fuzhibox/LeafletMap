var map;
var layer;
var layerLabels;
//地图初始化
function init(){
	map = L.map('map').setView([30.201885, 112.524585 ], 18);  
	loadwms();
}

function loadwms(){
	//var hubei =loadwms();
	var url='http://localhost:8080/geoserver/Hubei/wms'
	const bounderLayer = L.tileLayer.wms(url, {
		layers: 'Hubei:ThreeLakeFarmRiceExperimentalPlot',
		format: "image/png",
		crs: L.CRS.EPSG3857,
		opacity: 0.5,
		transparent: true
	}).addTo(map);
}
