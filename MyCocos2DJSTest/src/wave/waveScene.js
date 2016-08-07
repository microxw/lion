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
    _waveSprites: null,

    ctor: function () {
        this._super();

        this.init();
    },

    init: function () {
        // background sea
        this._sea = new worldSea();
        this.addChild(this._sea);
    },

    onEnter: function () {
        this._super();

        // animation of waves
        this._waveSprites = new waveSprites();
        this.addChild(this._waveSprites, 0);
    },

    onExit: function () {
        this._super();
    }
});

