/// <reference path="/Scripts/Custom/Charts/ChartTools.js" />
/// <reference path="/Scripts/Custom/Charts/AreaChart.js" />
/// <reference path="/Scripts/Custom/Charts/DrillDownChartBO.js" />
/// <reference path="/Scripts/Custom/Charts/DrillDownColumnChartBO.js" />
/// <reference path="/Scripts/Custom/Charts/DrillDownLineChartTEMP.js" />
/// <reference path="/Scripts/Custom/Charts/DrillDownPieColumnChartMF.js" />
/// <reference path="/Scripts/Custom/Charts/DrillDownPieColumnChartMP.js" />
/// <reference path="/Scripts/Custom/Charts/DrillDownSingleColumnChart.js" />
/// <reference path="/Scripts/Custom/Charts/HighStocks.js" />
/// <reference path="/Scripts/Custom/Charts/LineChartMP.js" />
/// <reference path="/Scripts/Custom/Charts/ProviderChart.js" />
/// <reference path="/Scripts/Custom/Charts/StackedAreaChart.js" />
/// <reference path="/Scripts/Custom/Charts/StackedColumnChart.js" />
/// <reference path="/Assets/indicators/Scripts/IndicatorControl_v_4.js" />
/// <reference path="/Assets/indicators/Scripts/reportindicator.js" />
/// <reference path="/Assets/indicators/Scripts/indicatorsCore_v2.js" />
/// <reference path="/Scripts/Custom/Add/PriorOutputControl.js" />
/// <reference path="/Scripts/Highcharts/highcharts.js" />


// Intial code
//Sampson edit 08.13.14,08.28.14,10.01.14,03.09.15
// Moved to 16.1.1. on 1 October, 2014
// 16a.1.2 on 10 October, 2014
// to 19.3.2 on 5 March, 2015
// 06.01.15 - version 20.0.0
// 08.04.15 - version 22.5 [das](Michael fixed the load base scenario, and splash screen
//08.20.15 - version 22.7 [das] (moving the climate/drought tab)
// 09.19.16 - version 22.8.2 [das] reduced side content padding and sidebar - new inputs from API for controls
// ??.??.?? - version 22.9.0 [missed these updates]
// 02.09.17 - versin 22.9.5 [das] Michael added a dependency for Ag water transfer (for efficiency control)
// 02.17.17 - version 22.9.6 [das] Michael addded the control to hide or show the popup icon via the URL 
//                           and he removed the scroll icons in the input text boxes
// 06.30.17 - version 23.3.0 [das] Fix for charts on the compare TAB
// 10.12.17 - version 23.3.1 [das] update DCDC logo for break-out tabs, update the CO Mead Reservoir input label,
//           and I added the redraw code to update graph data for DrillDownChartBO.js and ProvidersChart.js
// -----------------------------------------------------------------------------------------------------------
// UI Version
var myTime = new Date();

var WaterSimVersion = "UI: 23.3.1  ";
var UI = WaterSimVersion.fontsize(1);
var INFO_REQUEST = null;
var showLogin = false;
var showSubcontrols = false;
//function SetVersion(theVersion) {
//    console.log('theVersion:', theVersion);
//    $("#VersionInfo").html(theVersion);
//}
function SetVersion(theVersion) {
    $("#UI").html(theVersion);

}
function SetWeb(theVersion) {
    $("#Web").html(theVersion);

}

function API(theVersion) {
    $("#Version").html(theVersion);
}

function Model(theVersion) {
    $("#Model").html(theVersion);
}

//Remove inforequest from the body of the page
function remove_hvJSONData() {
    $('#hvJSONData').remove();
}

// ---------------------------------------------------------
//getting inforequest json data

if (getWindowType() != 'Charts') {
    var infoRequestJSON = $('input[id$=JSONData]').val();
    INFO_REQUEST = JSON.parse(infoRequestJSON);
    localStorage.clear();
    //setting a default name to active scenario
    if (!localStorage.actvScenario) {
        localStorage.BaseScenario = "Base";
        localStorage.actvScenario = "Base";
        localStorage.scenarioList = "";
    }

    //STEPTOE EDIT BEGIN 07/26/16 City Selection
    //Remove initial json information from html page 
    remove_hvJSONData();

    var providerInfo = {};
    var providersAdded = false;
    //store all available providers and their codes 
    function setupProviderInfo() {
        var options = $('.chosen-select option');

        for (var i in options) {
            providerInfo[options[i].value] = options[i].text;
        }
    }
    setupProviderInfo();
    //STEPTOE EDIT END 07/26/16 City Selection
}

//STEPTOE EDIT BEGIN 07/26/16 City Selection
//Enable/Disable the 'Load Selected Providers' button
function toggleLoadProviders(condition) {
    if (!$('#loadProviders').prop('disabled') || condition) {
        $('#loadProviders').switchClass("button-no-hover-active", "button-no-hover");
        $('#loadProviders').prop('disabled', true);
    }
    else {
        $('#loadProviders').switchClass("button-no-hover", "button-no-hover-active");
        $('#loadProviders').prop('disabled', false);
    }
}
//Update Geography options on all charts
function updateGeographyOptions() {
    var providers = $('.chosen-select').chosen().val();

    //Get the current selected provider for each chart
    var selectedOptions = $(".ddlflds option:selected"),
    valArray = [];
    for (var i = 0; i < selectedOptions.length; i++) {
        valArray.push(selectedOptions[i].value);
    }

    //Remove all providers from each chart and set them to the proivders
    //recieved
    $(".ddlflds").html('');
    for (var i in providers) {
        $('.ddlflds')
            .append($("<option></option>")
            .attr("value", providers[i])
            .text(providerInfo[providers[i]]));
    }

    //Set the selected proivder to the previous selection if available
    //for each chart
    for (var i = 0; i < valArray.length; i++) {
        $('.ddlflds')[i].value = valArray[i];

        if ($('.ddlflds')[i].value == "") {
            $('.ddlflds')[i].value = $('.ddlflds')[i].options[0].value;
        }
    }
}

//If the page is not Charts.aspx then setup the Chosen-JS Selector
//and the 'Load Selected Providers' button
if (getWindowType() != 'Charts') {
    $(document).ready(function () {
        //Initialize selector to be a Chosen selector
        $('.chosen-select').chosen({
            width: "100%",
            max_selected_options: 6
        });

        //When the selecter's values change enable the 'Load Selected Providers' button
        //if there are providers available.
        //Option: #1 or #2 provide the ability to update the provider list for each chart
        //as changes to the selector occur
        $('.chosen-select').chosen().change(function (evt, params) {
            var providers = $(this).chosen().val();

            //Use this code segment to update the provider lists as the selects and deselects
            for (var i in params) {
                if (i == 'selected') {
                    //#1 Uncomment here to add new provider to charts as they are selected
                    // $('.ddlflds')
                    //.append($("<option></option>")
                    //.attr("value", params[i])
                    //.text(providerInfo[params[i]]));
                    //providersAdded = true;
                }
                else if (providers != null && providers.length > 0) {
                    //#1 Uncommenting two sections below allows for list to be updated on removal of providers
                    //However does not handle the case of there being no providers left that there is data for
                    //$(".ddlflds option[value='" + params[i] + "']").remove();

                    //looping through the output controls and getting the required data and populating the charts
                    //$('.OutputControl').each(function () {

                    //    var controlID = $(this).attr('id');
                    //    var type = $("#" + controlID).attr("data-Type");

                    //    if (type == "MFOP") {
                    //        drawChart(controlID);
                    //    }
                    //});

                }
                else {
                    $(".ddlflds option[value='" + params[i] + "']").remove();
                    toggleLoadProviders(true);
                }
            }

            //#2 Uncomment this section to clear selectors and readd all providers
            //as changes are made to the selector.
            //$(".ddlflds").html('');
            //for (var i in providers) {
            //    $('.ddlflds')
            //        .append($("<option></option>")
            //        .attr("value", providers[i])
            //        .text(providerInfo[providers[i]]));
            //}

            //If there are proivders selected and the 'Load Selected Providers' button is disabled
            //then enable the button
            if (providers != null && $('#loadProviders').prop('disabled')) {
                toggleLoadProviders();
            }
        });

        //When 'Load Selected Providers' button is clicked setup each chart's selector,
        //disable the load button, and then run the model
        $('#loadProviders').click(function () {
            //Update dropdowns
            updateGeographyOptions();

            //'Load Selected Providers' button and then run the model
            toggleLoadProviders();
            runModel();

            //This call would keep system from running the model
            //when only proivder deletion occurs and no adds
            /*if (providersAdded) {
                providersAdded = false;
                runModel();
            }
            else {
                sendSelectedProvidersChange();

                //Need to update some draw charts code to properly use providerName
                //For this call to update all chart versions
                //Known Issue: drawDrillDownPieColumnChartMP
                //drawOutputCharts(Com.data);
            }*/
        });
    });
}
// STEPTOE EDIT END 07/26/16 City Selection


// Set up Scenario Buttons

// Save Screnario
$(document).ready(function () {

    //dialog box
    $("#dialog").dialog({
        autoOpen: false,
        height: 175,
        width: 350,
        modal: true,

        buttons: {

            "Save Scenario": function () {

                if (typeof (Storage) !== "undefined") {

                    var name = $("#tbdialogScenarioName").val();
                    $("#tbdialogScenarioName").val("");

                    localStorage.actvScenario = name;
                    localStorage[localStorage.actvScenario] = getJSONData('ALL');

                    localStorage.scenarioList += "," + name;
                    setLoadScenarios();

                    alert("You saved a scenario successfully!!!");
                }

                else {
                    alert("Sorry, your browser does not support web storage...");
                }

                $(this).dialog("close");
            }
        },
        open: function (event) {
            $('.ui-dialog-buttonpane').find('button:contains("Save Scenario")').addClass('button');
        }
    });

    //saving the data in local storage
    $('#savebutton').click(function () {

        if (localStorage.actvScenario == "Base")

            $("#dialog").dialog("open");

        else {

            if (typeof (Storage) !== "undefined") {

                var name = localStorage.actvScenario;

                localStorage[localStorage.actvScenario] = getJSONData('ALL');

                alert("You saved the scenario to " + name + " successfully!!!");
            }

            else {
                alert("Sorry, your browser does not support web storage...");
            }
        }
    });

    //Creating new copy
    $("#createbutton").click(function () {
        $("#dialog").dialog("open");
    });

    //loading Adjusted Scenario from local storage
    $("#loadASbutton").click(function () {

        if ($('input[name="saved-scenario"]:checked').val()) {

            var scenarioName = $('input[name="saved-scenario"]:checked').siblings("label").html();

            if (typeof (Storage) !== "undefined") {

                if (localStorage[scenarioName]) {

                    //loading the scenario and calling the web service
                    setInputControlsFromScenario(localStorage[scenarioName]);
                    localStorage.actvScenario = scenarioName;
                    //setProviderCheckBoxes();
                    callWebService(getJSONData('parent'));

                    alert("You loaded a scenario successfully!!!");
                }
                else {
                    alert("Sorry, you don't have any saved scenarios...");
                }
            }
            else {
                alert("Sorry, your browser does not support web storage...");
            }
        }
        else {

            if ($('#adj-scenarios-list').find("input[type=radio]"))
                alert("Sorry, you don't have any saved scenarios...");

            else
                alert("Please select any of the saved scenarios...");
        }

    });


    //loading Base Scenario from local storage
    $("#loadBSbutton").click(function () {

        if (typeof (Storage) !== "undefined") {

            var scenarioName = localStorage.BaseScenario;

            //loading the Base scenario and calling the web service
            setInputControlsFromScenario(localStorage[scenarioName]);
            localStorage.actvScenario = scenarioName;
            setLoadScenarios();
            //setProviderCheckBoxes();
            SetFlowRadio("default");
            SetFlowLabels();
            // QUAY EDIT 6/13/14
            //callWebService(getJSONData('parent'));
            callWebService(getJSONData('empty'));
            //
            setDefaultDrought();
            // STEPTOE EDIT 08/04/15 BEGIN
            //Reset all previous indicator values to '...'
            $('.IndicatorControl_OLD').each(function () {
                this.innerHTML = " ... "
            });
            // STEPTOE EDIT 08/04/15 BEGIN

            // STEPTOE EDIT 10/04/15 BEGIN Reset climate effect buttonset & presets
            $('#CLIInputUserControl_radio_0').prop('checked', true);
            $('#CLIInputUserControl_buttonset').buttonset('refresh');

            if ($('.preset.selected').attr('name') != "lp0") {
                $('.preset.selected').toggleClass('selected');
                $('.preset[name="lp0"]').toggleClass('selected')
            }
            // STEPTOE EDIT 10/04/15 END Reset climate effect buttonset & presets

            //====================================
            alert("You loaded a scenario successfully!!!");
        }

        else {
            alert("Sorry, your browser does not support web storage...");
        }

    });

});

$(document).ready(function () {
    $('div[id*=panelDependents]').dialog({
        modal: true,
        autoOpen: false,
        height: 275,
        width: 440,
        open: function (event, ui) {
            $(".ui-dialog-titlebar-close", ui.dialog | ui).hide();
        },
        buttons: {
            Ok: function () {
                $(this).dialog("close");
            }
        }
    });
});

//setting the controls with the data from the local storage
function setInputControlsFromScenario(JSONData) {

    var jsonstr = JSON.parse(JSONData);
    var jsonInputs = JSON.parse(jsonstr.inputJsonArray);
    // QUAY EDIT BEGIN 3/12/14 3:20
    //var strtYr = 0;
    //var endYr = 0;
    var strtYr = 2000;
    var endYr = 2085;
    // QUAY EDIT BEGIN 3/12/14 3:20

    $.each(jsonInputs.Inputs, function () {

        var fld = this.FLD;
        var val = this.VAL;

        if (fld == 'STARTYR') {
            strtYr = val;
        }
        else if (fld == 'STOPYR')
            endYr = val;

        else {
            // Quay Edit 6/4/14
            setSpecialInputControls(fld, val);
            //=================================
            //setting input controls
            $('.InputControl').each(function () {

                if ($(this).attr("data-key") == fld) {
                    $(this).find("div[id*=divslider]").attr("data-def", val);
                }
            });
        }
        //DASS


    });

    //setting temporal controls
    if (strtYr == endYr) {

        $("#point-in-time").html(strtYr);
        $("#point").prop("checked", true)
    }

    else {
        $("#range-in-time-slider").attr("data-strtyr", strtYr);
        $("#range-in-time-slider").attr("data-endyr", endYr);
        $("#range").prop("checked", true)
    }

    setSlider();
}

//hiding labels of the user controls used as properties and assigning to their respective div properties
(function () {

    //hiding the keyword property label in input
    $('.InputControl').each(function () {

        //assigning
        $(this).attr("data-key", $(this).find("span[id*=lblSliderKeyWord]").html());

        //hiding labels
        $(this).find("span[id*=lblSliderKeyWord]").hide();
    });

    //hiding the type property label in output
    $('.OutputControl').each(function () {

        //assigning
        $(this).attr("data-Type", $(this).find("span[id*=lblChartOption]").html());
        $(this).attr("data-fld", $(this).find("span[id*=lblFldName]").html());
        $(this).attr("data-title", $(this).find("span[id*=lblTitle]").html());
        $(this).attr("data-series", $(this).find("span[id*=lblSeries]").html());
        //hiding labels
        $(this).find("span[id*=lblChartOption]").hide();
        $(this).find("span[id*=lblFldName]").hide();
        $(this).find("span[id*=lblTitle]").hide();
    });
})();

//Getting the div ID drop down list selected item changed
$(".ddlType").change(function () {
    drawChart($(this).closest('div[id*=OutputControl]').attr('id'), $jsonObj);
});

//Getting the div ID drop down list selected item changed
$(".ddlflds").change(function () {
    drawChart($(this).closest('div[id*=OutputControl]').attr('id'), $jsonObj);
});


/* STEPTOE EDIT 07/28/16 BEGIN RiT max range modification
//drwaing charts on temporal slider(years) change
$(document).on('mouseup', '.temporal', function (event) {

    var refresh = false;
    $('input[name="temporal"]:checked').each(function () {

        if (this.value == "point-in-time" && event.currentTarget.id == "point-in-time-slider") {
            refresh = true;
        } else if (this.value == "range-in-time" && event.currentTarget.id == "range-in-time-slider") {
            refresh = true;
        }
    });

    if (!refresh) {
        return;
    }
    setStrtandEndYr();

    //looping through the output controls and getting the required data and populating the charts
    $('.OutputControl').each(function () {
        var controlID = $(this).attr('id');
        drawChart(controlID);
    });

    drawAllIndicators();
});
*/
function temporalSliderChange(slider) {
    if ($('input[name="temporal"]:checked').val() == slider) {
        setStrtandEndYr();

        //looping through the output controls and getting the required data and populating the charts
        $('.OutputControl').each(function () {
            var controlID = $(this).attr('id');
            drawChart(controlID, $jsonObj);
        });

        drawAllIndicators();
    }
}
// STEPTOE EDIT 07/28/16 END

// QUAY EDIT BEGIN 3/13/14 evening
function Time_Chart_Draw() {
    if (jsondata != undefined) {
        var refresh = false;
        $('input[name="temporal"]:checked').each(function () {

            if (this.value == "point-in-time" && event.currentTarget.id == "point-in-time-slider") {
                refresh = true;
            } else if (this.value == "range-in-time" && event.currentTarget.id == "range-in-time-slider") {
                refresh = true;
            }
        });

        if (!refresh) {
            return;
        }
        setStrtandEndYr();
        //looping through the output controls and getting the required data and populating the charts
        $('.OutputControl').each(function () {
            var controlID = $(this).attr('id');
            drawChart(controlID, $jsonObj);
        });

        drawAllIndicators();
    }
}
// QUAY EDIT END 3/13/14 evening

$(document).on('change', 'input[name="geography"]', function () {

    var provider = $(this).val();

    //looping through the output controls and getting the required data and populating the charts
    $('.OutputControl').each(function () {

        var controlID = $(this).attr('id');
        var type = $("#" + controlID).attr("data-Type");

        if (type == "MFOP") {
            $("#" + controlID).find("select[id*=ddlfld]").val(provider);
            drawChart(controlID, $jsonObj);
        }
    });
    //STEPTOE EDIT 07/15/15 BEGIN
    //If Core.js is included and Window is Default.aspx send geography data to tabs
    if (getWindowType() == 'Default')
        sendGeographyRadioChange(provider);
    //STEPTOE EDIT 07/15/15 END
});

//drwaing charts on temporal radio change
$(document).on('change', 'input[name="temporal"]', function () {

    setStrtandEndYr();

    //looping through the output controls and getting the required data and populating the charts
    $('.OutputControl').each(function () {
        var controlID = $(this).attr('id');
        drawChart(controlID, $jsonObj);
    });

    drawAllIndicators();
});

//STEPTOE BEGIN EDIT 07/26/16 City Selection
//Raising "Run Model" button click event and calling web service
//$(document).on('click', '.run-model', function () {

//    var subControls;
//    var sum = 0;// to hold the sum if the sub controls value
//    var subControlsValid;

//    if ($(this).attr('id') == 'run-model-Pop') {

//        //getting the sub contrls values and adding them
//        /*$('.InputControl').each(function () {

//            if ($(this).attr("data-Subs") != "") {

//                subControls = $(this).attr("data-Subs").split(',');

//                $.each(subControls, function () {
//                    sum = sum + parseInt($('#' + this + '_lblSliderVal').html());
//                });

//                if (sum != 100) {
//                    subControlsValid = false;
//                }
//                else
//                    subControlsValid = true;
//            }
//        });*/
//        subControlsValid = true;

//        //if sum of sub controls is not equal to 100
//        if (!subControlsValid) {
//            alert("Please Ensure that the sum of sub controls is 100");
//        }

//        else {
//            $('div[id*=panelDependents]').dialog("close");

//            //hiding all sub controls
//            jsonStr = JSON.parse(infoRequestJSON);

//            $.each(jsonStr.FieldInfo, function () {
//                if (this.DEP != "") {
//                    $.each(this.DEP, function () {
//                        $('#' + this + "_ControlContainer").attr("style", "display:none");
//                    });
//                }
//            });
//            callWebService(getJSONData('DEP'));
//        }
//    }
//    else
//        callWebService(getJSONData('parent'));

//});

//Raising "Run Model" button click event and calling web service
$(document).on('click', '.run-model', runModel);

//Moved process executed when run model is clicked to a function
function runModel() {
    var subControls;
    var sum = 0;// to hold the sum if the sub controls value
    var subControlsValid;

    if ($(this).attr('id') == 'run-model-Pop') {

        //getting the sub contrls values and adding them
        /*$('.InputControl').each(function () {
        
            if ($(this).attr("data-Subs") != "") {
        
                subControls = $(this).attr("data-Subs").split(',');
        
                $.each(subControls, function () {
                    sum = sum + parseInt($('#' + this + '_lblSliderVal').html());
                });
        
                if (sum != 100) {
                    subControlsValid = false;
                }
                else
                    subControlsValid = true;
            }
        });*/
        subControlsValid = true;

        //if sum of sub controls is not equal to 100
        if (!subControlsValid) {
            alert("Please Ensure that the sum of sub controls is 100");
        }

        else {
            $('div[id*=panelDependents]').dialog("close");

            //hiding all sub controls
            // STEPTOE EDIT BEGIN 07/29/16 INFO_REQUEST
            //jsonStr = JSON.parse(infoRequestJSON);
            jsonStr = INFO_REQUEST;
            // STEPTOE EDIT END 07/29/16

            $.each(jsonStr.FieldInfo, function () {
                if (this.DEP != "") {
                    $.each(this.DEP, function () {
                        $('#' + this + "_ControlContainer").attr("style", "display:none");
                    });
                }
            });
            //STEPTOE ADD 09/30/16 BEGIN when calling webservice change run button color
            $(".run-model").each(function () {
                this.style.backgroundColor = RunningColor;
            });

            setTimeout(function () { callWebService(getJSONData('DEP')); }, 0);
            //STEPTOE ADD 09/30/16 END when calling webservice change run button color
        }
    }
    else {
        //STEPTOE ADD 09/30/16 BEGIN when calling webservice change run button color
        $(".run-model").each(function () {
            this.style.backgroundColor = RunningColor;
        });

        //SXI1211 EDIT 04/16/2017 Begin change to set flag on click of Run Model Button
        $runModelClicked = true;
        //SXI1211 EDIT 04/16/2017 End region


        //STEPTOE EDIT 02/09/17 BEGIN changed call to include parent and dependent fields
        //setTimeout(function () { callWebService(getJSONData('parent')); }, 0);
        setTimeout(function () { callWebService(getJSONData('par&dep')); }, 0);
        //STEPTOE EDIT 02/09/17 END changed call to include parent and dependent fields

        //STEPTOE ADD 09/30/16 END when calling webservice change run button color
    }

}
//STEPTOE END EDIT 07/26/16 City Selection

//Toggling the sub controls
$(document).on('click', '.ui-slider-popup-button', function () {

    if ($(this).closest("div[id*=ControlContainer]").attr("data-Subs") != "") {

        var subid = ($(this).closest("div[id*=ControlContainer]").attr("data-Subs")).split(',');

        $.each(subid, function () {
            //STEPTOE BEGIN EDIT 02/08/17 Added missing 'InputUserControl' to id string to find control
            $('#' + this + "InputUserControl_ControlContainer").attr("style", "display:inline");
            //STEPTOE END EDIT 02/08/17
        });

        $('div[id*=panelDependents]').dialog("open");
    }
});
//Toggling the sub controls
$(document).on('click', '.trace-CO', function () {

    var subControls;
    var sum = 0;// to hold the sum if the sub controls value
    var subControlsValid;
    var inputData = {};

    var DefaultInputs = [];
    eyr = {};

    if ($(this).attr('id') == 'trace-CO-one') {
        eyr = {};
        eyr["FLD"] = "COEXTSTYR";
        // eyr["VAL"] = 1939;
        eyr["VAL"] = 1938;
        DefaultInputs.push(eyr);

        inputData["Inputs"] = DefaultInputs;


    };


});

//setStateInformation();

////Self invoking function to set the input values and calling web service to populate the charts
//(function () {

//    //setting the slider values
//    setSliderValues();

//    //checking the provider list check boxes
//    setProviderCheckBoxes();

//    initializeIndicators();

//    //calling the webservice
//    if (localStorage.actvScenario == "Base") {
//        callWebService(getJSONData('empty'));
//    }

//    else {
//        callWebService(getJSONData('parent'));
//    }


//    //setting load scenarios list from local storage
//    setLoadScenarios();
//})();

//setting Provider check boxes
function setProviderCheckBoxes(initial) {

    var jsonstr = JSON.parse(localStorage[localStorage.actvScenario]);
    var jsonOutputs = JSON.parse(jsonstr.outputJsonArray);
    var prvdrs = {};

    $.each(jsonOutputs.Providers, function () {
        prvdrs[this] = true;
    });

    //STEPTOE EDIT BEGIN 07/26/16 City Selection
    //$('input[name="geography"]').each(function () {

    //    if (prvdrs[$(this).attr("id")]) {
    //        $(this).prop("checked", true);
    //    }
    //    else {
    //        $(this).prop("checked", false);
    //    }
    //});

    //Update chosen select with initial values from the model
    var chosenSelect = $('.chosen-select');
    chosenSelect.val(jsonOutputs.Providers);
    chosenSelect.trigger('chosen:updated');

    //Only update geography options if it is not the inital page load
    if (!initial) {
        updateGeographyOptions();
    }
    //STEPTOE EDIT END 07/26/16 City Selection
}


//reading and setting the scenario names as optons of dropdown list
function setLoadScenarios() {

    if (localStorage.scenarioList != "") {

        var name = localStorage.actvScenario;

        var scenarios = (localStorage.scenarioList).split(',');

        //setting scenarios
        $('#adj-scenarios-list').empty();
        $.each(scenarios, function (count) {
            if (scenarios[count] != "")
                $('#adj-scenarios-list').append('<li><input type="radio" class="saved-scenario" name="saved-scenario" value="' + count + '" /><label id="' + count + '">' + scenarios[count] + '</label></li>');
        });

        if (name != 'Base') {
            $('.saved-scenario').each(function (count) {
                if ($(this).siblings('label').html() == name)
                    $(this).attr('checked', true);
            });
        }
    }
}

//Setting the slider value by reading the property value property value
function setSliderValues() {

    var valCount = 0;
    var jsonStr;

    //looping through the input controls and setting the slider values by calling the meta data service
    $('.InputControl').each(function () {
        var controlID = $(this).attr('id');
        var fldName = "";
        var min = "";
        var max = "";
        var def = "";
        var subs = "";
        // ======BEGIN QUAY EDIT 6/17/14
        var tooltipstr = "";
        // ======END QUAY EDIT

        //parsing the json
        // STEPTOE EDIT BEGIN 07/29/16 INFO_REQUEST
        //jsonStr = JSON.parse(infoRequestJSON);
        jsonStr = INFO_REQUEST;
        // STEPTOE EDIT END 07/29/16

        //Getting the key word to compare and get the respective values of the slider
        var keyWord = $(this).attr("data-key");

        //setting the values of the sliders from the json
        $.each(jsonStr.FieldInfo, function () {

            //comparing the JSON to get its details
            if (this.FLD == keyWord) {

                fldName = this.LAB; //Getting Field Name
                min = this.MIN; //Getting Min Value
                max = this.MAX; //Getting Max Value
                subs = this.DEP; //Getting Sub control details
                def = this.DEFAULT;
                // ======BEGIN QUAY EDIT 6/17/14
                tooltipstr = this.LNG;
                // ======END QUAY EDIT


                if (this.DEP != "") {

                    //var subid = ($(this).closest("div[id*=ControlContainer]").attr("data-Subs")).split(',');
                    $.each(this.DEP, function () {
                        //STEPTOE BEGIN EDIT 02/08/17 Added missing 'InputUserControl' to id string to find control
                        $('#' + this + "InputUserControl_ControlContainer").attr("style", "display:none");
                        //STEPTOE END EDIT 02/08/17
                    });
                }
                else
                    $("#" + controlID).find('div[id*=PopupButton]').hide();
            }
        });

        $('div[id*=panelDependents]').attr("style", "display:none");

        //Assigning the values obtained from the service
        $(this).find("span[id*=lblSliderfldName]").html(fldName);
        $(this).attr("data-fld", fldName);
        $(this).find("span[id*=lblSliderVal]").html(def);
        $(this).attr("data-Subs", subs);
        $(this).find("div[id*=divslider]").attr("data-min", min);
        $(this).find("div[id*=divslider]").attr("data-max", max);
        $(this).find("div[id*=divslider]").attr("data-def", def);
        // ======BEGIN QUAY EDIT 6/17/14
        $(this).find("div[id*=SliderTitle]").attr("title", tooltipstr);
        // ======END QUAY EDIT


    });

    //saving the baase scenario
    localStorage[localStorage.BaseScenario] = getJSONData('ALL');

    //if ther is any data in local storage
    if (localStorage.actvScenario == "Base") {
        setSlider();
    }

    else {
        setInputControlsFromScenario(localStorage[localStorage.actvScenario]);
    }
}


//calling webservice and getting the json string
function callWebService(jsonData) {
    //STEPTOE ADD 09/30/16 BEGIN when calling webservice change run button color
    $(".run-model").each(function () {
        this.style.backgroundColor = RunningColor;
    });
    //STEPTOE ADD 09/30/16 END when calling webservice change run button color

    //STEPTOE ADD 07/15/15 BEGIN
    //If CoreAdd.js is included and window is Default.aspx send loading to all windows
    if (getWindowType() == 'Default')
        sendLoading();
    //STEPTOE ADD 07/15/15 END

    //auto-saving the scenario in local storage
    //localStorage[localStorage.actvScenario] = jsonData;

    //calling webservice
    $.ajax({

        type: "POST",
        url: "WaterSimService.asmx/GetData",
        data: jsonData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function ($res) {
            jsondata = $res.d;
            // QUAY EDIT 1 29 16
            // This parses the output, which is then passed to these functions already parsed, no need to do it again
            WS_RETURN_DATA = $.parseJSON($res.d);

            // QUAY EDIT 4/4/16 BEGIN
            //setInputControls($res.d);
            //drawOutputCharts($res.d);
            setInputControls(WS_RETURN_DATA);
            // This is used to test how much time we are saving by maintaining the chart it self, but overwritting the data
            // 12.14.17 Michael StepToe
            var myTIME = new Date();
            drawOutputCharts(WS_RETURN_DATA);
            // This is used to test how much time we are saving by maintaining the chart it self, but overwritting the data
            // 12.14.17 Michael StepToe
            console.log((new Date() - myTIME) / 1000, "seconds - draw");

            //STEPTOE ADD 07/15/15 BEGIN
            //If window is Default.aspx send webService data to windows
            if (getWindowType() == 'Default')
                sendWebServData($res.d);
            //STEPTOE ADD 07/15/15 END

            // QUAY EDIT 3/14/14 noon BEGIN
            SetRunButtonState();
            // QUAY EDIT 3/14/14 noon END;

            //SXI1211 Edit begin 04/16/2017
            buildCompareTab(WS_RETURN_DATA);
            //SXI1211 Edit end
        },
        error: function (xhr, status, error) {
            alert("Ajax : " + status + "\n" + error + "\n" + "status : " + xhr.status);
            alert(xhr.responseText);
        }
    });
}
// QUAY EDIT 3/19/14 Begin
////Sampson edit 08.13.14,08.28.14,10.01.14
//// Moved to 16.1.1. on 1 October, 2014
//// ----------------------------------------------------------
//// UI Version
//var WaterSimVersion = "UI Version: 16a.1.1";
//var UI = WaterSimVersion.fontsize(1);
//function SetVersion(theVersion) {
//    $("#VersionInfo").html(theVersion);

//}
//function APIandModel(theVersion) {
//    $("#VersionModel").html(theVersion);
//}
//// ---------------------------------------------------------


// QUAY EDIT 3/19/14 Begin
// DAS edits 08.15.14 I added the parsing of the string for Web Service, API, and Model versions
function callWebServiceVersion() {

    //auto-saving the scenario in local storage
    //localStorage[localStorage.actvScenario] = jsonData;

    //calling webservice
    $.ajax({

        type: "POST",
        url: "WaterSimService.asmx/GetVersion",
        contentType: "application/json; charset=utf-8",
        //data:{},
        //dataType: "text",
        dataType: "json",
        //data: jsonData,
        //contentType: "application/json; charset=utf-8",
        async: false,
        success: function ($res) {
            var verdata = $.parseJSON($res.d);

            if (verdata.VERSION) {
                var MyVersion = verdata.VERSION.substring(0, verdata.length).fontsize(1);
                //
                var index_2 = MyVersion.indexOf("A");
                var Web = MyVersion.substring(0, index_2 - 1);
                //SetVersion(UI + " " + Web);
                SetVersion("Version: " + UI);
                SetWeb(Web);

                var index_3 = MyVersion.indexOf("M");
                var APIv = MyVersion.substring(index_2, index_3 - 1).fontsize(1);
                API(APIv);

                var Modelv = MyVersion.substring(index_3, verdata.length).fontsize(1);

                Model(Modelv);

            }
        },
        error: function (xhr, status, error) {
            alert("Ajax : " + status + "\n" + error + "\n" + "status : " + xhr.status);
            alert(xhr.responseText);
        }
    });
}
function getSustainabilityIndicatorValues() {



}





//  Gets the Input and Output JSON to pass to the Web Service
//  inputType can be three values
//  ''  or anything
//  'ALL'
//  'empty'
//  'DEP'
//  'parent'

//  For inputType = 'ALL"
//      This will set STOPYR and STARTYR based on temporal controls
//      pushes all input fields as input and for output

//  For inout Type = 'parent'
//      This will end up setting STOPYR to 2050 and STARTYR is not specified
//      Only pushes inputfields that are parents, no dependent fields

//  For inout Type = 'DEP'
//      This will end up setting STOPYR to 2050 and STARTYR is not specified
//      Only pushes inputfields that are dependents no parent fields

//STEPTOE BEGIN ADD 02/09/17
//  For inout Type = 'par&dep'
//      This will end up setting STOPYR to 2050 and STARTYR is not specified
//      pushes inputfields that are parent and dependent fields
//STEPTOE END ADD 02/09/17 

// for all inoutType = all values
//      loops through and gathers all input control values



function getJSONData(inputType) {

    var inputData = {};
    var outputData = {};
    var eyr = {};
    var inputFields = [];
    var duplicate = {};
    var jsonData = {};
    var input = {};
    var output = [];
    var outputFields = [];
    var dependent = {};

    //start year and end year
    /*$('input[name="temporal"]:checked').each(function () {

        if (this.value == "point-in-time") {
            eyr["FLD"] = "STOPYR";
            eyr["VAL"] = parseInt($("#point-in-time").html());
            inputFields.push(eyr);
        }
        else {
            eyr["FLD"] = "STOPYR";
              eyr["VAL"] = 2040;//parseInt($("#range-in-time-slider").attr("data-endyr"));
            inputFields.push(eyr);
        }
    });*/

    if (inputType == 'ALL') {

        $('input[name="temporal"]:checked').each(function () {

            if (this.value == "point-in-time") {
                eyr["FLD"] = "STARTYR";
                eyr["VAL"] = parseInt($("#point-in-time").html());
                inputFields.push(eyr);

                eyr = {};

                eyr["FLD"] = "STOPYR";
                eyr["VAL"] = parseInt($("#point-in-time").html());
                inputFields.push(eyr);
            }
            else {
                eyr["FLD"] = "STARTYR";
                eyr["VAL"] = parseInt($("#range-in-time-slider").attr("data-strtyr"));
                inputFields.push(eyr);

                eyr = {};

                eyr["FLD"] = "STOPYR";
                eyr["VAL"] = parseInt($("#range-in-time-slider").attr("data-endyr"));
                inputFields.push(eyr);
            }
        });
    }
    else {
        eyr["FLD"] = "STOPYR";
        eyr["VAL"] = parseInt($("#range-in-time-slider").attr("data-endyr"));
        inputFields.push(eyr);


    }

    //getting input controls
    $('.InputControl').each(function () {
        input = {};

        input["FLD"] = $(this).attr("data-key");
        var FooTest = $(this).find("span[id*=lblSliderVal]");
        var FooStr = $(this).find("span[id*=lblSliderVal]").html();
        input["VAL"] = parseInt($(this).find("span[id*=lblSliderVal]").html());


        var dep = ($(this).attr("data-Subs")).toString().split(',');

        $.each(dep, function () {
            dependent[this] = true;
        });

        //checking for duplicate
        if (!duplicate[$(this).attr("data-key")]) {

            if (inputType == 'parent' && !dependent[input["FLD"]]) {
                inputFields.push(input);
            } else if (inputType == 'DEP' && $(this).attr("data-Subs") == "") {
                inputFields.push(input);
            }
                //STEPTOE BEGIN EDIT 02/09/17
            else if (inputType == 'ALL' || inputType == 'par&dep') {
                inputFields.push(input);
            }
            //STEPTOE END EDIT 02/09/17

            outputFields.push(input["FLD"]);

        }
        duplicate[$(this).attr("data-key")] = true;
        if ($(this).attr("data-key") == "WEBAGEFF") {
            console.log(input);
            console.log(inputFields)
        }
    });

    if (inputType == 'empty') {
        var DefaultInputs = [];
        eyr = {};

        // QUAY EDIT
        // Forcing this to true
        eyr = {};
        eyr["FLD"] = "AWSLIMIT";
        eyr["VAL"] = 1;
        DefaultInputs.push(eyr);

        //// get flow years
        // create object
        eyr = {};
        // assign field and value
        eyr["FLD"] = "COEXTSTYR";
        eyr["VAL"] = CORiverFlowValue;
        // push this as an input value
        DefaultInputs.push(eyr);
        // request this as a data field
        outputFields.push(eyr["FLD"]);

        eyr = {};
        eyr["FLD"] = "SVEXTSTYR";
        eyr["VAL"] = SVRiverFlowValue;
        DefaultInputs.push(eyr);
        outputFields.push(eyr["FLD"]);

        eyr = {};
        eyr["FLD"] = "DROUSCEN";
        eyr["VAL"] = 0;
        DefaultInputs.push(eyr);
        outputFields.push(eyr["FLD"]);

        inputData["Inputs"] = DefaultInputs;
        // QUAY EDIT

        //inputData["Inputs"] = [];

    } else {

        // QUAY EDIT
        eyr = {};
        eyr["FLD"] = "AWSLIMIT";
        eyr["VAL"] = 1;
        inputFields.push(eyr);

        // get flow years
        eyr = {};
        eyr["FLD"] = "COEXTSTYR";
        eyr["VAL"] = CORiverFlowValue;
        inputFields.push(eyr);
        // request this as a data field
        outputFields.push(eyr["FLD"]);

        eyr = {};
        eyr["FLD"] = "SVEXTSTYR";
        eyr["VAL"] = SVRiverFlowValue;
        inputFields.push(eyr);
        // request this as a data field
        outputFields.push(eyr["FLD"]);
        //  QUAY EDIT
        // DAS edits
        // 02.27.15
        // This is the bool for the deltat burden to Arizona; false we share the burden, true AZ covers all
        // CO delta water
        eyr = {};
        eyr["FLD"] = "CODELTAB";
        eyr["VAL"] = 0;
        inputFields.push(eyr);
        // request this as a data field
        outputFields.push(eyr["FLD"]);
        // eyr = {};
        //

        // STEPTOE BEGIN EDIT 09/26/16 Shouldn't need these fields anymore
        // Deleted code 02.10.17 das
        // STEPTOE END EDIT 09/26/16 Shouldn't need these fields anymore


        inputData["Inputs"] = inputFields;
    }

    //getting output controls
    $('.OutputControl').each(function () {
        output = [];
        output = ($(this).attr("data-fld")).split(',');

        //checking for duplicate
        $.each(output, function () {

            if (!duplicate[this]) {
                outputFields.push(this);
            }
            duplicate[this] = true;
        });
    });

    //Skip if window is Charts
    if (getWindowType() != 'Charts') {
        //getting dependent fields
        // STEPTOE EDIT BEGIN 07/29/16 INFO_REQUEST
        //var infoRequest = JSON.parse(infoRequestJSON);
        var infoRequest = INFO_REQUEST;
        // STEPTOE EDIT END 07/29/16

        $.each(infoRequest.FieldInfo, function () {

            if (this.DEP)
                $.each(this.DEP, function () {

                    if (!duplicate[this]) {
                        outputFields.push(this);
                    }
                    duplicate[this] = true;
                });
        });
    }
    $('.IndicatorControl').each(function () {
        output = [];
        output = ($(this).attr("data-fld")).split(',');

        //checking for duplicate
        $.each(output, function () {

            if (!duplicate[this]) {
                outputFields.push(this);
            }
            duplicate[this] = true;
        });

        if (outputFields["name"] == "SINPCTGW ") {
            var val = this.VALS[0];
            var GW = val;
            One(GW);

        };
    });

    outputData["Outputs"] = outputFields;//['all'];

    //getting providers
    var providers = [];

    //STEPTOE EDIT BEGIN 07/26/16 City Selection
    //$('input[name="geography"]').each(function () {
    //    providers.push(this.value);
    //});
    //If chosen is not empty then use the selected providers as input
    //otherwise use the default values
    if ($('.chosen-select').val() != null)
        providers = $('.chosen-select').val();
    else
        providers = ["reg", "bu", "ch", "gi", "ph", "sc"];
    //STEPTOE EDIT END 07/26/16 City Selection

    outputData["Providers"] = providers;

    //STEPTOE EDIT BEGIN 08/30/16 Group/User login
    var groupName = $('#groupName').val();
    if (typeof (groupName) != "undefined" && groupName.trim().length) {
        inputData['User'] = groupName.trim();

        var userName = $('#userName').val();
        if (typeof (userName) != "undefined" && userName.trim().length) {
            inputData['Password'] = userName.trim();
        }
    }
    //STEPTOE EDIT END 07/26/16 Group/User login

    jsonData['inputJsonArray'] = JSON.stringify(inputData);
    jsonData['outputJsonArray'] = JSON.stringify(outputData);

    return JSON.stringify(jsonData);
}
// End of function getJSONData(inputType) {

//setTimeout(function () { alert("Drought Stop year not entered") }, 2000);

// Special code to handle customized input controls
// Quay 6/4/14

function setSpecialInputControls(aFLD, aval) {
    switch (aFLD) {
        case "COEXTSTYR":
            SetCoFlow(aval);
            break;
        case "SVEXTSTYR":
            SetSVFlow(aval)
            break;
    }
}

//Setting the slider with values obtained from the service

// QUAY EDIT 1 29 16
// Modified to return parsed json, no need to do twoce
//function setInputControls(outputJSON) {
function setInputControls(jsonstr) {

    //    var jsonstr = $.parseJSON(outputJSON);
    // END QUAY EDIT

    $.each(jsonstr.RESULTS, function () {

        var fld = this.FLD;
        // 11.14 16 David A Sampson, this was uncommented on 12.16.16 DAS
        var val = this.VALS[0];
        if (fld == "REGRECEFF") {
            val = this.VALS[49];
        }
        // 12.16.16 DAS again...
        //var val = this.VALS[this.VALS.length - 1];
        // end 11.14.16 DAS
        var found = false;

        $('.InputControl').each(function () {

            if ($(this).attr("data-key") == fld) {
                //var fooid = $(this).find("div[id*=divslider]");
                $(this).find("div[id*=divslider]").attr("data-def", val);
                found = true;
            }
        });


        // QUAY EDIT 6/4/14
        // If an input control for this field was not found, then pass to special routine;
        if (!found) {
            setSpecialInputControls(fld, val);
        }
        //=========================
    });
    setSlider();
}

var jsondata;

var subControls;
var fldNames;
// QUAY EDIT BEGIN 3/12/14 4:00
var fldMAXes;
var fldMINes;
var fldUnits;
var fldLongunits;
// QUAY EDIT END 3/12/14 4:00
var fldValues;
var providerName;
var inputJSONStr;
var strtYr;
var endYr;
var $jsonObj;
var $runModelClicked = false;
var $publishingPriorModel = false;


function setStrtandEndYr() {
    //STEPTOE EDIT 07/15/15 Begin
    //If page is Default.aspx perform normal operations otherwise skip
    //If CoreAdd.js is included send data to tabs
    if (getWindowType() != "Charts") {
        $('input[name="temporal"]:checked').each(function () {

            if (this.value == "point-in-time") {
                strtYr = parseInt($("#point-in-time").html());
                endYr = parseInt($("#point-in-time").html());
            }
            else {
                strtYr = parseInt($("#range-in-time-slider").attr("data-strtyr"));
                endYr = parseInt($("#range-in-time-slider").attr("data-endyr"));
                // 02.28.17 DAS
                endYr = Math.min(2084, endYr);
                // end 02.28.17 DAS
            }
        });
        if (getWindowType() == "Default")
            sendTemporalRadioChange();
    }
    //STEPTOE EDIT 07/15/15 END
}

// QUAY EDIT 1 29 16
// Modofied to receive jason already parsed no need to do this more than once
//draw output charts depending on the output controls used
//function drawOutputCharts(outputJSON) {
function drawOutputCharts($jsonObjLocal) {

    //jsondata = outputJSON;

    // END QUAY EDIT

    subControls = {};
    fldNames = {};
    fldValues = {};
    providerName = {};
    // QUAY EDIT BEGIN 3/12/14 4:00
    fldMAXes = {};
    fldMINes = {};
    fldUnits = {};
    fldLongunits = {};

    // QUAY EDIT END 3/12/14 4:00

    setStrtandEndYr();

    // STEPTOE EDIT BEGIN 07/29/16 INFO_REQUEST prepased
    //inputJSONStr = JSON.parse(infoRequestJSON);
    inputJSONStr = INFO_REQUEST;
    // STEPTOE EDIT END 07/29/16


    //getting the fld names and sub controls
    $.each(inputJSONStr.FieldInfo, function () {

        fldNames[this.FLD] = this.LAB;
        // QUAY EDIT BEGIN 3/12/14 4:00
        fldMAXes[this.FLD] = this.MAX;
        fldMINes[this.FLD] = this.MIN;
        fldUnits[this.FLD] = this.UNT;
        fldLongunits[this.FLD] = this.UNTL;
        // QUAY EDIT END 3/12/14 4:00

        if (this.DEP)
            subControls[this.FLD] = [this.DEP];
        else
            subControls[this.FLD] = [""];

    });

    //STEPTOE EDIT BEGIN 07/26/16 City Selection
    //getting provider names w.r.to their code
    //$('input[name="geography"]').each(function () {
    //    providerName[this.value] = $(this).next('label').html();
    //});

    //If the window is not Charts.aspx then get provider names w.r. to their code
    //from the Chosen Selector
    if (getWindowType() != "Charts") {
        var selectedProviders = $('.chosen-select').val();
        for (var i in selectedProviders)
            providerName[selectedProviders[i]] = providerInfo[selectedProviders[i]];
    }
        //Otherwise page is Charts.aspx, get provider info from providerInfo
    else {
        for (var i in providerInfo)
            providerName[i] = providerInfo[i];
    }
    //STEPTOE EDIT END 07/26/16 City Selection

    // QUAY EDIT 1 29 16
    // NO NEED FOR THIS, Info come into function parsed, see above
    //$jsonObj = JSON.parse(jsondata);
    $jsonObj = $jsonObjLocal;
    // END QUAY EDIT
    $.each($jsonObj.RESULTS, function () {
        fldValues[this.FLD] = this.VALS;
    });

    /*SXI1211 04/16/2017 Begin Edit for compare model tab
    added $publishingPriorModel === false check around drawChart method
    */
    if ($publishingPriorModel === false) {
        //looping through the output controls and getting the required data and populating the charts
        $('.OutputControl').each(function () {
            var controlID = $(this).attr('id');
            // QUAT EDIT 1 30 16
            // modified to pass parsed json object
            drawChart(controlID, $jsonObj);
            // END Quay Edit
        });
        drawAllIndicators();
    } else {
        $(".previousDataConstrict ").find(".OutputControl").each(function () {
            var controlID = $(this).attr('id');
            drawChart(controlID, $jsonObj);
        });
    }
    /*SXI1211 End edit region*/
}

//===============================================
// Draw Chart Function
// Version 2
// Substantial Changes here  3/15/14,06.23.15
// ===============================================
//                    green       orange    dk green
// colors to try #82C341, #FAA31B,#009F75
var ColorSeriesArray = new Array();
var seriesDBlue = ["#0066CC", "#E60000"];
var seriesNew = ["#7cb5ec", "#f7a35c", "#7798BF", " #90ee7e", "#aaeeee", "#ff0066", "#eeaaee"];
var seriesArea = ["#336699", "#D63333"];
var seriesAreaStacked = seriesNew;
var seriesAreaLine = ["#336699", "#FF0000", "#00FF00", "#FF6600", "#33CCFF"];
var seriesLine = ["#000000", "#f7a35c", "#0066CC", "#FF0000", " #009933", "#B200B2", "#E6E6E6"];
// var seriesColumn3 = ["#FF9900", "#336699", "#FF0000"];
var seriesColumn3 = ["#3399FF", "#000000", "#009900"];

var seriesColumn7 = ["#E68AE6", "#FF6600", "#000000", "#88C6ED", "#009900", "#3399FF", "#FF0000"];
//                              black           orange
//
ColorSeriesArray[0] = seriesLine;
ColorSeriesArray[1] = seriesDBlue;
ColorSeriesArray[2] = seriesLine;
ColorSeriesArray[3] = seriesAreaLine;
ColorSeriesArray[4] = seriesArea
ColorSeriesArray[5] = seriesAreaStacked;
ColorSeriesArray[6] = seriesNew;
ColorSeriesArray[7] = seriesColumn3;
ColorSeriesArray[8] = seriesColumn7;

var seriesColors = seriesLine;

// QUAY EDIT 1 30 16
// modified to pass parsed json object
// function drawChart(controlID) {
function drawChart(controlID, jsondata) {
    var MyChartType;

    var type = $("#" + controlID).attr("data-Type");

    var mySeriesString = $("#" + controlID).attr("data-series");
    var color = ColorSeriesArray[mySeriesString];
    if (color != undefined) {
        seriesColors = color;
    }
    var MainType = type.substr(0, 4);
    var SubType = "";
    if (type.length > 4)
        SubType = type.substr(4, 3);
    var TimeMode = "";
    // ================================================================================================

    // ================================================================================================
    switch (MainType) {
        case "OFMP":
            $('#' + controlID).find("select[id*=ddlfld]").hide();

            if (strtYr == endYr) {
                // ok point in time show the graph types drop down
                $('#' + controlID).find("select[id*=ddlTypes]").show();
                drawDrillDownPieColumnChartMP(jsondata, controlID, subControls, fldNames, fldValues, providerName, (strtYr - $jsonObj.MODELSTATUS.STARTYEAR), fldMINes, fldMAXes, fldLongunits);
            } else {
                $('#' + controlID).find("select[id*=ddlTypes]").hide();
                switch (SubType) {
                    case "":
                        var CurrentProvider = providerName;
                        CurrentProvider["doreg"] = false;
                        //drawAreaStackedChart(jsondata, controlID, subControls, fldNames, fldValues, providerName, strtYr, endYr, (strtYr - $jsonObj.MODELSTATUS.STARTYEAR), fldMINes, fldMAXes, fldLongunits);
                        drawProvidersChart(jsondata, controlID, subControls, fldNames, fldValues, CurrentProvider, strtYr, endYr, (strtYr - $jsonObj.MODELSTATUS.STARTYEAR), fldMINes, fldMAXes, fldLongunits, seriesColors, ChartTypeAreaStacked);
                        break;
                    case "L":
                        //drawLineChartMP(jsondata, controlID, subControls, fldNames, fldValues, providerName, strtYr, endYr, (strtYr - $jsonObj.MODELSTATUS.STARTYEAR), fldMINes, fldMAXes, fldLongunits);
                        drawProvidersChart(jsondata, controlID, subControls, fldNames, fldValues, providerName, strtYr, endYr, (strtYr - $jsonObj.MODELSTATUS.STARTYEAR), fldMINes, fldMAXes, fldLongunits, seriesColors, ChartTypeLine);
                        break;
                    case "R":
                        var CurrentProvider = providerName;
                        //var pcode = $("#" + controlID).find("select[id*=ddlfld]").find("option:selected").val();
                        //CurrentProvider[pcode] = providerName[pcode];
                        CurrentProvider["doreg"] = true;

                        //drawLineChartMP(jsondata, controlID, subControls, fldNames, fldValues, providerName, strtYr, endYr, (strtYr - $jsonObj.MODELSTATUS.STARTYEAR), fldMINes, fldMAXes, fldLongunits);
                        drawProvidersChart(jsondata, controlID, subControls, fldNames, fldValues, CurrentProvider, strtYr, endYr, (strtYr - $jsonObj.MODELSTATUS.STARTYEAR), fldMINes, fldMAXes, fldLongunits, seriesColors, ChartTypeLine);
                        break;

                }
            }
            break;
        case "MFOP":
            // Add providers to drop down
            if ($("#" + controlID).find("select[id*=ddlfld]").find("option").length == 0) {
                //STEPTOE EDIT BEGIN 07/26/16 City Selection
                //$('input[name="geography"]').each(function () {
                //    $("#" + controlID).find("select[id*=ddlfld]").append(new Option($(this).next('label').html(), this.value));
                //});

                //Get available providers from Chosen Selector instead of geography control
                var selectedProviders = $('.chosen-select').val();
                for (var i in selectedProviders)
                    $("#" + controlID).find("select[id*=ddlfld]").append(new Option(providerInfo[selectedProviders[i]], selectedProviders[i]));
                //STEPTOE EDIT END 07/26/16 City Selection
            }
            if (strtYr == endYr) {
                // ok point in time show the graph types drop down
                $('#' + controlID).find("select[id*=ddlTypes]").show();
                // multi fields so show the provider drop down
                $('#' + controlID).find("select[id*=ddlfld]").show();
                drawDrillDownPieColumnChartMF(jsondata, controlID, subControls, fldNames, fldValues, providerName, (strtYr - $jsonObj.MODELSTATUS.STARTYEAR), fldMINes, fldMAXes, fldLongunits);
            } else {
                // range so hyde the chart types
                $('#' + controlID).find("select[id*=ddlTypes]").hide();
                // this is going to use the provider drop down, so get the cuurent provider code in the drop down and use this
                var CurrentProvider = {};
                var pcode = $("#" + controlID).find("select[id*=ddlfld]").find("option:selected").val();
                CurrentProvider[pcode] = providerName[pcode];
                CurrentProvider["doreg"] = true;
                //CurrentProvider["doreg"] = false;
                // ok make standard provider chart call with only one provider code and ChartTypeColumnStacked
                drawProvidersChart(jsondata, controlID, subControls, fldNames, fldValues, CurrentProvider, strtYr, endYr, (strtYr - $jsonObj.MODELSTATUS.STARTYEAR), fldMINes, fldMAXes, fldLongunits, seriesColors, ChartTypeColumnStacked);
                //drawColumnStackedChart(jsondata, controlID, subControls, fldNames, fldValues,     strtYr, endYr, (strtYr - $jsonObj.MODELSTATUS.STARTYEAR), fldMINes, fldMAXes, fldLongunits);
            };
            break;
        case "OFOP":
            // only one provider so hide the provider drop down
            $('#' + controlID).find("select[id*=ddlfld]").hide();
            if (strtYr == endYr) {
                // ok point in time show the graph types drop down
                $('#' + controlID).find("select[id*=ddlTypes]").show();
                drawDrillDownSingleColumnChart(jsondata, controlID, subControls, fldNames, fldValues, (strtYr - $jsonObj.MODELSTATUS.STARTYEAR));
            } else {
                // ok a range show hide the graph type
                $('#' + controlID).find("select[id*=ddlTypes]").hide();
                drawDrillDownLineChartTEMP(jsondata, controlID, subControls, fldNames, fldValues, providerName, strtYr, endYr, (strtYr - $jsonObj.MODELSTATUS.STARTYEAR));
            };
            break;
        case "BASE":
            $('#' + controlID).find("select[id*=ddlTypes]").hide();
            $('#' + controlID).find("select[id*=ddlfld]").hide();
            if (strtYr == endYr) {
                switch (SubType) {
                    case "L", "A":
                        MyChartType = ChartTypeColumn;
                        break;
                    case "SL", "SA":
                        MyChartType = ChartTypeColumnStacked;
                        break;
                }
            } else {
                switch (SubType) {
                    case "L":
                        MyChartType = ChartTypeLine;
                        break;
                    case "LS":
                        MyChartType = ChartTypeLineStacked;
                        break;
                    case "A":
                        MyChartType = ChartTypeArea;
                        break;
                    case "SA":
                        MyChartType = ChartTypeAreaStacked;
                        break;
                    case "AL":
                        MyChartType = ChartTypeAreaLine;
                        break;

                }
            }

            drawDrillDownChartBO(jsondata, controlID, subControls, fldNames, fldValues, strtYr, endYr, (strtYr - $jsonObj.MODELSTATUS.STARTYEAR), fldMINes, fldMAXes, fldLongunits, seriesColors, MyChartType);
            break;

    }

}

//STEPTOE ADD 07/15/15 BEGIN
//Added to determine if Com is defined and if so return the window type
//if it is not defined assume window is Default.aspx without CoreAdd.js included
function getWindowType() {
    if (typeof (Com) != "undefined" && Com != null)
        return Com.windowType;
    else
        return null;
}
//STEPTOE ADD 07/15/15 END

////Self invoking function to set the input values and calling web service to populate the charts
(
    function () {

        //STEPTOE 07/11/14
        //If Com is defined and Window is a Charts tab overwrite Default functions
        if (getWindowType() == 'Charts') {
            setSliderValues = function () { };
            setProviderCheckBoxes = setSliderValues;
            initializeIndicators = setSliderValues;
            drawAllIndicators = setSliderValues;
            callWebService = callWebServiceCharts;
            var type = $.urlParam('type');
            if (type != null) {
                checkBoxValues[type] = true;
                $('#checkbox' + type).prop('checked', true);
            }
            callWebServiceVersion();
            return;
        }
        else {
            // STEPTOE EDIT BEGIN 07/29/16 INFO_REQUEST
            // ADD preparsed INFO_REQUEST
            //INFO_REQUEST = JSON.parse(infoRequestJSON);
            // STEPTOE EDIT END 07/29/16
        }
        //STEPTOE EDIT 07/11/15 END

        //$(document).ready(function () {
        //$("#MainForm").show();
        //setting the slider values
        setSliderValues();

        //checking the provider list check boxes
        setProviderCheckBoxes(true);

        initializeIndicators();

        //calling the webservice
        if (localStorage.actvScenario == "Base") {
            callWebService(getJSONData('empty'));
        }

        else {
            callWebService(getJSONData('parent'));
        }


        // QUAY EDIT 3/18/14 Begin
        callWebServiceVersion();
        //SetVersion(WaterSimVersion);
        // QUAY EDIT 3/18/14 End;Begin

        //setting load scenarios list from local storage
        setLoadScenarios();

        //STEPTOE EDIT 08/23/16
        //Hide input sliders and show buttons to select values
        inputControls2Radios();

        //STEPTOE EDIT BEGIN 02/17/17 Check for subcontrol parameter
        //URL parameter overrides internal showSubcontrols variable
        //Subcontrols should be comma(,) seperated
        //If true then show all subcontrol pop-up buttons
        //If false hide all subcontrol pop-up buttons
        //If subcontrols are specified then hide all except those specified
        var subcontrols = $.urlParam('subcontrols');
        if (subcontrols != null && subcontrols !== 0) {
            if (subcontrols == "true"); //Do nothing, all pop-ups should be shown
            else {
                //Hide all subcontrol pop-up buttons
                $('.popup-container').hide();

                //User has specified specific controls to show
                if (subcontrols != "false") {

                    //Split subcontrols by delimiter and iteratively show them if found
                    var fields = subcontrols.split(',');
                    for (var index = 0; index < fields.length; index++) {
                        var control = $('[data-key="' + fields[index] + '"] .popup-container');

                        //If control pop-up button is found then show the pop-up button 
                        if (control.length > 0) {
                            control.show();
                        }
                    }
                    //for (var index = 0; index < fields.length; index++) {
                    //    var control = $(".popup-container #" + fields[index] + 'InputUserControl_PopupButton');

                    //    //If control pop-up button is found then show the pop-up button 
                    //    if (control.length > 0) {
                    //        control.parent('.popup-container').show();
                    //    }
                    //}
                }
            }
        }
            //Parameter subcontrols not specified revert to default setting
        else if (!showSubcontrols) {
            //Hide all subcontrol pop-up buttons
            $('.popup-container').hide();
        }
        //STEPTOE EDIT END 02/17/17 Check for subcontrol parameter

        // DAS ADDED 6/25/14
        // OK turn the walkthrough wizard off
        // 03.09.15 DAS
        // $("#wizard").fadeOut();
        //-------------------------
        $("#WSLoading").hide();
        // DAS - this is a "cludge" as part of another funciton to stop the splash page from loading text
        // September, 2014
        $("#dashboard-header-h1").show();
        //});
        // begin sampson 10.13.17 das
        setDefaultDrought();
        // end sampson 10.13.17

        //STEPTOE EDIT BEGIN 09/27/16 ShowLogin set to true for login screen
        //showLogin = true;
        //STEPTOE EDIT END 09/27/16 ShowLogin set to true for login screen

    })();


/*  SXI1211 #BeginRegion
    12 Apr 2017
    Description:    This method is invoked from function callWebService() in Core.js.
                    This will populate the charts on comparison tab and save the JSON 
                    results string in hidden fields for use during future runs.
    */
function buildCompareTab($localJsonObj) {
    if (getWindowType() !== 'Charts') {
        var $currentJsonData = $localJsonObj;
        var savePreviousResults = $('#SavePreviousResults').prop('checked');

        if ($('#PreviousResultsReserve').val() === '') {
            $('#PreviousResultsReserve').val(JSON.stringify($localJsonObj));
        }

        if ($('#CurrentResultsReserve').val() === '') {
            $('#CurrentResultsReserve').val(JSON.stringify($localJsonObj));
        }

        if (savePreviousResults === false) {
            $('#PreviousResultsReserve').val($('#CurrentResultsReserve').val());
        }

        $('#CurrentResultsReserve').val(JSON.stringify($localJsonObj));

        if ($runModelClicked === true) {
            $publishingPriorModel = true;
            var previousResultString = $('#PreviousResultsReserve').val();
            $localJsonObj = $.parseJSON(previousResultString);
            drawOutputCharts($localJsonObj);
            $publishingPriorModel = false;
            $runModelClicked = false;
        }
        $(".currentDataConstrict").find(".ddlflds").change(function () {
            fldValues = {};
            $.each($currentJsonData.RESULTS,
                function () {
                    fldValues[this.FLD] = this.VALS;
                });
            drawChart($(this).closest('div[id*=OutputControl]').attr('id'), $currentJsonData);
            fitChartsToScreen();
        });

        $(".previousDataConstrict").find(".ddlflds").change(function () {
            fldValues = {};
            $.each($localJsonObj.RESULTS,
                function () {
                    fldValues[this.FLD] = this.VALS;
                });
            drawChart($(this).closest('div[id*=OutputControl]').attr('id'), $localJsonObj);
            fitChartsToScreen();
        });
        fitChartsToScreen();
    }
}

//This method will resize charts on the comparison tab to fit the smaller view area.
function fitChartsToScreen() {
    $(".modelContainer").find('div[id*=ChartContainer]').each(function () {
        var charts = $(this).highcharts();
        charts.setSize(400, null, false);
    });

    $(".modelContainer").find(".OutputControl").each(function () {
        if ($(this).width() === 500) {
            $(this).width(400);
        }
    });

    $(".modelContainer").find(".chart").each(function () {
        if ($(this).width() === 500) {
            $(this).width(400);
        }
    });

}
console.log((new Date() - myTime) / 1000, "seconds- bottom");

/*SXI1211 #EngRegion*/
// E.O.F.
