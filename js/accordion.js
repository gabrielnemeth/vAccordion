(function ($) {
    "use strict";
    $.fn.vAccordion = function (options) {

        var settings = $.extend({
            //Defaults
            slideOpen: 50,
            slideClosed: 25
        }, options);


        var windowWidth, windowHeight, openSlidePercentage, listItems, closedItems, closedItemsPercentage;

        var getWindowSize = function () {
            windowWidth = $(window).width();
            windowHeight = $(window).height();

        }; // Function for getting the actual windows size

        var setSlideHeightAnim = function () {
            $('#vaccordion li').each(function () {

                if ($(this).hasClass('open')) {
                    
                    $(this).animate({

                        height: windowHeight * openSlidePercentage

                    }, 500, 'linear');
                } else {
                    
                    $(this).animate({

                        height: windowHeight * closedItemsPercentage

                    }, 500, 'linear');
                }

            });
        }; // Function to set the slide height with animation

        var setSlideHeightPure = function () {
            $('#vaccordion li').each(function () {

                if ($(this).hasClass('open')) {
                    $(this).css('height', windowHeight * openSlidePercentage); // Set the open list item's height
                } else {
                    $(this).css('height', windowHeight * closedItemsPercentage); // Set the closed list item's height
                }

            });
        }; // Function to set the slide height without animation

        openSlidePercentage = settings.slideOpen / 100; // Get the open list items height in percentage

        listItems = $('#vaccordion li').length; // Number of list items
        closedItems = listItems - 1; // There is one open slide

        closedItemsPercentage = settings.slideClosed * closedItems;

        if (((settings.slideClosed * closedItems) + settings.slideOpen) === 100) { // Checking if the height value from user is correct
            
            closedItemsPercentage = settings.slideClosed;
            closedItemsPercentage = closedItemsPercentage / 100; // Calculated the percentage of one closed slide according of user value

        } else { // If the user gives wrong values, then the closed slides are calculated from open slide height
            console.warn('You didn\'t divided equaly the closed sliders.');
            closedItemsPercentage = 100 - settings.slideOpen;
            closedItemsPercentage = closedItemsPercentage / closedItems;
            closedItemsPercentage = closedItemsPercentage / 100;
        }

        getWindowSize(); // Get the initial windows size
        setSlideHeightPure(); // Set the initail height of the slides
        
        $('#vaccordion li').click(function () {

            $('#vaccordion li').removeClass('open');
            $(this).addClass('open');
            setSlideHeightAnim(); // Assign the correct hight for the open class

        }); // Toggle the open class

        $(window).resize(function () {
            getWindowSize();
            setSlideHeightPure();
        }); // Get the window size on resize


    }
}(jQuery));