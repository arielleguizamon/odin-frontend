(function (window, angular) {
    angular.module('odin')
    .config(config)

    function config($routeProvider, $locationProvider, $httpProvider, AuthenticationServiceProvider, $middlewareProvider, vcRecaptchaServiceProvider, ChartJsProvider, usSpinnerConfigProvider, $ocLazyLoadProvider) {
$locationProvider.html5Mode(true);

$ocLazyLoadProvider.config({

   modules: [
   {
     name:"lazy-contact",
     files: [
       "lazy-contact.min.js"
     ],
   },
   {
     name:"lazy-layout",
     files: [
       "plugins/pdf/pdf.js",

       "lazy-layout.min.js"
     ],
   },
   {
     name:"lazy-dataset-list",
     files: [
       "lazy-dataset-list.min.js"
     ],
   },
   {
     name:"lazy-dataset",
     files: [
       "lazy-dataset.min.js"
     ],
   }
 ]
});

vcRecaptchaServiceProvider.setDefaults({
   key: '6LdUgGsUAAAAAAsW-a2qBvH86_01RWVOA3mR9dnZ',
   theme: 'light'
});

usSpinnerConfigProvider.setDefaults({
   lines: 9,
   length: 40,
   width: 20,
   radius: 49,
   scale: 0.30,
   corners: 1,
   color: '#02545e' //Odin: '#ff386a' // MarcaBA: '#19c3e3'
   ,
   opacity: 0.3,
   rotate: 5,
   direction: 1,
   speed: 1,
   trail: 63,
   fps: 20,
   zIndex: 2e9,
   className: 'spinner',
   top: '50%',
   left: '50%',
   shadow: false,
   hwaccel: false,
   position: 'fixed' // Element positioning
});

$routeProvider
   .when("/", {
         templateUrl: "views/home.html",
         controller: 'controllerHome',
         resolve: {
           loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
              return $ocLazyLoad.load('bundle-home.min.js');
           }]
         }
     })
   .when("/dataset/:id", {
       templateUrl: "views/dataset.html",
       controller: 'DatasetController',
       resolve: {
         loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
           return $ocLazyLoad.load(['lazy-dataset', 'lazy-layout']).then(
               function(){
                  return $ocLazyLoad.load('bundle-dataset.min.js');
               }
           );
         }]
       }
   })
   .when("/datasets", {
       templateUrl: "views/datasets.html",
       controller: 'DatasetListController',
       resolve: {
         loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
           return $ocLazyLoad.load('lazy-dataset-list').then(
               function(){
                  return $ocLazyLoad.load('bundle-dataset-list.min.js');
               }
           );
         }]
       }
   })

   .when("/tyc", {
       templateUrl: "views/terms_and_conditions.html"
   })
   .when("/contact", {
       templateUrl: "views/contact.html",
       controller: 'ContactController',
       resolve: {
         loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
           return $ocLazyLoad.load('lazy-contact').then(
               function(){
                  return $ocLazyLoad.load('bundle-contact.min.js');
               }
           );
         }]
       }
   })
   .when("/layout/:id/preview", {
       templateUrl: "views/layout.html",
       controller: 'LayoutController',
       resolve: {
         loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
           return $ocLazyLoad.load('lazy-layout').then(
               function(){
                  return $ocLazyLoad.load('bundle-layout.min.js');
               }
           );
         }]
       }
   })
   .otherwise({
       redirectTo: '/'
   });

$auth = AuthenticationServiceProvider.$get('AuthenticationService');

ChartJsProvider.setOptions({
   tooltips: {
       callbacks: {
           title: function(tooltipItem, data) {
               return data.labels[tooltipItem[0].index];
           },
           label: function(tooltipItem, data) {
               var label = 'Cantidad';
               if (!!data.datasets[tooltipItem.datasetIndex][0] && data.datasets[tooltipItem.datasetIndex][0] != '') {
                   label = data.datasets[tooltipItem.datasetIndex][0];
               }
               return label + ': ' + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
           }
       }
   }
});

$middlewareProvider.map({
   /** Let everyone through */
   'everyone': ['$cookieStore', '$rootScope', '$http', function everyoneMiddleware($cookieStore, $rootScope, $http) {
       $rootScope.globals = $cookieStore.get('globals') || {};
       if ($rootScope.globals.currentUser) {
           $http.defaults.headers.common['Authorization'] = 'Bearer ' + $rootScope.globals.currentUser.token; // jshint ignore:line
           this.next();
       } else {
           $auth.Login($auth.Consumer, function(response) {
               if (!response.code) {
                   $auth.SetCredentials(response.data);
                   this.next();
               }
           }.bind(this));
       }

   }],
});

$middlewareProvider.global('everyone');

}
})(window, window.angular);
