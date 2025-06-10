import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';

const ConcaveBackground = () => {
  const materialRef = useRef();
  const { size } = useThree();

  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      side: THREE.BackSide,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(size.width, size.height) },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        #ifdef GL_ES
        precision mediump float;
        #endif

        uniform vec2 uResolution;
        uniform float uTime;
        varying vec2 vUv;

        float random (in vec2 _st) {
          return fract(sin(dot(_st.xy, vec2(12.9898,78.233))) * 43758.5453123);
        }

        float noise (in vec2 _st) {
          vec2 i = floor(_st);
          vec2 f = fract(_st);
          float a = random(i);
          float b = random(i + vec2(1.0, 0.0));
          float c = random(i + vec2(0.0, 1.0));
          float d = random(i + vec2(1.0, 1.0));
          vec2 u = f * f * (3.0 - 2.0 * f);
          return mix(a, b, u.x) +
                 (c - a) * u.y * (1.0 - u.x) +
                 (d - b) * u.x * u.y;
        }

        #define NUM_OCTAVES 5

        float fbm (in vec2 _st) {
          float v = 0.0;
          float a = 0.5;
          vec2 shift = vec2(100.0);
          mat2 rot = mat2(cos(0.5), sin(0.5),
                          -sin(0.5), cos(0.5));
          for (int i = 0; i < NUM_OCTAVES; ++i) {
            v += a * noise(_st);
            _st = rot * _st * 2.0 + shift;
            a *= 0.5;
          }
          return v;
        }

        void main() {
          vec2 st = gl_FragCoord.xy / uResolution.xy * 3.0;
          vec3 color = vec3(0.0);

          vec2 q = vec2(0.0);
          q.x = fbm(st + 0.00 * uTime);
          q.y = fbm(st + vec2(1.0));

          vec2 r = vec2(0.0);
          r.x = fbm(st + 1.0 * q + vec2(1.7,9.2) + 0.15 * uTime);
          r.y = fbm(st + 1.0 * q + vec2(8.3,2.8) + 0.126 * uTime);

          float f = fbm(st + r);

          // Custom earthy tones
          vec3 dust1 = vec3(0.65, 0.62, 0.44);  // #A69D6F
          vec3 dust2 = vec3(0.51, 0.41, 0.22);  // #816838
          vec3 wood1 = vec3(0.37, 0.28, 0.14);  // #5E4723

          color = mix(dust1, dust2, clamp((f*f)*4.0, 0.0, 1.0));
          color = mix(color, wood1, clamp(length(q), 0.0, 1.0));

          gl_FragColor = vec4((f*f*f + 0.6*f*f + 0.5*f) * color, 1.0);
        }
      `,
    });
  }, [size]);

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  return (
    <mesh scale={50} rotation={[0, 0, 0]}>
      <sphereGeometry args={[5, 64, 64]} />
      <primitive ref={materialRef} object={shaderMaterial} attach="material" />
    </mesh>
  );
};

export default ConcaveBackground;
