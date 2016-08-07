/*
 test for how to use a shader
 */

var shaderScene = cc.Scene.extend({
    onEnter: function () {
        this._super();

        var layer = new shaderLayer();
        this.addChild(layer);
    }
});

//------------------------------------------------------------------
//
// GLNode
//
//------------------------------------------------------------------
cc.GLNode = cc.GLNode || cc.Node.extend({
        ctor: function () {
            this._super();
            this.init();
        },

        init: function () {
            this._renderCmd._needDraw = true;
            this._renderCmd.rendering = function (ctx) {
                cc.kmGLMatrixMode(cc.KM_GL_MODELVIEW);
                cc.kmGLPushMatrix();
                cc.kmGLLoadMatrix(this._stackMatrix);

                this._node.draw(ctx);

                cc.kmGLPopMatrix();
            };
        },

        draw: function (ctx) {
            this._super(ctx);
        }
    });


//------------------------------------------------------------------
//
// ShaderNode
//
//------------------------------------------------------------------
var ShaderNode = cc.GLNode.extend({
    ctor: function (vertexShader, framentShader) {
        this._super();
        this.init();

        if ('opengl' in cc.sys.capabilities) {
            this.width = 256;
            this.height = 256;
            this.anchorX = 0.5;
            this.anchorY = 0.5;

            this.shader = new cc.GLProgram(vertexShader, framentShader);
            this.shader.retain();
            this.shader.addAttribute("aVertex", cc.VERTEX_ATTRIB_POSITION);
            this.shader.link();
            this.shader.updateUniforms();

            var program = this.shader.getProgram();
            this.uniformCenter = gl.getUniformLocation(program, "center");
            this.uniformResolution = gl.getUniformLocation(program, "resolution");
            this.initBuffers();

            this.scheduleUpdate();
            this._time = 0;
        }
    },

    draw: function () {
        this.shader.use();
        this.shader.setUniformsForBuiltins();

        //
        // Uniforms
        //
        var frameSize = cc.view.getFrameSize();
        var visibleSize = cc.view.getVisibleSize();
        var retinaFactor = cc.view.getDevicePixelRatio();
        var position = this.getPosition();

        var centerx = position.x * frameSize.width / visibleSize.width * retinaFactor;
        var centery = position.y * frameSize.height / visibleSize.height * retinaFactor;
        this.shader.setUniformLocationF32(this.uniformCenter, centerx, centery);
        this.shader.setUniformLocationF32(this.uniformResolution, 256, 256);

        cc.glEnableVertexAttribs(cc.VERTEX_ATTRIB_FLAG_POSITION);

        // Draw fullscreen Square
        gl.bindBuffer(gl.ARRAY_BUFFER, this.squareVertexPositionBuffer);
        gl.vertexAttribPointer(cc.VERTEX_ATTRIB_POSITION, 2, gl.FLOAT, false, 0, 0);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

        gl.bindBuffer(gl.ARRAY_BUFFER, null);
    },

    update: function (dt) {
        this._time += dt;
    },

    initBuffers: function () {
        //
        // Square
        //
        var squareVertexPositionBuffer = this.squareVertexPositionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexPositionBuffer);
        vertices = [
            256, 256,
            0, 256,
            256, 0,
            0, 0
        ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
    }
});

var shaderLayer = cc.LayerGradient.extend({

    ctor: function () {
        this._super();

        //use opengl test
        if ('opengl' in cc.sys.capabilities) {
            var shaderNode = new ShaderNode(res.shader_heart_vsh, res.shader_heart_fsh);
            this.addChild(shaderNode);
            shaderNode.x = cc.winSize.width / 2;
            shaderNode.y = cc.winSize.height / 2;
        }

        //outline test
        if ('opengl' in cc.sys.capabilities) {
            if (cc.sys.isNative) {
                this.shader = new cc.GLProgram(res.shader_outline_mvp_vsh, res.shader_outline_fsh);
                this.shader.link();
                this.shader.updateUniforms();
            }
            else {
                this.shader = new cc.GLProgram(res.shader_outline_vsh, res.shader_outline_fsh);
                this.shader.addAttribute(cc.ATTRIBUTE_NAME_POSITION, cc.VERTEX_ATTRIB_POSITION);
                this.shader.addAttribute(cc.ATTRIBUTE_NAME_TEX_COORD, cc.VERTEX_ATTRIB_TEX_COORDS);
                this.shader.addAttribute(cc.ATTRIBUTE_NAME_COLOR, cc.VERTEX_ATTRIB_COLOR);

                this.shader.link();
                this.shader.updateUniforms();
                this.shader.use();
                this.shader.setUniformLocationWith1f(this.shader.getUniformLocationForName('u_threshold'), 1.75);
                this.shader.setUniformLocationWith3f(this.shader.getUniformLocationForName('u_outlineColor'), 100 / 255, 255 / 255, 255 / 255);
            }

            this.sprite = new cc.Sprite(res.head_png);
            this.sprite.attr({
                x: cc.winSize.width / 4,
                y: cc.winSize.height / 4
            });

            if (cc.sys.isNative) {
                var glProgram_state = cc.GLProgramState.getOrCreateWithGLProgram(this.shader);
                glProgram_state.setUniformFloat("u_threshold", 1.75);
                glProgram_state.setUniformVec3("u_outlineColor", {x: 100 / 255, y: 255 / 255, z: 255 / 255});
                this.sprite.setGLProgramState(glProgram_state);
            } else {
                this.sprite.shaderProgram = this.shader;
            }

            this.addChild(this.sprite);
        }

        //timer
        //this.schedule(this.animateShader, 1, cc.REPEAT_FOREVER, 0, null);

    },

    onEnter: function () {
        this._super();
    },

    onExit: function () {
        this._super();

        //this.unschedule(this.animateShader);
    },

    animateShader: function (dt) {
        console.log("animateShader");

    },
});


