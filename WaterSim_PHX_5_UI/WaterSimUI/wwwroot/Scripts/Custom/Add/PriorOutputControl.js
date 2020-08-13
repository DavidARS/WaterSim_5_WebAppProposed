/*
   #EditRegion Begin
   SXI1211:
   04/04/2017
   Changes for new tab "COMPARE: Previous Output" to display data from previous run.
*/

window.onload = function () {
    "use strict";
    $('#displayWaterSupply').show();
    $('#displayDemand').hide();
    $('#displayRiverReservoirs').hide();

    $('#WaterSupplyRadio').prop('checked', true);
    $('#DemandRadio').prop('checked', false);
    $('#RiversRiservoirsRadio').prop('checked', false);
};

function ActivateThisTab(radio) {
    $('#displayWaterSupply').hide();
    $('#displayDemand').hide();
    $('#displayRiverReservoirs').hide();
    $(radio).show();
}

function ResetThisSection(modelName) {
    if (modelName === "")
        return $("#ResetThisModel").val();
    else
        $("#ResetThisModel").val(modelName);
    return "";
}