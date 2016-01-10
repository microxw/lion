// animation of sea wave

var TEXTURE_LEN = 4;

var waveTile = cc.Sprite.extend({
    _index: 0,
    _tilePos: null,
    _random: null,

    ctor: function (index) {
        this._gridSize = cc.size(MAP_CONFIG.waveGridSize.width, MAP_CONFIG.waveGridSize.height);
        this._super(MAP_CONFIG.WAVE_TEXTURE, cc.rect(index * this._gridSize.width, 0, this._gridSize.width, this._gridSize.height));
        this._index = index;
        this._tilePos = cc.p(0, 0);
        this._random = cc.p(2, 4);
    },

    /**
     * Update will be called automatically every frame if "scheduleUpdate" is called when the node is "live".<br/>
     * The default behavior is to invoke the visit function of node's componentContainer.<br/>
     * @param {Number} dt Delta time since last update
     */
    update: function (dt) {
        if (++this._index >= TEXTURE_LEN) {
            this._index = 0;
        }
        this.setTextureRect(cc.rect(this._index * this._gridSize.width, 0, this._gridSize.width, this._gridSize.height));
    }
});

var waveSprites = cc.SpriteBatchNode.extend({
    _tiles: null,
    _gridSize: null,
    _count: 0,
    _deltaT: 0,
    _tickStart: 0,

    ctor: function () {
        this._super(MAP_CONFIG.WAVE_TEXTURE, 2500);
        this._gridSize = cc.size(MAP_CONFIG.waveGridSize.width, MAP_CONFIG.waveGridSize.height);
        this.init();
    },

    init: function () {

        // function: scheduleUpdate()
        // cc.Node - Callbacks
        // timers
        /**
         * <p>schedules the "update" method.                                                                        <br/>
         * It will use the order number 0. This method will be called every frame.                                  <br/>
         * Scheduled methods with a lower order value will be called before the ones that have a higher order value.<br/>
         * Only one "update" method could be scheduled per node.</p>
         */
        this.scheduleUpdate();

        var winSize = cc.winSize;
        var maxWidth = Math.max(winSize.width, winSize.height * 2);
        var maxHeight = Math.max(winSize.width / 2, winSize.height);
        var d = Math.sqrt(maxWidth * maxWidth + maxHeight * maxHeight); //¶Ô½ÇÏß³¤

        var midW = this._gridSize.width / 2, midH = this._gridSize.height / 2;
        var r = Math.sqrt(midW * midW + midH * midH) * MAP_CONFIG.MIN_SCALE;
        var n = Math.round(d / r);
        n += (n % 2 == 0 ? 3 : 2);
        this._count = n;

        this._tiles = [];
        var midX = winSize.width / 2, midY = winSize.height / 2;
        for (var i = 0; i < n; i++) {
            var line = [];
            this._tiles.push(line);
            var start = Math.round(Math.random() * 100) % TEXTURE_LEN;
            for (var j = 0; j < n; j++) {
                var pos = cc.p(midX + (j - i) * midW, midY + (n - i - j - 1) * midH);
                var sprite = new waveTile((start + i * n + j) % TEXTURE_LEN);
                sprite._tilePos = cc.p(i, j);
                sprite._random.x += Math.round(Math.random() * 100) % 4;
                sprite._random.y += Math.round(Math.random() * 100) % 2;
                sprite.setPosition(pos);
                this.addChild(sprite);
                line.push(sprite);
            }
        }
    },

    update: function (dt) {
        this._super(dt);
        this._deltaT += dt;
        this._tickStart += dt * 3;

        var n = this._count;
        var spriteUpdate = (this._deltaT > 0.16);

        for (var i = 0; i < n; i++) {
            for (var j = 0; j < n; j++) {
                var sprite = this._tiles[i][j];
                if (spriteUpdate) {
                    sprite.update(this._deltaT);
                }
                var d = sprite._tilePos.x % 17;
                var s = sprite._tilePos.y % 17;
                var alpha = Math.round(50 + 30 * Math.sin((d + this._tickStart + Math.random()) * Math.PI / sprite._random.x) + 30 * Math.cos((s + this._tickStart + Math.random()) * Math.PI / sprite._random.y));
                sprite.setOpacity(Math.max(alpha, 0));
            }
        }
        if (spriteUpdate)
            this._deltaT = 0;
    }
});