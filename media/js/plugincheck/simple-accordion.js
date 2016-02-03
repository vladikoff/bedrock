'use strict';

var $statusUnknown = $('.status-unknown');
var $tab = $('caption', $statusUnknown);
var $tabPanels = $('thead, tbody', $statusUnknown);
var expandedState;

$tab.on('click', function() {

    expandedState = $tab.attr('aria-expanded') === 'false' ? true : false;

    $tab.attr('aria-expanded', expandedState);
    $tabPanels.toggleClass('hidden')
              .attr('aria-hidden', !expandedState);
});
