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
    ctor: function () {
        this._super();

    },

    onEnter: function () {
        this._super();

    },

    onExit: function () {
        this._super();

    }

});
