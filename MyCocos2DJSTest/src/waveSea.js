// pure background color of sea

var worldSea = cc.LayerGradient.extend({ //draws gradients across the background
    ctor: function () {
        this._super(cc.color(87, 155, 178, 255), cc.color(87, 155, 178, 255), cc.p(1, 0));

        var size = cc.winSize;
        var scaleFactor = 1 / MAP_CONFIG.MIN_SCALE;
        this.setContentSize(cc.size(size.width * scaleFactor, size.height * scaleFactor));

        this.init();
    },

    init: function () {
        var size = cc.winSize;
        var scaleFactor = 1 / MAP_CONFIG.MIN_SCALE;

        //缩放倍数，以屏幕中心为原点
        this.setPosition(cc.p(-(scaleFactor - 1) * size.width / 2, -(scaleFactor - 1) * size.height / 2));
    }
})