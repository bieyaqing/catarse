App.addChild('ProjectForm', _.extend({
  el: 'form#project_form',

  events: {
    'blur input' : 'checkInput',
  },

  activate: function(){
    this.setupForm();
  }

}, Skull.Form));

// Put subview here to avoid dependency issues

App.views.ProjectForm.addChild('VideoUrl', _.extend({
  el: 'input#project_video_url',

  events: {
    'timedKeyup' : 'checkVideoUrl'
  },

  checkVideoUrl: function(){
    var that = this;
    $.get(this.$el.data('path') + '?url=' + encodeURIComponent(this.$el.val())).success(function(data){
      console.log(data);
      if(!data || !data.provider.video_id){
        that.$el.trigger('invalid');
      }else{
    	  //auto import video embed url
    	  var embed_url = '';
    	  var url = data.provider.url;
    	  var video_id = data.provider.video_id;
    	  
    	  if(url.indexOf("vimeo.com") != -1){
    		  embed_url = '//player.vimeo.com/video/'+video_id;
    	  }else if(url.indexOf("www.youtube.com") != -1){
    		  embed_url = '//www.youtube.com/embed/'+video_id;
    	  }
    	  
    	  $('input#project_video_embed_url').val(embed_url);
      }
    });
  },

  activate: function(){
    this.setupTimedInput();
  }
}, Skull.TimedInput));

App.views.ProjectForm.addChild('Permalink', _.extend({
  el: 'input#project_permalink',

  events: {
    'timedKeyup' : 'checkPermalink'
  },

  checkPermalink: function(){
    var that = this;
    if(this.re.test(this.$el.val())){
      $.get('/en/' + this.$el.val()).complete(function(data){
        if(data.status != 404){
          that.$el.trigger('invalid');
        }
      });
    }
  },

  activate: function(){
    this.re = new RegExp(this.$el.prop('pattern'));
    this.setupTimedInput();
  }
}, Skull.TimedInput));
