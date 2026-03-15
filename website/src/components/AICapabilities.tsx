'use client';

import { motion } from 'framer-motion';
import { Brain, BarChart3, MessageSquare, Sparkles, ArrowRight } from 'lucide-react';

const capabilities = [
  {
    icon: Brain,
    title: '智能剧本生成',
    description: '基于AI大模型，自动生成符合教学目标的研学剧本，支持多主题定制',
    color: 'var(--color-neon-cyan)',
  },
  {
    icon: BarChart3,
    title: '实时数据分析',
    description: '实时收集学生学习数据，生成个性化分析报告，辅助教学决策',
    color: 'var(--color-tech-purple)',
  },
  {
    icon: MessageSquare,
    title: 'AI对话辅导',
    description: '智能AI助手随时随地解答学生问题，提供个性化学习辅导',
    color: 'var(--color-alert-orange)',
  },
  {
    icon: Sparkles,
    title: '个性化推荐',
    description: '根据学生兴趣和学习进度，智能推荐最适合的研学内容',
    color: 'var(--color-neon-cyan)',
  },
];

export default function AICapabilities() {
  return (
    <section className="py-20 px-6 gradient-hero">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-white">AI</span>
            <span className="neon-text-purple">核心能力</span>
          </h2>
          <p className="text-[var(--color-silver-dark)] max-w-2xl mx-auto">
            融合前沿人工智能技术，为研学教育带来革命性体验
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {capabilities.map((cap, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="glass-card p-6 group"
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                style={{ backgroundColor: `${cap.color}20` }}
              >
                <cap.icon className="w-7 h-7" style={{ color: cap.color }} />
              </div>

              <h3 className="text-lg font-semibold text-white mb-2">{cap.title}</h3>
              <p className="text-sm text-[var(--color-silver-dark)] mb-4">
                {cap.description}
              </p>

              <a
                href="/solutions"
                className="inline-flex items-center gap-1 text-sm font-medium transition-colors group-hover:text-[var(--color-neon-cyan)]"
                style={{ color: cap.color }}
              >
                了解更多 <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}