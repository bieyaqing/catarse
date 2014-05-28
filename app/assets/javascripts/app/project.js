App.addChild('Project', _.extend({
  el: '#main_content[data-action="show"][data-controller-name="projects"]',

  events: {
    'click #toggle_warning a' : 'toggleWarning',
    'click a#embed_link' : 'toggleEmbed'
  },

  activate: function(){
    this.$warning = this.$('#project_warning_text');
    this.$embed= this.$('#project_embed');
    this.route('about');
    this.route('updates');
    this.route('contributions');
    this.route('comments');
    this.route('edit');
    this.route('reports');
  },

  toggleWarning: function(){
    this.$warning.slideToggle('slow');
    return false;
  },

  toggleEmbed: function(){
    this.loadEmbed();
    this.$embed.slideToggle('slow');
    return false;
  },

  followRoute: function(name){
    var $tab = this.$('nav#project_menu a[href="' + window.location.hash + '"]');
    if($tab.length > 0){
      this.onTabClick({ currentTarget: $tab });
    }
  },

  loadEmbed: function() {
    var that = this;

    if(this.$embed.find('.loader').length > 0) {
      $.get(this.$embed.data('path')).success(function(data){
        that.$embed.html(data);
      });
    }
  }
}, Skull.Tabs));

$(document).ready(function(){
	$("#project_video_url").attr("onchange","importVideoEmbedUrl()");
});

function importVideoEmbedUrl(){
	var url = $("#project_video_url").val();
	var embed_url = '';
	var video_id = '';
	
	if(url.indexOf("vimeo.com") != -1){
		video_id = url.split("com/")[1];
		embed_url = '//player.vimeo.com/video/'+video_id;
	}else if(url.indexOf("www.youtube.com") != -1){
		video_id = url.split("=")[1];
		embed_url = '//www.youtube.com/embed/'+video_id;
	}
	
	$("#project_video_embed_url").val(embed_url);
}

setInterval(function(){slideToggle("sliderFrame");}, 9000);

var slideIndex = 0;
function slideToggle(id){
	$(document).ready(function(){
		if(slideIndex % 2 == 0){
			slideLeft(id);
		}else{
			slideRight(id);
		}
		slideIndex ++;
	});
}

function slideLeft(id){
	$(document).ready(function(){
		$("#"+id).css("right","0%");
	});
}

function slideRight(id){
	$(document).ready(function(){
		$("#"+id).css("right","100%");
	});
}
