angular.module('volleyAnalytics').controller('TeamsListCtrl', ['$scope', '$meteor',
  function($scope, $meteor){
    $scope.teams = $meteor.collection(Teams);

    $scope.remove = function(team) {
      $scope.teams.remove(team);
    };
  }]);
