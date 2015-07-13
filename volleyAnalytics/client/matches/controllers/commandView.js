angular.module('volleyAnalytics').controller('CommandViewCtrl', ['$scope', '$document',
  function($scope, $document){

    $scope.command = {
                      'player': {'position': 'OP'},
                      'action': 'A',
                      'grade' : 'G',
                      'zone'  : 'Z'
    };

    function evalPlayer(key) {
        var pl = null;
        pl = $scope.keyboard.team1.keys[key];
        if (pl) {
          return pl;
        }
        return $scope.keyboard.team2.keys[key];
    }

    function evalAction(key) {
      var map = { 'X' : 'A1',
                  'C' : 'A2',
                  'V' : 'A3',
                  'B' : 'A4',
                  'N' : 'A5',
                  'M' : 'A6',
                };
      if ( map[key] != null ) {
        return map[key];
      } else {
        return null;
      }
    }

    function evalGrade(key) {
      var map = { '1' : '!',
                  '2' : '@',
                  '3' : '#',
                  '4' : '$',
                  '5' : '%'
                };
      if( map[key] != null ) {
        return map[key];
      } else {
        return null;
      }
    }

    function evalZone(key) {
      var map = { 'Q' : {'team':'T1', 'zone':'1'},
                  'W' : {'team':'T1', 'zone':'6'},
                  'E' : {'team':'T1', 'zone':'5'},
                  'A' : {'team':'T1', 'zone':'2'},
                  'S' : {'team':'T1', 'zone':'3'},
                  'D' : {'team':'T1', 'zone':'4'},
                  'U' : {'team':'T2', 'zone':'4'},
                  'I' : {'team':'T2', 'zone':'3'},
                  'O' : {'team':'T2', 'zone':'2'},
                  'J' : {'team':'T2', 'zone':'5'},
                  'K' : {'team':'T2', 'zone':'6'},
                  'L' : {'team':'T2', 'zone':'1'},
                };
      return map[key];
    }

    function changeField(field, key) {
      $scope.$apply(function() {
        if (key != null) {
          $scope.command[field] = key;
        } else {
          $scope.command[field] = null;
        }
      });
    }

    function addAction(key) {
      var key2 = null;
      if($scope.command.player == null) {
        key2 = evalPlayer(key);
        changeField('player', key2);
      }else if ($scope.command.action == null) {
        key2 = evalAction(key);
        changeField('action',key2);
      }else if ($scope.command.grade == null) {
        key2 = evalGrade(key);
        changeField('grade',key2);
      }else if ($scope.command.zone2 == null) {
        key2 = evalZone(key);
        changeField('zone',key2);
      }
    }

    function rmAction() {
      if($scope.command.zone != null) {
        changeField('zone',null);
      }else if ($scope.command.grade != null) {
        changeField('grade', null);
      }else if ($scope.command.action != null) {
        changeField('action', null);
      }else if ($scope.command.z1 !=null) {
        changeField('player', null);
      }
    }

    function cleanCommand() {
      $scope.$apply(function() {
        $scope.command = {'player' : null,
                          'action'  : null,
                          'grade': null,
                          'zone' : null};
      });
    }

    function saveCommand() {
      ;
    }
    function writeCommand(e) {
      if(e.which == 8) {
        rmAction();
        e.preventDefault();
      } else if (e.which == 13 || e.which == 32) {
        if($scope.command['grade'] != null) {
          saveCommand();
          cleanCommand();
          console.log("Command Saved");
        }
        ;
      } else{
        key = String.fromCharCode(e.keyCode);
        if(/[a-zA-Z0-9]/i.test(key)) {
          addAction(key);
        }
      }
    }

    $document.on('keydown', writeCommand);
}]);
