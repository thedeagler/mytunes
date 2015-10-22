// AppView.js - Defines a backbone view class for the whole music app.
var AppView = Backbone.View.extend({

  className: 'container',

  initialize: function(params) {
    this.playerView = new PlayerView({model: this.model.get('currentSong')});
    this.songQueueView = new SongQueueView({collection: this.model.get('songQueue')});
    this.libraryView = new LibraryView({collection: this.model.get('library')});

    // change:currentSong - this is Backbone's way of allowing you to filter events to
    // ONLY receive change events for the specific property, 'currentSong'
    this.model.on('change:currentSong', function(model) {
      this.playerView.setSong(model.get('currentSong'));
    }, this);

    // Listen for changes to the song queue and update the song queue view
    this.model.get('songQueue').on('add remove', function(model) {
      this.songQueueView.render();
    },this);
    
  },

  render: function() {
    return this.$el.html([
      this.playerView.$el,
      $('<h3>Queue</h3>'),
      this.songQueueView.$el,
      $('<h3>Library</h3>'),
      this.libraryView.$el
    ]);
  }

});
