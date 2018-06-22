(function() {
    var app = angular.module('store-directives', []);

    app.directive('ngEnter', function() {
        return function(scope, element, attrs) {
            element.bind("keydown keypress", function(event) {
                if (event.which === 13) {
                    scope.$apply(function() {
                        scope.$eval(attrs.ngEnter, {
                            'event': event
                        });
                    });

                    event.preventDefault();
                }
            });
        };
    });

    app.directive('svgImg', function($rootScope, $cookieStore) {
        return {
            restrict: 'A',
            scope: {
                svgImg: '='
            },
            link: function(scope, element, attrs) {
                var $element = jQuery(element);
                var attributes = $element.prop("attributes");

                // Get the SVG tag, ignore the rest
                var $svg = jQuery(scope.svgImg);

                // Remove any invalid XML tags
                $svg = $svg.removeAttr('xmlns:a');

                // Loop through IMG attributes and apply on SVG
                $.each(attributes, function() {
                    $svg.attr(this.name, this.value);
                });

                // Replace IMG with SVG
                $element.append($svg);

                // Removes opacity
                $element.find("g[opacity='0.75']").css("opacity", 0);
                var color_fill = '#fff';

                if (!!attrs.currentcolor && attrs.currentcolor !== undefined && attrs.currentcolor !== "null") {
                    color_fill = attrs.currentcolor;
                }

                $element.find("path").css("fill", color_fill);
                $element.find("rect").css("fill", color_fill);
                $element.find("polygon").css("fill", color_fill);
                $element.find("circle").css("fill", color_fill);
            }
        };
    });

    app.directive('brandingData', function() {
        return {
            restrict: 'E',
            templateUrl: 'directives/branding-data.html',
        };
    });

    app.directive('searchBarHome', function() {
        return {
            restrict: 'E',
            templateUrl: 'directives/search-bar-home.html',
            controller: SearchDatasetsController
        }
    });


    app.directive('footerBar', function() {
        return {
            restrict: 'E',
            templateUrl: 'directives/footer-bar.html',
        };
    });

})();
