// App.js - Defines a backbone model class for the whole app.
var AppModel = Backbone.Model.extend({

  initialize: function(params) {
    this.set('currentSong', new SongModel());
    this.set('songQueue', new SongQueue());

    /* Note that 'this' is passed as the third argument. That third argument is
    the context. The 'play' handler will always be bound to that context we pass in.
    In this example, we're binding it to the App. This is helpful because otherwise
    the 'this' we use that's actually in the function (this.set('currentSong', song)) would
    end up referring to the window. That's just what happens with all JS events. The handlers end up
    getting called from the window (unless we override it, as we do here). */

    // params.library.on('play', function(song) {
    //   this.set('currentSong', song);
    // }, this);

    params.library.on('enqueue', function(song) {
      
      this.get('songQueue').add(song);
    
    }, this);

    params.library.on('play', function(song) {
      
      this.set('currentSong', null);
    
      this.set('currentSong', song);
      // Not sure what this is here for
      // this.get('songQueue').remove(song);

    }, this);

    // Moved to somewhere else (songQueueModel)
    // this.get('songQueue').on('add', function(song) {

    //   if(this.get('currentSong').get('url') === undefined) {
    //     this.get('songQueue').playFirst();
    //   }

    // }, this);
  }

});




      

      // // Add the clicked song to the queue
      // this.get('songQueue').push(song.clone());

      // // If a song isn't already playing, play the
      // if(this.get('songQueue').length === 1 && this.playState === 'unstarted') {
      //   this.set('currentSong', this.get('songQueue').shift());
      // } else {
      //   this.trigger('songEnqueued');
      // }