var VisualizerView = Backbone.View.extend({
  audio: new Audio(),
  context: null,
  analyser: null,
  
  initialize: function() {
    try {
      // Fix up for prefixing
      window.AudioContext = window.AudioContext||window.webkitAudioContext;
      context = new AudioContext();
      analyser = context.createAnalyser();
    }
    catch(e) {
      alert('Web Audio API is not supported in this browser');
    }
  },
})