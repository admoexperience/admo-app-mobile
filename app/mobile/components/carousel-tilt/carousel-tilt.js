CarouselTilt = Component.create({
  name: 'carousel-tilt',
  swipeReady: false,

  buttons: [],
  source: User.head,

  buttonOffset:{x:-350, y:100},
  scaleOffset:{x:480, y:540},
  scale:0.5,

  shown: function(){
    if (typeof this.data == 'undefined') {
      this.data = BrandData[0];
    }

    console.log("DATA", this.data);

    // set indexes
    this.indexLeft = this.data.items.length-1;
    this.indexMiddle = 0;
    this.indexRight = 1;

    // preload middle div
    var itemMiddle = this.data.items[this.indexMiddle];
    this.subElm('.middle .details').css({'background-image': 'url(' + itemMiddle.specs + ')'});
    this.subElm('.middle .phone').css({'background-image': 'url(' + itemMiddle.image + ')'});

    this.preloadOffscreenDivs();

    var self = this;
    this.addTimeout('top', function(){
      self.element.css({top:0});
    },100);

    for(var i=0; i< 3; i++){
      this.buttons[i].shown();
    }


    var r = setTimeout(function(){
      self.swipeReady = true;

      //self.swipeTutorial();
    }, 1000);
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

    if (buttonY < 750) {
      buttonY = 750;
    }

    if (buttonY > 950) {
      buttonY = 950;
    }

    for(var i=0; i< 3; i++){
      this.buttons[i].source = {x: buttonX, y: buttonY};
      this.buttons[i].update();
    }

  },

  swipeCarousel: function(swipe){
    console.log(swipe)
    if(this.swipeReady){
      if(swipe == "SwipeToLeft"){
        this.slideIndex('left');
        this.slideItems('left');
      }
      else{
        this.slideIndex('right');
        this.slideItems('right');
      }
    }
  },

  slideIndex:function(direction){
    if(direction == 'right'){
      this.indexMiddle = this.indexMiddle-1;
    }
    else if(direction == 'left'){
      this.indexMiddle = this.indexMiddle+1;
    }

    if (this.indexMiddle < 0){
      this.indexMiddle = this.data.items.length-1;
    }
    if (this.indexMiddle == this.data.items.length){
      this.indexMiddle = 0;
    }

    this.indexLeft = this.indexMiddle-1;
    this.indexRight = this.indexMiddle+1;

    if (this.indexLeft < 0){
      this.indexLeft = this.data.items.length-1;
    }
    if (this.indexLeft == this.data.items.length){
      this.indexLeft = 0;
    }

    if (this.indexRight < 0){
      this.indexRight = this.data.items.length-1;
    }
    if (this.indexRight == this.data.items.length){
      this.indexRight = 0;
    }
  },

  slideItems: function(direction){
    var self = this;
    this.swipeReady = false;

    this.subElm('.glass-frame').addClass('glass-illusion');

    var leftDiv = this.subElm('.frame.left');;
    var midDiv = this.subElm('.frame.middle');
    var rightDiv = this.subElm('.frame.right');

    this.subElm('.frame').removeClass('left middle right');

    if(direction == 'right'){

      midDiv.addClass('animate');
      leftDiv.addClass('animate');

      rightDiv.addClass('left');
      midDiv.addClass('right');
      leftDiv.addClass('middle');

    }
    else if(direction == 'left'){

      midDiv.addClass('animate');
      rightDiv.addClass('animate');

      rightDiv.addClass('middle');
      midDiv.addClass('left');
      leftDiv.addClass('right');

    }

    var t = setTimeout(function(){
      self.subElm('.frame').removeClass('animate');
      self.subElm('.glass-frame').removeClass('glass-illusion');

      self.subElm('.frame.middle .phone').css({'-webkit-transform' : 'rotate(0deg)'});
      self.subElm('.frame.left .phone').css({'-webkit-transform' : 'rotate(-10deg)'});
      self.subElm('.frame.right .phone').css({'-webkit-transform' : 'rotate(-10deg)'});

      var r = setTimeout(function(){
        self.swipeReady = true;

        self.preloadOffscreenDivs();
      }, 1000);
    }, 1000);

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

  initComponent: function(){
    this.swipeReady = true;
    this.subElm('.frame.middle .container').css({top:0});
  },

  preloadOffscreenDivs:function(){
    var itemLeft = this.data.items[this.indexLeft];
    var itemRight = this.data.items[this.indexRight];

    this.subElm('.left .details').css({'background-image': 'url(' + itemLeft.specs + ')'});
    this.subElm('.left .phone').css({'background-image': 'url(' + itemLeft.image + ')'});

    this.subElm('.right .details').css({'background-image': 'url(' + itemRight.specs + ')'});
    this.subElm('.right .phone').css({'background-image': 'url(' + itemRight.image + ')'});
  },

  proceed:function(){

  },

  init: function(){
    var self = this;
    this.buttons = [];

    for(var i=0; i< 3; i++){
      var button = PushButton.create({
        scale: self.scale,
        scaleOffset: self.scaleOffset,
        source:{x:1300 ,y:850},
        id:'push-button-' + i,
        imageClass:'image-proceed',
        iconClass:'icon-proceed',
        textClass:'text-proceed',
        text:'PROCEED',
        dynamicPositioning:true,
        proceed:function(){
          self.proceed();
        },
      });

      button.init();
      this.buttons.push(button);
    }

  },


});
