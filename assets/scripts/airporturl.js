function airporturl_init() {
    if (localStorage['airporturl'] === undefined) {
        localStorage['airporturl'] = JSON.stringify({});
    }
    var STORAGE = JSON.parse(localStorage['airporturl']);
    for (var icao in STORAGE) {
        airporturl_load(localStorage['au-' + icao]);
    }
}

function airporturl_set(icao, url) {
    var STORAGE = JSON.parse(localStorage['airporturl']);
    STORAGE[icao] = 1;
    localStorage['au-' + icao] = url;
    localStorage['airporturl'] = JSON.stringify(STORAGE);
}

function airporturl_del(icao) {
    var STORAGE = JSON.parse(localStorage['airporturl']);
    delete STORAGE[icao];
    delete localStorage['au-' + icao];
    localStorage['airporturl'] = JSON.stringify(STORAGE);
}

function airporturl_load(url) {
    var urlpart = url.split('/');
    icao = urlpart[urlpart.length - 1].replace('.json', '').toLowerCase();
    if (icao in prop.airport.airports) {
        console.log(icao + ": already loaded");
        return;
    }
    $.getJSON(url, function (data) {
        var airport = new Airport(data);
        airport_add(airport);
    });
    return true;
}
