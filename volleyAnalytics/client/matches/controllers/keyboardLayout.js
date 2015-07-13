angular.module('volleyAnalytics').controller('KeyboardLayoutCtrl', ['$scope', '$stateParams', '$meteor',
  function($scope, $stateParams, $meteor){
    $scope.info = function() {
      console.log($scope.keyboard);
    }

}]);
