angular.module('volleyAnalytics').controller('MatchDetailsCtrl', ['$scope', '$stateParams', '$meteor',
  function($scope, $stateParams, $meteor){
      $scope.match = $meteor.object(Matches, $stateParams.matchId, false);
      $scope.team1 = $meteor.object(Teams, $scope.match.team1.team, false);
      $scope.team2 = $meteor.object(Teams, $scope.match.team2.team, false);
      $scope.players = $meteor.collection(Players);
}]);
