import vertexShader from "./vertex/default";
import fragmentShader from "./fragment/default";
import { VideoTexture, LinearFilter, RGBFormat } from "three";

export default function(source) {
  const texture = new VideoTexture(source);
  texture.minFilter = LinearFilter;
  texture.magFilter = LinearFilter;
  texture.format = RGBFormat;

  const shader = {
    uniforms: {
      texture: {
        type: "t",
        value: texture
      }
    },
    vertexShader,
    fragmentShader
  };

  return shader;
}
