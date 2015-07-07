angular.module('volleyAnalytics').filter('inTeam', function() {
  return function(players, team) {
    if(!team) {
      return false;
    }

    return _.filter(players, function(player) {
      if(player.team == team._id){
        return true;
      } else {
        return false;
      }
    });
  }
});
