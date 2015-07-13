angular.module('volleyAnalytics').filter('isPlaying', function() {
  return function(players, playing, thisP) {
    if(!playing) {
      return false;
    }
    var t = true;
    if(!thisP){
      t = !t;
    }
    return _.filter(players, function(player) {
      for(var k in playing){
        if (playing[k] == player && k != thisP) {
          return !t;
        }
      }
      return t;

    });
  }
});
