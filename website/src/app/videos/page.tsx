'use client';

import { motion } from 'framer-motion';
import { Play, X } from 'lucide-react';
import { useState } from 'react';
import ReactPlayer from 'react-player';

const videos = [
  {
    id: 1,
    title: 'AI研学系统发布会',
    description: '全面展示AI研学系统的核心功能与创新技术',
    duration: '15:30',
    thumbnail: '🎬',
    category: '产品发布',
  },
  {
    id: 2,
    title: '研学活动实况记录',
    description: '某中学研学活动全程记录，展现系统实际应用效果',
    duration: '08:45',
    thumbnail: '📹',
    category: '活动记录',
  },
  {
    id: 3,
    title: 'AI剧本生成演示',
    description: '演示如何通过AI快速生成定制化研学剧本',
    duration: '05:20',
    thumbnail: '🎥',
    category: '功能演示',
  },
  {
    id: 4,
    title: '学生使用体验',
    description: '采访使用系统的学生们，了解他们的真实体验',
    duration: '12:15',
    thumbnail: '🎤',
    category: '用户采访',
  },
  {
    id: 5,
    title: '研学基地合作案例',
    description: '与XX博物馆合作案例分享',
    duration: '10:00',
    thumbnail: '🏛️',
    category: '合作案例',
  },
  {
    id: 6,
    title: '技术架构解析',
    description: '深入解析AI研学系统的技术架构与AI能力',
    duration: '18:30',
    thumbnail: '💻',
    category: '技术分享',
  },
];

const categories = ['全部', '产品发布', '活动记录', '功能演示', '用户采访', '合作案例', '技术分享'];

export default function VideosPage() {
  const [selectedVideo, setSelectedVideo] = useState<typeof videos[0] | null>(null);
  const [playing, setPlaying] = useState(false);

  return (
    <div className="pt-24 pb-20">
      {/* Hero */}
      <section className="py-20 px-6 gradient-hero">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold mb-6"
          >
            <span className="text-white">活动</span>
            <span className="neon-text">视频</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-[var(--color-silver-dark)]"
          >
            观看研学活动视频，了解系统的实际应用效果
          </motion.p>
        </div>
      </section>

      {/* Featured Video */}
      <section className="px-6">
        <div className="max-w-7xl mx-auto mb-12">
          <div className="glass-card overflow-hidden">
            <div className="aspect-video bg-[var(--color-space-dark-2)] flex items-center justify-center relative">
              {/* Placeholder for featured video */}
              <div className="text-center">
                <span className="text-8xl mb-4 block">🎬</span>
                <p className="text-[var(--color-silver-dark)]">Featured Video Placeholder</p>
                <p className="text-sm text-[var(--color-silver-dark)] mt-2">
                  视频文件放置目录: /public/videos/
                </p>
              </div>
              {/* Play button overlay */}
              <button className="absolute w-20 h-20 rounded-full bg-[var(--color-neon-cyan)]/20 flex items-center justify-center hover:bg-[var(--color-neon-cyan)]/40 transition-colors">
                <Play className="w-10 h-10 text-[var(--color-neon-cyan)] ml-1" />
              </button>
            </div>
            <div className="p-6">
              <span className="px-3 py-1 bg-[var(--color-tech-purple)] rounded-full text-xs text-white">
                精选
              </span>
              <h2 className="text-2xl font-bold text-white mt-3">
                {videos[0].title}
              </h2>
              <p className="text-[var(--color-silver-dark)] mt-2">
                {videos[0].description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {categories.map((cat, i) => (
              <button
                key={i}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  i === 0
                    ? 'bg-[var(--color-neon-cyan)] text-[var(--color-space-dark)]'
                    : 'glass-card text-[var(--color-silver)] hover:text-white hover:border-[var(--color-neon-cyan)]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Videos Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video, i) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -5 }}
                onClick={() => {
                  setSelectedVideo(video);
                  setPlaying(true);
                }}
                className="glass-card overflow-hidden group cursor-pointer"
              >
                {/* Thumbnail */}
                <div className="aspect-video bg-[var(--color-space-dark-2)] flex items-center justify-center relative">
                  <span className="text-5xl">{video.thumbnail}</span>
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-[var(--color-neon-cyan)] flex items-center justify-center">
                      <Play className="w-6 h-6 text-[var(--color-space-dark)] ml-1" />
                    </div>
                  </div>
                  <span className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 rounded text-xs text-white">
                    {video.duration}
                  </span>
                </div>

                {/* Content */}
                <div className="p-4">
                  <span className="px-2 py-1 bg-[var(--color-tech-purple)]/30 rounded text-xs text-[var(--color-tech-purple-light)]">
                    {video.category}
                  </span>
                  <h3 className="text-lg font-semibold text-white mt-2 group-hover:text-[var(--color-neon-cyan)] transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-sm text-[var(--color-silver-dark)] mt-1 line-clamp-2">
                    {video.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Video Placeholder Note */}
          <div className="mt-12 p-6 glass-card text-center">
            <p className="text-[var(--color-silver-dark)]">
              📁 视频文件存放位置: <code className="text-[var(--color-neon-cyan)]">/public/videos/</code>
            </p>
            <p className="text-sm text-[var(--color-silver-dark)] mt-2">
              请将视频文件放入此目录，系统将自动识别并显示
            </p>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {selectedVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => {
            setSelectedVideo(null);
            setPlaying(false);
          }}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            className="glass-card w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-video bg-[var(--color-space-dark-2)] flex items-center justify-center relative">
              <div className="text-center">
                <span className="text-6xl mb-4 block">{selectedVideo.thumbnail}</span>
                <p className="text-[var(--color-silver-dark)]">
                  视频文件: /public/videos/demo.mp4
                </p>
                <p className="text-sm text-[var(--color-silver-dark)] mt-2">
                  将视频文件放入 public/videos/ 目录后自动播放
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setPlaying(!playing);
                }}
                className="absolute w-20 h-20 rounded-full bg-[var(--color-neon-cyan)]/20 flex items-center justify-center hover:bg-[var(--color-neon-cyan)]/40 transition-colors"
              >
                {playing ? (
                  <span className="text-[var(--color-neon-cyan)] text-2xl">⏸</span>
                ) : (
                  <Play className="w-10 h-10 text-[var(--color-neon-cyan)] ml-1" />
                )}
              </button>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-white">{selectedVideo.title}</h3>
                  <p className="text-[var(--color-silver-dark)] mt-2">{selectedVideo.description}</p>
                </div>
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="p-2 hover:bg-[var(--glass-hover)] rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-[var(--color-silver-dark)]" />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}