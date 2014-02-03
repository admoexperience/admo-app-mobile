PackageComponent = Component.create({
  name: 'package-component',

  buttonPackage: null,
  source: User.head,

  buttonOffset:{x:-350, y:100},
  scaleOffset:{x:480, y:540},
  scale:0.5,

  swipeReady:true,

  index:2,
  indexDivs: ['offscreen-left', 'left', 'center', 'right', 'offscreen-right'],
  divsArrayMax: 4,

  setSwipeReady: function(value){
    console.log('Setting swipeReady to ' + value);
    this.swipeReady = value;
  },

  shown: function(){
    var self = this;
    this.index = 2;

    this.addTimeout('top', function(){
      self.element.css({top:0});
    },100);

    this.buttonPackage.shown();

    this.addTimeout('showSelector', function(){
      self.subElm('.selector-container').css({opacity:1});
      self.changeTitle();
    },3000);

    this.addTimeout('flipUp1', function(){
      self.subElm('.plain-left').css({'-webkit-transform' : 'rotateX(0deg)', left:0, top:0});
      self.subElm('.plain-left .content').css({'-webkit-transform' : 'rotate(0deg)', top:300, left:275});
    },2000);
    this.addTimeout('flipUp2', function(){
      self.subElm('.plain-center').css({'-webkit-transform' : 'rotateX(0deg)', left:0, top:0});
      self.subElm('.plain-center .content').css({'-webkit-transform' : 'rotate(0deg)', top:300, left:750});
    },1500);
    this.addTimeout('flipUp3', function(){
      self.subElm('.plain-right').css({'-webkit-transform' : 'rotateX(0deg)', left:0, top:0});
      self.subElm('.plain-right .content').css({'-webkit-transform' : 'rotate(0deg)', top:300, left:1225});
    },1000);

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

    buttonY = Math.max(buttonY, 920);
    buttonY = Math.min(buttonY, 1000);

    this.buttonPackage.source = {x: buttonX, y: buttonY};
    this.buttonPackage.update();

  },

  swipeCarousel: function(swipe){
    console.log(
      'package-component.swipeCarousel()',
      'swipeReady',
      this.swipeReady
    );

    var self = this;

    if(this.swipeReady){
      this.setSwipeReady(false);

      if(swipe == "SwipeToLeft"){
        this.slideItems('left');
      }
      else{
        this.slideItems('right');
      }

      this.addTimeout('swipeTiemout', function(){
        self.setSwipeReady(true);
      },1000);
    }
  },

  slideItems: function(swipe){

    var self = this;
    if((this.index == 3)||(this.index == 1)){
      this.subElm('.selector.helper').removeClass(this.indexDivs[0] + ' ' + this.indexDivs[this.divsArrayMax]);
    }

    var mainDiv = this.subElm('.selector.'+this.indexDivs[this.index]);
    var helperDiv = this.subElm('.selector.helper');

    if((this.index == 3) && (swipe == 'right')){


      helperDiv.removeClass(this.indexDivs[0]);
      helperDiv.removeClass('helper');
      helperDiv.addClass(this.indexDivs[1]);

      mainDiv.removeClass(this.indexDivs[this.index]);
      mainDiv.addClass(this.indexDivs[this.divsArrayMax]);

      this.index = 1;

      this.addTimeout('switchDivs', function(){
        mainDiv.addClass('helper');
        mainDiv.removeClass('offscreen-right');

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
      if(this.index == 3){
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

      this.index = 3;

      this.addTimeout('switchDivs', function(){
        mainDiv.addClass('helper');
        mainDiv.removeClass('offscreen-left');

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

    this.changeTitle();
  },

  changeTitle: function(){
    var self = this;

    this.subElm('.content .top').css({'background-color':'rgba(0,0,0,0.4)'});

    this.addTimeout('colorChange', function(){
      if(self.index == 1){
        self.subElm('.plain-left .content .top').css({'background-color':'rgba(71,142,203,0.7)'});
      }
      else if(self.index == 2){
        self.subElm('.plain-center .content .top').css({'background-color':'rgba(71,142,203,0.7)'});
      }
      else if(self.index == 3){
        self.subElm('.plain-right .content .top').css({'background-color':'rgba(71,142,203,0.7)'});
      }
    },500);

  },

  proceed:function(){

  },

  init: function(){
    var self = this;
    this.buttonPackage = null;

    this.buttonPackage = PushButton.create({
      scale: self.scale,
      scaleOffset: self.scaleOffset,
      source:{x:1300 ,y:850},
      id:'push-button-package',
      imageClass:'image-proceed',
      iconClass:'icon-proceed',
      textClass:'text-proceed',
      text:'PROCEED',
      dynamicPositioning:true,
      proceed:function(){
        self.proceed();
      },
    });

    this.buttonPackage.init();

  },

});
