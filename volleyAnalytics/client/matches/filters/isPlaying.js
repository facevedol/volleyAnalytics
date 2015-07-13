angular.module('volleyAnalytics').filter('isPlaying', function() {
  return function(players, playing, thisP) {
    if(!playing) {
      return false;
    }
    if(!thisP) {
      return false;
    }
    return _.filter(players, function(player) {
      for(var k in playing){
        if (playing[k] == player && k != thisP) {
          return false;
        }
      }
      return true;

    });
  }
});
