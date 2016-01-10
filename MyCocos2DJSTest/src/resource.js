/*
 resource items for all
 */

var res = {
    HelloWorld_png: "res/HelloWorld.png",
    CloseNormal_png : "res/CloseNormal.png",
    CloseSelected_png : "res/CloseSelected.png",
    Item1Normal_png : "res/item1_n.png",
    Item1Selected_png : "res/item1_s.png",
    Item2Normal_png : "res/item2_n.png",
    Item2Selected_png : "res/item2_s.png",
    iso_test_png: "res/TileMaps/iso-test.png",
    sister_png: "res/TileMaps/grossinis_sister.png",
    blocks_png: "res/TileMaps/blocks.png",
    bg_png: "res/TileMaps/texture/background.png",
    map00_tmx: "res/TileMaps/iso-test-zorder.tmx",
    map01_tmx: "res/TileMaps/world_0_1.tmx",
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}