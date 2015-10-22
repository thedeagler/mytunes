// SongQueueView.js - Defines a backbone view class for the song queue.
var SongQueueView = Backbone.View.extend({

  tagName: "table",

  className: "highlight",

  initialize: function() {
    this.render();
  },

  render: function() {
    // initialize: function() {
    // },
    this.$el.children().detach();

    this.$el.html('<thead><tr><th data-field="id">Artist</th><th data-field="name">Song</th></tr></thead>').append(
      this.collection.map(function(song) {
        return new SongQueueEntryView({model: song}).render();
      })
    );
  }

});
