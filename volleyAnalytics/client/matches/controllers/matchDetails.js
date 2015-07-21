angular.module('volleyAnalytics').controller('MatchDetailsCtrl', ['$scope', '$stateParams', '$meteor',
  function($scope, $stateParams, $meteor){
      $scope.match = $meteor.object(Matches, $stateParams.matchId, false);
      $scope.team1 = $meteor.object(Teams, $scope.match.team1.team, false);
      $scope.team2 = $meteor.object(Teams, $scope.match.team2.team, false);
      $scope.players = $meteor.collection(Players);
      $scope.games = Games.find({match:$scope.match._id},{sort:{time:-1}}).fetch();

      $scope.keyboard = {
        'team1': {
          'team': $scope.team1,
          'keys': {
            'Q': null,
            'W': null,
            'E': null,
            'A': null,
            'S': null,
            'D': null,
          }
        },
        'team2': {
          'team': $scope.team2,
          'keys': {
            'U': null,
            'I': null,
            'O': null,
            'J': null,
            'K': null,
            'L': null,
          }
        },
      };

      $scope.updateMatchScore = function() {
        gamesT1 = Games.find({match:$scope.match._id, winner:$scope.team1._id},{sort:{time:-1}}).fetch();
        gamesT2 = Games.find({match:$scope.match._id, winner:$scope.team2._id},{sort:{time:-1}}).fetch();
        if(!gamesT1) {
          sT1 = 0;
        } else {
          sT1 = gamesT1.length;
        }
        if(!gamesT2) {
          sT2 = 0;
        } else {
          sT2 = gamesT2.length;
        }
        if(!$scope.$$phase) {
          Matches.update($scope.match._id, {$set:{'team1.score':sT1, 'team2.score':sT2}});
          $scope.match = $meteor.object(Matches, $stateParams.matchId, false);
        }
        else {
          Matches.update($scope.match._id, {$set:{'team1.score':sT1, 'team2.score':sT2}});
          $scope.match = $meteor.object(Matches, $stateParams.matchId, false);
        }
      }

      $scope.updateGameScore = function(gameId, teamId) {

        if(teamId == $scope.team1._id) {
          Games.update(gameId, {$inc:{'team1.score':1}});
        }
        if(teamId == $scope.team2._id) {
          Games.update(gameId, {$inc:{'team2.score':1}});
        }
        if(!$scope.$$phase) {
          $scope.$apply(function(){$scope.games = Games.find({match:$scope.match._id},{sort:{time:-1}}).fetch();});
        }
        else {
          $scope.games = Games.find({match:$scope.match._id},{sort:{time:-1}}).fetch();
        }


        console.log($scope.games);
      }
      $scope.updateGameScore();

}]);
