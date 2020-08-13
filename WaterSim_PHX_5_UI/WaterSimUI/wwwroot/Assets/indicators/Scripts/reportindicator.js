/// <reference path="/Assets/indicators/Scripts/indicatorControl_v_4.js" />
///                                                          
var GWPIndicatorControl;
var ENVIndicatorControl;
var AGRIndicatorControl;
var PWCIndicatorControl;
var AWSIndicatorControl;

var IndicatorControlsArray = new Array();



document.writeln("<!--  WHAT THE? -->");


function initializeIndicators() {

    GWPIndicatorControl = new IndicatorControl("indR0", "GWP", "idGWPIndicator", 110, 110);//, 
    ENVIndicatorControl = new IndicatorControl("indR1", "ENV", "idENVIndicator", 110, 110);//,
    AGRIndicatorControl = new IndicatorControl("indR2", "AGR", "idAGRIndicator", 110, 110);//, 
    PWCIndicatorControl = new IndicatorControl("indR3", "PWC", "idPWCIndicator", 110, 110);//, 
    AWSIndicatorControl = new IndicatorControl("indR4", "AWS", "idAWSIndicator", 110, 110);//,

    IndicatorControlsArray[0] = GWPIndicatorControl;
    IndicatorControlsArray[1] = ENVIndicatorControl;
    IndicatorControlsArray[2] = AGRIndicatorControl;
    IndicatorControlsArray[3] = PWCIndicatorControl;
    IndicatorControlsArray[4] = AWSIndicatorControl;
}


function SetIndicatorValues(arrayOfValues) {
    for (var i = 0; i < arrayOfValues.length; i++) {
        if (i < IndicatorControlsArray.length) {
            IndicatorControlsArray[i].SetValue(arrayOfValues[i]);
        }
    }

}


