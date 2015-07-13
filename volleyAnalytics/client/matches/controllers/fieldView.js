angular.module('volleyAnalytics').controller('FieldViewCtrl', ['$scope', '$stateParams', '$meteor',
  function($scope, $stateParams, $meteor){
    //nothing here, yet!
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

    $scope.rotate = function(team) {
      var temp = JSON.parse(JSON.stringify($scope.field[team]['positions']));
      $scope.field[team]['positions']['pos1'] = temp['pos6'];
      $scope.field[team]['positions']['pos2'] = temp['pos1'];
      $scope.field[team]['positions']['pos3'] = temp['pos2'];
      $scope.field[team]['positions']['pos4'] = temp['pos3'];
      $scope.field[team]['positions']['pos5'] = temp['pos4'];
      $scope.field[team]['positions']['pos6'] = temp['pos5'];
    };
}]);
