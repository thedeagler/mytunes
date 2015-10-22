// SongModel.js - Defines a backbone model class for songs.
var SongModel = Backbone.Model.extend({

  play: function() {
    // Triggering an event here will also trigger the event on the collection
    this.trigger('play', this);
  },
  enqueue: function() {
    // Fire off an 'enqueue' event
    this.trigger('enqueue', this);
  },
  dequeue: function() {
    // Fire off an 'dequeue' event
    this.trigger('dequeue', this);
  },
  ended: function() {
    this.trigger('ended');
  }

});
