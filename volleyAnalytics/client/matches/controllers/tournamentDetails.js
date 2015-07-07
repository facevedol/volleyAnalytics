angular.module('volleyAnalytics').controller('TournamentDetailsCtrl', ['$scope', '$stateParams', '$meteor',
  function($scope, $stateParams, $meteor){
    $scope.tournament = $meteor.object(Tournaments, $stateParams.teamId, false);
    $scope.teams = $meteor.collection(Teams);
    $scope.matches = $meteor.collection(Matches);

    $scope.info = function(match) {
      console.log(match);
    }
    $scope.save = function(newMatch) {
      
    };

    $scope.reset = function() {
      $scope.tournament.reset();
    };

    $scope.remove = function(match) {
      $scope.matches.remove(match);
    };

  }]);
