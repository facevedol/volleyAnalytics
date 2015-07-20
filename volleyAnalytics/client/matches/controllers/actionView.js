angular.module('volleyAnalytics').controller('ActionViewCtrl', ['$scope', '$document',
  function($scope, $document){

    // action = {
    //             'player': player,
    //             'action': 'Action',
    //             'grade' : 'Grade',
    //             'zone'  : 'Zone'
    // }

    // stage: {
    //   'state' : 'saque->k1->k2<->k3',
    //   'team'  : 'team1/team2'
    // }

    // volley : [{
    //     'stage': stage,
    //     'actions' : [action]
    // }]

    // rally : {
    //   'starter' : 'team1/team2',
    //   'winner'  : 'team1/team2/null'
    //   'volleys' : [volley]
    // }

    // game : {
    //   'team1':{'score': ralliesnumber},
    //   'team2':{'score': ralliesnumber},
    //   'rallies':[rally],
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

    $scope.rally = {
      'starter' : null,
      'winner'  : null,
      'volleys' : []
    };

    $scope.volley = {
        'stage': {
          'state' : null,
          'team'  : null
        },
        'actions' : []
    };

    $scope.action = {
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
          $scope.action[field] = key;
        } else {
          $scope.action[field] = null;
        }
      });
    }

    function addAction(key) {
      var key2 = null;
      if($scope.action.player == null) {
        key2 = evalPlayer(key);
        changeField('player', key2);
      }else if ($scope.action.action == null) {
        key2 = evalAction(key);
        changeField('action',key2);
      }else if ($scope.action.grade == null) {
        key2 = evalGrade(key);
        changeField('grade',key2);
      }else if ($scope.action.zone2 == null) {
        key2 = evalZone(key);
        changeField('zone',key2);
      }
    }

    function rmAction() {
      if($scope.action.zone != null) {
        changeField('zone',null);
      }else if ($scope.action.grade != null) {
        changeField('grade', null);
      }else if ($scope.action.action != null) {
        changeField('action', null);
      }else if ($scope.action.z1 !=null) {
        changeField('player', null);
      }
    }

    function cleanAction() {
      $scope.$apply(function() {
        $scope.action = {'player' : null,
                          'volley'  : null,
                          'grade': null,
                          'zone' : null};
      });
    }

    function saveAction() {
      // rally setup
      if ($scope.rally.starter == null) {
        $scope.rally.starter = $scope.action.player.team;
        $scope.rally.volleys = [{
          stage : {'state' : null, 'team' : null},
          actions : []
        }];
        $scope.volley = $scope.rally.volleys[$scope.rally.volleys.length-1];
      }

      // volley Setup
      if ($scope.volley.stage.state == null) {
        $scope.volley.stage.state = 'saque';
        $scope.volley.stage.team = $scope.action.player.team;
      }

      if ($scope.action.player.team != $scope.volley.stage.team) {


        if ( $scope.volley.stage.state == 'saque' ){
          $scope.rally.volleys.push({
            stage : {'state' : 'k1', 'team' : $scope.action.player.team},
            actions : []
          });
        } else {
          $scope.rally.volleys.push({
            stage : {'state' : 'k2', 'team' : $scope.action.player.team},
            actions : []
          });
        }

        $scope.volley = $scope.rally.volleys[$scope.rally.volleys.length-1];

      }

      // action Save
      $scope.volley.actions.push($scope.action);
      console.log($scope.rally);
    }

    function writeaction(e) {
      if(e.which == 8) {
        rmAction();
        e.preventDefault();
      } else if (e.which == 13 || e.which == 32) {
        if($scope.action['grade'] != null) {
          saveAction();
          cleanAction();
          console.log("Action Saved");
        }
        ;
      } else{
        key = String.fromCharCode(e.keyCode);
        if(/[a-zA-Z0-9]/i.test(key)) {
          addAction(key);
        }
      }
    }

    $document.on('keydown', writeaction);
}]);
