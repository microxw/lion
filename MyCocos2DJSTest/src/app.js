/*
 the first layer for test
 */

var HelloWorldLayer = cc.Layer.extend({
    sprite: null,
    ctor: function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        var size = cc.winSize;

        // add a "close" icon to exit the progress. it's an autorelease object
        var closeItem = new cc.MenuItemImage(
            res.CloseNormal_png,
            res.CloseSelected_png, null, function () {
                cc.log("closeItem is clicked!");
                if (cc.sys.isNative) {
                    cc.director.end();
                }
                else {
                    window.history && window.history.go(-1);
                    //window.history && window.history.back();
                    //window.history && window.history.forward();
                }
            }, this);
        closeItem.attr({
            x: size.width - 20,
            y: 20,
            anchorX: 0.5,
            anchorY: 0.5
        });

        //menu is just a holder for the close button
        var menuClose = new cc.Menu(closeItem);
        menuClose.x = 0;
        menuClose.y = 0;
        this.addChild(menuClose, 1);

        // add a icon to menu
        var spriteNormal = new cc.Sprite(res.Item1Normal_png);
        var spriteSelected = new cc.Sprite(res.Item1Selected_png);
        var item1 = new cc.MenuItemSprite(spriteNormal, spriteSelected, null, this.onMenu1Callback, this);

        // add a icon to menu
        spriteNormal = new cc.Sprite(res.Item2Normal_png);
        spriteSelected = new cc.Sprite(res.Item2Selected_png);
        var item2 = new cc.MenuItemSprite(spriteNormal, spriteSelected, null, this.onMenu2Callback, this);

        spriteNormal = new cc.Sprite(res.Item1Normal_png);
        spriteSelected = new cc.Sprite(res.Item1Selected_png);
        var item3 = new cc.MenuItemSprite(spriteNormal, spriteSelected, null, this.onMenu3Callback, this);

        spriteNormal = new cc.Sprite(res.Item2Normal_png);
        spriteSelected = new cc.Sprite(res.Item2Selected_png);
        var item4 = new cc.MenuItemSprite(spriteNormal, spriteSelected, null, this.onMenu4Callback, this);

        var menu = new cc.Menu(item1, item2, item3, item4);
        menu.alignItemsVertically();
        menu.x = size.width - 50;
        menu.y = size.height / 2;
        this.addChild(menu, 1);

        /////////////////////////////
        // 3. add your codes below...
        // add a label shows "Hello World"
        // create and initialize a label
        var helloLabel = new cc.LabelTTF("Hello World", "Arial", 38);
        // position the label on the center of the screen
        helloLabel.x = size.width / 2;
        helloLabel.y = 0;
        // add the label as a child to this layer
        this.addChild(helloLabel, 5);

        // add "HelloWorld" splash screen"
        this.sprite = new cc.Sprite(res.HelloWorld_png);
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2,
            scale: 0.5,
            rotation: 180
        });
        this.addChild(this.sprite, 0);
        // run animation
        this.sprite.runAction(
            cc.sequence(
                cc.rotateTo(2, 0),
                cc.scaleTo(2, 1, 1)
            )
        );
        helloLabel.runAction(
            cc.spawn(
                cc.moveBy(2.5, cc.p(0, size.height - 40)),
                cc.tintTo(2.5, 255, 125, 0)
            )
        );
        return true;
    },

    onMenu1Callback: function (sender) {
        // exchange to map scene
        cc.director.runScene(new cc.TransitionFade(1.5, new mapTestScene()));
    },

    onMenu2Callback: function (sender) {
        // exchange to wave scene
        cc.director.runScene(new cc.TransitionFade(1.5, new waveTestScene()));
    },

    onMenu3Callback: function (sender) {
        cc.log("onMenu3Callback");
    },

    onMenu4Callback: function (sender) {
        cc.log("onMenu4Callback");
    },

});

var HelloWorldScene = cc.Scene.extend({
    onEnter: function () {
        this._super();

        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});