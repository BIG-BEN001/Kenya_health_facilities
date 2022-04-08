var map = L.map('map').setView([1.2921, 36.8219], 8);
// var layer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
//     attribution: 'BENJAMIN',
//     maxZoom: 18,
//     id: 'mapbox/streets-v11',
//     tileSize: 512,
//     zoomOffset: -1,
//     accessToken: 'pk.eyJ1IjoiYmlnLWJlbiIsImEiOiJja29qb29qeTAwd2RjMndqejB6ejh0Z285In0.2r2ZphVzJWp3PbwOXPb4ww'
// }).addTo(map);

// L.esri.basemapLayer('Streets', {
//     attribution: 'BIG_BEN',
//     maxZoom: 20,
//     minZoom: 1
//     }).addTo(map);

var googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
    maxZoom: 30,
    subdomains:['mt0','mt1','mt2','mt3'],
    
}).addTo(map);

// var myLatlng = new google.maps.LatLng(-34.397, 150.644);
// var mapOptions = {
//   zoom: 8,
//   center: myLatlng,
//   mapTypeId: 'satellite'
// };
// var map = new google.maps.Map(document.getElementById('map'),
//     mapOptions);

var countyPops = L.esri.featureLayer({
    url: 'https://services8.arcgis.com/M8cCPjM7UQWc3iHk/arcgis/rest/services/Kenya_County_Population/FeatureServer/0'
}).addTo(map);

// var countiesLayer = L.geoJSON(kenya_counties).addTo(map);
var healthLayer = L.geoJSON(kenya_health);

var markers = new L.MarkerClusterGroup();

markers.addLayer(healthLayer);

map.addLayer(markers);


countyPops.on('click', function(e){
    selectedCounty = e.layer.feature.properties;
    displaySelected();
});


var selectedCounty = {};

function displaySelected() {
    const html = `
    <h4>${selectedCounty.COUNTYNAME} County statistics</h4>
    <table class="table">
        <tbody>
            <thead>
                <tr><td><h6>Property</h6></td><td><h6>Value</h6></td></tr>
            </head>
            <tr>
                <th>County Code</th>
                <td>${selectedCounty.COUNTYCODE}</td>
                
            </tr>
            <tr>
                <th>Female</th>
                <td>${toNumber(selectedCounty.FEMALE)}</td>
            </tr>
            <tr>
                <th>Male</th>
                <td>${toNumber(selectedCounty.MALE)}</td>
            </tr>
            <tr>
                <th>Intersex</th>
                <td>${toNumber(selectedCounty.INTERSEX)}</td>
            </tr>
            <tr>
                <th>Total</th>
                <td>${toNumber(selectedCounty.TOTAL)}</td>
            </tr>
        </tbody>
    </table>
    `

    $("#selected").html(html);
}

function toNumber(number) {
    return new Intl.NumberFormat().format(number);
}



healthLayer.on('click', function(e){
    selectedFeature = e.layer.feature.properties;
    displayFeature();
});
var selectedFeature = {};
function displayFeature() {
    const html = 
    `
    <h4>${selectedFeature.F_NAME}</h4>
    <table class="table">
        <tbody>
            <thead>
                <tr>
                    <td>
                        <h6>Property</h6>
                    </td>
                    <td>
                        <h6>Value</h6>
                    </td>
                </tr>
            </head>
            <tr>
                <th>DISTRICT</th>
                <td>${selectedFeature.DIST}</td>
            </tr>
            <tr>
                <th>DIVISION</th>
                <td>${selectedFeature.DIVISION}</td>
            </tr>
            <tr>
                <th>AGENCY</th>
                <td>${selectedFeature.AGENCY}</td>
            </tr>
        </tbody>
    </table>
    `

    $("#selected2").html(html);
}


// function setBasemap(basemap) {
//     if (layer) {
//       map.removeLayer(layer);
//     }
//     layer = L.esri.basemapLayer(basemap);
//     map.addLayer(layer);
//     if (layerLabels) {
//       map.removeLayer(layerLabels);
//     }

//     if (basemap === 'ShadedRelief' || basemap === 'Oceans' || basemap === 'Gray' || basemap === 'DarkGray' || basemap === 'Imagery' || basemap === 'Terrain') {

//       layerLabels = L.esri.basemapLayer(basemap + 'Labels');
//       map.addLayer(layerLabels);
//     }
//   }

//   var basemaps = document.getElementById('basemaps');

//   basemaps.addEventListener('change', function(){
//     setBasemap(basemaps.value);
//   });
  