/*
 a test scene for sea wave
 */

var waveTestScene = cc.Scene.extend({
    onEnter: function () {
        this._super();

        var layer = new waveTestLayer();
        this.addChild(layer);
    }
});

var waveTestLayer = cc.Layer.extend({
    _sea: null,

    ctor: function () {
        this._super();

        this.init();
    },

    init:function(){
        // background sea
        this._sea = new worldSea();
        this.addChild(this._sea);

        // animation of waves
        this._waveSprites = new waveSprites();
        this._waveSprites._map = this;
        this.addChild(this._waveSprites, 0);
    },

    onEnter: function () {
        this._super();

    },

    onExit: function () {
        this._super();

    }
});

