StartContainer = Component.create({
  name: 'start-container',

  button: null,
  source: User.head,

  buttonOffset:{x:625, y:400},

  startIdentifier:null,

  sourceIdentifier:{x:500, y:400},

  shown: function(){
    var self = this;

    this.addTimeout('top', function(){
      self.element.css({top:0});
    },100);

    this.button.shown();
    this.button.subElm('.container').addClass('add-scale');
    this.startIdentifier.shown();

    this.addTimeout('initArcl',function(){
      self.startIdentifier.drawArc();
    },1000);

  },

  hidden: function(){
    this.element.css({top:1080});
  },

  update: function(){

    this.sourceIdentifier.x = User.head.x + this.buttonOffset.x - 186;
    this.sourceIdentifier.y = User.head.y + this.buttonOffset.y - 1;

    this.startIdentifier.update();

    var scaledSource = {x:0, y:0};
    scaledSource.x = this.source.x;
    scaledSource.y = this.source.y;

    this.button.source = {x: (scaledSource.x + this.buttonOffset.x),
                              y: (scaledSource.y + this.buttonOffset.y)};
    this.button.update();

  },

  proceed: function(){

  },

  init: function(){
    var self = this;
    this.button = null;

    this.button = PushButton.create({
      scaleButton:1.5,
      source:{x:1300 ,y:850},
      id:'push-button-start',
      imageClass:'image-start',
      iconClass:'icon-start',
      textClass:'text-start',
      text:'PROCEED',
      drawingReady:false,
      dynamicPositioning:true,
      proceed:function(){
        self.proceed();
      },
    });
    this.button.init();

    this.startIdentifier = CircularIdentifier.create({
      id:'identifier-start',
      source: self.sourceIdentifier,
      proceed:function(){
        self.button.drawingReady = true;
      },
    });
    this.startIdentifier.init();

  },
});
