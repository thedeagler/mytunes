// SongQueue.js - Defines a backbone model class for the song queue.
var SongQueue = Songs.extend({

  playFirst: function() {
    this.first().play();
  },

  initialize: function() {
    this.on('dequeue', this.dequeue, this);
    this.on('add', this.enqueue, this);
    this.on('ended', this.ended, this);
  },

  dequeue: function(song) {
    
    if(this.first() === song){

      this.playNext();

    } else {

      this.remove(song);

    }

  },

  playNext: function() {

    this.shift();
    if(this.length) {
      this.playFirst();
    }
    // } else {
    //   this.trigger('stop');
    // }

  },

  enqueue: function(song) {

    if(this.length === 1) {
      this.playFirst();
    }

  },

  ended: function() {
    
    this.dequeue(this.first());
    
    if(this.length) {
      this.playFirst();
    }

  }

});