import vertexShader from "./vertex/default";
import fragmentShader from "./fragment/sobel";
import { VideoTexture, LinearFilter, RGBFormat } from "three";

export default function createShader(source, textureWidth, textureHeight) {
  const sourceTexture = new VideoTexture(source);
  sourceTexture.minFilter = LinearFilter;
  sourceTexture.magFilter = LinearFilter;
  sourceTexture.format = RGBFormat;

  return {
    uniforms: {
      texture: {
        type: "t",
        value: sourceTexture
      },
      width: {
        type: "f",
        value: 1.0 * textureWidth
      },
      height: {
        type: "f",
        value: 1.0 * textureHeight
      }
    },
    vertexShader,
    fragmentShader
  };
}
