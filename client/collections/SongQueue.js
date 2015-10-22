// SongQueue.js - Defines a backbone model class for the song queue.
var SongQueue = Songs.extend({

  playFirst: function() {
    this.trigger('play', this.shift());
  },

  initialize: function() {
  }

});