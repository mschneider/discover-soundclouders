$(function(){
  PlayerView = Backbone.View.extend({
    events: {
      'click #player-controls': 'click',
    },
    
    initialize: function() {
      this.controller = this.model;
      this.template = Handlebars.compile($("#player-template").html());
      var that = this;
      this.controller.bind('change:track', function(controller, track) {
        track.bind('change', function() { that.updateTrack(track); });
        that.updateTrack(track);
      });
      this.controller.bind('change:state', function(controller, state) {
        that.updateState(state);
      });
    },
    
    click: function() {
      this.controller.togglePlayPause();
    },
    
    updateLoad: function() {
      var audio = $('audio').get(0),
          progress = audio.buffered.end(0) / audio.duration * 100;
      $('#player-progress-load').css({width: progress.toString() + '%'});
    },
    
    updateState: function(state) {
      var audio = $('audio').get(0),
          controls = $('#player-controls span');
      console.log('PlayerView::updateState', state);
      if (audio) {
        switch (state) {
          case 'playing':
            controls.text('▌▌')
            controls.attr('class', 'pause');
            audio.play();
            break;
          case 'paused':
            controls.text('►');
            controls.attr('class', 'play');
            audio.pause();
            break;
          case 'stopped':  
            controls.text('►');
            controls.attr('class', 'play');
            audio.pause();
            $('audio').attr('currentTime', 0);
            break;
        }
      }
    },
    
    updateTime: function() {
      var audio = $('audio').get(0),
          progress = audio.currentTime / audio.duration * 100;
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