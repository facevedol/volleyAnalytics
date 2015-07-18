angular.module('volleyAnalytics').controller('CommandViewCtrl', ['$scope', '$document',
  function($scope, $document){

    // command = {
    //             'player': player,
    //             'action': 'Action',
    //             'grade' : 'Grade',
    //             'zone'  : 'Zone'
    // }

    // stage: {
    //   'state' : 'saque->k1->k2<->k3',
    //   'team'  : 'team1/team2'
    // }

    // action : [{
    //     'stage': stage,
    //     'commands' : [command]
    // }]

    // point : {
    //   'starter' : 'team1/team2',
    //   'winner'  : 'team1/team2/null'
    //   'actions' : [action]
    // }

    // game : {
    //   'team1':{'score': pointsnumber},
    //   'team2':{'score': pointsnumber},
    //   'points':[point],
    //   'winner': 'team1/team2'
    // }

    // match = {
    //             'team1': {
    //               'team': newMatch.team1._id,
    //               'score': 0
    //             },
    //             'team2': {
    //               'team': newMatch.team2._id,
    //               'score': 0
    //             },
    //             'games' : [game]
    // }

    $scope.point = {
      'starter' : null,
      'winner'  : null,
      'actions' : []
    };

    $scope.action = {
        'stage': {
          'state' : null,
          'team'  : null
        },
        'commands' : []
    };

    $scope.command = {
                'player': null,
                'action': null,
                'grade' : null,
                'zone'  : null
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
      var map = { 'Q' : {'team':$scope.team1._id, 'zone':'1'},
                  'W' : {'team':$scope.team1._id, 'zone':'6'},
                  'E' : {'team':$scope.team1._id, 'zone':'5'},
                  'A' : {'team':$scope.team1._id, 'zone':'2'},
                  'S' : {'team':$scope.team1._id, 'zone':'3'},
                  'D' : {'team':$scope.team1._id, 'zone':'4'},
                  'U' : {'team':$scope.team2._id, 'zone':'4'},
                  'I' : {'team':$scope.team2._id, 'zone':'3'},
                  'O' : {'team':$scope.team2._id, 'zone':'2'},
                  'J' : {'team':$scope.team2._id, 'zone':'5'},
                  'K' : {'team':$scope.team2._id, 'zone':'6'},
                  'L' : {'team':$scope.team2._id, 'zone':'1'},
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
      // Point setup
      if ($scope.point.starter == null) {
        $scope.point.starter = $scope.command.player.team;
        $scope.point.actions = [{
          stage : {'state' : null, 'team' : null},
          commands : []
        }];
        $scope.action = $scope.point.actions[$scope.point.actions.length-1];
      }

      // Action Setup
      if ($scope.action.stage.state == null) {
        $scope.action.stage.state = 'saque';
        $scope.action.stage.team = $scope.command.player.team;
      }

      if ($scope.command.player.team != $scope.action.stage.team) {


        if ( $scope.action.stage.state == 'saque' ){
          $scope.point.actions.push({
            stage : {'state' : 'k1', 'team' : $scope.command.player.team},
            commands : []
          });
        } else {
          $scope.point.actions.push({
            stage : {'state' : 'k2', 'team' : $scope.command.player.team},
            commands : []
          });
        }

        $scope.action = $scope.point.actions[$scope.point.actions.length-1];

      }

      // Command Save
      $scope.action.commands.push($scope.command);
      console.log($scope.point);
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
