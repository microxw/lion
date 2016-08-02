/*
 a test scene for skeleton
 */

var skeletonTestScene = cc.Scene.extend({
    onEnter: function () {
        this._super();

        var layer = new skeletonTestLayer();
        this.addChild(layer);
    }
});

var skeletonTestLayer = cc.Layer.extend({
    _sea: null,

    ctor: function () {
        this._super();

        this.init();
    },

    init: function () {
    },

    onEnter: function () {
        this._super();

        //ccs��CocosStudio�������ռ�
        //��ʽ�������������ú͹�������
        //ccs.armatureDataManager.addArmatureFileInfo(res.skeleton_json);
        //var armature = new ccs.Armature("SkeletonTest");

        //test������ʹ�õ���ccs.ArmatureDataManager.getInstance().addArmatureFileInfo(s_Cowboy_json);
        //������3.9���治����ô��
        //ccs.armatureDataManager is a singleton object which format and manage armature configuration and armature animation
        ccs.armatureDataManager.addArmatureFileInfo(res.Cowboy_png, res.Cowboy_plist, res.skeletonCowboy_json);
        var armature = new ccs.Armature("skeletonAnimation");
        armature.getAnimation().playWithIndex(0);
        armature.scale = 0.2;
        armature.anchorX = 0.5;
        armature.anchorY = 0.5;
        armature.x = cc.winSize.width / 2;
        armature.y = cc.winSize.height / 2;

        this.addChild(armature);
    },

    onExit: function () {
        this._super();
    }
});

