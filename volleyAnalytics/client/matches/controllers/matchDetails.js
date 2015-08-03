angular.module('volleyAnalytics').controller('MatchDetailsCtrl', ['$scope', '$stateParams', '$meteor',
  function($scope, $stateParams, $meteor){
      $scope.match = $meteor.object(Matches, $stateParams.matchId, false);
      $scope.team1 = $meteor.object(Teams, $scope.match.team1.team, false);
      $scope.team2 = $meteor.object(Teams, $scope.match.team2.team, false);
      $scope.players = $meteor.collection(Players);
      $scope.games = Games.find({match:$scope.match._id},{sort:{time:-1}}).fetch();

      $scope.field = {
        'team1': {
          'team': $scope.team1,
          'positions': {
            'pos1': null,
            'pos2': null,
            'pos3': null,
            'pos4': null,
            'pos5': null,
            'pos6': null,
          }
        },
        'team2': {
          'team': $scope.team2,
          'positions': {
            'pos1': null,
            'pos2': null,
            'pos3': null,
            'pos4': null,
            'pos5': null,
            'pos6': null,
          }
        }
      };

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

      $scope.rotate = function(team) {
        var temp = JSON.parse(JSON.stringify($scope.field[team]['positions']));
        $scope.field[team]['positions']['pos1'] = temp['pos6'];
        $scope.field[team]['positions']['pos2'] = temp['pos1'];
        $scope.field[team]['positions']['pos3'] = temp['pos2'];
        $scope.field[team]['positions']['pos4'] = temp['pos3'];
        $scope.field[team]['positions']['pos5'] = temp['pos4'];
        $scope.field[team]['positions']['pos6'] = temp['pos5'];
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
