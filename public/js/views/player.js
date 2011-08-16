$(function(){
  PlayerView = Backbone.View.extend({
    events: {
      'click #player-controls': 'playPause',
      'click #player-waveform > div': 'skip'
    },
    
    initialize: function() {
      this.controller = this.model;
      this.template = Handlebars.compile($("#player-template").html());
      $(this.el).html('<span class="graved">Select a Track to start the player.</span>')
      var that = this;
      this.controller.bind('change:track', function(controller, track) {
        track.bind('change', function() { that.updateTrack(track); });
        that.updateTrack(track);
      });
      this.controller.bind('change:state', function(controller, state) {
        that.updateState(state);
      });
    },
    
    audio: function() {
      return $('audio').get(0);
    },
    
    playPause: function() {
      this.controller.togglePlayPause();
    },
    
    skip: function(e) {
      var playerWidth = $('#player-waveform img').get(0).width,
          ratio = e.offsetX / playerWidth,
          newTime = ratio * this.audio().duration;
      this.audio().currentTime = newTime;
    },
    
    updateLoad: function() {
      var progress = this.audio().buffered.end(0) / this.audio().duration * 100;
      $('#player-progress-load').css({width: progress.toString() + '%'});
    },
    
    updateState: function(state) {
      var controls = $('#player-controls span');
      if (this.audio()) {
        switch (state) {
          case 'playing':
            controls.text('▌▌')
            controls.attr('class', 'pause');
            this.audio().play();
            break;
          case 'paused':
            controls.text('►');
            controls.attr('class', 'play');
            this.audio().pause();
            break;
          case 'stopped':  
            controls.text('►');
            controls.attr('class', 'play');
            this.audio().pause();
            this.audio().currentTime = 0.0;
            this.updateTime();
            break;
        }
      }
    },
    
    updateTime: function() {
      var progress = this.audio().currentTime / this.audio().duration * 100;
      $('#player-progress-time').css({
        display: 'block',
        width: progress.toString() + '%'
      });
    },
    
    updateTrack: function(track) {
      if (track) {
        $(this.el).html(this.template(track.toJSON()));
        var that = this;
        $('audio').bind('ended', function(){ that.controller.next(); });
        $('audio').bind('progress', function(){ that.updateLoad(); });
        $('audio').bind('timeupdate', function(){ that.updateTime(); });
      }
    }
  }); 
});