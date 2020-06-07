
window.onload = () => {
    displayStores();
}

// Our global variables:
var map;
var markers = [];
var infoWindow;
// end of global variables

function initMap() {
    var losAngeles = {
       /* lat: 51.1807, 
        lng: 71.4610*/
        lat: 34.063380, 
        lng: -118.358080
    };
    map = new google.maps.Map(document.getElementById('map'), {
        center: losAngeles,
        zoom: 11,
        mapTypeId: 'roadmap',
    });
    infoWindow = new google.maps.InfoWindow();
    showStoresMarkers();
}

function displayStores() {
    var storesHTML = '';
    for(var [index, store] of stores.entries()) {
        var address = store['addressLines'];
        var phone = store['phoneNumber'];

        storesHTML += `
            <div class="store-container">
                <div class="store-info-container">
                    <div class="store-address">
                        <span>${address[0]}</span>
                        <span>${address[1]}</span>
                    </div>
                    <div class="store-phone-number">${phone}</div>
                </div>
                <div class="store-number-container">
                    <div class="store-number">
                        ${++index} 
                    </div>
                </div>
            </div>
        `
        document.querySelector('.stores-list').innerHTML = storesHTML; /*Selector of HTML within Javascript KEY CONTAINER here*/
    }
}

function showStoresMarkers() {
    var bounds = new google.maps.LatLngBounds();
    for(var [index, store] of stores.entries()) {

        var latlng = new google.maps.LatLng(
            store['coordinates']["latitude"],
            store['coordinates']["longitude"]);
        var name = store['name'];
        var address = store['addressLines'][0];
        bounds.extend(latlng);
        createMarker(latlng, name, address, index+1)
    }
    map.fitBounds(bounds);

}

function createMarker(latlng, name, address, index) {
    var html = "<b>" + name + "</b> <br/>" + address;
    var marker = new google.maps.Marker({
        map: map,
        position: latlng,
        label: index.toString()
    });
    google.maps.event.addListener(marker, 'click', function() {
        infoWindow.setContent(html);
        infoWindow.open(map, marker);
    });
    markers.push(marker);
}