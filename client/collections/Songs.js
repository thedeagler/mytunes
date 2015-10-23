// Songs.js - Defines a backbone collection class for songs.
var Songs = Backbone.Collection.extend({

  initialize: function(){
    this.query = 'rock';
  },

  model: SongModel,

  // url: 'https://api.soundcloud.com/tracks?client_id=9e3abdceafbd5ef113b3430508a34c92&'+this.query,

  url: 'https://api.soundcloud.com/tracks',

  getSongs: function() {
    console.log(this.query+' '+this.url);
    this.fetch({data: {'client_id':client_id,'q':this.query}});

  },

  // getSongs: function() {
  //   this.fetch({
  //     data:{
  //       client_id: '9e3abdceafbd5ef113b3430508a34c92',
  //       genre: 'rock'
  //     }
  //   });

  // },

  parse: function(res) {
    console.log(res);
    return res.map(function(obj){
                      return {url: obj.stream_url+'?client_id='+client_id,title: obj.title, artist: obj.user.username};
            });

  }

});
