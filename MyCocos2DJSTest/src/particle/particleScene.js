/*
 a test scene for particle effects
 */

var particleTestLayer = cc.Layer.extend({
    _emitter: null,

    ctor: function () {
        this._super();

        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ALL_AT_ONCE,
            onTouchesBegan: function (touches, event) {
                event.getCurrentTarget()._moveToTouchPoint(touches[0].getLocation());
            },
            onTouchesMoved: function (touches, event) {
                event.getCurrentTarget()._moveToTouchPoint(touches[0].getLocation());
            },
            onTouchesEnded: function (touches, event) {
                event.getCurrentTarget()._moveToTouchPoint(touches[0].getLocation());
            }
        }, this);

        this.init();
    },

    init: function () {
        this._emitter = new cc.ParticleSun();
        this._emitter.texture = cc.textureCache.addImage(res.fire_png);
        if (this._emitter.setShapeType) {
            this._emitter.setShapeType(cc.ParticleSystem.BALL_SHAPE);
        }
        this._emitter.initWithTotalParticles(100);
        this.addChild(this._emitter, 0);

        var winSize = cc.director.getWinSize();
        var pos = cc.p(winSize.width / 2, winSize.height / 2);
        this.setEmitterProp(pos);

        //this.scheduleUpdate();
    },

    setEmitterProp: function (pos) {
        var emitter = this._emitter;

        // Gravity Mode: gravity
        emitter.setGravity(cc.p(0, 0));

        // Gravity mode: radial acceleration
        emitter.setRadialAccel(0);
        emitter.setRadialAccelVar(0);

        // Gravity mode: speed of particles
        emitter.setSpeed(20);
        emitter.setSpeedVar(5);

        // angle
        emitter.setAngle(90);
        emitter.setAngleVar(360);

        // emitter position
        emitter.setPosition(pos);
        emitter.setPosVar(cc.p(0, 0));

        // life of particles
        emitter.setLife(1);
        emitter.setLifeVar(0.5);

        // size, in pixels
        emitter.setStartSize(30.0);
        emitter.setStartSizeVar(10.0);
        emitter.setEndSize(cc.ParticleSystem.START_SIZE_EQUAL_TO_END_SIZE);

        // emits per seconds
        emitter.setEmissionRate(emitter.getTotalParticles() / emitter.getLife());

        // color of particles
        emitter.setStartColor(cc.color(194, 64, 31, 255));
        emitter.setStartColorVar(cc.color(0, 0, 0, 0));
        emitter.setEndColor(cc.color(0, 0, 0, 255));
        emitter.setEndColorVar(cc.color(0, 0, 0, 0));

    },

    _moveToTouchPoint: function (location) {
        this._emitter.x = location.x;
        this._emitter.y = location.y;
    },

    update: function (dt) {
        if (this._emitter) {

        }
    },

    onEnter: function () {
        this._super();
    },

    onExit: function () {
        this._super();
    }
});

var particleScene = cc.Scene.extend({
    onEnter: function () {
        this._super();

        var layer = new particleTestLayer();
        this.addChild(layer);
    }
});