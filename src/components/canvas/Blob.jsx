import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

// Ashima 3D simplex noise
const noise = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.0-g;vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;vec4 s1=floor(b1)*2.0+1.0;vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}`;

const vertexShader = /* glsl */ `
uniform float uTime;
uniform float uAmp;
uniform vec2 uMouse;
varying vec3 vNormal;
varying vec3 vView;
varying float vNoise;
${noise}

float field(vec3 p){
  vec3 q = p * 0.8 + vec3(uMouse * 0.5, uTime * 0.16);
  float n = snoise(q) * 0.75 + snoise(q * 1.9 + 4.0) * 0.08;
  return n;
}

vec3 displace(vec3 p){
  return p + normalize(p) * field(p) * uAmp;
}

void main(){
  vec3 p = displace(position);
  // Recompute the normal from two displaced neighbours
  vec3 t = normalize(cross(normal, vec3(0.0, 1.0, 0.001)));
  vec3 b = normalize(cross(normal, t));
  vec3 pt = displace(position + t * 0.01);
  vec3 pb = displace(position + b * 0.01);
  vec3 n = normalize(cross(pt - p, pb - p));
  if (dot(n, normal) < 0.0) n = -n;

  vNoise = field(position);
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  vNormal = normalize(normalMatrix * n);
  vView = normalize(-mv.xyz);
  gl_Position = projectionMatrix * mv;
}`;

const fragmentShader = /* glsl */ `
uniform float uTime;
varying vec3 vNormal;
varying vec3 vView;
varying float vNoise;

vec3 palette(float t){
  // Pearl → peach → vermilion → lilac → mint
  vec3 a = vec3(0.78, 0.66, 0.70);
  vec3 b = vec3(0.26, 0.28, 0.26);
  vec3 c = vec3(1.0, 1.0, 1.0);
  vec3 d = vec3(0.02, 0.28, 0.56);
  return a + b * cos(6.28318 * (c * t + d));
}

void main(){
  vec3 n = normalize(vNormal);
  float fres = pow(1.0 - max(dot(n, vView), 0.0), 2.2);
  vec3 col = palette(fres * 0.75 + vNoise * 0.55 + uTime * 0.03);

  vec3 L = normalize(vec3(-0.4, 0.8, 0.6));
  float diff = max(dot(n, L), 0.0);
  float spec = pow(max(dot(reflect(-L, n), vView), 0.0), 60.0);

  col *= 0.62 + diff * 0.5;
  col = mix(col, vec3(1.0, 0.30, 0.12), smoothstep(0.35, 0.75, vNoise) * 0.55);
  col += spec * 0.55 + fres * 0.18;
  gl_FragColor = vec4(col, 1.0);
}`;

const reduceMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function Blob({ detail }) {
  const mesh = useRef();
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uAmp: { value: 0.3 },
      uMouse: { value: new THREE.Vector2() },
    }),
    [],
  );

  useFrame((state, delta) => {
    const u = uniforms;
    if (!reduceMotion) u.uTime.value += delta;
    u.uMouse.value.lerp(state.pointer, 0.04);
    // Grow the wobble while the pointer moves
    const target = 0.28 + Math.min(state.pointer.length(), 1) * 0.1;
    u.uAmp.value = THREE.MathUtils.lerp(u.uAmp.value, target, 0.03);
    if (mesh.current) {
      mesh.current.rotation.y = THREE.MathUtils.lerp(
        mesh.current.rotation.y,
        state.pointer.x * 0.5 + u.uTime.value * 0.08,
        0.05,
      );
      mesh.current.rotation.x = THREE.MathUtils.lerp(
        mesh.current.rotation.x,
        -state.pointer.y * 0.35,
        0.05,
      );
    }
  });

  return (
    <mesh ref={mesh}>
      <icosahedronGeometry args={[1.05, detail]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  );
}

function Satellite({ position, color, size, speed }) {
  return (
    <Float speed={speed} rotationIntensity={0.6} floatIntensity={1.6}>
      <mesh position={position}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial color={color} roughness={0.25} metalness={0.1} />
      </mesh>
    </Float>
  );
}

const BlobCanvas = () => {
  const wrap = useRef();
  const [visible, setVisible] = useState(true);
  const isSmall = typeof window !== "undefined" && window.innerWidth < 768;

  // Stop rendering once the hero scrolls out of view
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    if (wrap.current) io.observe(wrap.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} className="w-full h-full">
      <Canvas
        frameloop={visible ? "always" : "never"}
        // Measure untransformed size; the wrapper is scaled by intro/scroll animations
        resize={{ offsetSize: true }}
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 5], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[-3, 4, 3]} intensity={1.4} />
        <Blob detail={isSmall ? 40 : 72} />
        <Satellite position={[1.3, 1.0, 0.4]} color="#FF4D1F" size={0.16} speed={2.2} />
        <Satellite position={[-1.4, -1.0, 0.6]} color="#111110" size={0.1} speed={1.6} />
        <Satellite position={[-1.25, 1.15, -0.6]} color="#B9A6FF" size={0.12} speed={1.9} />
      </Canvas>
    </div>
  );
};

export default BlobCanvas;
