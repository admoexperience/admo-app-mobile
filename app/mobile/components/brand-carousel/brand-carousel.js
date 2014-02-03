BrandCarousel = Component.create({
  name: 'brand-carousel',

  swipeReady:false,

  index:3,
  indexDivs: ['offscreen-left', 'left', 'mid-left', 'center', 'mid-right', 'right', 'offscreen-right'],
  divsArrayMax: 6,

  button: null,
  source: User.head,

  buttonOffset:{x:-350, y:150},
  scaleOffset:{x:480, y:540},
  scale:0.5,

  shown: function(){
    var self = this;
    this.index = 3;

    this.addTimeout('top', function(){
      self.element.css({top:0});
    },100);

    this.button.shown();

    this.loadBrandImages();

    this.addTimeout('swipeActive', function(){
      self.swipeTutorial();
    },1200);
  },

  loadBrandImages:function(){
    for (var i=1; i<6; i++){
      var url = this.data[i-1].logo
      this.subElm('.brands-container .image:nth-child(' + i + ')').css({'background-image':"url(" + url + ")"});
    }
  },

  hidden: function(){
    this.element.css({top:1080});
  },

  update: function(){

    var scaledSource = {x:0, y:0};
    scaledSource.x = this.source.x * this.scale + this.scaleOffset.x;
    scaledSource.y = this.source.y * this.scale + this.scaleOffset.y;

    var buttonX = (scaledSource.x + this.buttonOffset.x);
    var buttonY = (scaledSource.y + this.buttonOffset.y);

    buttonY = Math.max(buttonY, 800);
    buttonY = Math.min(buttonY, 1000);

    this.button.source = {x: buttonX, y: buttonY};
    this.button.update();
  },

  swipeCarousel: function(swipe){
    var self = this;

    if(this.swipeReady){
      this.swipeReady = false;

      if(swipe == "SwipeToLeft"){
        this.slideItems('left');
      }
      else{
        this.slideItems('right');
      }

      this.addTimeout('swipeTiemout', function(){
        self.swipeReady = true;
      },1000);
    }
  },

  slideItems: function(swipe){

    var self = this;
    if((this.index == 5)||(this.index == 1)){
      this.subElm('.selector.helper').removeClass(this.indexDivs[0] + ' ' + this.indexDivs[this.divsArrayMax]);
    }

    var mainDiv = this.subElm('.selector.'+this.indexDivs[this.index]);
    var helperDiv = this.subElm('.selector.helper');

    if((this.index == 5) && (swipe == 'right')){


      helperDiv.removeClass(this.indexDivs[0]);
      helperDiv.removeClass('helper');
      helperDiv.addClass(this.indexDivs[1]);

      mainDiv.removeClass(this.indexDivs[this.index]);
      mainDiv.addClass(this.indexDivs[this.divsArrayMax]);

      this.addTimeout('switchDivs', function(){
        mainDiv.addClass('helper');
        mainDiv.removeClass('offscreen-right');
        self.index = 1;

        self.subElm('.helper').addClass(self.indexDivs[self.divsArrayMax]);
        self.subElm('.helper').addClass('animation');
      },700);
    }
    else if(swipe == 'right'){
      mainDiv.removeClass(this.indexDivs[this.index]);
      mainDiv.addClass('animation');

      this.index++;
      mainDiv.addClass(this.indexDivs[this.index]);

      //prep for next swipe right
      if(this.index == 5){
        helperDiv.addClass(this.indexDivs[0]);
        helperDiv.addClass('animation');
      }
    }

    if((this.index == 1) && (swipe == 'left')){
      helperDiv.removeClass(this.indexDivs[this.divsArrayMax]);
      helperDiv.removeClass('helper');
      helperDiv.addClass(this.indexDivs[this.divsArrayMax-1]);

      mainDiv.removeClass(this.indexDivs[this.index]);
      mainDiv.addClass(this.indexDivs[0]);

      this.addTimeout('switchDivs', function(){
        mainDiv.addClass('helper');
        mainDiv.removeClass('offscreen-left');
        self.index = 5;

        self.subElm('.helper').addClass(self.indexDivs[0]);
        self.subElm('.helper').addClass('animation')
      },700);
    }
    else if(swipe == 'left'){
      mainDiv.removeClass(this.indexDivs[this.index]);
      mainDiv.addClass('animation');

      this.index--;
      mainDiv.addClass(this.indexDivs[this.index]);

      //prep for next swipe left
      if(this.index == 1){
        helperDiv.addClass(this.indexDivs[this.divsArrayMax]);
        helperDiv.addClass('animation');
      }
    }
  },

  initComponent: function(){
    this.swipeReady = true;
    this.button.drawingReady = true;
  },

  swipeTutorial: function(){
    var self = this;

    this.subElm('.swipe-container .hand').css({left:1180});
    this.subElm('.swipe-container').transition({opacity:1},750, function(){
      self.subElm('.swipe-container .hand').transition({opacity:1},1000, function(){
        self.subElm('.swipe-container .hand').transition({left:520},1500, function(){
          self.subElm('.swipe-container').transition({opacity:0},500, function(){
            self.initComponent();
          });
        });
      });
    });

  },

  proceed:function(){

  },

  init: function(){
    var self = this;
    this.button = null;

    this.button = PushButton.create({
      scale: self.scale,
      scaleOffset: self.scaleOffset,
      source:{x:1300 ,y:850},
      id:'push-button-brand',
      imageClass:'image-proceed',
      iconClass:'icon-proceed',
      textClass:'text-proceed',
      text:'PROCEED',
      dynamicPositioning:true,
      drawingReady:false,
      proceed:function(){
        self.proceed();
      },
    });

    this.button.init();

  },


});
