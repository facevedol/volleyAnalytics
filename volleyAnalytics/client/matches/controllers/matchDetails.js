angular.module('volleyAnalytics').controller('MatchDetailsCtrl', ['$scope', '$stateParams', '$meteor',
  function($scope, $stateParams, $meteor){
      $scope.match = $meteor.object(Matches, $stateParams.matchId, false);
      $scope.team1 = $meteor.object(Teams, $scope.match.team1.team, false);
      $scope.team2 = $meteor.object(Teams, $scope.match.team2.team, false);
      $scope.players = $meteor.collection(Players);

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
}]);
