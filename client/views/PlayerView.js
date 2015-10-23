// PlayerView.js - Defines a backbone view class for the music player.
var PlayerView = Backbone.View.extend({
  // Visualizer aspect
  audio: null,
  context: null,
  analyser: null,
  bufferLength: null,
  canvas: null,
  canvasCtx: null,
  dataArray: null,
  WIDTH: $('.visualizer').width(),
  HEIGHT: $('.visualizer').height(),

  // HTML5 (native) audio tag is being used
  // see: https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Using_HTML5_audio_and_video
  el: '<audio controls autoplay />',

  initialize: function() {
    try {
      // Fix up for prefixing
      window.AudioContext = window.AudioContext||window.webkitAudioContext;
      this.context = new AudioContext();
      this.analyser = this.context.createAnalyser();
    }
    catch(e) {
      alert('Web Audio API is not supported in this browser');
    }

    this.resetAudio();

    // Initialize canvas for visualizer
    this.canvas = $('.visualizer')[0];
    this.canvasCtx = this.canvas.getContext("2d");
  },

  events: {
    'ended' : function() {
      this.model.ended();
    }
  },

  resetAudio: function() {
    this.audio = new Audio();
    this.audio.controls = true;
    this.audio.autoplay = true;
  },

  setSong: function(song) {
    // Set the player song
    this.model = song;
    // Set the visualizer source
    this.resetAudio();
    if(~~!!!!this.model) {
      this.audio.src = this.model.get('url');
    }
    this.visualize();
    this.render();
  },

  visualize: function() {
    // Connect audio nodes
    var source = null;
    source = this.context.createMediaElementSource(this.audio);
    source.connect(this.analyser);
    // this.analyser.connect(this.context.destination);

    // Analyzer properties
    this.analyser.fftSize = 2048;
    this.analyser.minDecibels = -90;
    this.analyser.maxDecibels = 90;
    this.analyser.smoothingTimeConstant = 1;
    this.bufferLength = this.analyser.frequencyBinCount;
    this.dataArray = new Uint8Array(this.bufferLength);

    this.analyser.getByteFrequencyData(this.dataArray);

    // Draw visualizer
  },

  draw: function() {
    this.canvasCtx.clearRect(0, 0, 500, 150);
    // console.log(this.dataArray);
    drawVisual = requestAnimationFrame(this.draw.bind(this));
    this.analyser.getByteTimeDomainData(this.dataArray);
    // this.canvasCtx.fillStyle = 'rgb(200, 200, 200)';
    //   this.canvasCtx.fillRect(0, 0, 500, 150);
    this.canvasCtx.lineWidth = 2.0;
      this.canvasCtx.strokeStyle = 'rgb(255, 255, 255)';
      this.canvasCtx.beginPath();
    var sliceWidth = 500 * 1.1 / this.bufferLength;
    var x = 0;
    for(var i = 0; i < this.bufferLength; i++) {
      var v = this.dataArray[i] / 128.0;
      var y = v * 150/2;

      if(i === 0) {
        this.canvasCtx.moveTo(x, y);
      } else {
        this.canvasCtx.lineTo(x, y);
      }

      x += sliceWidth;
    }
    this.canvasCtx.lineTo(500, 150/2);
    this.canvasCtx.stroke();
  },

  makeColorGradient: function(frequency1, frequency2, frequency3, phase1, phase2, phase3,center, width, len) {
    if (center == undefined)   center = 128;
    if (width == undefined)    width = 127;
    if (len == undefined)      len = 50;

    for (var i = 0; i < len; ++i)
    {
       var red = Math.sin(frequency1*i + phase1) * width + center;
       var grn = Math.sin(frequency2*i + phase2) * width + center;
       var blu = Math.sin(frequency3*i + phase3) * width + center;
       document.write( '<font color="' + RGB2Color(red,grn,blu) + '">&#9608;</font>');
    }
  },

  render: function() {
    this.draw();
    return this.$el.attr('src', this.model ? this.model.get('url') : '');
  }

});
