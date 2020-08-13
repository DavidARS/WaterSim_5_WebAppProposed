function addHideDashboardButton() {
    $("#settings-tabs-scenarios").append('<input type="button" value="Hide Dash" id="hideDashButton" onclick="hideDashboard()" class="button" / style="width:247px; margin-left: 10px">');
}

// STEPTOE: Don't display hide dashboard
//addHideDashboardButton();

function hideDashboard() {
    $("#dragResize-dashboard-off").hide()
}

function addShowDashboardButton() {
    $("#settings-tabs-scenarios").append('<input type="button" value="Show Dash" id="showDashButton" onclick="showDashboard()" class="button" / style="width:247px; margin-left: 10px">');
}

// STEPTOE: Don't display Dashboard
//addShowDashboardButton();

function showDashboard() {
    $("#dragResize-dashboard-off").show()
}

function addMultiWindowButton() {
    $("#settings-tabs-scenarios").append('<input type="button" value="Multi Window" id="multiWindowButton" onclick="multiWindowMode()" class="button" / style="width:247px; margin-left: 10px">');
}
// STEPTOE: Don't display Multiwindow
//addMultiWindowButton();

//Open All Chart types with sizes to fit into current window
function multiWindowMode() {

    var windowWidth = screen.width / 5;
    var windowHeight = screen.height;

    var sizeString = "width=" + windowWidth + ",height=" + windowHeight;

    //window.moveTo(0, 0);
    //window.resizeTo(windowWidth,windowHeight);

    newTab("?type=Supply", sizeString, windowWidth);

    newTab("?type=Demand", sizeString, windowWidth * 2);

    newTab("?type=Reservoirs", sizeString, windowWidth * 3);

    newTab("?type=Sustainability", sizeString, windowWidth * 4);
}

function addIsoMultiWindowButton() {
    $("#settings-tabs-scenarios").append('<input type="button" value="Iso Multi Window" id="isoMultiWindowButton" onclick="isoMultiWindowMode()" class="button" / style="width:247px; margin-left: 10px">');
}
// Hide IsoMultiWindow
//addIsoMultiWindowButton();

//Open All Chart types with sizes to fit into current window
function isoMultiWindowMode() {

    var windowWidth = screen.width / 5;
    var windowHeight = screen.height;

    var sizeString = "width=" + windowWidth + ",height=" + windowHeight;

    //window.moveTo(0, 0);
    //window.resizeTo(windowWidth,windowHeight);

    newTab("?type=Supply", sizeString, windowWidth);

    newTab("?type=Demand", sizeString, windowWidth * 2);

    newTab("?type=Reservoirs", sizeString, windowWidth * 3);

    newTab("?type=Sustainability", sizeString, windowWidth * 4);
}

function openSupplyWindow() {
    newTab("?type=Supply");
}
function openDemandWindow() {
    newTab("?type=Demand");
}
function openReservoirsRiversWindow() {
    newTab("?type=Reservoirs");
}
function openSustainabilityWindow() {
    newTab("?type=Sustainability");
}

var shiftPressed = false;
var ctrlPressed = false;
var altPressed = false;
var keyPressed = "";

$(document).keydown(function (e) {
    ctrlPressed = e.ctrlKey;
    shiftPressed = e.shiftKey;
    altPressed = e.altKey;
    if (keyPressed.indexOf(e.key) < 0) {
        keyPressed = keyPressed + e.key;
    }
}).keyup(function (e) {

    ctrlPressed = e.ctrlKey;
    shiftPressed = e.shiftKey;
    altPressed = e.altKey;
    if (keyPressed.indexOf(e.key) > -1) {
        keyPressed = keyPressed.replace(e.key, "");
    }
});

//Source: http://stackoverflow.com/questions/19491336/get-url-parameter-jquery
//Get URL parameter 'name'
$.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results == null) {
        return null;
    }
    else {
        return results[1] || 0;
    }
}

$(document).ready(function () {

    // STEPTOE EDIT 07/25/16
    // Update selectors to use href tags for identification
    $('a[href="#tabs-2"]').click(function () {
        if (keyPressed == "dt") {            
            openSupplyWindow();
        }
        else
            if (shiftPressed && ctrlPressed) {                
                openSupplyWindow();
            }
    });

    $('a[href="#tabs-3"]').click(function () {
        if (keyPressed == "dt") {
            openDemandWindow();
        }
        else
            if (shiftPressed && ctrlPressed) {
                openDemandWindow();
            }
    });

    $('a[href="#tabs-4"]').click(function () {
        if (keyPressed == "dt") {
            openReservoirsRiversWindow();
        }
        else
            if (shiftPressed && ctrlPressed) {
                openReservoirsRiversWindow();
            }
    });

    $('a[href="#tabs-5"]').click(function () {
        if (keyPressed == "dt") {
            openSustainabilityWindow();
        }
        else
            if (shiftPressed && ctrlPressed) {
                openSustainabilityWindow();
            }
    });

    // STEPTOE EDIT 07/25/16

    // Make geography tab active
    $('[aria-controls="settings-tabs-geography-2"] a').click();

    // Hide Temporal tab button
    //$('[aria-controls="settings-tabs-geography-1"]').hide();

    // Hide 'Point-in-time' Temporal control
    $('#settings-tabs-geography-1 h3').first().hide();
    var login = $.urlParam('login');
    if (showLogin || login != null) {
        $('body').append(
            '<div id="dialog-login" title="Login">' +
                '<label for="groupName">Please enter a group name:</label>' +
                '<input type="text" id="groupName" name="groupName" style="width:150px;"><br>' +
                '<label for="userName">Please enter a username (if applicable):</label>' +
                '<input type="text" id="userName" name="userName" style="width:150px;"><br>' +
			    '</div>' +
            '</div>'
        );

        $("#dialog-login").dialog({
            autoOpen: false,
            resizable: false,
            closeOnEscape: false,
            height: 180,
            width: 500,
            modal: true,
            open: function(event, ui) {
                $(".ui-dialog-titlebar-close", ui.dialog | ui).hide();
                $('.ui-widget-overlay.ui-front').css('z-index', 150);
                $("#dialog-login").parent().css('z-index', 151);
            },
            buttons: {
                "Login": {
                    click: function () {
                        console.log($('#groupName').val() + ', ' + $('#userName').val());
                        if ($('#groupName').val().trim().length) {
                            $('.ui-widget-overlay.ui-front').css('z-index', 'auto');
                            $("#dialog-login").parent().css('z-index', 'auto');
                            $(this).dialog("close");
                        }
                        else {
                            alert("Please enter a valid Group Name.");
                        }
                    },
                    'class': 'button',
                    text: 'Login'
                }
            }
        });

        $("#dialog-login").dialog("open");
    }
    
});
//********************************************************
// Begin Communication Code
//********************************************************

//Standard Communication Strings
var dataRequestString = 'requesting data';
var dataSentString = 'Sending requested data';
var callWebServSuccessString = 'callWebService Success';
var callWebServFailString = 'callWebService Failure';
var temporalRadioChangeString = 'temporal radio change';
var geographyRadioChangeString = 'geography radio change';
var loadingString = 'loading';
var selectedProvidersChangeString = 'selected providers change';

//Get Selected Providers to pass to Charts.aspx
function getSelectedProviders() {
    var selectedProviders = $('.chosen-select').val(),
        providers = {};
    for (var i in selectedProviders)
        providers[selectedProviders[i]] = providerInfo[selectedProviders[i]];

    return JSON.stringify(providers)
}
//Get Window's path to open Charts.aspx
function getPath() {
    var path = window.location.href;
    // Remove login parameter from path
    if (path.indexOf("?login") > -1) {
        path = path.substr(0, path.indexOf("?login"));
    }
    // Remove webpage from path
    if (path.indexOf("Default.aspx") > -1) {
        path = path.replace("Default.aspx", "");
    }
    return path + "Charts.aspx";
}
//Communication data container
var Com = {
    connection: [],
    attempt: [],
    timeout: [],
    chartWindow: [],
    chartWindowPath: getPath(),
    windowType: 'Default',
    provider: 'reg',
    data: null
}
//Adds window event handler to recieve messages from other windows
function communication() {
    window.addEventListener('message', function (event) {
        //console.log("receive something ", event);
        try {
            var data = JSON.parse(event.data);

            if (data.message === "FirstConnectionReceive") {
                Com.connection[data.id] = true;
                //console.log("Connected to Chart page: " + data.id);
            }
            else if (Com.connection[data.id]) {
                //Connection has been established process message
                //console.log(data.message);
                //If message has a windowType check for a message
                if (data.hasOwnProperty('source')) {
                    //If initial data is being requested send it
                    if (data.message == dataRequestString) {
                        sendRequestedData(event.source, event.origin);
                    }
                }
            }
        } catch (e) {
            console.log('invalid json', data);
        }
        //console.log(event);
    });
}
//Send connection message to window #index
//If attempted 10 times the connection failed (window closed before connection completed)
function initCommunication(index) {
    if (!Com.connection[index] && Com.attempt[index] < 10) {
        var data = {
            source: Com.windowType,
            message: "FirstConnection",
            id: index
        }
        Com.attempt[index]++;
        Com.chartWindow[index].postMessage(JSON.stringify(data), Com.chartWindowPath);

        //console.log("Connecting...");
        Com.timeout[index] = setTimeout(initCommunication, 5000, index);
    }
    else if (Com.attempt[index] == 10) {
        //console.log("Connection to Window #" + index + " failed.");
    }
}
//Open a new window with specified params and begin communication
function newTab(paramType, size, windowLocation) {

    // STEPTOE EDIT 07/25/16
    // Reset hotkeys, after each new tab is opened
    keyPressed = "";
    shiftPressed = false;
    ctrlPressed = false;

    if (typeof (paramType) != "undefined" && paramType != null) {
        if (typeof (size) != "undefined" && size != null) {
            var tempWindow = window.open(Com.chartWindowPath + paramType, "_blank", "location=no,toolbar=no,menubar=no,scrollbars=yes,resizable=yes" + size);
            Com.chartWindow.push(tempWindow);
            tempWindow.moveTo(windowLocation, 0);
        }
        else
            Com.chartWindow.push(window.open(Com.chartWindowPath + paramType, "_blank", "location=no,toolbar=no,menubar=no,scrollbars=yes,resizable=yes"));
    }
    else {
        if (typeof (size) != "undefined" && size != null) {
            var tempWindow = window.open(Com.chartWindowPath, "_blank", "location=no,toolbar=no,menubar=no,scrollbars=yes,resizable=yes" + size);
            Com.chartWindow.push(tempWindow);
            tempWindow.moveTo(windowLocation, 0);
        }
        else
            Com.chartWindow.push(window.open(Com.chartWindowPath, "_blank", "location=no,toolbar=no,menubar=no,scrollbars=yes,resizable=yes"));
    }

    Com.connection.push(false);
    Com.attempt.push(0);
    initCommunication(Com.chartWindow.length - 1);
}
//Send data to setup initial Charts state
function sendRequestedData(source, sourcePath) {
    //console.log(dataSentString);
    var data = {
        source: Com.windowType,
        message: dataSentString,
        testData: Com.data,
        infoRequestJSON: infoRequestJSON,
        strtYr: strtYr,
        endYr: endYr,
        provider: Com.provider,
        providerInfo: getSelectedProviders()
    }
    source.postMessage(JSON.stringify(data), sourcePath);
}
//Send webService data to all windows, called when the model is ran
function sendWebServData(testData) {
    //console.log(callWebServSuccessString);
    Com.data = testData;
    var data = {
        source: Com.windowType,
        message: callWebServSuccessString,
        testData: testData,
        providerInfo: getSelectedProviders()
    }
    for (var i = 0; i < Com.chartWindow.length; i++)
        Com.chartWindow[i].postMessage(JSON.stringify(data), Com.chartWindowPath);
}
//Send Temporal Radio Change to all windows, called when radio is changed
function sendTemporalRadioChange() {
    //console.log(temporalRadioChangeString);
    var data = {
        source: Com.windowType,
        message: temporalRadioChangeString,
        strtYr: strtYr,
        endYr: endYr
    }
    for (var i = 0; i < Com.chartWindow.length; i++)
        Com.chartWindow[i].postMessage(JSON.stringify(data), Com.chartWindowPath);
}
//Send Geography Radio Change to all windows, called when radio is changed
function sendGeographyRadioChange(provider) {
    //console.log(geographyRadioChangeString);
    Com.provider = provider;
    var data = {
        source: Com.windowType,
        message: geographyRadioChangeString,
        provider: provider
    }
    for (var i = 0; i < Com.chartWindow.length; i++)
        Com.chartWindow[i].postMessage(JSON.stringify(data), Com.chartWindowPath);
}
//Tell all windows to display loading screen, called when waiting for model to finish
function sendLoading() {
    //console.log(loadingString);
    //Don't want show Splash Screen
    //var data = {
    //    source: Com.windowType,
    //    message: loadingString
    //}
    //for (var i = 0; i < Com.chartWindow.length; i++)
    //    Com.chartWindow[i].postMessage(JSON.stringify(data), Com.chartWindowPath);
}
//Send Selected Providers Change to all windows, called when the provider selection has changed
function sendSelectedProvidersChange() {
    var data = {
        source: Com.windowType,
        message: selectedProvidersChangeString,
        providerInfo: getSelectedProviders()
    }
    for (var i = 0; i < Com.chartWindow.length; i++)
        Com.chartWindow[i].postMessage(JSON.stringify(data), Com.chartWindowPath);
}
//Enable Communication
communication();