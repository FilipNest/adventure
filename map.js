var map = L.mapbox.map('map', 'filipnest.ga46fcfi')
    .setView([51.53333600874287, -0.1788496971130371 ], 17);

map.on('click', function(e) {
var lat = e.latlng.lat;
var lng = e.latlng.lng;
var marker = L.marker([lat, lng]).addTo(map);
newpoint();
});