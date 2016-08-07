/*
 how to use a tile map and collision detection
 */

var tileMapScene = cc.Scene.extend({
    onEnter: function () {
        this._super();

        var layer = new mapLayer();
        this.addChild(layer);
    }
});

var mapLayer = cc.Layer.extend({
    _tileMap:null,
    _background:null,
    _touchListener: null,
    _player:null,

    ctor: function () {
        this._super();
        cc.log("this._super()");

        this._tileMap = new cc.TMXTiledMap(res.tileMap_tmx);
        this.addChild(this._tileMap, TAG_TILE_MAP);

        var size = this._tileMap.getContentSize();
        var posX = -size.width / 4;
        this._tileMap.setPosition(posX, 0);
        cc.log("map getContentSize: width =" + size.width + "; height =" + size.height);

        //get layer
        this._background = this._tileMap.getLayer("Background");

        //get object
        var objects = this._tileMap.getObjectGroup("Objects");
        var spawnPoint = objects.getObject("SpawnPoint");
        this._player = new cc.Sprite(res.player_png);
        this.addChild(this._player);
        this._player.setPosition(spawnPoint.x, spawnPoint.y);
        this.setViewPiontCenter(this._player.getPosition());

        //touch event
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
    },

    setViewPiontCenter:function(pos){

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

        return true;
    },

    touchedEnded: function (touch, event) {
        cc.log("touchedEnded");

        return true;
    },
});
