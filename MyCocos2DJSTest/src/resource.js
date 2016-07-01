/*
 resource items for all
 */

var res = {
    HelloWorld_png: "res/HelloWorld.png",
    CloseNormal_png : "res/CloseNormal.png",
    CloseSelected_png : "res/CloseSelected.png",
    ItemSelected_png : "res/item_P.png",
    Item1Normal_png : "res/item1_N.png",
    Item2Normal_png : "res/item2_N.png",
    Item3Normal_png : "res/item3_N.png",
    Item4Normal_png : "res/item4_N.png",
    Item5Normal_png : "res/item5_N.png",
    iso_test_png: "res/TileMaps/iso-test.png",
    sister_png: "res/TileMaps/grossinis_sister.png",
    blocks_png: "res/TileMaps/blocks.png",
    bg_png: "res/TileMaps/texture/background.png",
    map00_tmx: "res/TileMaps/iso-test-zorder.tmx",
    map01_tmx: "res/TileMaps/world_0_1.tmx",
    skeletonCowboy_json:"res/skeleton/skeletonAnimation.ExportJson",
    Cowboy_plist: "res/skeleton/skeletonAnimation0.plist",
    Cowboy_png: "res/skeleton/skeletonAnimation0.png",
    tileMap_tmx: "res/TileGameResources/TileMap.tmx",
    player_png: "res/TileGameResources/Player.png",
    shader_heart_vsh : "res/shader/example_Heart.vsh",
    shader_heart_fsh : "res/shader/example_Heart.fsh",
    head_png: "res/shader/HeadBall.png",
    shader_outline_fsh : "res/shader/example_Outline.fsh",
    shader_outline_vsh : "res/shader/example_Outline.vsh",
    shader_outline_mvp_vsh : "res/shader/example_Outline_noMVP.vsh",

};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}