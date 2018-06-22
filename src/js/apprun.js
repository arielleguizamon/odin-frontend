(function (window, angular) {
  angular.module('odin')
.run(run)

function run($rootScope, $location, $http, $window, EnvironmentConfig, BaseHTML5, odin_version, customdefaults, screenSize) {
    $rootScope.url = EnvironmentConfig.api;

    $rootScope.absUrl = $location.absUrl();
    $rootScope.baseHtml5 = BaseHTML5.url;
    $rootScope.odin_version = odin_version;
    $rootScope.custom_defaults = customdefaults;
    $rootScope.query = "";
    $rootScope.countQuery = 0;
    $rootScope.countFilter = 0;
    $rootScope.isHome = false;
    $rootScope.dataCategories = [];
    $rootScope.dataFiletypes = [];
    $rootScope.dataTags = [];
    $rootScope.dataOrgs = [];
    screenSize.rules = {
        any: '(max-width: 767px)'
    };
    $rootScope.isMobile = screenSize.on('any', function(match) {
        $rootScope.isMobile = match;
    });

}

})(window, window.angular);
