import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei';
import {
  Physics,
  RigidBody,
  BallCollider,
  CuboidCollider,
  useRopeJoint,
  useSphericalJoint,
  RapierRigidBody,
} from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import * as THREE from 'three';

extend({ MeshLineGeometry, MeshLineMaterial });

const CARD_GLB_URL = '/assets/lanyard/card.glb';
const EMPTY_TEXTURE_URL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORUSCYII=';

// ── Generate Lanyard Ribbon Texture (Repeating Text) ─────────────────────────
function createRibbonTexture(text = 'ROHIT DUBEY • FULL-STACK • AI ENGINEER • '): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    // Ribbon background
    ctx.fillStyle = '#031714';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Subtle border lines
    ctx.fillStyle = '#00F5A0';
    ctx.fillRect(0, 0, canvas.width, 6);
    ctx.fillRect(0, canvas.height - 6, canvas.width, 6);

    // Text pattern
    ctx.font = 'bold 36px "Arial Black", sans-serif';
    ctx.fillStyle = '#00F5A0';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';

    const textWidth = ctx.measureText(text).width || 400;
    for (let x = 0; x < canvas.width + textWidth; x += textWidth) {
      ctx.fillText(text, x, canvas.height / 2);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(3, 1);
  texture.anisotropy = 16;
  return texture;
}

// ── Generate ID Card Front & Back Canvas Texture ─────────────────────────────
function generateCardCanvasTexture(avatarSrc = '/rohit.jpg'): Promise<string> {
  return new Promise((resolve) => {
    const resolution = 1024;
    const canvas = document.createElement('canvas');
    canvas.width = resolution;
    canvas.height = resolution;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      resolve('');
      return;
    }

    const half = resolution / 2;

    // Backgrounds
    // Left Half = Front of Card
    ctx.fillStyle = '#031714';
    ctx.fillRect(0, 0, half, resolution);
    // Right Half = Back of Card
    ctx.fillStyle = '#021412';
    ctx.fillRect(half, 0, half, resolution);

    // Border highlights
    ctx.strokeStyle = 'rgba(0, 245, 160, 0.4)';
    ctx.lineWidth = 12;
    ctx.strokeRect(10, 10, half - 20, resolution - 20);
    ctx.strokeRect(half + 10, 10, half - 20, resolution - 20);

    // Accent header pill (Front)
    ctx.fillStyle = '#00F5A0';
    ctx.fillRect(40, 50, half - 80, 50);
    ctx.font = '900 24px "Arial Black", sans-serif';
    ctx.fillStyle = '#031714';
    ctx.textAlign = 'center';
    ctx.fillText('VERIFIED DEVELOPER', half / 2, 84);

    // Name & Title (Front)
    ctx.font = '900 42px "Arial Black", sans-serif';
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText('ROHIT DUBEY', half / 2, 590);

    ctx.font = 'bold 24px sans-serif';
    ctx.fillStyle = '#00F5A0';
    ctx.fillText('Full-Stack & AI Engineer', half / 2, 635);

    ctx.font = 'bold 18px monospace';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.fillText('ID: 2026-RD-0903 • INDIA', half / 2, 675);

    // Tech Tags (Front)
    ctx.font = 'bold 18px sans-serif';
    ctx.fillStyle = 'rgba(0, 245, 160, 0.8)';
    ctx.fillText('REACT • THREE.JS • NODE • PYTHON', half / 2, 725);

    // --- Back Side Content ---
    ctx.font = '900 36px "Arial Black", sans-serif';
    ctx.fillStyle = '#00F5A0';
    ctx.fillText('PORTFOLIO 2026', half + half / 2, 120);

    ctx.font = 'bold 22px sans-serif';
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText('BUILDING THE FUTURE', half + half / 2, 170);

    // Back stats / info lines
    const drawBackLine = (label: string, value: string, y: number) => {
      ctx.font = 'bold 18px monospace';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.textAlign = 'left';
      ctx.fillText(label, half + 50, y);
      ctx.fillStyle = '#00F5A0';
      ctx.textAlign = 'right';
      ctx.fillText(value, half + half - 50, y);
    };

    drawBackLine('STATUS', 'AVAILABLE FOR WORK', 280);
    drawBackLine('ROLE', 'FULL-STACK / AI', 340);
    drawBackLine('EXPERIENCE', '3+ YEARS', 400);
    drawBackLine('LOCATION', 'INDIA (REMOTE)', 460);

    // Decorative Barcode on Back
    ctx.fillStyle = '#00F5A0';
    const barcodeY = 600;
    const barcodeXStart = half + 60;
    const barcodeWidth = half - 120;
    let currentX = barcodeXStart;
    while (currentX < barcodeXStart + barcodeWidth) {
      const w = Math.random() > 0.5 ? 8 : 4;
      ctx.fillRect(currentX, barcodeY, w, 80);
      currentX += w + (Math.random() > 0.5 ? 6 : 3);
    }

    ctx.font = 'bold 16px monospace';
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    ctx.textAlign = 'center';
    ctx.fillText('https://github.com/anakinskywalker0903', half + half / 2, barcodeY + 115);

    // Load avatar image for front card
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      ctx.save();
      // Circular avatar clip on front side
      const avatarSize = 300;
      const avatarX = half / 2;
      const avatarY = 320;

      ctx.beginPath();
      ctx.arc(avatarX, avatarY, avatarSize / 2, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();

      ctx.drawImage(
        img,
        avatarX - avatarSize / 2,
        avatarY - avatarSize / 2,
        avatarSize,
        avatarSize
      );
      ctx.restore();

      // Outer glow ring around avatar
      ctx.beginPath();
      ctx.arc(avatarX, avatarY, avatarSize / 2 + 4, 0, Math.PI * 2);
      ctx.strokeStyle = '#00F5A0';
      ctx.lineWidth = 8;
      ctx.stroke();

      finishCanvas();
    };

    img.onerror = () => {
      finishCanvas();
    };

    img.src = avatarSrc;

    function finishCanvas() {
      // Flip entire canvas vertically for Three.js UV mapping
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;
      const tempCtx = tempCanvas.getContext('2d');
      if (tempCtx) {
        tempCtx.scale(1, -1);
        tempCtx.translate(0, -canvas.height);
        tempCtx.drawImage(canvas, 0, 0);
        resolve(tempCanvas.toDataURL());
      } else {
        resolve(canvas.toDataURL());
      }
    }
  });
}

// ── Band & Card Physics Scene ────────────────────────────────────────────────
function Band({ cardImageSrc }: { cardImageSrc: string }) {
  const band = useRef<THREE.Mesh>(null!);
  const fixed = useRef<RapierRigidBody>(null!);
  const j1 = useRef<RapierRigidBody>(null!);
  const j2 = useRef<RapierRigidBody>(null!);
  const j3 = useRef<RapierRigidBody>(null!);
  const card = useRef<RapierRigidBody>(null!);

  const vec = useMemo(() => new THREE.Vector3(), []);
  const ang = useMemo(() => new THREE.Vector3(), []);
  const rot = useMemo(() => new THREE.Vector3(), []);
  const dir = useMemo(() => new THREE.Vector3(), []);

  const segmentProps = {
    type: 'dynamic' as const,
    canSleep: true,
    colliders: false as const,
    angularDamping: 4,
    linearDamping: 4,
  };

  const { nodes } = useGLTF(CARD_GLB_URL) as any;
  const cardTexture = useTexture(cardImageSrc || EMPTY_TEXTURE_URL);

  const ribbonTexture = useMemo(() => createRibbonTexture(), []);

  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ])
  );

  const [dragged, setDragged] = useState<false | THREE.Vector3>(false);
  const [hovered, setHovered] = useState(false);

  // Rope joints between physics bodies
  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.4, 0]]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => {
        document.body.style.cursor = 'auto';
      };
    }
  }, [hovered, dragged]);

  useEffect(() => {
    if (cardTexture) {
      cardTexture.wrapS = cardTexture.wrapT = THREE.RepeatWrapping;
      cardTexture.anisotropy = 16;
    }
  }, [cardTexture]);

  useFrame((state, delta) => {
    if (dragged && card.current) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));

      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z,
      });
    }

    if (fixed.current && card.current && band.current) {
      [j1, j2].forEach((ref: any) => {
        if (!ref.current) return;
        if (!ref.current.lerped) {
          ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        }
        const clampedDistance = Math.max(
          0.1,
          Math.min(1, ref.current.lerped.distanceTo(ref.current.translation()))
        );
        ref.current.lerped.lerp(
          ref.current.translation(),
          delta * (0 + clampedDistance * 50)
        );
      });

      if (j3.current && j2.current && j1.current) {
        curve.points[0].copy(j3.current.translation());
        curve.points[1].copy((j2.current as any).lerped || j2.current.translation());
        curve.points[2].copy((j1.current as any).lerped || j1.current.translation());
        curve.points[3].copy(fixed.current.translation());
        (band.current.geometry as any).setPoints(curve.getPoints(32));
      }

      ang.copy(card.current.angvel() as any);
      rot.copy(card.current.rotation() as any);
      card.current.setAngvel(
        { x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z },
        true
      );
    }
  });

  curve.curveType = 'chordal';

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>

        <RigidBody
          position={[2, 0, 0]}
          ref={card}
          {...segmentProps}
          type={dragged ? 'kinematicPosition' : 'dynamic'}
        >
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            onPointerUp={(e) => {
              (e.target as HTMLElement).releasePointerCapture(e.pointerId);
              setDragged(false);
              e.stopPropagation();
            }}
            onPointerDown={(e) => {
              (e.target as HTMLElement).setPointerCapture(e.pointerId);
              if (card.current) {
                const currentTrans = card.current.translation();
                setDragged(
                  new THREE.Vector3().copy(e.point).sub(vec.copy(currentTrans as any))
                );
              }
              e.stopPropagation();
            }}
          >
            {/* Card Mesh */}
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial
                color="#FFFFFF"
                map={cardTexture}
                clearcoat={1}
                clearcoatRoughness={0.15}
                roughness={0.8}
                metalness={0.5}
              />
            </mesh>

            {/* Clip & Clamp Metal Meshes */}
            <mesh geometry={nodes.clip.geometry}>
              <meshPhysicalMaterial
                color="#00F5A0"
                roughness={0.2}
                metalness={0.9}
              />
            </mesh>
            <mesh geometry={nodes.clamp.geometry}>
              <meshPhysicalMaterial
                color="#00F5A0"
                roughness={0.2}
                metalness={0.9}
              />
            </mesh>
          </group>
        </RigidBody>
      </group>

      {/* Strap / Band Line Mesh */}
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="#00F5A0"
          depthTest={false}
          resolution={[1000, 1000]}
          useMap={true}
          map={ribbonTexture}
          repeat={[-4, 1]}
          lineWidth={1.1}
        />
      </mesh>
    </>
  );
}

useGLTF.preload(CARD_GLB_URL);

// ── Main Exported Lanyard Component ─────────────────────────────────────────
export const Lanyard: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [isDesktop, setIsDesktop] = useState<boolean>(() => typeof window !== 'undefined' && window.innerWidth >= 1024);
  const [cardImageUrl, setCardImageUrl] = useState<string>('');

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;
    generateCardCanvasTexture('/rohit.jpg').then((dataUrl) => {
      setCardImageUrl(dataUrl);
    });
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <div className={`w-full h-full min-h-[450px] relative pointer-events-auto ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 14], fov: 25 }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
          preserveDrawingBuffer: false,
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(new THREE.Color(0x000000), 0);
          const canvasEl = gl.domElement;
          const handleContextLost = (event: Event) => {
            event.preventDefault();
            console.warn('Lanyard: WebGL context lost.');
          };
          canvasEl.addEventListener('webglcontextlost', handleContextLost, false);
        }}
        style={{ width: '100%', height: '100%', touchAction: 'none' }}
      >
        <React.Suspense fallback={null}>
          <ambientLight intensity={Math.PI * 1.2} />
          <Physics gravity={[0, -35, 0]} timeStep={1 / 60}>
            <Band cardImageSrc={cardImageUrl} />
          </Physics>
          <Environment blur={0.75}>
            <Lightformer
              intensity={2}
              color="#00F5A0"
              position={[0, -1, 5]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={3}
              color="#FFFFFF"
              position={[-1, -1, 1]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={3}
              color="#00F5A0"
              position={[1, 1, 1]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
          </Environment>
        </React.Suspense>
      </Canvas>
    </div>
  );
};

export default Lanyard;
