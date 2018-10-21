var map;
//地图初始化
function init(){
	//定义地图中心及缩放级别
	map = L.map('map').setView([30.201885, 112.524585 ], 9);
	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {foo: 'bar'}).addTo(map);
	
	//WFS服务的完整路径
	var url = "http://47.106.158.161:6060/geoserver/Hubei/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Hubei%3AJingzhouCountyBoundary&maxFeatures=50&outputFormat=application%2Fjson"
	
	var YangziRiver_MiddlePro_GeoJSON = L.geoJson(null, { 
		onEachFeature: function(feature, marker) {
				marker.bindPopup('<h4 style="color:'+feature.properties.color+'">'+'行政区名称：'+ feature.properties.name+'<br/>行政区编码：'+feature.properties.pac);
		}
		
	}).addTo(map);
	//ajax调用
	$.ajax({
		url: url, //WFS服务的完整路径
		dataType: 'json',
		outputFormat: 'text/javascript',
		success: function(data) {
			//将调用出来的结果添加至之前已经新建的空geojson图层中
			YangziRiver_MiddlePro_GeoJSON.addData(data);
		},
	});
}