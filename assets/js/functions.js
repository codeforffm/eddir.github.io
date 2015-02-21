// set colors for the different types of schools and nurseries
var colorForGrundschule = '#0000ff';
var colorForHauptschule = '#4675a8';
var colorForRealschule = '#00B5FF';
var colorForGymnasium = '#00B5FF';
var colorForIgs = '#5882FA';

var colorForu3 = '#ff0000';
var colorForu6 = '#ff4444';

/**
 * Add the school pins to the map and set the color according to the school type.
 *
 * @param layer
 */
function setSchoolLayer(layer) {
    layer.eachLayer(function (marker) {
        var markerJson = marker.toGeoJSON();
        switch (markerJson['properties']['type']) {
            case 'Grundschule':
                marker.setIcon(L.mapbox.marker.icon({
                    'marker-size'  : 'large',
                    'marker-color' : colorForGrundschule,
                    'marker-symbol': 'school'
                }));
                break;
            case 'Hauptschule':
                marker.setIcon(L.mapbox.marker.icon({
                    'marker-size'  : 'large',
                    'marker-color' : colorForHauptschule,
                    'marker-symbol': 'school'
                }));
                break;
            case 'Realschule':
                marker.setIcon(L.mapbox.marker.icon({
                    'marker-size'  : 'large',
                    'marker-color' : colorForRealschule,
                    'marker-symbol': 'school'
                }));
                break;
            case 'Gymnasium':
                marker.setIcon(L.mapbox.marker.icon({
                    'marker-size'  : 'large',
                    'marker-color' : colorForGymnasium,
                    'marker-symbol': 'school'
                }));
                break;
            case 'IGS':
                marker.setIcon(L.mapbox.marker.icon({
                    'marker-size'  : 'large',
                    'marker-color' : colorForIgs,
                    'marker-symbol': 'school'
                }));
                break;
        }
    });

}

/**
 * Add the nursery pins to the map and set the color according to the nursery type.
 *
 * @param layer
 */
function setNurseryLayer(layer) {
    layer.eachLayer(function (marker) {
        var markerJson = marker.toGeoJSON();
        switch (markerJson['properties']['type']) {
            case 'u3':
                marker.setIcon(L.mapbox.marker.icon({
                    'marker-size'  : 'large',
                    'marker-color' : colorForu3,
                    'marker-symbol': 'school'
                }));
                break;
            case 'u6':
                marker.setIcon(L.mapbox.marker.icon({
                    'marker-size'  : 'large',
                    'marker-color' : colorForu6,
                    'marker-symbol': 'school'
                }));
                break;
        }
    });
}
