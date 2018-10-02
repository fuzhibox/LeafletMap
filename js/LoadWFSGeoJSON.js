var map;
//地图初始化
function init(){
	//定义地图中心及缩放级别
	map = L.map('map').setView([30.201885, 112.524585 ], 9);
	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {foo: 'bar'}).addTo(map);
	
	//WFS服务的完整路径
	var url = "http://localhost:8080/geoserver/Hubei/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Hubei%3AJingzhouCountyBoundary&maxFeatures=50&outputFormat=application%2Fjson"
	loadWFS('Hubei:JingzhouCountyBoundary',url) ;
	
}

//加载WFS的GeoJSON函数
function loadWFS(layerName,url) {
	var param = {
		service: 'WFS',
		version: '1.0.0',
		request: 'GetFeature',
		typeName: layerName,//图层名称
		outputFormat: 'application/json'
	};
	$.ajax({
		url : url,//WFS服务的完整路径
		dataType: 'json',
		success: loadWfsHandler,
	});
	var layer;
	function loadWfsHandler(data) {
		console.log(data);
		layer = L.geoJson(data, { 
			onEachFeature: function(feature, marker) {
	        		marker.bindPopup('<h4 style="color:'+feature.properties.color+'">'+'行政区名称：'+ feature.properties.name+'<br/>行政区编码：'+feature.properties.pac);
			}
			//style: style,
			//onEachFeature: EachFeatureFunction
		}).addTo(map);
	}
}

// get color depending on pac value
	function getColor(d) {
 		return d > 421080 ? '#800026' :
			       d > 421070  ? '#BD0026' :
			       d > 421060  ? '#E31A1C' :
			       d > 421050  ? '#FC4E2A' :
			       d > 421040   ? '#FD8D3C' :
			       d > 421030   ? '#FEB24C' :
			       d > 421020   ? '#FED976' :
		                 					 '#FFEDA0';
	}

	function style(feature) {
		return {
			weight: 2,
			opacity: 1,
			color: 'white',
			dashArray: '3',
			fillOpacity: 0.7,
			fillColor: getColor(feature.properties.pac)
		};
	}


function EachFeatureFunction(feature, layer){
	    if (feature.properties.name) {
	        layer.bindPopup('<h4 style="color:'+feature.properties.color+'">'+'行政区名称：'+ feature.properties.name+'<br/>行政区编码：'+feature.properties.pac);
	        layer.on({
		        mouseover: highlightFeature,
		        mouseout: resetHighlight,
		        //click: zoomToFeature
		    });
	    }
	}


	// HIGHLIGHT FEATURE = MOUSEOVER
	function onEachFeature(feature, layer) {
	    layer.on({
	        mouseover: highlightFeature,
	        mouseout: resetHighlight,
	        //click: zoomToFeature
	    });
	  }

	  // HIGHLIGHT FEATURE = MOUSEOVER
	  function highlightFeature(e) {
	      var layer = e.target;
	      layer.setStyle({
	          weight: 5,
	          color: '#888',
	          dashArray: '3',
	          fillOpacity: 0.5
	      });
	      if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
			layer.bringToFront();
		}
	  };
	
	  // HIGHLIGHT FEATURE = MOUSE LEFT
	function resetHighlight(e) {
	      geojson.resetStyle(e.target);
	  };
	
	// ZOOM TO THE REGION
	  function zoomToFeature(e) {
	    map.fitBounds(e.target.getBounds());
	}