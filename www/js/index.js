document.addEventListener('deviceready', onDeviceReady, false);

window.addEventListener("batterystatus", onBatteryStatus, false);
window.addEventListener("batterylow", onBatteryLow, false);

function onDeviceReady() {
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    applyDeviceData(device);
    checkConnection();
    navigator.geolocation.watchPosition(geolocationSuccess, geolocationError);
}

function geolocationSuccess(position) {
    $('#latitude').text(position.coords.latitude);
    $('#longitude').text(position.coords.longitude);
    $('#altitude').text(position.coords.altitude);
    $('#speed').text(position.coords.speed);
}

function geolocationError(error) {
    alert(error.code);
    alert(error.message);
}

function onBatteryLow(status) {
    alert("Battery Level Low " + status.level + "%");
}

function onBatteryStatus(status) {
    $('#batteryStatus').text(status.level);
    if (status.isPlugged) {
        $('#isPluggedLabel').removeClass('ui-checkbox-off');
        $('#isPluggedLabel').addClass('ui-checkbox-on');
    } else {
        $('#isPluggedLabel').removeClass('ui-checkbox-on');
        $('#isPluggedLabel').addClass('ui-checkbox-off');
    }
}

function checkConnection() {
    var networkState = navigator.connection.type;
    console.log(navigator.connection);

    var states = {};
    states[Connection.UNKNOWN] = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI] = 'WiFi connection';
    states[Connection.CELL_2G] = 'Cell 2G connection';
    states[Connection.CELL_3G] = 'Cell 3G connection';
    states[Connection.CELL_4G] = 'Cell 4G connection';
    states[Connection.CELL] = 'Cell generic connection';
    states[Connection.NONE] = 'No network connection';

    $('#connectionType').text(states[networkState]);
}

function applyDeviceData(device) {
    $('#cordovaVersion').text(device.cordova);
    $('#manufacturer').text(device.manufacturer);
    $('#isVirtual').text(device.isVirtual);
    $('#deviceModel').text(device.model);
    $('#operatingSystem').text(device.platform);
    $('#uuid').text(device.uuid);
    $('#serial').text(device.serial);
    $('#osVersion').text(device.version);
}