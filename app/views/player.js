$(function(){
  PlayerView = Backbone.View.extend({
    events: {
      'click #toggle_play_pause': 'togglePlayPause',
      'click #skip_forward': 'skipForward',
      'click #skip_backward': 'skipBackward'
    },
    initialize: function() {
      // audio tag - events
      $('audio').bind('ended', this.skipForward);
      $('audio').bind('progress', this.updateProgress);
      $('audio').bind('timeupdate', this.updateTime);
      // naming things the right way
      this.controller = this.model; 
      // bind and initialize current track
      this.controller.bind('change:current_track', this.changeTrack);
      this.changeTrack(this.controller, this.controller.get('current_track'));
      // bind and initialize play status
      this.controller.bind('change:play_status', this.changePlayStatus);
      this.changePlayStatus(this.controller, this.controller.get('play_status'))
      // TODO build subviews
    },
    changePlayStatus: function(player, playStatus) {
      switch (playStatus) {
        case 'playing':
          $('audio').get(0).play();
          $('#toggle_play_pause').text('pause');
          break;
        case 'paused':
          $('audio').get(0).pause();
          $('#toggle_play_pause').text('play');
          break;
        case 'stopped':
          $('audio').get(0).pause();
          $('audio').attr('currentTime', 0);
          $('#toggle_play_pause').text('play');
          break;
      }
    },
    changeTrack: function(player, track) {
      var audioSrc = '';
      if (track)
        audioSrc = track.get('stream_url') + '?client_id=' + App.client_id;
      $('audio').attr('src', audioSrc);
      $('audio').get(0).load();
    },
    togglePlayPause: function() {
      this.controller.togglePlayPause();
    },
    skipForward: function() {
      this.controller.skipForward();
    },
    skipBackward: function() {
      this.controller.skipBackward();
    },
    updateProgress: function() {}, // TODO subview
    updateTime: function() {} // TODO subview
  }); 
});