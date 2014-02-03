BackgroundPhoto = Component.create({
  name: 'background-photo',

  type:'blurred',

  update: function(){
    TWEEN.update();
  },

  showBackground: function(type){

    var self = this;

    if(this.type != type){
      this.type = type;

      console.log('background changed to : ' + type);

      var onscreenDiv = this.subElm('.container.on-screen');
      var offscreenDiv = this.subElm('.container.off-screen');

      offscreenDiv.addClass('on-top');

      this.subElm('.container').removeClass('on-screen off-screen');

      if(type == 'blurred'){
        offscreenDiv.addClass('blurred-background');
      }
      else if(type == 'wood'){
        offscreenDiv.addClass('wood-background');
      }
      else if(type == 'final'){
        offscreenDiv.addClass('final-background');
      }

      var r = setTimeout(function(){
        offscreenDiv.removeClass('on-top');

        onscreenDiv.addClass('top-animation');
        offscreenDiv.addClass('top-animation');

        onscreenDiv.addClass('off-screen');
        offscreenDiv.addClass('on-screen');

        var t = setTimeout(function(){

          self.subElm('.off-screen').removeClass('top-animation');

        }, 2000);
      }, 500);
    }

  },

});
