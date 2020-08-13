<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="PriorOutputsUserControl.ascx.cs" Inherits="WaterSimUI.UserControls.PriorOutputsUserControl" %>
<%@ Register Src="OutputUserControl.ascx" TagName="OutputUserControl" TagPrefix="Wsmo" %>

<link href="Content/horizontal.css" rel="stylesheet" />
<link href="Content/isotope.css" rel="stylesheet" />

<style type="text/css">
    .modelContentMain {
        width: 890px;
        padding: 0;
        position: relative;
        height: 500px;
    }

        .modelContentMain:after {
            display: table;
            clear: both;
            content: '';
        }

    .modelContainer {
        width: 890px;
        float: left;
        overflow: hidden;
        height: 500px;
        position: relative;
    }
    
    .currentDataConstrict {
        width: 430px;
        height: 440px;
        float: left;
        overflow: hidden;
        border: solid;
        border-width: 1px;
        margin-left: 5px;
        padding: 5px 5px 0 0;
    }

    .previousDataConstrict {
        width: 430px;
        height: 440px;
        float: right;
        overflow: hidden;
        border: solid;
        border-width: 1px;
        margin-left: 5px;
        padding: 5px 5px 0 0;
    }

    .filterSection {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 600px;
        vertical-align: bottom;
        float: left;
        margin-top: 400px;
    }
</style>

<div id="compareControlMain">
    <div class="modelContentMain">
        <div id="compareTabs">
            <input type="radio" id="WaterSupplyRadio" onclick="ActivateThisTab('#displayWaterSupply')" name="outputSelector" value="WaterSupply" checked="checked" />
            Water Supply
            &nbsp;
            <input type="radio" id="DemandRadio" onclick="ActivateThisTab('#displayDemand')" name="outputSelector" value="Demand" />
            Demand
            &nbsp;
            <input type="radio" id="RiversRiservoirsRadio" onclick="ActivateThisTab('#displayRiverReservoirs')" name="outputSelector" value="RiversRiservoirs" />
            Rivers and Riservoirs           
            <br />
            <input type="checkbox" name="SavePreviousResults" id="SavePreviousResults" value="PreviousModel" />
            Save previous results for next comparison?
            &nbsp;
        </div>
        <br />
        <div class="modelContainer">
            <div id="displayWaterSupply">
                <!------------------------------------- WATER SUPPLY CURRENT DATA ------------------------------------------------------------------->
                <div class="currentDataConstrict">
                    <h1>Current Results</h1>
                    <br />
                    <div id="dragResize-tab-1POUC-off" class="click-to-top">
                        <div id="tabsPOUC-1">
                            <div class="scrollbar">
                                <div class="handle">
                                    <div class="mousearea"></div>
                                </div>
                            </div>
                            <div class="frame" id="cM-basic-supply">
                                <div id="isotope-supply-container-POUC">
                                    <div class="item transition Supply">
                                        <div class="chart">
                                            <Wsmo:OutputUserControl runat="server" ID="POUCOutputControl1" Type="MFOP" FieldName="WATAUGUSED,BNKUSED,RECTOT,MGWPUMP,SRPSURF,SRPGW,COLDELIV" Title="Water Source" SeriesColors="8" />
                                        </div>
                                    </div>
                                    <div class="item transition Supply">
                                        <div class="chart">
                                            <Wsmo:OutputUserControl runat="server" ID="POUCOutputControl1a" Type="MFOP" FieldName="MGWPUMP,SRPGW,AGPUMPED" Title="Groundwater Pumped" SeriesColors="7" />
                                        </div>
                                    </div>
                                    <div class="item transition Credits">
                                        <div class="chart">
                                            <Wsmo:OutputUserControl runat="server" ID="POUCOutputControl2" Type="OFMP" FieldName="GWAVAIL" Title="Groundwater Credits Available" SeriesColors="5" />
                                        </div>
                                    </div>
                                    <div class="item transition Credits">
                                        <div class="chart">
                                            <Wsmo:OutputUserControl runat="server" ID="POUCOutputControl2a" Type="OFMPR" FieldName="AGTOMUN1" Title="Agriculture Credit Transfer to Muni" SeriesColors="5" />
                                        </div>
                                    </div>
                                    <div class="item transition Aquifer">
                                        <div class="chart">
                                            <Wsmo:OutputUserControl runat="server" ID="POUCOutputControl3" Type="BASEA" FieldName="REGAQBAL" Title="Regional Aquifer Level" SeriesColors="1" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!------------------------------------- END WATER SUPPLY CURRENT DATA ------------------------------------------------------------------->
                <!-------------------------------------  WATER SUPPLY PREVIOUS DATA ------------------------------------------------------------------->
                <div class="previousDataConstrict">
                    <h1>Previous Results</h1>
                    <br />
                    <div id="dragResize-tab-1POUC-beta-off" class="click-to-top">
                        <div id="beta-tabsPOUC-1">
                            <div class="scrollbar">
                                <div class="handle">
                                    <div class="mousearea"></div>
                                </div>
                            </div>
                            <div class="frame" id="cMBeta-basic-supply">
                                <div id="isotope-supply-container-beta-POUC">
                                    <div class="item transition Supply">
                                        <div class="chart">
                                            <Wsmo:OutputUserControl runat="server" ID="OutputUserControl1" Type="MFOP" FieldName="WATAUGUSED,BNKUSED,RECTOT,MGWPUMP,SRPSURF,SRPGW,COLDELIV" Title="Water Source" SeriesColors="8" />
                                        </div>
                                    </div>
                                    <div class="item transition Supply">
                                        <div class="chart">
                                            <Wsmo:OutputUserControl runat="server" ID="OutputUserControl2" Type="MFOP" FieldName="MGWPUMP,SRPGW,AGPUMPED" Title="Groundwater Pumped" SeriesColors="7" />
                                        </div>
                                    </div>
                                    <div class="item transition Credits">
                                        <div class="chart">
                                            <Wsmo:OutputUserControl runat="server" ID="OutputUserControl3" Type="OFMP" FieldName="GWAVAIL" Title="Groundwater Credits Available" SeriesColors="5" />
                                        </div>
                                    </div>
                                    <div class="item transition Credits">
                                        <div class="chart">
                                            <Wsmo:OutputUserControl runat="server" ID="OutputUserControl4" Type="OFMPR" FieldName="AGTOMUN1" Title="Agriculture Credit Transfer to Muni" SeriesColors="5" />
                                        </div>
                                    </div>
                                    <div class="item transition Aquifer">
                                        <div class="chart">
                                            <Wsmo:OutputUserControl runat="server" ID="OutputUserControl5" Type="BASEA" FieldName="REGAQBAL" Title="Regional Aquifer Level" SeriesColors="1" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!------------------------------------- END WATER SUPPLY PREVIOUS DATA ------------------------------------------------------------------->
                <div class="filterSection">
                    <div id="isotope-supply-filters-POUC" class="button-group shifted-down">
                        <a class="button" data-filter=".Supply">Water Supply</a>
                        <a class="button" data-filter=".Credits">Credits</a>
                        <a class="button" data-filter=".Aquifer">Regional Aquifer</a>
                        <a class="button" data-filter="*">All</a>
                    </div>
                </div>

            </div>

            <div id="displayDemand">
                <!------------------------------------- CURRENT DEMAND DATA ------------------------------------------------------------------->
                <div class="currentDataConstrict">
                    <h1>Current Results</h1>
                    <br />
                    <div id="dragResize-tab-2POUC-off" class="click-to-top">
                        <div id="tabsPOUC-2">
                            <div class="scrollbar">
                                <div class="handle">
                                    <div class="mousearea"></div>
                                </div>
                            </div>

                            <div class="frame" id="cM-basic-demand">
                                <div id="isotope-demand-container-POUC">
                                    <div class="item transition total">
                                        <div class="chart">
                                            <Wsmo:OutputUserControl runat="server" ID="POUCOutputControl7" Type="OFMP" FieldName="TOTDEM" Title="Total Water Use" SeriesColors="5" SetViewAreaWidth="400px" />
                                        </div>
                                    </div>
                                    <div class="item transition population">
                                        <div class="chart">
                                            <Wsmo:OutputUserControl runat="server" ID="POUCOutputControl5" Type="OFMP" FieldName="POPUSED" Title="Population" SeriesColors="5" SetViewAreaWidth="400px" />
                                        </div>
                                    </div>
                                    <div class="item transition gpcd">
                                        <div class="chart">
                                            <Wsmo:OutputUserControl runat="server" ID="POUCOutputControl8B" Type="MFOP" FieldName="GPCDCOMIND,GPCDRES" Title="Gallons per Person per Day" SeriesColors="7" SetViewAreaWidth="400px" />
                                        </div>
                                    </div>
                                    <div class="item transition gpcd">
                                        <div class="chart">
                                            <Wsmo:OutputUserControl runat="server" ID="POUCOutputControl8C" Type="OFMPL" FieldName="GPCDUSED" Title="Total GPCD By Provider" SeriesColors="2" SetViewAreaWidth="400px" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <!------------------------------  END CURRENT DEMAND TAB ------------------------------------------------->

                <!------------------------------------- PREVIOUS DEMAND DATA ------------------------------------------------------------------->
                <div class="previousDataConstrict">
                    <h1>Previous Results</h1>
                    <br />
                    <div id="dragResize-tab-2POUC-beta-off" class="click-to-top">
                        <div id="beta-tabsPOUC-2">
                            <div class="scrollbar">
                                <div class="handle">
                                    <div class="mousearea"></div>
                                </div>
                            </div>

                            <div class="frame" id="cMBeta-basic-demand">
                                <div id="isotope-demand-container-beta-POUC">
                                    <div class="item transition total">
                                        <div class="chart">
                                            <Wsmo:OutputUserControl runat="server" ID="OutputUserControl6" Type="OFMP" FieldName="TOTDEM" Title="Total Water Use" SeriesColors="5" />
                                        </div>
                                    </div>
                                    <div class="item transition population">
                                        <div class="chart">
                                            <Wsmo:OutputUserControl runat="server" ID="OutputUserControl7" Type="OFMP" FieldName="POPUSED" Title="Population" SeriesColors="5" />
                                        </div>
                                    </div>
                                    <div class="item transition gpcd">
                                        <div class="chart">
                                            <Wsmo:OutputUserControl runat="server" ID="OutputUserControl8" Type="MFOP" FieldName="GPCDCOMIND,GPCDRES" Title="Gallons per Person per Day" SeriesColors="7" />
                                        </div>
                                    </div>
                                    <div class="item transition gpcd">
                                        <div class="chart">
                                            <Wsmo:OutputUserControl runat="server" ID="OutputUserControl9" Type="OFMPL" FieldName="GPCDUSED" Title="Total GPCD By Provider" SeriesColors="2" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <!------------------------------  END PREVIOUS DEMAND DATA TAB ------------------------------------------------->

                <div class="filterSection">
                    <div id="isotope-demand-filters-POUC" class="button-group shifted-down">
                        <a class="button display" data-filter=".total">Water Demand</a>
                        <a class="button population-button" data-filter=".population">Population</a>
                        <a class="button display" data-filter=".gpcd">GPCD</a>
                        <a class="button display" data-filter="*">All</a>
                    </div>
                </div>
            </div>

            <div id="displayRiverReservoirs">
                <div class="currentDataConstrict">
                    <h1>Current Results</h1>
                    <br />
                    <!-----------------------------  RIVERS and RESERVOIRS -------------------------------------------------->
                    <div id="dragResize-tab-3POUC-off" class="click-to-top">
                        <div id="tabsPOUC-3">
                            <div class="scrollbar">
                                <div class="handle">
                                    <div class="mousearea"></div>
                                </div>
                            </div>

                            <div class="frame" id="cM-basic-reservoirs">
                                <div id="isotope-reservoir-container-POUC">
                                    <div class="item transition reservoirsCO">
                                        <div class="chart">
                                            <Wsmo:OutputUserControl runat="server" ID="POUCOutputControl9" Type="BASEA" FieldName="POWSTORE,MEDSTORE" Title="Water Storage: Lake Powell and Lake Mead" SeriesColors="4" />
                                        </div>
                                    </div>
                                    <div class="item transition reservoirsCO">
                                        <div class="chart">
                                            <Wsmo:OutputUserControl runat="server" ID="POUCOutputControl13" Type="BASEAL" FieldName="MEADELEV,MDDPL,MDSSL,MDSSH,MDMPL" Title="Lake Mead Elevation(s)" SeriesColors="3" />
                                        </div>
                                    </div>
                                    <div class="item transition traces">
                                        <div class="chart">
                                            <Wsmo:OutputUserControl runat="server" ID="POUCOutputControl10" Type="BASEL" FieldName="CORFLOW" Title="Flow on the Colorado River" SeriesColors="1" />
                                        </div>
                                    </div>
                                    <div class="item transition reservoirsSV">
                                        <div class="chart">
                                            <Wsmo:OutputUserControl runat="server" ID="POUCOutputControl11" Type="BASEA" FieldName="SRSTORE,VRSTORE" Title="Water Storage: Salt-Verde" SeriesColors="4" />
                                        </div>
                                    </div>
                                    <div class="item transition traces">
                                        <div class="chart">
                                            <Wsmo:OutputUserControl runat="server" ID="OutputControl18" Type="BASEL" FieldName="STRFLOW,VRFLOW" Title="Salt-Verde River Flows" SeriesColors="1" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-----------------------------  END OF RIVERS and RESERVOIRS -------------------------------------------------->
                </div>

                <div class="previousDataConstrict">
                    <h1>Previous Results</h1>
                    <br />
                    <!-----------------------------  RIVERS and RESERVOIRS -------------------------------------------------->
                    <div id="dragResize-tab-3POUC-beta-off" class="click-to-top">
                        <div id="beta-tabsPOUC-3">
                            <div class="scrollbar">
                                <div class="handle">
                                    <div class="mousearea"></div>
                                </div>
                            </div>

                            <div class="frame" id="cMBeta-basic-reservoirs">
                                <div id="isotope-reservoir-container-beta-POUC">
                                    <div class="item transition reservoirsCO">
                                        <div class="chart">
                                            <Wsmo:OutputUserControl runat="server" ID="OutputUserControl10" Type="BASEA" FieldName="POWSTORE,MEDSTORE" Title="Water Storage: Lake Powell and Lake Mead" SeriesColors="4" />
                                        </div>
                                    </div>
                                    <div class="item transition reservoirsCO">
                                        <div class="chart">
                                            <Wsmo:OutputUserControl runat="server" ID="OutputUserControl11" Type="BASEAL" FieldName="MEADELEV,MDDPL,MDSSL,MDSSH,MDMPL" Title="Lake Mead Elevation(s)" SeriesColors="3" />
                                        </div>
                                    </div>
                                    <div class="item transition traces">
                                        <div class="chart">
                                            <Wsmo:OutputUserControl runat="server" ID="OutputUserControl12" Type="BASEL" FieldName="CORFLOW" Title="Flow on the Colorado River" SeriesColors="1" />
                                        </div>
                                    </div>
                                    <div class="item transition reservoirsSV">
                                        <div class="chart">
                                            <Wsmo:OutputUserControl runat="server" ID="OutputUserControl13" Type="BASEA" FieldName="SRSTORE,VRSTORE" Title="Water Storage: Salt-Verde" SeriesColors="4" />
                                        </div>
                                    </div>
                                    <div class="item transition traces">
                                        <div class="chart">
                                            <Wsmo:OutputUserControl runat="server" ID="OutputUserControl14" Type="BASEL" FieldName="STRFLOW,VRFLOW" Title="Salt-Verde River Flows" SeriesColors="1" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-----------------------------  END OF RIVERS and RESERVOIRS -------------------------------------------------->
                </div>

                <div class="filterSection">
                    <div id="isotope-reservoir-filters-POUC" class="button-group shifted-down">
                        <a class="button" data-filter=".reservoirsCO">CO Reservoirs</a>
                        <a class="button" data-filter=".reservoirsSV">SV Reservoirs</a>
                        <a class="button" data-filter=".traces">Traces</a>
                        <a class="button" data-filter="*">All</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<input type="hidden" id="PreviousResultsReserve" value="" />
<input type="hidden" id="CurrentResultsReserve" value="" />
