'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Text, Float, Sparkles as DreiSparkles, MeshDistortMaterial } from '@react-three/drei';
import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Download, Sparkles, X } from 'lucide-react';
import * as THREE from 'three';

function AIBrain({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.rotation.x = mousePosition.y * 0.1;
      meshRef.current.rotation.z = mousePosition.x * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group>
        {/* Main brain sphere */}
        <Sphere ref={meshRef} args={[1.5, 64, 64]} position={[0, 0, 0]}>
          <MeshDistortMaterial
            color={hovered ? "#5FFFE5" : "#00F5D4"}
            attach="material"
            distort={hovered ? 0.4 : 0.3}
            speed={2}
            roughness={0.2}
            metalness={0.8}
          />
        </Sphere>

        {/* Outer glow ring */}
        <Sphere args={[1.8, 32, 32]} position={[0, 0, 0]}>
          <meshBasicMaterial
            color="#7B2CBF"
            wireframe
            transparent
            opacity={0.3}
          />
        </Sphere>

        {/* Orbiting particles */}
        {[...Array(8)].map((_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          const radius = 2.5;
          return (
            <Sphere key={i} args={[0.08, 16, 16]} position={[Math.cos(angle) * radius, Math.sin(angle) * radius, 0]}>
              <meshBasicMaterial color="#00F5D4" />
            </Sphere>
          );
        })}
      </group>
    </Float>
  );
}

function DataParticles() {
  const particles = [...Array(50)].map((_, i) => ({
    id: i,
    x: (Math.random() - 0.5) * 10,
    y: (Math.random() - 0.5) * 6,
    z: (Math.random() - 0.5) * 4,
    speed: Math.random() * 0.02 + 0.01,
  }));

  return (
    <DreiSparkles
      count={100}
      scale={12}
      size={2}
      speed={0.4}
      color="#00F5D4"
      opacity={0.6}
    />
  );
}

function Scene({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00F5D4" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#7B2CBF" />
      <AIBrain mousePosition={mousePosition} />
      <DataParticles />
      <OrbitControls enableZoom={false} enablePan={false} />
    </>
  );
}

export default function Hero3D() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showChat, setShowChat] = useState(false);
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({
      x: (e.clientX / window.innerWidth - 0.5) * 2,
      y: (e.clientY / window.innerHeight - 0.5) * 2,
    });
  };

  const quickActions = [
    { name: '管理后台', icon: LayoutDashboard, href: 'http://192.168.0.181:3100', external: true },
    { name: 'AI创作', icon: Sparkles, href: 'http://192.168.0.181:2026', external: true },
    { name: 'App下载', icon: Download, action: () => setDownloadModalOpen(true) },
  ];

  return (
    <div
      className="relative w-full h-screen"
      onMouseMove={handleMouseMove}
    >
      {/* 3D Canvas */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
          <Scene mousePosition={mousePosition} />
        </Canvas>
      </div>

      {/* Overlay Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <div className="text-center z-10 pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-white">AI沉浸式</span>
              <br />
              <span className="neon-text">研学系统</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-[var(--color-silver-dark)] mb-8 max-w-2xl mx-auto"
          >
            融合人工智能与研学教育，打造下一代沉浸式学习体验
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={() => setShowChat(true)}
              className="btn-primary text-lg"
            >
              体验 AI 助手
            </button>
            <a href="/cases" className="btn-secondary text-lg">
              查看案例
            </a>
          </motion.div>

          {/* Quick Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-8 flex flex-wrap gap-3 justify-center"
          >
            {quickActions.map((action) => (
              action.action ? (
                <button
                  key={action.name}
                  onClick={action.action}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-[var(--glass-border)] hover:border-[var(--color-neon-cyan)] text-sm text-[var(--color-silver)] hover:text-white transition-all group"
                >
                  <action.icon className="w-4 h-4 text-[var(--color-neon-cyan)]" />
                  <span>{action.name}</span>
                </button>
              ) : (
                <a
                  key={action.name}
                  href={action.href}
                  target={action.external ? '_blank' : undefined}
                  rel={action.external ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-[var(--glass-border)] hover:border-[var(--color-neon-cyan)] text-sm text-[var(--color-silver)] hover:text-white transition-all group"
                >
                  <action.icon className="w-4 h-4 text-[var(--color-neon-cyan)]" />
                  <span>{action.name}</span>
                  {action.external && (
                    <svg className="w-3 h-3 opacity-50 group-hover:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  )}
                </a>
              )
            ))}
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="absolute bottom-20 flex gap-8 md:gap-16"
        >
          {[
            { value: '500+', label: '合作学校' },
            { value: '1000+', label: '研学活动' },
            { value: '50000+', label: '服务学生' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[var(--color-neon-cyan)] neon-text">
                {stat.value}
              </div>
              <div className="text-sm text-[var(--color-silver-dark)]">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* AI Chat Modal */}
      <AnimatePresence>
        {showChat && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowChat(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-card w-full max-w-lg p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--color-neon-cyan)] flex items-center justify-center">
                    <span className="text-[var(--color-space-dark)] font-bold">AI</span>
                  </div>
                  <div>
                    <div className="font-semibold text-white">智能研学助手</div>
                    <div className="text-xs text-[var(--color-neon-cyan)]">在线</div>
                  </div>
                </div>
                <button
                  onClick={() => setShowChat(false)}
                  className="text-[var(--color-silver-dark)] hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="h-64 overflow-y-auto mb-4 space-y-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-[var(--color-tech-purple)] flex-shrink-0 flex items-center justify-center">
                    <span className="text-white text-xs">AI</span>
                  </div>
                  <div className="bg-[var(--glass-bg)] rounded-lg p-3 text-sm">
                    你好！我是AI研学助手，可以为你解答关于研学活动、课程设计、AI能力等方面的任何问题。请问有什么可以帮助你的？
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="输入你的问题..."
                  className="flex-1 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-lg px-4 py-2 text-sm text-white placeholder:text-[var(--color-silver-dark)] focus:outline-none focus:border-[var(--color-neon-cyan)]"
                />
                <button className="btn-primary px-4">
                  发送
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Download Modal */}
      <AnimatePresence>
        {downloadModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setDownloadModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-card w-full max-w-md p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[var(--color-neon-cyan)]/20 flex items-center justify-center">
                    <Download className="w-6 h-6 text-[var(--color-neon-cyan)]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">下载研学App</h3>
                    <p className="text-sm text-[var(--color-silver-dark)]">选择您的设备类型</p>
                  </div>
                </div>
                <button
                  onClick={() => setDownloadModalOpen(false)}
                  className="p-2 text-[var(--color-silver-dark)] hover:text-white rounded-lg hover:bg-white/5"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3">
                <a
                  href="#"
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-[var(--glass-border)] hover:border-[var(--color-neon-cyan)] transition-all group"
                >
                  <div className="w-12 h-12 rounded-lg bg-[var(--color-tech-purple)]/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-[var(--color-tech-purple-light)]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993.0001.5511-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.4124.4124 0 00-.5676.1521l-2.0225 3.503c-1.4655-.6682-3.1128-1.0524-4.8648-1.0524-1.752 0-3.3993.3842-4.8648 1.0524l-2.0225-3.503a.4124.4124 0 00-.5676-.1521.416.416 0 00-.1521.5676l1.9973 3.4592c-2.1698 1.1562-3.6457 3.0871-4.1018 5.3044h18.419c-.4561-2.2173-1.932-4.1482-4.1018-5.3044"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="text-white font-medium group-hover:text-[var(--color-neon-cyan)] transition-colors">Android 版本</div>
                    <div className="text-sm text-[var(--color-silver-dark)]">适用于 Android 8.0 及以上</div>
                  </div>
                  <svg className="w-5 h-5 text-[var(--color-silver-dark)] group-hover:text-[var(--color-neon-cyan)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>

                <a
                  href="#"
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-[var(--glass-border)] hover:border-[var(--color-neon-cyan)] transition-all group"
                >
                  <div className="w-12 h-12 rounded-lg bg-[var(--color-neon-cyan)]/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-[var(--color-neon-cyan)]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="text-white font-medium group-hover:text-[var(--color-neon-cyan)] transition-colors">iOS 版本</div>
                    <div className="text-sm text-[var(--color-silver-dark)]">适用于 iOS 13.0 及以上</div>
                  </div>
                  <svg className="w-5 h-5 text-[var(--color-silver-dark)] group-hover:text-[var(--color-neon-cyan)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-[var(--color-silver-dark)] text-sm"
        >
          ↓ 向下滚动
        </motion.div>
      </motion.div>
    </div>
  );
}