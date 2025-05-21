"use client"

import { useRef, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, useGLTF, Environment, Text3D, Center } from "@react-three/drei"
import { motion } from "framer-motion-3d"
import { MotionConfig } from "framer-motion"

function Model({ position = [0, 0, 0], scale = 1, rotation = [0, 0, 0] }) {
  const { scene } = useGLTF("/assets/3d/duck.glb")
  const ref = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    ref.current.rotation.y = Math.sin(t / 4) / 4
    ref.current.position.y = Math.sin(t / 1.5) / 10
  })

  return <primitive ref={ref} object={scene} position={position} scale={scale} rotation={rotation} />
}

function FloatingText() {
  const ref = useRef()
  const { viewport } = useThree()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    ref.current.position.y = Math.sin(t / 2) * 0.5
  })

  return (
    <Center ref={ref} position={[0, 2, 0]}>
      <Text3D font="/fonts/Geist_Bold.json" size={1.5} height={0.2} curveSegments={12}>
        JOMIEZ
        <meshStandardMaterial color="#ff4d4d" />
      </Text3D>
    </Center>
  )
}

function Scene() {
  const [hover, setHover] = useState(false)
  const [click, setClick] = useState(false)

  return (
    <>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />

      <Environment preset="city" />

      <MotionConfig transition={{ type: "spring", bounce: 0.2, duration: 0.8 }}>
        <motion.group
          animate={{
            scale: click ? 1.1 : hover ? 1.05 : 1,
            rotateY: click ? Math.PI : 0,
          }}
          onPointerOver={() => setHover(true)}
          onPointerOut={() => setHover(false)}
          onClick={() => setClick(!click)}
        >
          <Model position={[0, -1, 0]} scale={2} />
        </motion.group>
      </MotionConfig>

      <FloatingText />

      <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 3} maxPolarAngle={Math.PI / 2} />
    </>
  )
}

export default function Hero3D() {
  return (
    <div className="h-screen w-full">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <Scene />
      </Canvas>
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="max-w-4xl text-center p-8 bg-black/30 backdrop-blur-md rounded-lg">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-[#ff4d4d]">J</span>
            <span className="text-white">OMIEZ</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/80">Web3 & AI Innovation Studio</p>
        </div>
      </div>
    </div>
  )
}
