SmsFrame = Component.create({
  name: 'sms-frame',

  buttonOffset:{x:350, y:0},
  scaleOffset:{x:480, y:540},
  scale:0.5,
  source: User.head,

  shown:function (){
    if (typeof this.data == 'undefined') {
      this.data = BrandData[0].items[0];
    }

    console.log("SMS FRAME DATA", this.data);
    this.subElm('.footer .text').text(this.data.name + " @ R330 PM x 24 months");
  },
  update: function(){
    var scaledSource = {x:0, y:0};

    scaledSource.x = this.source.x * this.scale + this.scaleOffset.x;
    scaledSource.y = this.button.source.y

    var buttonX = (scaledSource.x + this.buttonOffset.x);
    var buttonY = (scaledSource.y + this.buttonOffset.y);

    this.button.source = {x: buttonX, y: buttonY};
  },
});
