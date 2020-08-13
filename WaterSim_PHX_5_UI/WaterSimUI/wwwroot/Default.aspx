<%@ Page Title="Home" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="WaterSimUI._Default" %>

<%@ Register Src="UserControls/OutputUserControl.ascx" TagName="OutputUserControl" TagPrefix="Wsmo" %>

<%@ Register Src="UserControls/InputUserControl.ascx" TagName="InputUserControl" TagPrefix="Wsmi" %>

<%@ Register Src="UserControls/PriorOutputsUserControl.ascx" TagName="PriorOutputsUserControl" TagPrefix="Wsmp" %>

<asp:Content runat="server" ID="BodyContent" ContentPlaceHolderID="GraphControls">

    <link href="Content/horizontal.css" rel="stylesheet" />
    <link href="Content/isotope.css" rel="stylesheet" />

    <div id="tabs">
        <ul style="border-bottom: 1px solid !important;">
            <li><a href="#tabs-1">INPUTS:
                <br />
                Climate/River Flows</a></li>
            <li><a href="#tabs-2">OUTPUTS:
                <br />
                Supply</a></li>
            <li><a href="#tabs-3">OUTPUTS:
                <br />
                Demand</a></li>
            <li><a href="#tabs-4">OUTPUTS:
                <br />
                Reservoirs/Rivers</a></li>
            <li><a href="#tabs-5">OUTPUTS:
                <br />
                Sustainability</a></li>

            <li><a href="#tabs-6" class="simulationModelCompare">COMPARE:
                <br />
                Previous Results</a></li>
        </ul>
        <!-------------------------  CLIMATE and DROUGHT -------------------------------------------->
        <div id="dragResize-tab-1-off" class="click-to-top">
            <div id="tabs-1" style="height: 495px;">
                <div id="settings-tabs-climateDrought" style="background-color: #E6E6E6">
                    <div id="climateTab">
                        <h7>Climate Effect on Riverine Flows</h7>
                        <br />
                        <h_1> Graduated Effect</h_1>
                        <div id="settings-tabs-climate">
                            <Wsmi:InputUserControl ID="InputUserControl1" FieldKeyWord="COCLMADJ" runat="server" />
                            <Wsmi:InputUserControl ID="InputUserControl2" FieldKeyWord="SVCLMADJ" runat="server" />
                            <div id="GraphControls_InputUserControl123_ControlContainer" class="InputControlStyleOnly" data-key="CLIEFF">
                                <span id="GraphControls_InputUserControl123_lblSliderfldName">Predefined Climate Effect on Riverine Flows</span>  <span id="GraphControls_InputUserControl123_lblSliderVal" style="display: none;">0</span>
                                <span id="GraphControls_InputUserControl123_lblunits"></span>
                                <div id="GraphControls_InputUserControl123_containerHelp" class="help">
                                    <input id="GraphControls_InputUserControl123_hvHelpURI" value="Content/HELPFILES/" type="hidden">
                                    <img src="../Images/icon_help.png">
                                </div>
                                <span id="GraphControls_InputUserControl123_lblSliderKeyWord" style="display: none;">CLIEFF</span>
                                <div id="CLIInputUserControl_buttonset" class="radio-container realclearfix controlgroup" style="float: left;">
                                    <input type="radio" id="CLIInputUserControl_radio_0" name="CLIInputUserControl_radio" value="0" checked="checked"><label for="CLIInputUserControl_radio_0">No Effect</label>
                                    <input type="radio" id="CLIInputUserControl_radio_1" name="CLIInputUserControl_radio" value="1"><label for="CLIInputUserControl_radio_1">Minor</label>
                                    <input type="radio" id="CLIInputUserControl_radio_2" name="CLIInputUserControl_radio" value="2"><label for="CLIInputUserControl_radio_2">Moderate</label>
                                    <input type="radio" id="CLIInputUserControl_radio_3" name="CLIInputUserControl_radio" value="3"><label for="CLIInputUserControl_radio_3">Severe</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- -->
                    <div id="Image_container">
                        <img src="images\Low.png" id="img1" />
                        <img src="images\Median.png" id="img2" />
                        <img src="images\High.png" id="img3" />
                        <img src="images\Variable.png" id="img4" />
                    </div>
                    <div id="riverTab">
                        <h7>Thirty-year River Flow Record</h7>
                        <br />
                        <div>
                            <h_1>Magnitude and Pattern</h_1>
                        </div>
                        <div id="TRACESHelpControlContainer" class="help" data-key="TRACES">
                            <img style="" src="Images/icon_help.png" />
                        </div>
                        <div id="FlowRecord">
                            <select id="flowRecordList" name="flowRecord">
                                <option id="RBdry" value="dry" selected>Low flow years</option>
                                <option id="RBmed" value="med">Median flow years</option>
                                <option id="RBwet" value="wet">High flow years</option>
                                <option id="RBmix" value="mix">High inter-annual variability</option>
                            </select>
                        </div>
                        <div>
                        </div>
                    </div>

                    <div id="startYear">
                        <label id="COFLOWYR" style="color: #990033">Colorado River Start Year: 1922 </label>
                        <br />
                        <br />
                        <label id="SVFLOWYR" style="color: #990033">Salt-Verde Rivers Start Year: 1946</label>
                    </div>

                    <div id="droughtTab">
                        <h7>Drought Effect on River Flows</h7>
                        <br />
                        <%--<h_1> Only During Bracketed Years</h_1>--%>
                        <div id="settings-tabs-drought-test">
                            <Wsmi:InputUserControl ID="InputUserControl3" FieldKeyWord="DROUSCEN" runat="server" />

                        </div>
                    </div>

                    <!-- Start and End year in settings-tabs-climateDrought-2 -->

                </div>
            </div>

        </div>
        <!-------------------------  END CLIMATE and DROUGHT -------------------------------------------->

        <!------------------------------  WATER SUPPLY TAB ------------------------------------------------->
        <div id="dragResize-tab-2-off" class="click-to-top">
            <div id="tabs-2">
                <%--  <div id="SUPPLYHelpControlContainer" style="position:absolute; left:145px; top:25px" class="help" data-key="SUPPLY" ><img style="" src="Images/icon_help.png" /></div>--%>

                <div class="scrollbar">
                    <div class="handle">
                        <div class="mousearea"></div>
                    </div>
                </div>

                <div class="frame" id="basic-supply">
                    <div id="isotope-supply-container">
                        <div class="item transition Supply">
                            <div class="chart">
                                <Wsmo:OutputUserControl runat="server" ID="OutputControl1" Type="MFOP" FieldName="WATAUGUSED,BNKUSED,RECTOT,MGWPUMP,SRPSURF,SRPGW,COLDELIV" Title="Water Source" SeriesColors="8" />
                            </div>
                        </div>
                        <div class="item transition Supply">
                            <div class="chart">
                                <Wsmo:OutputUserControl runat="server" ID="OutputControl1a" Type="MFOP" FieldName="MGWPUMP,SRPGW,AGPUMPED" Title="Groundwater Pumped" SeriesColors="7" />
                            </div>
                        </div>

                        <div class="item transition Credits">
                            <div class="chart">
                                <Wsmo:OutputUserControl runat="server" ID="OutputControl2" Type="OFMP" FieldName="GWAVAIL" Title="Groundwater Credits Available" SeriesColors="5" />
                            </div>
                        </div>
                        <div class="item transition Credits">
                            <div class="chart">
                                <Wsmo:OutputUserControl runat="server" ID="OutputControl2a" Type="OFMPR" FieldName="AGTOMUN1" Title="Agriculture Credit Transfer to Muni" SeriesColors="5" />
                            </div>
                        </div>
                        <div class="item transition Aquifer">
                            <div class="chart">
                                <Wsmo:OutputUserControl runat="server" ID="OutputControl3" Type="BASEA" FieldName="REGAQBAL" Title="Regional Aquifer Level" SeriesColors="1" />
                            </div>
                        </div>
                    </div>
                </div>

                <div id="isotope-supply-filters" class="button-group shifted-down">
                    <a class="button" data-filter=".Supply">Water Supply</a>
                    <a class="button" data-filter=".Credits">Credits</a>
                    <a class="button" data-filter=".Aquifer">Regional Aquifer</a>
                    <a class="button" data-filter="*">All</a>
                </div>

            </div>
        </div>
        <!------------------------------  END OF WATER SUPPLY TAB ------------------------------------------------->

        <!-------------------------------------  DEMAND ------------------------------------------------------------------->
        <div id="dragResize-tab-3-off" class="click-to-top">
            <div id="tabs-3">
                <%-- <div id="DEMANDHelpControlContainer" style="position:absolute; left:107px; top:25px" class="help" data-key="DEMAND" ><img style="" src="Images/icon_help.png" /></div>--%>

                <div class="scrollbar">
                    <div class="handle">
                        <div class="mousearea"></div>
                    </div>
                </div>
                <div class="frame" id="basic-demand">
                    <div id="isotope-demand-container">
                        <div class="item transition total">
                            <div class="chart">
                                <Wsmo:OutputUserControl runat="server" ID="OutputControl7" Type="OFMP" FieldName="TOTDEM" Title="Total Water Use" SeriesColors="5" />
                            </div>
                        </div>
                        <div class="item transition population">
                            <div class="chart">
                                <Wsmo:OutputUserControl runat="server" ID="OutputControl5" Type="OFMP" FieldName="POPUSED" Title="Population" SeriesColors="5" />
                            </div>
                        </div>
                        <div class="item transition gpcd">
                            <div class="chart">
                                <Wsmo:OutputUserControl runat="server" ID="OutputControl8B" Type="MFOP" FieldName="GPCDCOMIND,GPCDRES" Title="Gallons per Person per Day" SeriesColors="7" />
                            </div>
                        </div>
                        <div class="item transition gpcd">
                            <div class="chart">
                                <Wsmo:OutputUserControl runat="server" ID="OutputControl8C" Type="OFMPL" FieldName="GPCDUSED" Title="Total GPCD By Provider" SeriesColors="2" />
                            </div>
                        </div>
                    </div>
                </div>

                <div id="isotope-demand-filters" class="button-group shifted-down">
                    <a class="button display" data-filter=".total">Water Demand</a>
                    <a class="button population-button" data-filter=".population">Population</a>
                    <a class="button display" data-filter=".gpcd">GPCD</a>
                    <a class="button display" data-filter="*">All</a>
                </div>

            </div>
        </div>
        <!------------------------------  END WATER SUPPLY TAB ------------------------------------------------->

        <!-----------------------------  RIVERS and RESERVOIRS -------------------------------------------------->
        <div id="dragResize-tab-4-off" class="click-to-top">
            <div id="tabs-4">

                <div class="scrollbar">
                    <div class="handle">
                        <div class="mousearea"></div>
                    </div>
                </div>

                <div class="frame" id="basic-reservoirs">
                    <div id="isotope-reservoir-container">
                        <div class="item transition reservoirsCO">
                            <div class="chart">
                                <Wsmo:OutputUserControl runat="server" ID="OutputControl9" Type="BASEA" FieldName="POWSTORE,MEDSTORE" Title="Water Storage: Lake Powell and Lake Mead" SeriesColors="4" />
                            </div>
                        </div>
                        <div class="item transition reservoirsCO">
                            <div class="chart">
                                <Wsmo:OutputUserControl runat="server" ID="OutputControl13" Type="BASEAL" FieldName="MEADELEV,MDDPL,MDSSL,MDSSH,MDMPL" Title="Lake Mead Elevation(s)" SeriesColors="3" />
                            </div>
                        </div>
                        <div class="item transition traces">
                            <div class="chart">
                                <Wsmo:OutputUserControl runat="server" ID="OutputControl10" Type="BASEL" FieldName="CORFLOW" Title="Flow on the Colorado River" SeriesColors="1" />
                            </div>
                        </div>
                        <div class="item transition reservoirsSV">
                            <div class="chart">
                                <Wsmo:OutputUserControl runat="server" ID="OutputControl11" Type="BASEA" FieldName="SRSTORE,VRSTORE" Title="Water Storage: Salt-Verde" SeriesColors="4" />
                            </div>
                        </div>
                        <div class="item transition traces">
                            <div class="chart">
                                <Wsmo:OutputUserControl runat="server" ID="OutputControl18" Type="BASEL" FieldName="STRFLOW,VRFLOW" Title="Salt-Verde River Flows" SeriesColors="1" />
                            </div>
                        </div>
                    </div>
                </div>

                <div id="isotope-reservoir-filters" class="button-group shifted-down">
                    <a class="button" data-filter=".reservoirsCO">CO Reservoirs</a>
                    <a class="button" data-filter=".reservoirsSV">SV Reservoirs</a>

                    <a class="button" data-filter=".traces">Traces</a>
                    <a class="button" data-filter="*">All</a>

                </div>

            </div>
        </div>
        <!-----------------------------  END OF RIVERS and RESERVOIRS -------------------------------------------------->

        <!------------------------------  SUSTAINABILITY INDICATORS------------------------------------------------------>
        <div id="dragResize-tab-5-off" class="click-to-top">
            <div id="tabs-5">

                <div class="scrollbar">
                    <div class="handle">
                        <div class="mousearea"></div>
                    </div>
                </div>
                <div class="frame" id="basic-sustain">
                    <div id="isotope-sustainability-container">
                        <div class="item transition Indicators">
                            <div class="chart">
                                <Wsmo:OutputUserControl runat="server" ID="OutputControl14" Type="BASEL" FieldName="SINPCTGW,SINDENV,SINDAG,SINDPC,SINYRGWR" Title="Temporal Sustainability Indicators" SeriesColors="2" />
                            </div>
                        </div>
                        <%--   <div class="item transition GroundWater"><div class="chart" ><Wsmo:OutputUserControl runat="server"  ID="OutputContro15" Type="OFMPL" FieldName="PCTGWAVL"  Title="Percent of Original Groundwater Credits Available"  SeriesColors="2"/></div></div>--%>
                    </div>
                </div>
                <%--                            <div id="isotope-sustainability-filters" class="button-group">
                              <a class="button" data-filter="*">All</a>
                              <a class="button" data-filter=".Indicators">Indicators</a>
                              <a class="button" data-filter=".GroundWater">Groundwater</a>
                             </div>--%>
            </div>
        </div>
        <!------------------------------  END OF SUSTAINABILITY INDICATORS------------------------------------------------------>
        <!------------------------------  COMPARE PREVIOUS RESULTS------------------------------------------------------>
        <!--
                    #EditRegion Begin
                    SXI1211:
                    04/04/2017
                    Changes for new tab "COMPARE: Previous Output" to display data from previous run.
                    -->
        <div id="dragResize-tab-6-off" class="click-on-top">
            <div id="tabs-6">
                <Wsmp:PriorOutputsUserControl runat="server" ID="PriorOutputsUserControl" />
            </div>
        </div>
        <!------------------------------  END OF COMPARE PREVIOUS RESULTS------------------------------------------------------>
    </div>


    <script src="Scripts/Sly/sly.js"></script>
    <script type="text/javascript" src="Scripts/Custom/Add/PriorOutputControl.js"></script>
    <script src="Scripts/Sly/horizontal-supply.js"></script>
    <script src="Scripts/Sly/horizontal-demand.js"></script>
    <script src="Scripts/Sly/horizontal-reservoirs.js"></script>
    <script src="Scripts/Sly/horizontal-climate.js"></script>
    <script src="Scripts/Sly/horizontal-compare.js"></script>
    <script src="Scripts/Isotope/isotope.pkgd.js"></script>
    <!-- QUAY EDIT 3/13/14 -->

    <script src="Scripts/Custom/Charts/ChartTools.js"></script>
    <script src="Scripts/Custom/Charts/DrillDownChartBO.js"></script>
    <script src="Scripts/Custom/Charts/ProvidersChart.js"></script>
    <!-- QUAY EDIT 3/13/14 -->

    <script src="Scripts/Custom/Charts/AreaChart.js"></script>
    <script src="Scripts/Custom/Charts/DrillDownColumnChartBO.js"></script>
    <script src="Scripts/Custom/Charts/DrillDownLineChartBO.js"></script>
    <script src="Scripts/Custom/Charts/DrillDownLineChartTEMP.js"></script>
    <script src="Scripts/Custom/Charts/DrillDownPieColumnChartMF.js"></script>
    <script src="Scripts/Custom/Charts/DrillDownPieColumnChartMP.js"></script>
    <script src="Scripts/Custom/Charts/DrillDownSingleColumnChart.js"></script>
    <script src="Scripts/Custom/Charts/StackedAreaChart.js"></script>
    <script src="Scripts/Custom/Charts/StackedColumnChart.js"></script>
    <!-- QUAY EDIT 3/13/14 -->
    <script src="Scripts/Custom/Charts/LineChartMP.js"></script>
    <!-- QUAY EDIT 3/13/14 -->

    <script src="Scripts/Highcharts/highcharts.js"></script>
    <script src="Scripts/HighCharts/modules/drilldown.js"></script>
    <script src="Scripts/Custom/Charts/HighChartsUnderscoreFix.js"></script>

    <!-- QUAY EDIT 6/30/14 
    Used to support Report Generation
    -->
    <script src="Scripts/rgbcolor.js"></script>
    <script src="Scripts/canvg.js"></script>
    <script src="Scripts/Highcharts/modules/exporting.js"></script>
    <script src='Scripts/Custom/qPbar.js'></script>
    <!-- ------------------------------------- -->




</asp:Content>


