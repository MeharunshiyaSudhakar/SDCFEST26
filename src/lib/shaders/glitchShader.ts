const glitchShader = {
    uniforms: {
        tDiffuse: { value: null },
        amount: { value: 0.08 },
        angle: { value: 0.02 },
        seed: { value: 0.02 },
        seed_x: { value: 0.02 },
        seed_y: { value: 0.02 },
        distortion_x: { value: 0.5 },
        distortion_y: { value: 0.6 },
        col_s: { value: 0.05 }
    },
    vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
    fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform float amount;
    uniform float angle;
    uniform float seed;
    uniform float seed_x;
    uniform float seed_y;
    uniform float distortion_x;
    uniform float distortion_y;
    uniform float col_s;
    varying vec2 vUv;

    float rand(vec2 co){
      return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
    }

    void main() {
      vec2 p = vUv;
      float xs = floor(gl_FragCoord.x / 0.5);
      float ys = floor(gl_FragCoord.y / 0.5);
      vec4 normal = texture2D(tDiffuse, p);
      
      if (rand(vec2(seed)) > 0.95) {
        if (rand(vec2(seed_x)) > 0.5) {
          p.y = fract(p.y + rand(vec2(seed_y)));
        } else {
          p.x = fract(p.x + rand(vec2(seed_y)));
        }
      }

      vec4 offset = texture2D(tDiffuse, p + vec2(amount * rand(vec2(seed)), 0.0));
      gl_FragColor = vec4(offset.r, normal.g, normal.b, normal.a);
    }
  `
};

export default glitchShader;
