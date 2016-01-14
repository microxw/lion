/*
 resource items for all
 */

var res = {
    HelloWorld_png: "res/HelloWorld.png",
    CloseNormal_png : "res/CloseNormal.png",
    CloseSelected_png : "res/CloseSelected.png",
    Item1Normal_png : "res/item1_N.png",
    Item1Selected_png : "res/item1_P.png",
    Item2Normal_png : "res/item2_N.png",
    Item2Selected_png : "res/item2_P.png",
    Item3Normal_png : "res/item3_N.png",
    Item3Selected_png : "res/item3_P.png",
    Item4Normal_png : "res/item4_N.png",
    Item4Selected_png : "res/item4_P.png",
    iso_test_png: "res/TileMaps/iso-test.png",
    sister_png: "res/TileMaps/grossinis_sister.png",
    blocks_png: "res/TileMaps/blocks.png",
    bg_png: "res/TileMaps/texture/background.png",
    map00_tmx: "res/TileMaps/iso-test-zorder.tmx",
    map01_tmx: "res/TileMaps/world_0_1.tmx",
    skeletonCowboy_json:"res/skeleton/skeletonAnimation.ExportJson",
    Cowboy_plist: "res/skeleton/skeletonAnimation0.plist",
    Cowboy_png: "res/skeleton/skeletonAnimation0.png"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}