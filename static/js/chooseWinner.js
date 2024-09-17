$(document).ready(function () {
    $('.back').on('click', function () {
        var $backElement = $(this);
        var $img = $backElement.find('.team-logo')[0];
        var colorThief = new ColorThief();

        if ($img.complete) {
            setBackgroundColor($img, $backElement);
        } else {
            $img.addEventListener('load', function () {
                setBackgroundColor($img, $backElement);
            });
        }

        function setBackgroundColor(img, $backElement) {
            var dominantColor = colorThief.getColor(img);
            $backElement.css('background-color', 'rgb(' + dominantColor.join(',') + ')');
        }

        // Get the match context
        var $gameBid = $backElement.closest('.game-bid');
        var $closestTeam = $backElement.closest('.team');

        // If the clicked team is already selected, deselect it
        if ($closestTeam.hasClass("chosen")) {
            $closestTeam.removeClass("chosen");
            $backElement.css("background-color", "#fff");
            $closestTeam.find("span").css("color", "rgb(117, 118, 120)");
            $closestTeam.find(".team-logo").css("filter", "none");
            $closestTeam.find(".team-name").css("color", "#000");
            $closestTeam.find(".bid span").css("color", "#000");
            return; // Exit the function, no need to select the same team again
        }

        // Check if any other team is already selected in this match
        var $selectedTeam = $gameBid.find('.team.chosen');
        if ($selectedTeam.length) {
            // Deselect the other team
            $selectedTeam.removeClass("chosen");
            $selectedTeam.find(".back").css("background-color", "#fff");
            $selectedTeam.find("span").css("color", "rgb(117, 118, 120)");
            $selectedTeam.find(".team-logo").css("filter", "none");
            $selectedTeam.find(".team-name").css("color", "#000");
            $selectedTeam.find(".bid span").css("color", "#000");
        }

        // Select the clicked team
        if ($closestTeam.length) {
            $closestTeam.addClass("chosen");
        }

        var closestTeamInfo = $backElement.find(".team-info").first();
        closestTeamInfo.find("span").css("color", "#fff");

        var closestTeamName = $(this).find(".team-name").first();
        closestTeamName.css("color", "#fff");

        var closestTeamLogo = $backElement.find(".team-logo").first();
        closestTeamLogo.css("filter", "invert(50%) brightness(150%) contrast(200%)");
    });
});
