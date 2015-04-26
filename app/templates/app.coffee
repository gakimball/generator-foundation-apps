angular.module 'application', [
  'ui.router',
  'ngAnimate',
  'foundation',
  'foundation.dynamicRouting',
  'foundation.dynamicRouting.animations'
]
  .config config
  .run run

config.$inject = ['$urlRouterProvider', '$locationProvider']

config =>
  $urlProvider.otherwise '/'

  $locationProvider.html5Mode {
    enabled: false
    requireBase: false
  }

  $locationProvider.hashPrefix '!'

run =>
  FastClick.attach document.body