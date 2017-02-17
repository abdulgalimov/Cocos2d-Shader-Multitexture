/**
 * Created by sam on 18.02.17.
 */


var AlphaCloudProgram = function(targetSprite) {
    cc.GLProgram.call(this, res.AlphaCloud_vsh, res.AlphaCloud_fsh);
    //
    var noiseSprite = new cc.Sprite(res.noise_png);
    var noiseTexture = noiseSprite.getTexture();
    noiseTexture.setTexParameters(gl.LINEAR, gl.LINEAR, gl.REPEAT, gl.REPEAT);
    //
    var textureBounds = this.getFrameBounds(targetSprite);
    var noiseBounds = this.getFrameBounds(noiseSprite);
    //
    var noiseTransform = new cc.math.Matrix3();
    noiseTransform.identity();
    noiseTransform = cc.math.Matrix3.createByScale(textureBounds.width, textureBounds.height).multiply(noiseTransform);
    noiseTransform = cc.math.Matrix3.createByTranslation(-textureBounds.x, -textureBounds.y).multiply(noiseTransform);
    noiseTransform = cc.math.Matrix3.createByTranslation(noiseBounds.x, noiseBounds.y).multiply(noiseTransform);
    noiseTransform = cc.math.Matrix3.createByScale(1/noiseBounds.width, 1/noiseBounds.height).multiply(noiseTransform);
    //
    var noiseDirection = {x:0, y:0};
    var noisePosition = {x:0, y:0};
    function initNoise() {
        var a = -Math.PI*1/4;
        var r = 1.3;
        noiseDirection.x = r*Math.cos(a);
        noiseDirection.y = r*Math.sin(a);
    }
    function moveNoise() {
        noisePosition.x += noiseDirection.x;
        noisePosition.y += noiseDirection.y;
    }
    initNoise();
    //
    //
    this.use = function() {
        var gl = cc._renderContext;
        gl.useProgram(this._programObj);
        moveNoise();
        //
        gl.uniform2fv(noisePosUniform, new Float32Array([noisePosition.x/512, noisePosition.y/512]));
        //
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, noiseTexture.name);
        //
        cc.glUseProgram(this._programObj);
    };
    //
    this.addAttribute(cc.ATTRIBUTE_NAME_POSITION, cc.VERTEX_ATTRIB_POSITION);
    this.addAttribute(cc.ATTRIBUTE_NAME_COLOR, cc.VERTEX_ATTRIB_COLOR);
    this.addAttribute(cc.ATTRIBUTE_NAME_TEX_COORD, cc.VERTEX_ATTRIB_TEX_COORDS);
    this.link();
    this.updateUniforms();
    //
    var noisePosUniform = this.getUniformLocationForName('u_noise_pos');
    this.setUniformLocationWith1i(this.getUniformLocationForName('CC_Texture1'), 1);
    this.setUniformLocationWithMatrix3fv(this.getUniformLocationForName('u_matrix_noise'), noiseTransform.mat);
};
AlphaCloudProgram.prototype = Object.create(cc.GLProgram.prototype);
AlphaCloudProgram.prototype.getFrameBounds = function(sprite) {
    var frame = sprite.getSpriteFrame();
    var bounds = {};
    bounds.x = frame.getRect().x-frame.getOffset().x;
    bounds.y = frame.getRect().y-frame.getOffset().y;
    bounds.width = frame.getTexture().pixelsWidth;
    bounds.height = frame.getTexture().pixelsHeight;
    bounds.isRotated = frame.isRotated();
    return bounds;
};
