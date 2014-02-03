PushButton = Component.create({
  name: 'push-button',

  drawingReady:true,

  loadAmount:120,

  buttonAttributes:{width:200, height:360, max:370},
  speed:3,

  trigger: [User.hands.left, User.hands.right],

  scale:1,
  scaleOffset:{x:0, y:0},
  scaleButton:1,

  source:{x:1300 ,y:850},

  wasActive: false,
  loadingReady:true,

  imageClass:'image-default',
  iconClass:'icon-default',
  textClass:'text-default',
  text:'default',

  //by default use radius of arc
  hoverRadius: null,

  dynamicPositioning:false,
  //default
  increaseHoverRadius:1,

  shown: function() {

    //add styling classes
    this.subElm('.image').addClass(this.imageClass);
    this.subElm('.sub-container .icon').addClass(this.iconClass);
    this.subElm('.sub-container .text').addClass(this.textClass);
    if(this.text != 'default')
      this.subElm('.sub-container .' + this.textClass).text(this.text);


    var width = this.buttonAttributes.width = parseInt(this.subElm('.container').css('width'));
    var height = this.buttonAttributes.height = parseInt(this.subElm('.container').css('height'));

    var top = this.source.y - height/2;
    var left = this.source.x - width/2;

    this.subElm('.container').css({top:top, left:left});

  },

  update: function() {

    if(this.dynamicPositioning){
      var top = this.source.y - this.buttonAttributes.height/2;
      var left = this.source.x - this.buttonAttributes.width/2;
      this.subElm('.container').css({top:top, left:left});
    }

    if(this.drawingReady){

      var hover= false;
      for(var i=0;i<this.trigger.length && !hover;i++){

        var trigger = this.trigger[i];
        var triggerX = trigger.x*this.scale + this.scaleOffset.x;
        var triggerY = trigger.y*this.scale + this.scaleOffset.y;

        hover = this.checkHover(triggerX, triggerY);
      }

      if(hover){
        this.increaseHoverRadius = 1.5;
      }
      else{
        this.increaseHoverRadius = 1;
      }

      this.executeHover(hover);

      this.drawButton();

    }

  },

  drawButton: function(){
    this.subElm('.sub-container .loading-bar').css({width:this.loadAmount});
    var iconLeft = this.loadAmount - 105;
    this.subElm('.sub-container .icon').css({left:iconLeft});
  },

  checkHover: function(triggerX, triggerY) {
    var center = {};
    center.x = this.source.x;
    center.y = this.source.y;

    // Hover detection
    var hovering = false;
    var dX = center.x - triggerX;
    var dY = center.y - triggerY;


    var halfWidth = this.scaleButton * this.buttonAttributes.width/2;
    var halfHeigth = this.scaleButton * this.buttonAttributes.height/2;

    // Check the button itself
    if((Math.abs(dX)<halfWidth)&&(Math.abs(dY)<halfHeigth))
      hovering = true;

    return hovering;
  },

  executeHover:function(hover){

    if(hover){
      this.loadingActive();
    }
    else{
      this.loadingDeactive();
    }
  },

  loadingActive: function(){
    var self = this;

    this.loadAmount = this.loadAmount + this.speed;

    if(this.loadAmount > this.buttonAttributes.max){
      this.loadAmount = this.buttonAttributes.max;

      this.drawingReady = false;
      this.loadAmount = 120;
      this.unloading();
      this.wasActive = false;

      this.buttonOut();

      var t = setTimeout(function(){
        self.proceed();
      }, 250);
    }
    else if((this.wasActive == false)&&(this.loadingReady)){
      this.loadingReady = false;
      this.loading();
      this.wasActive = true;

      this.buttonIn();

      var t = setTimeout(function(){
        self.loadingReady = true;
      }, 250);
    }

  },

  loading: function(){

  },

  loadingDeactive: function(){
    var self = this;

    this.loadAmount = this.loadAmount - this.speed*2;

    if(this.loadAmount < 120){
        this.loadAmount = 120;
    }

    if((this.wasActive == true)&&(this.loadingReady)){
      this.loadingReady = false;
      this.wasActive = false;
      this.unloading();

      this.buttonOut();

      var t = setTimeout(function(){
        self.loadingReady = true;
        self.unloadingDone();
      }, 250);
    }
  },

  buttonIn: function(){
    this.subElm('.image').removeClass('image-unload');
    this.subElm('.shadow').removeClass('shadow-unload');

    //shift the button 5% lower when the button is pressed in
    var height = parseInt(this.subElm('.image').css('height'));
    var newTop = height * 5 /100;

    this.subElm('.sub-container').css({top:newTop});
    this.subElm('.image').addClass('image-load');
    this.subElm('.shadow').addClass('shadow-load');

    //this.subElm('.sub-container .text').css({top:-20});
    this.subElm('.sub-container .loading-bar').css({opacity:1});
  },

  buttonOut: function(){
    this.subElm('.image').removeClass('image-load');
    this.subElm('.shadow').removeClass('shadow-load');

    this.subElm('.sub-container').css({top:0});
    this.subElm('.image').addClass('image-unload');
    this.subElm('.shadow').addClass('shadow-unload');

    //this.subElm('.sub-container .text').css({top:0});
    this.subElm('.sub-container .loading-bar').css({opacity:0});
  },

  unloadingDone: function(){

  },

  unloading: function(){

  },

  proceed: function(){

  },

  hidden: function(){

  },

});
