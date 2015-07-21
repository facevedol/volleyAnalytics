angular.module('volleyAnalytics').controller('MatchDetailsCtrl', ['$scope', '$stateParams', '$meteor',
  function($scope, $stateParams, $meteor){
      $scope.match = $meteor.object(Matches, $stateParams.matchId, false);
      $scope.team1 = $meteor.object(Teams, $scope.match.team1.team, false);
      $scope.team2 = $meteor.object(Teams, $scope.match.team2.team, false);
      $scope.players = $meteor.collection(Players);
      $scope.games = [];

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

      $scope.updateScore = function() {
        sT1 = 0;
        sT2 = 0;
        games = [];
        gamesResult = Games.find({match:$scope.match._id},{sort:{time:-1}}).fetch();
        gamesId = gamesResult.map(function(g){return g._id;});
        console.log(gamesId);
        for(i = 0; i<gamesId.length; i++) {
          rallies = Rallies.find({game:gamesId[i]}).fetch();
          console.log(rallies);
          for(j=0; j<rallies.length; j++) {
            if(rallies[j].winner == $scope.team1._id)
              sT1++;
            else if (rallies[j].winner == $scope.team2._id)
              sT2++;
          }
          games.push({
            _id : gamesId[i],
            team1 : {score: sT1},
            team2 : {score: sT2}
          });
        }
        if(!$scope.$$phase){
          $scope.$apply(function(){$scope.games = games;});
        }
        else {
          $scope.games = games;
        }
        console.log($scope.games);
      }
      $scope.updateScore();

}]);
