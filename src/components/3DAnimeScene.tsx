import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';

interface AnimatedBoxProps {
  position: [number, number, number];
  color: string;
}

const AnimatedBox: React.FC<AnimatedBoxProps> = ({ position, color }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const scrollRef = useRef(0); // Create a ref to store the scroll position

  const { scale, rotation } = useSpring({
    scale: scrollRef.current * 2 + 1,
    rotation: scrollRef.current * Math.PI * 2,
    config: { mass: 1, tension: 170, friction: 26 },
  });

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + scrollRef.current * 2;
    }
  });

  return (
    <animated.mesh ref={meshRef} position={position} scale={scale} rotation-y={rotation}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} />
    </animated.mesh>
  );
};

const AnimeScene3D: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (canvasRef.current) {
        // Update the scroll position ref
        const scrollY = window.scrollY;
        (canvasRef.current as any).__r3f.scroll.current = scrollY;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Canvas ref={canvasRef} className="w-full h-[50vh]">
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <AnimatedBox position={[-1.5, 0, 0]} color="hotpink" />
      <AnimatedBox position={[1.5, 0, 0]} color="cyan" />
      <Text
        position={[0, 2, 0]}
        fontSize={0.5}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        AnimeRec
      </Text>
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  );
};

export default AnimeScene3D;
