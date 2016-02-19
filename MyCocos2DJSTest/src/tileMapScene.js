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
    _tileMap: null,
    _background: null,
    _meta: null,
    _foreground:null,
    _touchListener: null,
    _player: null,

    ctor: function () {
        this._super();
        cc.log("this._super()");

        this._tileMap = new cc.TMXTiledMap(res.tileMap_tmx);
        this.addChild(this._tileMap, TAG_TILE_MAP);

        var size = this._tileMap.getContentSize();
        cc.log("map getContentSize: width =" + size.width + "; height =" + size.height); //1600*1600
        cc.log("_tileMap.getMapSize(): width =" + this._tileMap.getMapSize().width + "; height =" + this._tileMap.getMapSize().height); //50*50¿éÊý
        cc.log("_tileMap.getTileSize(): width =" + this._tileMap.getTileSize().width + "; height =" + this._tileMap.getTileSize().height); //32*32ÏñËØ

        //get layer
        this._background = this._tileMap.getLayer("Background");
        this._foreground = this._tileMap.getLayer("Foreground");
        this._meta = this._tileMap.getLayer("Meta");
        this._meta.setVisible(false);

        //get object
        var objects = this._tileMap.getObjectGroup("Objects");
        var spawnPoint = objects.getObject("SpawnPoint");
        this._player = new cc.Sprite(res.player_png);
        this.addChild(this._player);
        this._player.setPosition(spawnPoint.x, spawnPoint.y);
        this.setViewPointCenter(this._player.getPosition());

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

    setViewPointCenter: function (pos) {
        cc.log("setViewPiontCenter: x=" + pos.x + "; y=" + pos.y);

        var winSize = cc.winSize;
        var x = Math.max(pos.x, winSize.width / 2); //use methods and functions of math
        var y = Math.max(pos.y, winSize.height / 2);
        x = Math.min(x, (this._tileMap.getMapSize().width * this._tileMap.getTileSize().width) - winSize.width / 2);
        y = Math.min(y, (this._tileMap.getMapSize().height * this._tileMap.getTileSize().height) - winSize.height / 2);

        var actualPosition = cc.p(x, y); //create a point
        var centerOfView = cc.p(winSize.width / 2, winSize.height / 2);
        var viewPointX = centerOfView.x - actualPosition.x;
        var viewPointY = centerOfView.y - actualPosition.y;
        this.setPosition(viewPointX, viewPointY);
    },

    //exchange (x, y) coordinate to tile coordinate system (from [0, 0] to [49, 49])
    tileCoordForPosition: function (position) {
        var x = Math.round(position.x / this._tileMap.getTileSize().width);
        //zero point in cocos is at left bottom, so need to reverse
        var y = Math.round(((this._tileMap.getMapSize().height * this._tileMap.getTileSize().height) - position.y) / this._tileMap.getTileSize().height);
        return cc.p(x, y);
    },

    setPlayerPosition: function (position) {
        //add collision detection here
        var tileCoord = this.tileCoordForPosition(position);
        var tileGid = this._meta.getTileGIDAt(tileCoord); //get GID of tile by coordinate
        if (tileGid != 0) {
            var properties = (this._tileMap.getPropertiesForGID(tileGid)); //get property list of tile
            var collision = properties["Collidable"]; //added in tile editor
            if (collision && "True" == collision.toString()) {
                cc.log("you are collided here");
                return;
            }
        }
        this._player.setPosition(position);
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

        var touchLocation = touch.getLocation();
        cc.log("touchLocation: x=" + touchLocation.x + ("; y=") + touchLocation.y);
        touchLocation = this.convertToNodeSpace(touchLocation);
        cc.log("convertToNodeSpace: x=" + touchLocation.x + ("; y=") + touchLocation.y);
        var playerPos = this._player.getPosition();
        cc.log("playerPos: x=" + playerPos.x + ("; y=") + playerPos.y);
        var x = touchLocation.x - playerPos.x;
        var y = touchLocation.y - playerPos.y;
        var diff = cc.p(x, y);
        if (Math.abs(diff.x) > Math.abs(diff.y)) {
            if (diff.x > 0) {
                playerPos.x += this._tileMap.getTileSize().width;
            }
            else {
                playerPos.x -= this._tileMap.getTileSize().width;
            }
        }
        else {
            if (diff.y > 0) {
                playerPos.y += this._tileMap.getTileSize().height;
            }
            else {
                playerPos.y -= this._tileMap.getTileSize().height;
            }
        }

        cc.log("playerPos new: x=" + playerPos.x + ("; y=") + playerPos.y);
        if ((playerPos.x < this._tileMap.getMapSize().width * this._tileMap.getMapSize().width
            ) &&
            (playerPos.y <
                this._tileMap.getMapSize().height * this._tileMap.getMapSize().height
            ) &&
            playerPos.y >= 0 &&
            playerPos.x >= 0
        ) {
            this.setPlayerPosition(playerPos);
        }

        this.setViewPointCenter(this._player.getPosition());
        return true;
    },
});
