config = ($urlProvider, $locationProvider) ->
  $urlProvider.otherwise '/'

  $locationProvider.html5Mode {
    enabled: false
    requireBase: false
  }

  $locationProvider.hashPrefix '!'

config.$inject = ['$urlRouterProvider', '$locationProvider']

run = ->
  FastClick.attach document.body

angular.module 'application', [
  'ui.router',
  'ngAnimate',
  'foundation',
  'foundation.dynamicRouting',
  'foundation.dynamicRouting.animations'
]
  .config config
  .run run
