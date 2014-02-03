'use strict';

// load the data file
var imageURL = '/mobile/images/content/';
var BrandData = [];
$.getJSON('/mobile/data/brand_data.json', function(data) {
  for (var i=0; i<data.length; i++){
    var brand = data[i];
    brand.logo = imageURL + "brand-" + (i+1) + "/logo.png";

    for(var j=0;j<brand.items.length;j++) {
      var item = brand.items[j];
      item.specs = imageURL + "brand-" + (i+1) + "/item-" + (j+1) + "/specs.png";
      item.image = imageURL + "brand-" + (i+1) + "/item-" + (j+1) + "/item.png";
    }

    BrandData.push(brand);
  }
  console.log(BrandData);
});

AdmoApp.MainCtrl = function($scope) {

    //Global components that are shared across screens.
    //Careful care should be made to ONLY use these as needed
    //Generally this should only be used for consistent background elements

    var mobileLogoSmall = MobileLogoSmall.create({});
    var mobileLogoFull = MobileLogoFull.create({});

    /**********GLOBAL SCREEN***************/
    var silhouette = UserVector.create();

    var backgroundPhoto = BackgroundPhoto.create();

    var globalComponents = GlobalComponents.create({
      components:[silhouette, backgroundPhoto]
    });

    /**********GUIDANCE SCREEN***************/
    var trackingPlain = TrackingPlain.create({
      optimalRadius: {x:150,z:350},

      inPosition:function(){
        AdmoApp.setScreen(AdmoApp.Screens.startScreen);
      },
      moveUp: function(){

      },
      moveDown: function(){

      },
      fadeIn: function(){
        //from stage 1 to stage 2 or 3
        //code here to trigger the screensaver to fade in
        screensaver.fadeIn();
      },
      fadeOut: function(){
        //from stage 3 to stage 1
        //code here to trigger the screensaver to fade out
        screensaver.fadeOut();
      },
    });

    var screensaver = Screensaver.create({

    });

    AdmoApp.Screens.guidanceScreen = Screen.create({
      components:[trackingPlain, screensaver, mobileLogoFull],
      shown: function(){
        silhouette.hideSilhouette();
        backgroundPhoto.showBackground('wood');
      }
    });


    /**********START SCREEN***************/
    var startContainer = StartContainer.create({
      proceed:function(){
        AdmoApp.setScreen(AdmoApp.Screens.brandScreen);
      },
    });

    AdmoApp.Screens.startScreen = Screen.create({
      components:[startContainer],
      shown: function(){
        silhouette.scaleVector(1);
        backgroundPhoto.showBackground('blurred');
      }
    });

    /**********BRAND SCREEN***************/
    var brandCarousel = BrandCarousel.create({
      data: BrandData,
      proceed:function(){
        phoneCarousel.data = this.data[this.index -1];
        AdmoApp.setScreen(AdmoApp.Screens.phoneScreen);
        backgroundPhoto.showBackground('wood');
      },
    });

    AdmoApp.Screens.brandScreen = Screen.create({
      components:[brandCarousel, mobileLogoSmall],
      shown: function(){
        silhouette.scaleVector(0.5);
        backgroundPhoto.showBackground('blurred');
      }
    });


    /**********PHONE SCREEN***************/
    var swipeArrows = SwipeArrows.create({});

    var phoneCarousel = CarouselTilt.create({
      proceed:function(){
        console.log("PHONE SCREEN INDEX MIDDLE", this.indexMiddle)
        smsFrame.data = this.data.items[this.indexMiddle];

        AdmoApp.setScreen(AdmoApp.Screens.packageScreen);
        backgroundPhoto.showBackground('blurred');
      },
    });

    AdmoApp.Screens.phoneScreen = Screen.create({
      components:[
        phoneCarousel,
        mobileLogoSmall,
        swipeArrows
      ],
      shown: function(){
        silhouette.scaleVector(0.5);
        backgroundPhoto.showBackground('wood');
      }
    });


    /**********PACKAGE SCREEN***************/
    var packageCarousel = PackageComponent.create({
      proceed:function(){
        AdmoApp.setScreen(AdmoApp.Screens.smsScreen);
        backgroundPhoto.showBackground('blurred');
      },
    });

    AdmoApp.Screens.packageScreen = Screen.create({
      components:[packageCarousel, mobileLogoSmall],
      shown: function(){
        silhouette.scaleVector(0.5);
        backgroundPhoto.showBackground('blurred');
      }
    });

    /**********SMS SCREEN***************/
    var smsBackButton = PushButton.create({
      scale: 0.5,
      scaleOffset: {x:480, y:540},
      source:{x:1500 ,y:680},
      id:'push-button-sms',
      imageClass:'image-proceed',
      iconClass:'icon-proceed',
      textClass:'text-proceed',
      text:'BACK',
      dynamicPositioning:true,
      drawingReady:true,
      proceed:function(){
        AdmoApp.setScreen(AdmoApp.Screens.startScreen);
      },
    });

    var smsFrame = SmsFrame.create({
      button: smsBackButton
    });

    AdmoApp.Screens.smsScreen = Screen.create({
      components:[smsFrame, smsBackButton, mobileLogoSmall]
    });


    /**********STATE SCREEN HANDLER***************/

    AdmoApp.stateChanged = function(oldState, newState) {
      if( oldState == 3 && (newState==2 || newState==1)){
        AdmoApp.setScreen(AdmoApp.Screens.guidanceScreen);
      }

      if (oldState == 3 && newState != 3){
        //User has gone out of view stop the users session
         Stats.endSession();
      }
    };

    AdmoApp.swipeGesture = function(swipeGesture) {
      phoneCarousel.swipeCarousel(swipeGesture);
      brandCarousel.swipeCarousel(swipeGesture);
      packageCarousel.swipeCarousel(swipeGesture);
    };

    AdmoApp.imageFrame = function(image) {
      silhouette.drawVector(image);
    };

    /**********STATE SCREEN HANDLER***************/
    AdmoApp.setGlobalComponents(globalComponents);

    AdmoApp.init();

    //Init the AdmoApp
    AdmoApp.angularScope = $scope;

    //Set the default screen for the app (ie the starting screen.)
    AdmoApp.setScreen(AdmoApp.Screens.guidanceScreen);

};
