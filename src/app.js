
var program;
function createProgram(targetSprite) {
    if (program) {
        targetSprite.shaderProgram = program;
        targetSprite.setBlendFunc(cc.BlendFunc.ALPHA_NON_PREMULTIPLIED);
        return;
    }
    //
    program = new AlphaCloudProgram(targetSprite);
    targetSprite.shaderProgram = program;
    targetSprite.setBlendFunc(cc.BlendFunc.ALPHA_NON_PREMULTIPLIED);
}


var AppView = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        this._super();
        //
        var table = new cc.Sprite(res.table_png);
        table.x = cc.winSize.width/2;
        table.y = cc.winSize.height/2;
        this.addChild(table);
        //
        //this.test();
        this.createCard(cc.winSize.width/2, cc.winSize.height/2);
        //
        return true;
    }
});
AppView.prototype.createCard = function(x, y) {
    var card = new cc.Sprite(res.card_png);
    card.x = x;
    card.y = y;
    this.addChild(card);
    createProgram(card);
    return card;
};
AppView.prototype.test = function() {
    //
    var xcount = 14;
    var ycount = 10;
    var dx = cc.winSize.width/xcount;
    var dy = cc.winSize.height/ycount;
    var scale = 0;
    for (var i=0; i<xcount; i++) {
        for (var j=0; j<ycount; j++) {
            var card = this.createCard(i*dx, j*dy);
            card.anchorX = 0;
            card.anchorY = 0;
        }
    }
};


var AppScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new AppView();
        this.addChild(layer);
    }
});

