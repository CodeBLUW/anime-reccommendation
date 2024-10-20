import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Box, OrbitControls, Text } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';

const AnimatedBox = ({ position, color }) => {
  const meshRef = useRef();
  const { scrollYProgress } = useThree();

  const { scale, rotation } = useSpring({
    scale: scrollYProgress.get() * 2 + 1,
    rotation: scrollYProgress.get() * Math.PI * 2,
  });

  useFrame(() => {
    const scrollProgress = scrollYProgress.get();
    meshRef.current.position.y = position[1] + scrollProgress * 2;
  });

  return (
    <animated.mesh ref={meshRef} position={position} scale={scale} rotation-y={rotation}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} />
    </animated.mesh>
  );
};

const AnimeScene3D = () => {
  const canvasRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      if (canvasRef.current) {
        canvasRef.current.__r3f.scroll.current = window.scrollY;
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