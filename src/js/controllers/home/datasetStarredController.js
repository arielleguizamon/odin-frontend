function DatasetStarredController($scope, $location, $httpParamSerializer, rest, $rootScope, $sce, usSpinnerService) {
    // Flash.clear();
    $scope.modelName = "Dataset";
    $scope.type = "datasets";
    $scope.params = {
        orderBy: 'updatedAt',
        sort: 'DESC',
        limit: 4,
        starred: true,
        fields: ['id', 'name', 'slug', 'description'].join()
    };
    $scope.starredDataset = rest().get({
        type: $scope.type,
        params: $httpParamSerializer($scope.params)
        // params: "fields=id,name,slug,description&orderBy=updatedAt&sort=DESC&limit=4&starred=true"
    }, function (result) {
        result.data.forEach(function (dataset) {
            dataset.fileTypes = [];
            dataset.fileTypesNames = [];
            $scope.filesResults = rest().getFiletypes({
                type: 'datasets',
                id: dataset.id
            }, function (result) {
                $scope.ftypes = result.data;
                $scope.ftypes.forEach(function (element) {
                    if (!!element.id) {
                        dataset.fileTypes.push(element.id);
                    }
                });

            }, function (error) {
            });
        });
        $rootScope.showLoadingStarred = false;
    }, function (error) {
        $rootScope.showLoadingStarred = false;
    });

    $scope.url = function (id) {
        return $rootScope.url + '/datasets/' + id + '/download'
    };
}
