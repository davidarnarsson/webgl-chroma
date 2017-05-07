import fragmentShader from "./fragment/chroma";
import vertexShader from "./vertex/default";
import { VideoTexture, LinearFilter, RGBFormat, Vector4 } from "three";

export default function createShader(source, replacement, [r, g, b, a]) {
  
  const sourceTexture = new VideoTexture(source);
  sourceTexture.minFilter = LinearFilter;
  sourceTexture.magFilter = LinearFilter;
  sourceTexture.format = RGBFormat;

  const replacementTexture = new VideoTexture(replacement);
  replacementTexture.minFilter = LinearFilter;
  replacementTexture.magFilter = LinearFilter;
  replacementTexture.format = RGBFormat;

  const chromaKey = new Vector4(r, g, b, a);
  return {
    uniforms: {
      video: {
        type: "t",
        value: sourceTexture
      },
      replacement: {
        type: "t",
        value: replacementTexture
      },
      chroma: {
        type: "v4",
        value: chromaKey
      }
    },
    vertexShader,
    fragmentShader
  };
}
