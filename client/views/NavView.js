// PlayerView.js - Defines a backbone view class for the music player.
var NavView = Backbone.View.extend({

  // HTML5 (native) audio tag is being used
  // see: https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Using_HTML5_audio_and_video
  el: '<div class="navbar-fixed">\
          <nav class="transparent">\
            <div class="nav-wrapper container">\
              <a href="#" class="brand-logo">myTunes</a>\
              <form class="searchForm right">\
                <div class="input-field">\
                  <input id="search" type="search" required>\
                  <label for="search"><i class="material-icons">search</i></label>\
                  <i class="material-icons">close</i>\
                </div>\
              </form>\
            </div>\
          </nav>\
          <canvas class="visualizer">hello i am visualizer</canvas>\
      </div>',

  events: {
    'submit form' : 'search'
  },

  search: function(e) {
    e.preventDefault();
    console.log(this.$('#search').val()+' searched!');
    this.collection.query = this.$('#search').val();
    this.collection.getSongs();
  },

  render: function() {
    return this.$el;
  }

});
