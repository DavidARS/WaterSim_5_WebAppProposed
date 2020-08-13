<%@ Page Title="Home" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="WaterSimUI._Default" %>

<%@ Register src="UserControls/OutputUserControl.ascx" tagname="OutputUserControl" tagprefix="Wsmo" %>

<%@ Register src="UserControls/InputUserControl.ascx" tagname="InputUserControl" tagprefix="Wsmi" %>


<asp:Content runat="server" ID="BodyContent" ContentPlaceHolderID="GraphControls">
 
                    <link href="Content/horizontal.css" rel="stylesheet" />
                    <link href="Content/isotope.css" rel="stylesheet" />
 
                    <div id="tabs">
                        <ul>
                            <li><a href="#tabs-1"><p style="color:#FF5310"> Climate/River Flows</p></a></li>
                            <li><a href="#tabs-2">Supply</a></li>
                            <li><a href="#tabs-3">Demand</a></li>
                            <li><a href="#tabs-4">Reservoirs/Rivers</a></li>
                            <li><a href="#tabs-5">Sustainability</a></li>         
                        </ul>
                 <!-------------------------  CLIMATE and DROUGHT -------------------------------------------->
                        <div id="dragResize-tab-1-off" class="click-to-top">
                          <div id="tabs-1" style="height:432px;">      
                              <div id="settings-tabs-climateDrought" style="background-color:#E6E6E6">
                                <ul>
                                 <li><a href="#settings-tabs-climateDrought-1">Climate</a></li>
                                 <li><a href="#settings-tabs-climateDrought-2">Drought</a></li>
                                </ul>
                                   <div id="settings-tabs-climateDrought-1">
                                       <div id="climateTab">
                                       <h7>Climate Effect: Riverine Flows</h7>
                                             <h_1> Graduated Effect</h_1>
                                                <div id="settings-tabs-climate" >
                                                        <ul>
                                                            <li><a href="#settings-tabs-climate-1">Colorado</a></li>
                                                            <li><a href="#settings-tabs-climate-2">Salt-Verde</a></li>
                                                            </ul>
                                                       
                                                        <div id="settings-tabs-climate-1">
                                                            <Wsmi:InputUserControl ID="InputUserControl1" FieldKeyWord="COCLMADJ" runat="server" />
                                                        </div>

                                                        <div id="settings-tabs-climate-2">
                                                            <h3><Wsmi:InputUserControl ID="InputUserControl2" FieldKeyWord="SVCLMADJ" runat="server" /></h3>
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
                                        <div  id="riverTab">
                                            <h7>Thirty-year River Flow Record</h7><br />
                                             <div><h_1>Magnitude and Pattern</h_1></div><div id="TRACESHelpControlContainer" class="help" data-key="TRACES"><img style="" src="Images/icon_help.png" /></div>
                                                <div id="FlowRecord" >
                                                 <ul id="flowRecordList"  >
                                                 <li>&nbsp;          <input type="radio" id="RBdry" name="flowRecord" value="dry"   /><label id="flow1">&nbsp;Low flow years</label></li>
                                                 <li><br />&nbsp; <input type="radio" id="RBmed" name="flowRecord" value="med" /><label id="flow2">&nbsp; Median flow years</label></li>
                                                 <li><br />&nbsp; <input type="radio" id="RBwet" name="flowRecord" value="wet" /><label id="flow3">&nbsp; High flow years<br /></label></li>
                                                 <li><br />&nbsp; <input type="radio" id="RBmix" name="flowRecord" value="mix" /><label id="flow4">&nbsp; High inter-annual variability <br /></label></li>                                                  

                                              </ul>

                                           </div>
                                           <div>
                                           </div>
                                      </div>

                                       <div id="startYear">
                                            &nbsp;&nbsp;&nbsp;<label id="COFLOWYR" style="color: #990033">Colorado River Start Year: 1922 </label> <br />
                                          <br />&nbsp;&nbsp;&nbsp;<label id="SVFLOWYR" style="color: #990033">Salt-Verde Rivers Start Year: 1955</label>

                                       </div>

                                       <!-- -->
                                    </div>
                                    <div id="settings-tabs-climateDrought-2">
                                           <div id="droughtTab">
                                               <h7>Drought Effect on River Flows</h7><br />
                                                 <h_1> Only During Bracketed Years</h_1>
                                                <div id="settings-tabs-drought">
                                                    <ul><li><a href="#settings-tabs-drought-1">Colorado</a></li>
                                                           <li><a href="#settings-tabs-drought-2">Salt-Verde</a></li>
                                                    </ul>
                                                    <div id="settings-tabs-drought-1">
                                                        <h3><Wsmi:InputUserControl ID="DroughtControlCO" FieldKeyWord="COUSRADJ" runat="server" /></h3>

 
                                                    </div>
                                                     <div id="settings-tabs-drought-2">
                                                         <h3><Wsmi:InputUserControl ID="DroughtControlSTV" FieldKeyWord="SVUSRADJ" runat="server" /></h3>
                                                     </div>
 
                                                </div>
                                             </div>

                                  <!-- -->
				                       <script type="text/javascript">
				                           $(function () {
				                               var start_year = document.getElementById('COUSRSTR_v').value;
				                               var end_year = 2050;
				                               $('#COUSRSTP_v').datepicker({
				                                   changeYear: true,
				                                   changeMonth: false,
				                                   showButtonPanel: false,
				                                   dateFormat: 'yy',
				                                   onChangeMonthYear: function (dateText, inst) {
				                                       var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
				                                       $(this).datepicker('setDate', new Date(year, 1));
				                                   }
				                               })
				                           });
				                           $(function () {
				                               var end_year = 2050
				                               var start_year = 0
				                               $('#COUSRSTR_v').datepicker({
				                                   changeYear: true,
				                                   changeMonth: false,
				                                   showButtonPanel: false,
				                                   dateFormat: 'yy',
				                                   yearRange: '2015:2050',
				                                   onChangeMonthYear: function (dateText, inst) {
				                                       start_year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
				                                       $(this).datepicker('setDate', new Date(start_year, 1));
				                                       $("#COUSRSTP_v").datepicker("option", "yearRange", start_year + ":2050");
				                                       $("#COUSRSTP_v").prop('disabled', false);

				                                   }
				                               })
				                           });
				                           $(function () {
				                               var start_year = document.getElementById('SVUSRSTR_v').value;
				                               var end_year = 2050;
				                               $('#SVUSRSTP_v').datepicker({
				                                   changeYear: true,
				                                   changeMonth: false,
				                                   showButtonPanel: false,
				                                   dateFormat: 'yy',
				                                   yearRange: start_year + ":" + end_year,
				                                   onChangeMonthYear: function (dateText, inst) {
				                                       var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
				                                       $(this).datepicker('setDate', new Date(year, 1));
				                                   }
				                               })
				                           });
				                           $(function () {
				                               var end_year = 2050
				                               var start_year = 0
				                               $('#SVUSRSTR_v').datepicker({
				                                   changeYear: true,
				                                   changeMonth: false,
				                                   showButtonPanel: false,
				                                   dateFormat: 'yy',
				                                   yearRange: '2015:2050',
				                                   onChangeMonthYear: function (dateText, inst) {
				                                       start_year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
				                                       $(this).datepicker('setDate', new Date(start_year, 1));
				                                       $("#SVUSRSTP_v").datepicker("option", "yearRange", start_year + ":2050");
				                                       $("#SVUSRSTP_v").prop('disabled', false);

				                                   }
				                               })
				                           });
				                     </script>
				                     <style>
					                    .ui-datepicker-calendar, .ui-datepicker-month,.ui-datepicker-prev, .ui-datepicker-next {
						                    display: none;
					                    }
					                    #ui-datepicker-div button.ui-datepicker-current {display: none;}
					                    #ui-datepicker-div button.ui-datepicker- {
						                    color: black
					                    }
				                     </style>
		                     <!-- -->
		                     <!-- Start and End year in settings-tabs-climateDrought-2 -->
				                     <div id="droughtStartStop" class="drought"><%--<div id="DROUGHTHelpControlContainer" class="help" data-key="DROUGHT"><img style="" src="Images/icon_help.png" /></div>--%>
					                    <fieldset><legend style="font-family:'Times New Roman', serif">&nbsp;&nbsp;&nbsp Colorado River</legend>
					                       <label for="COUSRSTR_v">Start year</label> <input type = "number" name="COUSRSTR_v" id="COUSRSTR_v" class="date-picker-year-1" value=""  style="font-family:'Times New Roman', serif "  />
					                     </fieldset>
					                      <fieldset><legend></legend>
					                       <label for="COUSRSTP_v">End year </label>&nbsp<input type = "number" name="COUSRSTP_v" id="COUSRSTP_v" class="date-picker-year-2" value="" style="font-family:'Times New Roman', serif" disabled="disabled" />
					                     </fieldset><br />
					                     <fieldset><legend style="font-family:'Times New Roman', serif">&nbsp;&nbsp;&nbsp Salt-Verde Rivers</legend>
					                      <label for="SVUSRSTR_v">Start year</label> <input type="number" name="SVUSRSTR_v" id="SVUSRSTR_v" class="date-picker-year-1" value="" style="font-family:'Times New Roman', serif" />
					                     </fieldset>
					                     <fieldset><legend></legend>
					                       <label for="SVUSRSTP_v">End year </label>&nbsp<input type ="number" name="SVUSRSTP_v" id="SVUSRSTP_v" class="date-picker-year-3" value="" style="font-family:'Times New Roman', serif" disabled="disabled" />
					                     </fieldset>                                     
				                     </div>
                                       


                                  <!-- -->
                                        </div>
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
                                  <div class="item transition Supply"><div class="chart" ><Wsmo:OutputUserControl runat="server"  ID="OutputControl1" Type="MFOP" FieldName="WATAUGUSED,BNKUSED,RECTOT,MGWPUMP,SRPSURF,SRPGW,COLDELIV" Title="Water Source"  SeriesColors="8" /></div></div>
                                  <div class="item transition Supply"><div class="chart" ><Wsmo:OutputUserControl runat="server"  ID="OutputControl1a" Type="MFOP" FieldName="MGWPUMP,AGPUMPED,SRPGW" Title="Groundwater Pumped"  SeriesColors="7"/></div></div>

                                   <div class="item transition Credits"><div class="chart"><Wsmo:OutputUserControl runat="server" ID="OutputControl2" Type="OFMP" FieldName="GWAVAIL" Title="Groundwater Credits Available" SeriesColors="5"/></div></div> 
                                  <div class="item transition Credits"><div class="chart"><Wsmo:OutputUserControl runat="server" ID="OutputControl2a" Type="OFMPR" FieldName="AGTOMUN1" Title="Agriculture Credit Transfer to Muni" SeriesColors="5" /></div></div>
                                  <div class="item transition Aquifer"><div class="chart"><Wsmo:OutputUserControl runat="server" ID="OutputControl3" Type="BASEA" FieldName="REGAQBAL" Title="Regional Aquifer Level" SeriesColors="1" /></div></div>
                                </div>
			                </div>

                            <div id="isotope-supply-filters" class="button-group">
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
                                    <div class="item transition total"><div class="chart"><Wsmo:OutputUserControl runat="server" ID="OutputControl7" Type="OFMP" FieldName="TOTDEM" Title="Total Water Use"  SeriesColors="5"/></div></div>
 					                <div class="item transition population"><div class="chart"><Wsmo:OutputUserControl runat="server" ID="OutputControl5" Type="OFMP" FieldName="POPUSED" Title="Population"  SeriesColors="5"/></div></div>                                                                 
                                    <div class="item transition gpcd"><div class="chart"><Wsmo:OutputUserControl runat="server" ID="OutputControl8B" Type="MFOP" FieldName="GPCDCOMIND,GPCDRES" Title="Gallons per Person per Day"  SeriesColors="7"/></div></div>
                                    <div class="item transition gpcd"><div class="chart"><Wsmo:OutputUserControl runat="server" ID="OutputControl8C" Type="OFMPL" FieldName="GPCDUSED" Title="Total GPCD By Provider"  SeriesColors="2"/></div></div>
				                </div>
			                </div>
                       
                            <div id="isotope-demand-filters" class="button-group">
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
  				                    <div class="item transition reservoirsCO"><div class="chart"><Wsmo:OutputUserControl runat="server" ID="OutputControl9" Type="BASEA" FieldName="POWSTORE,MEDSTORE" Title="Water Storage: Lake Powell and Lake Mead"  SeriesColors="4"/></div></div>
                                    <div class="item transition reservoirsCO"><div class="chart"><Wsmo:OutputUserControl runat="server" ID="OutputControl13" Type="BASEAL" FieldName="MEADELEV,MDDPL,MDSSL,MDSSH,MDMPL" Title="Lake Mead Elevation(s)"  SeriesColors="3"/></div></div>
                                    <div class="item transition traces"><div class="chart"><Wsmo:OutputUserControl runat="server" ID="OutputControl10" Type="BASEL" FieldName="CORFLOW" Title="Flow on the Colorado River"  SeriesColors="1"/></div></div>
                                    <div class="item transition reservoirsSV"><div class="chart"><Wsmo:OutputUserControl runat="server" ID="OutputControl11" Type="BASEA" FieldName="SRSTORE,VRSTORE" Title="Water Storage: Salt-Verde"  SeriesColors="4"/></div></div>--%>
                                    <div class="item transition traces"><div class="chart"><Wsmo:OutputUserControl runat="server" ID="OutputControl18" Type="BASEL" FieldName="STRFLOW,VRFLOW" Title="Salt-Verde River Flows"  SeriesColors="1" /></div></div>
                                </div>
			                </div>

                            <div id="isotope-reservoir-filters" class="button-group">
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
                                       <div class="item transition Indicators"><div class="chart" ><Wsmo:OutputUserControl runat="server"  ID="OutputControl14" Type="BASEL" FieldName="SINPCTGW,SINDENV,SINDAG,SINDPC,SINYRGWR" Title="Temporal Sustainability Indicators"  SeriesColors="2"/></div></div>
                                       <div class="item transition GroundWater"><div class="chart" ><Wsmo:OutputUserControl runat="server"  ID="OutputContro15" Type="OFMPL" FieldName="PCTGWAVL"  Title="Percent of Original Groundwater Credits Available"  SeriesColors="2"/></div></div>
                                     </div>
    	    	                  </div>
                            <div id="isotope-sustainability-filters" class="button-group">
                              <a class="button" data-filter="*">All</a>
                              <a class="button" data-filter=".Indicators">Indicators</a>
                              <a class="button" data-filter=".GroundWater">Groundwater</a>
                             </div>
                        </div>
                      </div>
                  <!------------------------------  END OF SUSTAINABILITY INDICATORS------------------------------------------------------>

                </div>
         

                    <script src="Scripts/Sly/sly.js"></script>
                    <script src="Scripts/Sly/horizontal-supply.js"></script>
                    <script src="Scripts/Sly/horizontal-demand.js"></script>
                    <script src="Scripts/Sly/horizontal-reservoirs.js"></script>
                    <script src="Scripts/Sly/horizontal-climate.js"></script>

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


