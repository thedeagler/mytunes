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
    var library = $('<div class="library col m8 s12"></div>').append($('<h4>Library</h4>'),this.libraryView.$el);
    
    var player = $('<div class="player col s12"></div>').append(this.playerView.$el);

    var queue = $('<div class="queue col m4 s12"></div>').append($('<h4>Playlist</h4>'),this.songQueueView.$el);

    //var playerQueue = $('<div class="playerQueue col m4 s12">').append(player,$('<h5>Playlist</h5>'),queue);

    var row = $('<div class="row"></div>').append(player,queue,library);

    return this.$el.html(row);
  }

});





