/*SXI1211: Changes for model comparer
Date: Apr 10 2017
*/

// init Current Model Supply Isotope
var $isotope_supply_container_POUC = $('#isotope-supply-container-POUC').isotope({
    // options
});

// init Previous Model Supply Isotope
var $isotope_supply_container_beta_POUC = $('#isotope-supply-container-beta-POUC').isotope({
    // options
});

// filter items on button click
$('#isotope-supply-filters-POUC').on('click', '.button', function (event) {
    var filtr = $(this).attr('data-filter');
    $isotope_supply_container_POUC.isotope({ filter: filtr });
    $isotope_supply_container_beta_POUC.isotope({ filter: filtr });
});


// init Demand Isotope
var $isotope_demand_container_POUC = $('#isotope-demand-container-POUC').isotope({
    // options
});

// init Previous model Demand Isotope
var $isotope_demand_container_beta_POUC = $('#isotope-demand-container-beta-POUC').isotope({
    // options
});

// filter items on button click
$('#isotope-demand-filters-POUC').on('click', '.button', function (event) {
    var filtr = $(this).attr('data-filter');
    $isotope_demand_container_POUC.isotope({ filter: filtr });
    $isotope_demand_container_beta_POUC.isotope({ filter: filtr });
});


// init Climate Isotope
var $isotope_reservoir_container_POUC = $('#isotope-reservoir-container-POUC').isotope({
    // options
});

// init Previous Climate Isotope
var $isotope_reservoir_container_beta_POUC = $('#isotope-reservoir-container-beta-POUC').isotope({
    // options
});

// filter items on button click
$('#isotope-reservoir-filters-POUC').on('click', '.button', function (event) {
    var filtr = $(this).attr('data-filter');
    $isotope_reservoir_container_POUC.isotope({ filter: filtr });
    $isotope_reservoir_container_beta_POUC.isotope({ filter: filtr });
});