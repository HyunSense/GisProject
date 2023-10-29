let suji, cheoin, giheung;

suji = new ol.layer.Tile({
    source: new ol.source.TileWMS({
        url: 'http://localhost:8099/geoserver/wms',
        params: {
            'LAYERS': 'suji',
            'TILED': true,

        },
        serverType: 'geoserver',
    })
});

cheoin = new ol.layer.Tile({
    source: new ol.source.TileWMS({
        url: 'http://localhost:8099/geoserver/wms',
        params: {
            'LAYERS': 'cheoin',
            'TILED': true,

        },
        serverType: 'geoserver',
    })
});

giheung = new ol.layer.Tile({
    source: new ol.source.TileWMS({
        url: 'http://localhost:8099/geoserver/wms',
        params: {
            'LAYERS': 'giheung',
            'TILED': true,

        },
        serverType: 'geoserver',
    })
});

// 용인시 외각경계 레이어 추가
let yongin = new ol.layer.Tile({
    source: new ol.source.TileWMS({
        url: 'http://localhost:8099/geoserver/wms',
        params: {
            'LAYERS': 'yongin',
            'TILED': true,

        },
        serverType: 'geoserver',
    })
});


