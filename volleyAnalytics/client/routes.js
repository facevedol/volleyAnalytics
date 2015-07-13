angular.module('volleyAnalytics').config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
  function($urlRouterProvider, $stateProvider, $locationProvider){

    $locationProvider.html5Mode(true);

    $stateProvider
      .state('matchDetails', {
        url: '/partidos/:matchId',
        templateUrl: 'client/matches/views/match-details.ng.html',
        controller: 'MatchDetailsCtrl'
      })
      .state('tournaments',{
        url:'/torneos',
        templateUrl: 'client/tournaments/views/tournaments-list.ng.html',
        controller: 'TournamentsListCtrl'
      })
      .state('tournamentDetails',{
        url:'/torneos/:tournamentId',
        templateUrl: 'client/tournaments/views/tournament-details.ng.html',
        controller: 'TournamentDetailsCtrl'
      })
      .state('teams', {
        url: '/equipos',
        templateUrl: 'client/teams/views/teams-list.ng.html',
        controller: 'TeamsListCtrl'
      })
      .state('teamDetails', {
        url: '/equipos/:teamId',
        templateUrl: 'client/teams/views/team-details.ng.html',
        controller: 'TeamDetailsCtrl'
      });

      $urlRouterProvider.otherwise('/equipos');
}]);
