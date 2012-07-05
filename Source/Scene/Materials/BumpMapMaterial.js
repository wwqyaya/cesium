/*global define*/
define([
        '../../Core/DeveloperError',
        './replaceMaterialChannels',
        '../../Shaders/Materials/BumpMapMaterial'
    ], function(
        DeveloperError,
        replaceMaterialChannels,
        ShadersBumpMapMaterial) {
    "use strict";

    /**
     *
     * The bump map is a grayscale texture where differences in
     * in luminosity between pixels alter the surface normal.
     *
     * @name BumpMapMaterial
     * @constructor
     */
    function BumpMapMaterial(template) {
        var t = template || {};

        /**
         * 2D grayscale bump map texture.
         */
        this.texture = t.texture;

        /**
         * Number of texture repeats in the x direction.
         *
         * type {Number}
         */
        this.sRepeat = t.sRepeat || 1.0;

        /**
         * Number of texture repeats in the y direction.
         *
         * type {Number}
         */
        this.tRepeat = t.tRepeat || 1.0;

        /**
         * Channels used for sampling the texture.
         *
         * type {String}
         */
        this.channels = t.channels || 'r';
        this._shaderSource = replaceMaterialChannels(ShadersBumpMapMaterial, 'bump_map_material_channels', this.channels, 1);

        var that = this;
        this._uniforms = {
            u_texture : function() {
                if (typeof that.texture === 'undefined') {
                    throw new DeveloperError("Bump map texture required.");
                }
                return that.texture;
            },
            u_repeat : function() {
                return {
                    x : that.sRepeat,
                    y : that.tRepeat
                };
            }
        };
    }

    BumpMapMaterial.prototype._getShaderSource = function() {
        return "#line 0\n" +
                this._shaderSource;
    };

    return BumpMapMaterial;
});

