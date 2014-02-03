Screensaver = Component.create({
  name: 'screensaver',
  swipeReady: false,
  fadeReady:false,

  shown: function(){
    var self = this;
    this.element.css({opacity:1});
    this.fadeReady = true;
    this.addTimeout('screensaverLoop', function(){
      self.showSilhouette();
    },5000);
  },

  update: function(){

  },

  fadeIn: function(){
    var self = this;
    if(this.fadeReady) {
      this.element.removeClass('fadeout');
    }
  },

  hidden:function(){
    this.element.css({opacity:0});
  },

  fadeOut: function(){
    var self = this;
    if(this.fadeReady) {
      this.element.addClass('fadeout');
    }
  },

  showSilhouette: function(){

    document.getElementById('screensaver-video').pause();

    var self = this;
    var fadeDiv = this.subElm('.fade-container .fade');
    var silhouetteDiv = this.subElm('.fade-container .silhouette');
    var textDiv = this.subElm('.fade-container .text');

    silhouetteDiv.removeClass('enlarge');
    textDiv.removeClass('shift-text');

    fadeDiv.animate({opacity:1}, 300, function(){
      textDiv.animate({opacity:1},300);
      silhouetteDiv.animate({opacity:1},300, function(){

        silhouetteDiv.addClass('enlarge');
        textDiv.addClass('shift-text');

        self.addTimeout('hideLoop', function(){
          self.hideSilhouette();
        }, 2500);
      });
    });
  },

  hideSilhouette: function(){

    var self = this;
    var fadeDiv = this.subElm('.fade-container .fade');
    var silhouetteDiv = this.subElm('.fade-container .silhouette');
    var textDiv = this.subElm('.fade-container .text');

    textDiv.animate({opacity:0},300);
    silhouetteDiv.animate({opacity:0},300, function(){
      fadeDiv.animate({opacity:0},300, function(){
        self.addTimeout('screensaverLoop', function(){
          self.showSilhouette();
        },10000);
        document.getElementById('screensaver-video').play();
      });
    });

  },



});
