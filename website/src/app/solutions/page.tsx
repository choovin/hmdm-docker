'use client';

import { motion } from 'framer-motion';
import { School, Landmark, ArrowRight, Check } from 'lucide-react';
import { useState } from 'react';

const solutions = [
  {
    id: 'school',
    icon: School,
    title: '学校版',
    subtitle: 'K12教育解决方案',
    description: '专为中小学校设计的研学系统，完美契合教育部综合素质评价要求',
    features: [
      '课程标准对齐',
      '班级管理集成',
      '综合素质评价',
      '家校互通平台',
      '分层教学支持',
    ],
    suitable: '中小学校、培训机构',
  },
  {
    id: 'cultural',
    icon: Landmark,
    title: '文旅版',
    subtitle: '文旅基地解决方案',
    description: '为博物馆、科技馆、景区等文旅场所打造的沉浸式研学体验',
    features: [
      '场馆地图导航',
      '智能讲解系统',
      '文创商品推荐',
      '客流数据分析',
      '多语言支持',
    ],
    suitable: '博物馆、科技馆、景区',
  },
];

const comparison = [
  { feature: 'AI智能剧本生成', school: true, cultural: true },
  { feature: 'LBS位置定位', school: true, cultural: true },
  { feature: '实时数据分析看板', school: true, cultural: true },
  { feature: '班级/团队管理', school: true, cultural: false },
  { feature: '综合素质评价', school: true, cultural: false },
  { feature: '场馆地图导航', school: false, cultural: true },
  { feature: '智能讲解系统', school: false, cultural: true },
  { feature: '文创商品推荐', school: false, cultural: true },
];

export default function SolutionsPage() {
  const [activeTab, setActiveTab] = useState<'cards' | 'compare'>('cards');

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
            <span className="text-white">解决</span>
            <span className="neon-text">方案</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-[var(--color-silver-dark)]"
          >
            针对不同客户需求，提供定制化的研学解决方案
          </motion.p>
        </div>
      </section>

      {/* Tab Switcher */}
      <section className="px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center gap-4 mb-12">
            <button
              onClick={() => setActiveTab('cards')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'cards'
                  ? 'bg-[var(--color-neon-cyan)] text-[var(--color-space-dark)]'
                  : 'glass-card text-[var(--color-silver)] hover:text-white'
              }`}
            >
              方案介绍
            </button>
            <button
              onClick={() => setActiveTab('compare')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'compare'
                  ? 'bg-[var(--color-neon-cyan)] text-[var(--color-space-dark)]'
                  : 'glass-card text-[var(--color-silver)] hover:text-white'
              }`}
            >
              功能对比
            </button>
          </div>

          {activeTab === 'cards' && (
            <div className="grid md:grid-cols-2 gap-8">
              {solutions.map((solution, i) => (
                <motion.div
                  key={solution.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card p-8"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-xl bg-[var(--color-neon-cyan)]/20 flex items-center justify-center">
                      <solution.icon className="w-8 h-8 text-[var(--color-neon-cyan)]" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{solution.title}</h3>
                      <p className="text-sm text-[var(--color-neon-cyan)]">{solution.subtitle}</p>
                    </div>
                  </div>

                  <p className="text-[var(--color-silver-dark)] mb-6">
                    {solution.description}
                  </p>

                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-white mb-3">核心功能</h4>
                    <ul className="grid grid-cols-2 gap-2">
                      {solution.features.map((feature, j) => (
                        <li key={j} className="flex items-center gap-2 text-sm text-[var(--color-silver-dark)]">
                          <Check className="w-4 h-4 text-[var(--color-neon-cyan)]" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-[var(--glass-border)]">
                    <span className="text-sm text-[var(--color-silver-dark)]">
                      适用: {solution.suitable}
                    </span>
                    <a href="/contact" className="inline-flex items-center gap-1 text-[var(--color-neon-cyan)] hover:text-white transition-colors">
                      咨询详情 <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === 'compare' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass-card overflow-hidden"
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[var(--glass-border)]">
                      <th className="text-left p-4 text-white font-semibold">功能</th>
                      <th className="text-center p-4 text-white font-semibold">学校版</th>
                      <th className="text-center p-4 text-white font-semibold">文旅版</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparison.map((item, i) => (
                      <tr key={i} className="border-b border-[var(--glass-border)]">
                        <td className="p-4 text-[var(--color-silver-dark)]">{item.feature}</td>
                        <td className="p-4 text-center">
                          {item.school ? (
                            <Check className="w-5 h-5 text-[var(--color-neon-cyan)] mx-auto" />
                          ) : (
                            <span className="text-[var(--color-silver-dark)]">—</span>
                          )}
                        </td>
                        <td className="p-4 text-center">
                          {item.cultural ? (
                            <Check className="w-5 h-5 text-[var(--color-neon-cyan)] mx-auto" />
                          ) : (
                            <span className="text-[var(--color-silver-dark)]">—</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 mt-20">
        <div className="max-w-4xl mx-auto glass-card p-12 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">需要定制方案？</h2>
          <p className="text-[var(--color-silver-dark)] mb-8">
            我们的专业团队可以根据您的具体需求，提供量身定制的解决方案
          </p>
          <a href="/contact" className="btn-primary">
            立即咨询
          </a>
        </div>
      </section>
    </div>
  );
}