// set colors for the different types of schools and nurseries
var colorForGrundschule = '#0000ff';
var colorForHauptschule = '#4675a8';
var colorForRealschule = '#00B5FF';
var colorForGymnasium = '#00B5FF';
var colorForIgs = '#5882FA';

var colorForu3 = '#ff0000';
var colorForu6 = '#ff4444';

$(document).ready(function () {
    $('.filter').click(function () {
        setFilter($(this));
    });
    $('#search').click(function () {
        var searchElement = $(this);
        searchElement.keyup(function () {
            if (searchElement.val().length >= 3) {
                search(searchElement);
            }
            else {
                showAll();
            }
        });
    });
});

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
        var content = getSchoolContent(marker.feature);
        marker.bindPopup(content, {
            closeButton: false,
            minWidth   : 350
        });
    });

}

/**
 * Get school content for the popup.
 *
 * @param feature
 * @returns {string}
 */
function getSchoolContent(feature) {
    var popupContent = '<div>' +
        '<h3>' + feature.properties.name + '</h3></br>' +
        addWithNewLine(outputRow('Schulform', feature.properties.type), '') +
        addWithNewLine(outputRow('Beschreibung', feature.properties.description), '') +
        addWithNewLine(outputRow('Adresse', feature.properties.street + ', ' + feature.properties.postal + ', ' + feature.properties.district), '</br>') +
        '<strong>Kontaktinformationen: </strong></br>' +
        addWithNewLine(outputRow('Kontaktperson', feature.properties.contact_person), '') +
        addWithNewLine(outputRow('Telefon', feature.properties.phone), '') +
        addWithNewLine(outputRow('Fax', feature.properties.fax), '') +
        addWithNewLine(outputRow('Email-Adresse', feature.properties.email), '') +
        addWithNewLine(outputRow('Webseite', feature.properties.url), '') +
        addWithNewLine(outputRow('Öffnungszeiten', feature.properties.opening_hours), '') +
        '</div>';
    return popupContent;
}

/**
 *  Output a row of the popup.
 *
 * @param label
 * @param value
 * @returns {string}
 */
function outputRow(label, value) {
    if (value != '') {
        return '<strong>' + label + ':</strong> ' + value;
    }
    else {
        return '';
    }
}

/**
 * Add new line to a row of the popup.
 *
 * @param content
 * @param oneRow
 * @returns {string}
 */
function addWithNewLine(content, oneRow) {
    if (oneRow != '') {
        return content + '</br>' + oneRow;
    }
    else {
        return content + '</br>';
    }
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

/**
 * Set filter.
 *
 * @param filterElement
 * @returns {boolean}
 */
function setFilter(filterElement) {
    var filter = $(filterElement).attr('data-filter');

    // remove/add active classes
    $('.filter').removeClass("active");
    $(filterElement).addClass("active");

    // nurseries
    if (filter.indexOf("nursery") > -1) {
        switch (filter) {
            case 'nursery-all':
                nurseryLayer.setFilter(function (f) {
                    return true;
                });
                break;
            case 'nursery-u3':
                nurseryLayer.setFilter(function (f) {
                    return f.properties.type == 'u3';
                });
                break;
            case 'nursery-u6':
                nurseryLayer.setFilter(function (f) {
                    return f.properties.type == 'u6';
                });
                break;
            case 'nursery-o6':
                nurseryLayer.setFilter(function (f) {
                    return f.properties.type == 'o6';
                });
                break;
        }
        schoolLayer.setFilter(function (f) {
        });
        setNurseryLayer(nurseryLayer);
    }
    // schools
    else if (filter.indexOf("school") > -1) {
        switch (filter) {
            case 'school':
                schoolLayer.setFilter(function (f) {
                    return true;
                });
                break;
        }
        nurseryLayer.setFilter(function (f) {
        });
        setSchoolLayer(schoolLayer);
    }
    // show all
    else {
        showAll();
    }

    return false;
}

/**
 * Search
 *
 * @param searchElement
 */
function search(searchElement) {
    var searchString = $(searchElement).val().toLowerCase();

    nurseryLayer.setFilter(function (f) {
        return f.properties.description
                .toLowerCase()
                .indexOf(searchString) !== -1;
    });
    schoolLayer.setFilter(function (f) {
        return f.properties.description
                .toLowerCase()
                .indexOf(searchString) !== -1;
    });
    setSchoolLayer(schoolLayer);
    setNurseryLayer(nurseryLayer);
}

/**
 * SHow all layers.
 */
function showAll() {
    nurseryLayer.setFilter(function (f) {
        return true;
    });
    schoolLayer.setFilter(function (f) {
        return true;
    });
    setSchoolLayer(schoolLayer);
    setNurseryLayer(nurseryLayer);
}
