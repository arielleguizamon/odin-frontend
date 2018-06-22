angular.module('odin.controllers')
.controller('TagsController', TagsController);

function TagsController($rootScope, $scope, $filter, rest, LocationSearchService, $routeParams, usSpinnerService) {
    usSpinnerService.spin('spinner');
    $rootScope.countQuery ++;
    var filterName = 'tags.slug';
    var tagsAutocomplete;

    $scope.custom_defaults = $rootScope.custom_defaults;

    var tags_cache = JSON.parse(sessionStorage.getItem('tags'));

    if(LocationSearchService.isSet(filterName) == 0) {
        sessionStorage.removeItem('selectedTags');
        sessionStorage.removeItem('tagsAutocomplete');
    }

    $scope.currentColor = sessionStorage.getItem('currentColor') || '';

    $scope.tags = [];
    $scope.resultTags = [];
    $scope.selectedTags = JSON.parse(sessionStorage.getItem('selectedTags'));
    $scope.tagNames = [];
    $scope.collapsed = true;
    $scope.toggleCollapse = function() {
        $scope.collapsed = !$scope.collapsed;
    };
    if (!$.isArray($scope.selectedTags)) {
      $scope.selectedTags = [];
    }

    $scope.loadTags = function() {
            for (var i = 0; i < tags_cache.length; i++) {
                var tag = tags_cache[i];
                tag.active = LocationSearchService.isActive(filterName, tag.slug);
                $scope.tags.push(tag);
                $scope.tagNames.push(tag.name);
            }

            tagsAutocomplete = JSON.parse(sessionStorage.getItem('tagsAutocomplete'));
            if (tagsAutocomplete) {
              $scope.tagNames=tagsAutocomplete.sort();
            } else {
              tagsAutocomplete =  $scope.tagNames.sort();
            }
            if ($filter('filter')($scope.tags, {active: true})[0] !== undefined) {
              $scope.collapsed=false;
            }

            $rootScope.countQuery --;
            if($rootScope.countQuery == 0) { usSpinnerService.stop('spinner'); }
    };


    $scope.loadTags(0);
    $scope.selectTag = function(tag) {
        $rootScope.showFiltersMenu = false;
        $rootScope.showBackdrop = false;
        if(tag.active) {
            tag.active = false;
            $scope.selectedTags.splice($scope.selectedTags.indexOf(tag.name),1);
            tagsAutocomplete.push(tag.name);
            LocationSearchService.removeFilterValue(filterName, tag.slug);
        } else {
            tag.active = true;
            $scope.selectedTags.push(tag);
            tagsAutocomplete.splice(tagsAutocomplete.indexOf(tag.name),1);
            LocationSearchService.addFilterValue(filterName, tag.slug);
        }
        sessionStorage.setItem('tagsAutocomplete',JSON.stringify(tagsAutocomplete));
        sessionStorage.setItem('selectedTags', JSON.stringify($scope.selectedTags));
    };
    $scope.removeAll = function() {
        LocationSearchService.deleteFilter(filterName);
        sessionStorage.removeItem('selectedTags');
    };

    $scope.tagTypedSelected = function(tagSelected){
      tagSelected=$scope.tags.filter(function(tag){
        return tag.name == tagSelected;
      });
      $scope.selectTag(tagSelected[0]);
      $scope.tagNames.splice($scope.tagNames.indexOf(tagSelected[0].name),1);
    }

}
