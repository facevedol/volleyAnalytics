angular.module('volleyAnalytics').controller('TournamentsListCtrl', ['$scope', '$meteor',
  function($scope, $meteor){
    $scope.tournaments = $meteor.collection(Tournaments);
    
    $scope.remove = function(team) {
      $scope.tournaments.remove(team);
    };
  }]);
