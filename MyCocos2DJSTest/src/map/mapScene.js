/*
 test for how to use a tile map
 */

var mapTestScene = cc.Scene.extend({
    onEnter: function () {
        this._super();

        var layer = new mapTestLayer();
        this.addChild(layer);
    }
});

var mapTestLayer = cc.Layer.extend({
    tamara: null,
    _reproduce: null,
    _touchListener: null,

    ctor: function () {
        this._super();

        cc.log("this._super()");
        var map = new cc.TMXTiledMap(res.map00_tmx);
        //var map = new cc.TMXTiledMap(res.map01_tmx);
        this.addChild(map, 0, TAG_TILE_MAP);
        cc.log("cc.TMXTiledMap.create");

        var s = map.getContentSize();
        cc.log("map getContentSize: width =" + s.width + "; height =" + s.height);
        var posX = -s.width / 4;
        map.setPosition(posX, 0);

        this.tamara = new cc.Sprite(res.sister_png);
        map.addChild(this.tamara, map.getChildren().length);
        cc.log("map.getChildren().length =" + map.getChildren().length);

        var mapWidth = map.getMapSize().width * map.getTileSize().width;
        this.tamara.setPosition(mapWidth / 2, 0);
        this.tamara.setAnchorPoint(0.5, 0);
        cc.log("mapWidth =" + mapWidth);

        var self = this;
        this._touchListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                return self.touchedBegan(touch, event);
            },

            onTouchEnded: function (touch, event) {
                return self.touchedEnded(touch, event);
            }
        });
        this._touchListener.retain();

        var move = cc.moveBy(4, cc.pMult(cc.p(300, 250), 0.75));
        var back = move.reverse();
        var delay = cc.delayTime(0.5);
        var seq = cc.sequence(move, delay, back);
        this.tamara.runAction(cc.repeatForever(seq));

        this.schedule(this.repositionSprite);

    },

    onEnter: function () {
        this._super();

        cc.eventManager.addListener(this._touchListener, this);
    },

    onExit: function () {
        this._super();
        cc.eventManager.removeListener(this._touchListener);
    },

    touchedBegan: function (touch, event) {
        cc.log("touchedBegan");
        var rect = this.tamara.getBoundingBox();
        cc.log("rect.width=" + rect.width + "rect.height=" + rect.height + "rect.x=" + rect.x + "rect.y=" + rect.y);
        if (cc.rectContainsPoint(rect, touch.getLocation())) {
            cc.log("this._reproduce = true;");
            this._reproduce = true;
        }
        return true;
    },

    touchedEnded: function (touch, event) {
        cc.log("touchedEnded");
        if (this._reproduce) {
            this._reproduce = false;
        }
        // exchange scene
        cc.director.runScene(new cc.TransitionZoomFlipX(1.0, new Box2dScene()));

        return true;
    },

    repositionSprite: function (dt) {
        var p = this.tamara.getPosition();
        var map = this.getChildByTag(TAG_TILE_MAP);

        // there are only 4 layers. (grass and 3 trees layers)
        // if tamara < 48, z=4
        // if tamara < 96, z=3
        // if tamara < 144, z=2
        var newZ = 4 - (p.y / 48);
        newZ = parseInt(Math.max(newZ, 0), 10);
        map.reorderChild(this.tamara, newZ);
    },
});
