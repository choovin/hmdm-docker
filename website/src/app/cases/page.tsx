'use client';

import { motion } from 'framer-motion';
import { MapPin, Clock, Users, ArrowRight } from 'lucide-react';

const cases = [
  {
    id: 1,
    title: '革命圣地探索',
    category: '红色教育',
    description: '重走长征路，沉浸式体验革命历史，培养爱国情怀',
    age: '10-16岁',
    duration: '2-3天',
    students: '500+',
    image: '🗺️',
    spots: ['延安革命纪念馆', '枣园旧址', '杨家岭'],
  },
  {
    id: 2,
    title: '未来科学家',
    category: '科技创新',
    description: '探索前沿科技，激发科学兴趣，培养创新思维',
    age: '8-14岁',
    duration: '1-2天',
    students: '800+',
    image: '🔬',
    spots: ['科技馆', '人工智能实验室', '航天博物馆'],
  },
  {
    id: 3,
    title: '丝绸之路',
    category: '文化探索',
    description: '穿越古今，了解丝路文化，增强文化自信',
    age: '10-18岁',
    duration: '3-5天',
    students: '600+',
    image: '🏛️',
    spots: ['敦煌莫高窟', '西安城墙', '大唐芙蓉园'],
  },
  {
    id: 4,
    title: '雨林奇遇',
    category: '自然探险',
    description: '探索热带雨林生态环境，培养环保意识',
    age: '12-18岁',
    duration: '4-5天',
    students: '300+',
    image: '🌴',
    spots: ['西双版纳热带雨林', '野象谷', '植物园'],
  },
  {
    id: 5,
    title: '大国重器',
    category: '工业研学',
    description: '走进大国工厂，感受中国制造的力量',
    age: '12-18岁',
    duration: '1-2天',
    students: '400+',
    image: '🏭',
    spots: ['汽车工厂', '航天基地', '高铁检修库'],
  },
  {
    id: 6,
    title: '海洋探索',
    category: '海洋教育',
    description: '探索海洋奥秘，培养海洋意识',
    age: '8-16岁',
    duration: '1-2天',
    students: '700+',
    image: '🌊',
    spots: ['海洋博物馆', '海底世界', '码头'],
  },
];

const categories = ['全部', '红色教育', '科技创新', '文化探索', '自然探险', '工业研学', '海洋教育'];

export default function CasesPage() {
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
            <span className="text-white">剧本</span>
            <span className="neon-text">案例</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-[var(--color-silver-dark)]"
          >
            精心设计的研学剧本，涵盖多主题多场景，总有一款适合您
          </motion.p>
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

          {/* Cases Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cases.map((caseItem, i) => (
              <motion.div
                key={caseItem.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -5 }}
                className="glass-card overflow-hidden group cursor-pointer"
              >
                {/* Image Placeholder */}
                <div className="h-48 gradient-card flex items-center justify-center relative overflow-hidden">
                  <span className="text-6xl">{caseItem.image}</span>
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-space-dark)] to-transparent" />
                  <span className="absolute top-4 left-4 px-3 py-1 bg-[var(--color-tech-purple)] rounded-full text-xs text-white">
                    {caseItem.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[var(--color-neon-cyan)] transition-colors">
                    {caseItem.title}
                  </h3>
                  <p className="text-sm text-[var(--color-silver-dark)] mb-4">
                    {caseItem.description}
                  </p>

                  {/* Stats */}
                  <div className="flex gap-4 mb-4 text-xs text-[var(--color-silver-dark)]">
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {caseItem.age}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {caseItem.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {caseItem.students}学员
                    </span>
                  </div>

                  {/* Spots */}
                  <div className="border-t border-[var(--glass-border)] pt-4">
                    <p className="text-xs text-[var(--color-silver-dark)] mb-2">涉及景点</p>
                    <div className="flex flex-wrap gap-2">
                      {caseItem.spots.map((spot, j) => (
                        <span
                          key={j}
                          className="px-2 py-1 bg-[var(--glass-bg)] rounded text-xs text-[var(--color-neon-cyan)]"
                        >
                          {spot}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Hover CTA */}
                <div className="px-6 pb-6">
                  <a
                    href={`/cases/${caseItem.id}`}
                    className="inline-flex items-center gap-1 text-sm text-[var(--color-neon-cyan)] opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    查看详情 <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}