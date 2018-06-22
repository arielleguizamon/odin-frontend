(function (window, angular) {
  var app = angular.module('odin');

    app.filter('truncString', function() {
        return function(input) {
            var add = '...';
            var max = 26;
            var str = input;
            return (typeof str === 'string' && str.length > max ? str.substring(0, max) + add : str);
        }
    });

    app.filter('slug', function() {
        return function(input) {
            if (input) {
                return slug(input, {
                    lower: true
                });
            }
        };
    });

    app.filter('searchCategory', function() {
        return function(input) {
            var result = [];
            if (!!input) {
                if (!!sessionStorage.getItem('categories')) {
                    var categories = JSON.parse(sessionStorage.getItem('categories'));

                    angular.forEach(categories, function(element) {
                        if (element.id == input) {
                            result.push(element);
                        }
                    });

                    return result[0];
                } else {
                    return {};
                }

            } else {
                return {};
            }

        };
    });

    app.filter('searchFiletype', function() {
        return function(input) {
            var result = [];
            if (!!input) {
                if (!!sessionStorage.getItem('filetypes')) {
                    var filetypes = JSON.parse(sessionStorage.getItem('filetypes'));

                    angular.forEach(filetypes, function(element) {
                        if (element.id == input) {
                            result.push(element);
                        }
                    });

                    return result[0];
                } else {
                    return {};
                }

            } else {
                return {};
            }

        };
    });

    app.filter("sanitize", ['$sce', function($sce) {
        return function(htmlCode) {
            return $sce.trustAsHtml(htmlCode);
        }
    }]);

})(window, window.angular);
