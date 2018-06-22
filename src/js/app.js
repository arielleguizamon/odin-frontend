(function (window, angular) {
    angular.module('odin', [
      "ngRoute",
      "odin.config",
      "odin.version",
      "odin.customdefaults",
      "ngResource",
      "ngProgress",
      "odin.controllers",
      "store-directives",
      "store-factories",
      "chart.js",

      "ngCookies",
      "authentication-service",
      "ngRoute.middleware",

      "matchMedia",

      "vcRecaptcha",
      "angularSpinner",

      "oc.lazyLoad",
      "ngSanitize"
    ])
})(window, window.angular);
