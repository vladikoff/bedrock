var $tooltipTrigger = $('.tooltip-trigger');
var $currentItem = {};
var $tooltip = {};

$tooltipTrigger.on('mouseenter', function() {
    $currentItem = $(this).parents('li');
    $tooltip = $('.tooltip', $currentItem);

    $tooltip.removeClass('hidden')
            .attr('aria-hidden', false);
});

$tooltipTrigger.on('mouseleave', function() {
    $currentItem = $(this).parents('li');
    $tooltip = $('.tooltip', $currentItem);

    $tooltip.addClass('hidden')
            .attr('aria-hidden', true);
});
