angular.module('odin')
    .directive("resultDatasets", function() {
        return {
            restrict: "E",
            templateUrl: "directives/dataset-list/result-datasets.html",
            controller: function($scope, $window, $location, rest) {
                $scope.stats = {};
                $scope.views = {};

                $scope.toggleDropdown = function(event) {
                    if ($(event.target).next().hasClass('dataset-additional-info-table-inactive')) {
                        $(event.target).next().addClass('dataset-additional-info-table-active');
                        $(event.target).next().removeClass('dataset-additional-info-table-inactive');
                        $(event.target).addClass('dataset-additional-info-active');
                    } else {
                        $(event.target).next().addClass('dataset-additional-info-table-inactive');
                        $(event.target).next().removeClass('dataset-additional-info-table-active');
                        $(event.target).removeClass('dataset-additional-info-active');
                    }
                };

            },
            controllerAs: "dataset"
        };
    });
