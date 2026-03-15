'use client';

import { motion } from 'framer-motion';
import { Brain, Cpu, Database, Users, Award, TrendingUp } from 'lucide-react';

const timeline = [
  {
    year: '2024',
    title: '公司成立',
    description: 'AI沉浸式研学系统正式成立，专注教育科技创新',
  },
  {
    year: '2024',
    title: '产品发布',
    description: '发布第一代AI研学系统，获得首批学校客户',
  },
  {
    year: '2025',
    title: '规模扩展',
    description: '服务学校数量突破100家，覆盖全国10+省份',
  },
  {
    year: '2026',
    title: '技术升级',
    description: '接入最新AI大模型，发布2.0版本',
  },
];

const stats = [
  { icon: Users, value: '500+', label: '合作学校' },
  { icon: Brain, value: '1000+', label: '研学活动' },
  { icon: TrendingUp, value: '50000+', label: '服务学生' },
  { icon: Award, value: '50+', label: '获奖荣誉' },
];

const team = [
  {
    name: '张博士',
    role: '创始人 & CEO',
    background: '前某互联网大厂AI负责人，10年+AI研发经验',
    avatar: '👨‍💼',
  },
  {
    name: '李教授',
    role: '首席教育官',
    background: '某985高校教授，教育学博士生导师',
    avatar: '👨‍🏫',
  },
  {
    name: '王工程师',
    role: '技术总监',
    background: '前某云厂商架构师，分布式系统专家',
    avatar: '👨‍💻',
  },
  {
    name: '赵产品',
    role: '产品总监',
    background: '10年+教育产品经验，多款爆款产品负责人',
    avatar: '👩‍💼',
  },
];

export default function AboutPage() {
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
            <span className="text-white">关于</span>
            <span className="neon-text">我们</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-[var(--color-silver-dark)]"
          >
            用AI赋能教育，让每一个研学之旅都充满可能
          </motion.p>
        </div>
      </section>

      {/* Stats */}
      <section className="px-6 -mt-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6 text-center"
              >
                <stat.icon className="w-8 h-8 text-[var(--color-neon-cyan)] mx-auto mb-3" />
                <div className="text-3xl font-bold text-white neon-text">{stat.value}</div>
                <div className="text-sm text-[var(--color-silver-dark)]">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Intro */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 md:p-12"
          >
            <h2 className="text-2xl font-bold text-white mb-6">公司简介</h2>
            <div className="space-y-4 text-[var(--color-silver-dark)]">
              <p>
                AI沉浸式研学系统是一家专注于教育科技创新的公司，致力于将人工智能技术与研学教育深度融合，为学校、文旅机构提供全方位的智慧研学解决方案。
              </p>
              <p>
                我们相信，AI技术能够让研学教育更加个性化、智能化、沉浸化。通过AI剧本生成、实时数据分析、智能辅导等核心能力，我们帮助教育者创造更好的学习体验，让学生在探索中成长，在体验中学习。
              </p>
              <p>
                截至目前，我们已服务超过500所学校和机构，覆盖50,000+名学生，获得了广泛的市场认可和好评。
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-12">发展历程</h2>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-[var(--color-tech-purple)]" />

            {timeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative flex items-center mb-8 ${
                  i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                <div className={`flex-1 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                  <div className="ml-12 md:ml-0 glass-card p-4 inline-block">
                    <span className="text-[var(--color-neon-cyan)] font-bold">{item.year}</span>
                    <h3 className="text-white font-semibold">{item.title}</h3>
                    <p className="text-sm text-[var(--color-silver-dark)]">{item.description}</p>
                  </div>
                </div>
                <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-[var(--color-neon-cyan)] -translate-x-1/2" />
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-12">技术实力</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Brain,
                title: 'AI大模型',
                description: '自研AI剧本生成引擎，支持多主题、多场景定制',
              },
              {
                icon: Cpu,
                title: '边缘计算',
                description: '低延迟实时数据处理，支持大规模并发',
              },
              {
                icon: Database,
                title: '大数据分析',
                description: '全链路数据采集与智能分析，辅助教育决策',
              },
            ].map((tech, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6 text-center"
              >
                <tech.icon className="w-12 h-12 text-[var(--color-tech-purple)] mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">{tech.title}</h3>
                <p className="text-sm text-[var(--color-silver-dark)]">{tech.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-12">核心团队</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6 text-center"
              >
                <div className="w-20 h-20 rounded-full bg-[var(--color-space-dark-2)] flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">{member.avatar}</span>
                </div>
                <h3 className="text-lg font-semibold text-white">{member.name}</h3>
                <p className="text-sm text-[var(--color-neon-cyan)] mb-3">{member.role}</p>
                <p className="text-xs text-[var(--color-silver-dark)]">{member.background}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}