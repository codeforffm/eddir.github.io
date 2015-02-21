// initialize map
L.mapbox.accessToken = 'pk.eyJ1IjoiY29kaW5nbmVyZCIsImEiOiJYLW9jYVJvIn0.m-tcfOvsVMChr2IkVp3KRg';
var map = L.mapbox.map('map', 'codingnerd.l99bah5a').setView([50.121212, 8.6365638], 13);

// add schools and kitas
var schoolLayer = L.mapbox.featureLayer(schools).addTo(map);
var nurseryLayer = L.mapbox.featureLayer(nurseries).addTo(map);

// bound to
//map.fitBounds(schoolLayer.getBounds(schools));

// set the pins to the layers
setSchoolLayer(schoolLayer);
setNurseryLayer(nurseryLayer);
