angular.module('volleyAnalytics').controller('TeamDetailsCtrl', ['$scope', '$stateParams', '$meteor',
  function($scope, $stateParams, $meteor){
    $scope.hello = 'hello world';
    $scope.team = $meteor.object(Teams, $stateParams.teamId, false);
    $scope.players = $meteor.collection(Players);

    $scope.save = function() {
      $scope.team.save();
    };

    $scope.reset = function() {
      $scope.team.reset();
    };

    $scope.remove = function(player) {
      $scope.players.remove(player);
    };

  }]);
