angular.module('volleyAnalytics').controller('TournamentDetailsCtrl', ['$scope', '$stateParams', '$meteor',
  function($scope, $stateParams, $meteor){
    $scope.tournament = $meteor.object(Tournaments, $stateParams.tournamentId, false);
    $scope.teams = $meteor.collection(Teams);
    $scope.matches = $meteor.collection(Matches);

    $scope.loadTeams = function(match) {
      $scope.team1 = $meteor.object(Teams, match.team1.team, false);
      $scope.team2 = $meteor.object(Teams, match.team2.team, false);
    }

    $scope.info = function(match) {
      console.log(match);
    }

    $scope.save = function(newMatch) {
      console.log(newMatch);
      var match = {
                  'team1': {
                    'team': newMatch.team1._id,
                    'score': 0
                  },
                  'team2': {
                    'team': newMatch.team2._id,
                    'score': 0
                  }
      };
      $scope.matches.save(match);

    };

    $scope.reset = function() {
      $scope.tournament.reset();
    };

    $scope.remove = function(match) {
      $scope.matches.remove(match);
    };

  }]);
