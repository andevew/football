$(document).ready(function() {
    $('#toggleSwitch').on('change', function() {
        if ($(this).is(':checked')) {
            console.log('Switch is ON');
        } else {
            console.log('Switch is OFF');
        }
    });
});
