/*
 a test scene for skeleton
 */

var skeletonTestScene = cc.Scene.extend({
    onEnter: function () {
        this._super();

        //var layer = new skeletonTestLayer();
        var layer = new DragonBonesLayer();
        this.addChild(layer);
    }
});

var skeletonTestLayer = cc.Layer.extend({
    _sea: null,

    ctor: function () {
        this._super();

        this.init();
    },

    init: function () {
    },

    onEnter: function () {
        this._super();

        //ccs means CocosStudio's name space
        //ccs.armatureDataManager is a singleton object which format and manage armature configuration and armature animation
        ccs.armatureDataManager.addArmatureFileInfo(res.Cowboy_png, res.Cowboy_plist, res.skeletonCowboy_json);
        var armature = new ccs.Armature("skeletonAnimation");
        armature.getAnimation().playWithIndex(0);
        armature.scale = 0.2;
        armature.anchorX = 0.5;
        armature.anchorY = 0.5;
        armature.x = cc.winSize.width / 2;
        armature.y = cc.winSize.height / 2;

        this.addChild(armature);
    },

    onExit: function () {
        this._super();
    }
});

var DragonBonesLayer = cc.Layer.extend({
    _touchListener: null,
    _armature: null,
    _actionList: ["stand", "jump", "fall", "walk"],

    ctor: function () {
        this._super();

        //add listener
        var self = this;
        this._touchListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                return true;
            },

            onTouchEnded: function (touch, event) {
                self.touchedEnded(touch, event);
            }
        });
        cc.eventManager.addListener(this._touchListener, this);

        ccs.armatureDataManager.addArmatureFileInfo(res.dragon_png, res.dragon_plist, res.dragon_json);
        var armature = new ccs.Armature("Dragon");
        armature.getAnimation().play("walk"); //stand; jump; fall; walk;
        armature.getAnimation().setSpeedScale(24 / 50);
        armature.x = cc.winSize.width / 2;
        armature.y = cc.winSize.height / 2 - 150;
        this._armature = armature;

        this.addChild(armature);
    },

    onEnter: function () {
        this._super();

    },

    onExit: function () {
        this._super();

        if (null != this._touchListener) {
            cc.eventManager.removeListener(this._touchListener);
        }
    },

    touchedEnded: function (touch, event) {
        this._armature.getAnimation().stop();

        var index = Math.round(Math.random() * 3);
        var name = this._actionList[index];
        this._armature.getAnimation().play(name); //not playWithNames

        //var fIn = new cc.FadeIn(0.8);
        //var action = new cc.Sequence(fIn, fIn.reverse());
        //sprite.runAction(action.repeatForever());
    }
});
