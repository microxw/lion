/*
 2D body physical animation
 */

var TAG_SPRITE_MANAGER = 1;
var PTM_RATIO = 32;

var Box2dScene = cc.Scene.extend({
    onEnter: function () {
        this._super();

        var layer = new Box2dTestLayer();
        this.addChild(layer);
    }
});

var Box2dTestLayer = cc.Layer.extend({
    world: null,

    ctor: function () {
        this._super();
        cc.log("this._super()");

        cc.eventManager.addListener(cc.EventListener.create({
            event: cc.EventListener.TOUCH_ALL_AT_ONCE,
            onTouchesEnded: function (touches, event) {
                //Add a new body/atlas sprite at the touched location
                var touch = touches[0];
                var location = touch.getLocation();
                event.getCurrentTarget().addNewSpriteWithCoords(location);
            }
        }), this);

        var b2Vec2 = Box2D.Common.Math.b2Vec2
            , b2BodyDef = Box2D.Dynamics.b2BodyDef
            , b2Body = Box2D.Dynamics.b2Body
            , b2FixtureDef = Box2D.Dynamics.b2FixtureDef
            , b2World = Box2D.Dynamics.b2World
            , b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;

        var screenSize = cc.director.getWinSize();
        //UXLog(L"Screen width %0.2f screen height %0.2f",screenSize.width,screenSize.height);

        // Construct a world object, which will hold and simulate the rigid bodies.
        this.world = new b2World(new b2Vec2(0, -10), true);
        this.world.SetContinuousPhysics(true);

        var fixDef = new b2FixtureDef;
        fixDef.density = 1.0;
        fixDef.friction = 0.5;
        fixDef.restitution = 0.2;

        var bodyDef = new b2BodyDef;
        //create ground
        bodyDef.type = b2Body.b2_staticBody;
        fixDef.shape = new b2PolygonShape;
        fixDef.shape.SetAsBox(20, 2);
        // upper
        bodyDef.position.Set(10, screenSize.height / PTM_RATIO + 1.8);
        this.world.CreateBody(bodyDef).CreateFixture(fixDef);
        // bottom
        bodyDef.position.Set(10, -1.8);
        this.world.CreateBody(bodyDef).CreateFixture(fixDef);
        fixDef.shape.SetAsBox(2, 14);
        // left
        bodyDef.position.Set(-1.8, 13);
        this.world.CreateBody(bodyDef).CreateFixture(fixDef);
        // right
        bodyDef.position.Set(26.8, 13);
        this.world.CreateBody(bodyDef).CreateFixture(fixDef);

        //Set up sprite
        var mgr = new cc.SpriteBatchNode(res.blocks_png, 150);
        this.addChild(mgr, 0, TAG_SPRITE_MANAGER);
        this.addNewSpriteWithCoords(cc.p(screenSize.width / 2, screenSize.height / 2));

        var label = cc.LabelTTF.create("Tap screen", "Marker Felt", 32);
        this.addChild(label, 0);
        label.setColor(cc.color(0, 0, 255, 255));
        label.setPosition(screenSize.width / 2, screenSize.height - 50);

        this.scheduleUpdate();
    },

    addNewSpriteWithCoords: function (p) {
        var batch = this.getChildByTag(TAG_SPRITE_MANAGER);

        //We have a 64x64 sprite sheet with 4 different 32x32 images.  The following code is
        //just randomly picking one of the images
        var idx = (Math.random() > .5 ? 0 : 1);
        var idy = (Math.random() > .5 ? 0 : 1);
        var sprite = new cc.Sprite(batch.texture, cc.rect(32 * idx, 32 * idy, 32, 32));
        batch.addChild(sprite);
        sprite.x = p.x;
        sprite.y = p.y;

        // Define the dynamic body.
        //Set up a 1m squared box in the physics world
        var b2BodyDef = Box2D.Dynamics.b2BodyDef
            , b2Body = Box2D.Dynamics.b2Body
            , b2FixtureDef = Box2D.Dynamics.b2FixtureDef
            , b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;

        var bodyDef = new b2BodyDef();
        bodyDef.type = b2Body.b2_dynamicBody;
        bodyDef.position.Set(p.x / PTM_RATIO, p.y / PTM_RATIO);
        bodyDef.userData = sprite;
        var body = this.world.CreateBody(bodyDef);

        // Define another box shape for our dynamic body.
        var dynamicBox = new b2PolygonShape();
        dynamicBox.SetAsBox(0.5, 0.5);//These are mid points for our 1m box

        // Define the dynamic body fixture.
        var fixtureDef = new b2FixtureDef();
        fixtureDef.shape = dynamicBox;
        fixtureDef.density = 1.0;
        fixtureDef.friction = 0.3;
        body.CreateFixture(fixtureDef);
    },

    // update every body repeatedly
    update: function (dt) {
        cc.log("update:() ...");
        var velocityIterations = 8;
        var positionIterations = 1;

        // Instruct the world to perform a single step of simulation. It is
        // generally best to keep the time step and iterations fixed.
        this.world.Step(dt, velocityIterations, positionIterations);

        //Iterate over the bodies in the physics world
        for (var b = this.world.GetBodyList(); b; b = b.GetNext()) {
            if (b.GetUserData() != null) {
                //Synchronize the AtlasSprites position and rotation with the corresponding body
                var myActor = b.GetUserData();
                myActor.x = b.GetPosition().x * PTM_RATIO;
                myActor.y = b.GetPosition().y * PTM_RATIO;
                myActor.rotation = -1 * cc.radiansToDegrees(b.GetAngle());
            }
        }
    }
});