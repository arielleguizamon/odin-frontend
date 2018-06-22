angular.module('odin')

.directive('categoryPercent', function() {
    return {
        restrict: 'A',
        scope: {
            categoryPercent: '='
        },
        replace: true,
        link: function postlink(scope, element, attrs) {
            scope.$watch("categoryPercent", function(newVal, oldVal) {
                var $element = $(element);
                var color = '#fdd306';
                if (attrs.currentcolor !== 'null') {
                    color = attrs.currentcolor;
                }
                $element.css({
                    background: "linear-gradient(to right, " + color + " 0%, " + color + " " + scope.categoryPercent + "%, #F6F6F6 " + scope.categoryPercent + "%, #F6F6F6 100%)"
                });
            });
        }
    };
})

.directive('threeDots', function($compile) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var ensureCompileRunsOnce = scope.$watch(
                function(scope) {
                    // watch the 'compile' expression for changes
                    return scope.$eval(attrs.threeDots);
                },
                function(value) {
                    // when the 'compile' expression changes
                    // assign it into the current DOM
                    element.html(value);

                    // compile the new DOM and link it to the current
                    // scope.
                    // NOTE: we only compile .childNodes so that
                    // we don't get into infinite loop compiling ourselves
                    $compile(element.contents())(scope);
                    ensureCompileRunsOnce();
                    $(element).dotdotdot({
                        height: 100,
                        wrap: 'letter'
                    });
                }
            );
        }
    };
})
