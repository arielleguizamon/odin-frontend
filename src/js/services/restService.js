angular.module('store-factories')
.factory('rest', ['$resource', '$location', '$rootScope', 'ngProgressFactory', function($resource, $location, $rootScope, ngProgressFactory) {
    $rootScope.progressbar = ngProgressFactory.createInstance();
    return function($url) {
        $rootScope.progressbar.start();
        var token=$rootScope.globals.currentUser.token;
        $url = ($url == null) ? $rootScope.url + '/:type' : $url;
        return $resource($url, {type: ''}, {
            get: {
                url: $url + "?:params",
                method: 'GET',
                headers: {'Authorization': 'Bearer ' + token},
                transformResponse: function(data) {
                    $rootScope.progressbar.complete();
                    return angular.fromJson(data);
                },
                interceptor: {responseError: handError}
            },
            search: {
                url: $url + "/search?:params",
                method: 'GET',
                // headers: {'Authorization': 'JWT ' + token},
                transformResponse: function(data) {
                    $rootScope.progressbar.complete();
                    return angular.fromJson(data);
                },
                interceptor: {responseError: handError}
            },
            statistics: {
                url: $url + "/categories?:params",
                method: 'GET',
                // headers: {'Authorization': 'Bearer ' + token},
                transformResponse: function(data) {
                    $rootScope.progressbar.complete();
                    return angular.fromJson(data);
                },
                interceptor: {responseError: handError}
            },
            count: {
                url: $url + "/count?:params",
                method: 'GET',
                headers: {'Authorization': 'Bearer ' + token},
                transformResponse: function(data) {
                    $rootScope.progressbar.complete();
                    return angular.fromJson(data);
                },
                interceptor: {responseError: handError}
            },
            image: {
                url: $url + "/:id/image",
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/xml',
                    'Cache-Control': 'max-age=604800'
                },
                transformResponse: function(data) {
                    $rootScope.progressbar.complete();
                    return {svg: data};
                },
                interceptor: {responseError: handError}
            },
            contents: {
                url: $url + "/:id/contents?:params",
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                transformResponse: function(data) {
                    $rootScope.progressbar.complete();
                    return angular.fromJson(data);
                },
                interceptor: {
                    responseError: handError
                }
            },
            getFiletypes: {
                url: $url + "/:id/filetypes?:params",
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                transformResponse: function(data) {
                    $rootScope.progressbar.complete();
                    return angular.fromJson(data);
                },
                interceptor: {
                    responseError: handError
                }
            },
            resources: {
                url: $url + "/:id/resources?:params",
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                transformResponse: function(data) {
                    $rootScope.progressbar.complete();
                    return angular.fromJson(data);
                },
                interceptor: {
                    responseError: handError
                }
            },
            getArray: {
                url: $url + "/:id/:asociate",
                method: 'GET',
                headers: {'Authorization': 'Bearer ' + token},
                transformResponse: function(data) {
                    $rootScope.progressbar.complete();
                    var json = JSON.parse(data);
                    return json.data;
                },
                isArray: true,
                interceptor: {responseError: handError}
            },
            findOne: {
                url: $url + "/:id?:params",
                method: 'GET',
                headers: {'Authorization': 'Bearer ' + token},
                transformResponse: function(data) {
                    if (data) {
                        $rootScope.progressbar.complete();
                        var json = JSON.parse(data)
                        return angular.fromJson(json.data);
                    } else {
                        $rootScope.progressbar.complete();
                    }
                },
                interceptor: {responseError: handError}
            },
            'save': {
                url: $url,
                method: 'POST',
                headers: {'Authorization': 'Bearer ' + token},
                interceptor: {responseError: handError},
                transformResponse: function(data) {
                    if (data) {
                        $rootScope.progressbar.complete();
                        return angular.fromJson(data);
                    } else {
                        $rootScope.progressbar.complete();
                    }
                }
            }
        });
    }


    function handError(e) {
        params = JSON.stringify(e.data) || " "
        if (!!e.data) {
            if (e.data.code == "E_VALIDATION") {
                params = validationErrors(e.data);
            }
        }
        $rootScope.progressbar.complete();

    }

    function validationErrors(data) {
        var data = data.data;
        var returntext = "";
        for (d in data) {
            for (r in data[d]) {
                returntext = "<b>SERVER VALIDATIONS: </b> <br><p>Rule: " + data[d][r].rule + " <br>Message:" + data[d][r].message + " </p>";
            }
        }

        return returntext
    }
}]);
