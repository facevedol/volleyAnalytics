angular.module('volleyAnalytics').controller('ActionViewCtrl', ['$scope', '$document', '$meteor',
  function($scope, $document, $meteor){

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

    // $scope.rally = {
    //   'starter' : null,
    //   'winner'  : null,
    //   'volleys' : []
    // };
    //
    // $scope.volley = {
    //     'stage': {
    //       'state' : null,
    //       'team'  : null
    //     },
    //     'actions' : []
    // };
    //
    $scope.action = {
                'player': null,
                'action': null,
                'grade' : null,
                'target'  : null
    };

    $scope.actionLog = [];

    function updateLog() {
      ralliesId = [];
      volleysId = [];

      ralliesResult = Rallies.find({game : $scope.game._id},
                                {sort:{time:-1}, fields: {_id:1}}).fetch();
      ralliesId = ralliesResult.map(function(i){return i._id});
      volleysResult = Volleys.find({rally:{$in:ralliesId}},
                                {sort:{time:-1}, fields: {_id:1}}).fetch();
      volleysId = volleysResult.map(function(i){return i._id});
      actionsResult = Actions.find({volley:{$in:volleysId}},
                                      {sort:{time:-1}}).fetch();
      $scope.actionLog = actionsResult.map(function(a) {
        return {
          player : Players.findOne({_id:a.player}),
          action : a.action,
          grade : a.grade,
          target : a.target
        };
      })
    }
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

    function evalTarget(key) {
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
      }else if ($scope.action.target == null) {
        key2 = evalTarget(key);
        changeField('target',key2);
      }
      switch (key) {
        case 'R':
          score($scope.team1._id);
          break;
        case 'Y':
          score($scope.team2._id);
          break;
        default:
          ;
      }
    }

    function rmAction() {
      if($scope.action.zone != null) {
        changeField('zone',null);
      }else if ($scope.action.grade != null) {
        changeField('grade', null);
      }else if ($scope.action.action != null) {
        changeField('action', null);
      }else if ($scope.action.player !=null) {
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

    function score(team) {
      // rally =  $meteor.object(Rallies, $scope.rally._id,false);
      // rally.winner = team;
      // rally.save();

      Rallies.update($scope.rally._id, {$set:{winner:team}});
      $scope.updateScore();
      $scope.rally = newRally($scope.game._id, team);

      // console.log(Rallies.find({game:$scope.game._id}));
    }

    function getLastGame(matchId) {
      var game = Games.findOne({match:matchId},{sort:{time:-1}});
      if(!game){
        game = newGame(matchId);
      }
      return game;
    }

    function getLastRally(gameId) {
      var rally = Rallies.findOne({game:gameId},{sort:{time:-1}});
      if(!rally){
        rally = newRally(gameId);
      }
      return rally;
    }

    function getLastVolley(rallyId) {
      var volley = Volleys.findOne({rally:rallyId},{sort:{time:-1}});
      if(!volley){
        volley = newVolley(rallyId);
      }
      return volley;
    }

    function newGame(matchId) {
      gameId = Games.insert({
        match: matchId,
        team1: {
          teamId : $scope.team1._id,
          score : 0
        },
        team2: {
          teamId : $scope.team2._id,
          score : 0
        },
        winner : null,
        time : new Date()
      });
      return Games.findOne({_id : gameId});
    }

    function newRally(gameId, starter) {
      rallyId = Rallies.insert({
        game: gameId,
        starter : starter || $scope.action.player.team,
        winner : null,
        time : new Date()
      });
      return Rallies.findOne({_id : rallyId});
    }

    function newVolley(rallyId, team) {
      last = Volleys.findOne({rally:rallyId},{sort:{time:-1}});
      if (! last )
        state = 'saque'
      else {
        switch (last.state) {
          case 'saque':
            state = 'k1';
            break;
          default:
            state = 'k2';
            break;
        }
      }
      volleyId = Volleys.insert({
        rally : rallyId,
        state : state,
        team : team || $scope.action.player.team,
        time : new Date()
      });
      return Volleys.findOne({_id : volleyId});
    }

    function initGame() {
      if (! $scope.game)
        $scope.game = getLastGame($scope.match._id);
      if (! $scope.rally)
          $scope.rally = getLastRally($scope.game._id);
      console.log($scope.rally);
    }

    function saveAction() {
      // match>game>rally>volley>action
      if (! $scope.game)
        $scope.game = getLastGame($scope.match._id);
      if (! $scope.rally)
        $scope.rally = getLastRally($scope.game._id);
      if (! $scope.volley)
        $scope.volley = getLastVolley($scope.rally._id);

      var action = Actions.insert({
        player: $scope.action.player._id,
        action: $scope.action.action,
        grade : $scope.action.grade,
        target  : $scope.action.target,
        volley : $scope.volley._id,
        time : new Date()
      });

      updateLog();
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

    initGame();
    updateLog();

    $document.on('keydown', writeaction);
}]);
