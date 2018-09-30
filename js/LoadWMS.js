var map;
//地图初始化
function init(){
	//openstreetmap底图
	var openstreetmap=L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {foo: 'bar'});
	// mapbox-street底图
	var mapboxstreet = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
	    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	    maxZoom: 18,
	    id: 'mapbox.streets',
	    accessToken: 'pk.eyJ1IjoibGl6eWFncnMiLCJhIjoiY2owOTAyMHo1MDdyMDJxb3VzOTB2czZmNSJ9.5iZSlr7iLwBh9ebR6KMGeg'
	})

	//天地图
	var normalm = L.tileLayer.chinaProvider('TianDiTu.Normal.Map', {
			maxZoom: 18,
			minZoom: 5
		}),
		normala = L.tileLayer.chinaProvider('TianDiTu.Normal.Annotion', {
			maxZoom: 18,
			minZoom: 5
		}),
		imgm = L.tileLayer.chinaProvider('TianDiTu.Satellite.Map', {
			maxZoom: 18,
			minZoom: 5
		}),
		imga = L.tileLayer.chinaProvider('TianDiTu.Satellite.Annotion', {
			maxZoom: 18,
			minZoom: 5
		});
	var TDnormal = L.layerGroup([normalm, normala]),
		   TDimage = L.layerGroup([imgm, imga]); 
		//谷歌
	var GoogleMap = L.tileLayer.chinaProvider('Google.Normal.Map', {
			maxZoom: 18,
			minZoom: 5
		}),
		Googlesatellite = L.tileLayer.chinaProvider('Google.Satellite.Map', {
			maxZoom: 18,
			minZoom: 5
		}); 
		//高德地图
	var Gaode = L.tileLayer.chinaProvider('GaoDe.Normal.Map', {
		maxZoom: 18,
		minZoom: 5
	});
	var Gaodimgem = L.tileLayer.chinaProvider('GaoDe.Satellite.Map', {
		maxZoom: 18,
		minZoom: 5
	});
	var Gaodimga = L.tileLayer.chinaProvider('GaoDe.Satellite.Annotion', {
		maxZoom: 18,
		minZoom: 5
	});
	var Gaodimage = L.layerGroup([Gaodimgem, Gaodimga]);
	
	
	//定义地图中心及缩放级别
	map = L.map('map').setView([30.201885, 112.524585 ], 9);
	//地图服务地址
	var url='http://47.106.158.161:6060/geoserver/Hubei/wms'
	//构建专题地图服务连接串
	const bounderLayer  = L.tileLayer.wms(url, {
		layers: 'Hubei:JingzhouCountyBoundary',
		format: "image/png",
		crs: L.CRS.EPSG3857,
		opacity: 0.5,
		transparent: true
	});//.addTo(map);
	//定义底图
	var baseMaps = {
	    "OpenstreetMap": openstreetmap,
	    "MapboxStreets": mapboxstreet,
	    "天地图": TDnormal,
        "天地图影像": TDimage,
        "谷歌地图": GoogleMap,
        "谷歌影像": Googlesatellite,
        "高德地图": Gaode,
        "高德影像": Gaodimage
	};
	//定义专题图层
	var overlayMaps = {
		"荆州县行政区边界": bounderLayer 
	};
	//加载底图与专题图层
	L.control.layers(baseMaps, overlayMaps).addTo(map);
}
