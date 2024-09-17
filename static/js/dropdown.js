$(document).ready(function() {
    $('.drop-btn').on('click', function(event) {
        event.preventDefault();
        const dropdownContent = $(this).siblings('.dropdown-content');
        const isVisible = dropdownContent.hasClass('show');

        if (isVisible) {
            dropdownContent.removeClass('show');
            $(this).find('.arrow').css('transform', 'rotate(0deg)');
        } else {
            $('.dropdown-content').removeClass('show'); // Hide other dropdowns if necessary
            dropdownContent.addClass('show');
            $(this).find('.arrow').css('transform', 'rotate(180deg)');
        }
    });

    $(document).on('click', function(event) {
        if (!$(event.target).closest('.dropdown').length) {
            $('.dropdown-content').removeClass('show');
            $('.drop-btn .arrow').css('transform', 'rotate(0deg)');
        }
    });
});
