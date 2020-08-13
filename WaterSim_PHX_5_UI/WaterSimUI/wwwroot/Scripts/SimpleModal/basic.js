/*
 * SimpleModal Basic Modal Dialog
 * http://simplemodal.com
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 */

jQuery(function ($) {
	// Load dialog on page load
	//$('#basic-modal-content').modal();

	// Load dialog on click
	$('.help').click(function (e) {
	    //$('#basic-modal-content').modal();
	    // QUAY EDIT BEGIN 3/13/14
	    var test = $(this);
	    var test2 = $(this).closest('div[id*=ControlContainer]');
	    var url = "HELP_"+ $(this).closest('div[id*=ControlContainer]').attr('data-key') + ".html";
	    //var url = ($(this).closest('div[id*=ControlContainer]').attr('data-fld')).split(" ").join("");
	    var uri = $(this).find('input[id$=hvHelpURI]').val();
	    if (uri == undefined) { uri = "Content/HELPFILES/"; }
	    // QUAY EDIT BEGIN 3/13/14

	    // Display an external page using an iframe
	    var src = uri + url;

	    // STEPTOE EDIT BEGIN 09/30/16 Fix Scrollbars on modal
	    //$.modal('<iframe src="' + src + '" height="470" width="770" style="border:0">', {
	    $.modal('<iframe src="' + src + '" height="100%" width="100%" style="border:0">', {
	    // STEPTOE EDIT END 09/30/16 Fix Scrollbars on modal
	        closeHTML: "",
	        containerCss: {
	            backgroundColor: "#fff",
	            borderColor: "#fff",
	            height: 470,
	            padding: 0,
	            width: 770,
	            maxWidth: 800,
	            maxHeight:500
	        },
	        overlayClose: true
	    });

		return false;
	});
});