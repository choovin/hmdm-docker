'use client';

import { motion } from 'framer-motion';
import { FileText, Download, Lock, Eye, Check } from 'lucide-react';
import { useState } from 'react';

const resources = [
  {
    id: 1,
    title: '2026 AI 研学行业发展白皮书',
    description: '全面分析AI在研学教育领域的应用现状与发展趋势，涵盖市场数据、技术方案、典型案例等内容',
    pages: '86页',
    format: 'PDF',
    category: '行业报告',
  },
  {
    id: 2,
    title: '学校研学方案实施指南',
    description: '为学校提供从方案设计到落地执行的全流程指导，包含课程规划、技术集成、效果评估等',
    pages: '62页',
    format: 'PDF',
    category: '实施指南',
  },
  {
    id: 3,
    title: '文旅基地数字化转型方案',
    description: '帮助博物馆、景区等文旅场所实现数字化升级，提升研学体验与运营效率',
    pages: '54页',
    format: 'PDF',
    category: '解决方案',
  },
  {
    id: 4,
    title: 'AI教育技术应用案例集',
    description: '精选50+国内外AI+教育成功案例，涵盖K12、高等教育、职业教育等场景',
    pages: '120页',
    format: 'PDF',
    category: '案例集',
  },
];

export default function ResourcesPage() {
  const [downloadForm, setDownloadForm] = useState<{
    isOpen: boolean;
    resource: typeof resources[0] | null;
  }>({ isOpen: false, resource: null });
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleDownload = (resource: typeof resources[0]) => {
    setDownloadForm({ isOpen: true, resource });
  };

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!downloadForm.resource) return;

    try {
      const response = await fetch(`${API_URL}/api/contact/resources`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          company: formData.company,
          email: formData.email,
          resource_id: downloadForm.resource.id,
        }),
      });

      const data = await response.json();

      if (data.success && data.download_url) {
        // 提交成功
        setIsSubmitted(true);
      } else {
        alert('提交失败，请重试');
      }
    } catch (error) {
      console.error('提交失败:', error);
      alert('提交失败，请重试');
    }
  };

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
            <span className="text-white">资源</span>
            <span className="neon-text">下载</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-[var(--color-silver-dark)]"
          >
            专业研究报告与实施指南，助您了解行业前沿
          </motion.p>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {resources.map((resource, i) => (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6 group"
              >
                <div className="flex gap-4">
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-xl bg-[var(--color-tech-purple)]/20 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-8 h-8 text-[var(--color-tech-purple)]" />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-[var(--color-neon-cyan)]/20 rounded text-xs text-[var(--color-neon-cyan)]">
                        {resource.category}
                      </span>
                      <span className="text-xs text-[var(--color-silver-dark)]">
                        {resource.pages} · {resource.format}
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[var(--color-neon-cyan)] transition-colors">
                      {resource.title}
                    </h3>
                    <p className="text-sm text-[var(--color-silver-dark)] mb-4 line-clamp-2">
                      {resource.description}
                    </p>

                    {/* Actions */}
                    <div className="flex gap-3">
                      <button className="flex items-center gap-1 text-sm text-[var(--color-silver-dark)] hover:text-white transition-colors">
                        <Eye className="w-4 h-4" />
                        预览
                      </button>
                      <button
                        onClick={() => handleDownload(resource)}
                        className="flex items-center gap-1 text-sm text-[var(--color-neon-cyan)] hover:text-white transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        下载
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 p-6 glass-card text-center"
          >
            <Lock className="w-8 h-8 text-[var(--color-neon-cyan)] mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-white mb-2">填写表单即可下载</h3>
            <p className="text-sm text-[var(--color-silver-dark)]">
              为保证下载资源的质量与后续服务，需要您填写简单的联系信息
            </p>
          </motion.div>
        </div>
      </section>

      {/* Download Modal */}
      {downloadForm.isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => {
            setDownloadForm({ isOpen: false, resource: null });
            setIsSubmitted(false);
          }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="glass-card w-full max-w-md p-6"
            onClick={(e) => e.stopPropagation()}
          >
            {!isSubmitted ? (
              <>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[var(--color-tech-purple)]/20 flex items-center justify-center">
                      <FileText className="w-6 h-6 text-[var(--color-tech-purple)]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">下载资料</h3>
                      <p className="text-xs text-[var(--color-silver-dark)]">
                        {downloadForm.resource?.title}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setDownloadForm({ isOpen: false, resource: null })}
                    className="text-[var(--color-silver-dark)] hover:text-white"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm text-[var(--color-silver-dark)] mb-2">
                      姓名 *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-lg px-4 py-2 text-white placeholder:text-[var(--color-silver-dark)] focus:outline-none focus:border-[var(--color-neon-cyan)]"
                      placeholder="请输入您的姓名"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-[var(--color-silver-dark)] mb-2">
                      单位 *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-lg px-4 py-2 text-white placeholder:text-[var(--color-silver-dark)] focus:outline-none focus:border-[var(--color-neon-cyan)]"
                      placeholder="学校/机构名称"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-[var(--color-silver-dark)] mb-2">
                      邮箱 *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-lg px-4 py-2 text-white placeholder:text-[var(--color-silver-dark)] focus:outline-none focus:border-[var(--color-neon-cyan)]"
                      placeholder="your@email.com"
                    />
                  </div>

                  <button type="submit" className="btn-primary w-full">
                    <Download className="w-4 h-4 inline mr-2" />
                    获取资料
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-[var(--color-neon-cyan)]/20 flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-[var(--color-neon-cyan)]" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">提交成功!</h3>
                <p className="text-[var(--color-silver-dark)] mb-6">
                  感谢您的填写，资料已开始下载
                </p>
                <button
                  onClick={() => {
                    setDownloadForm({ isOpen: false, resource: null });
                    setIsSubmitted(false);
                  }}
                  className="btn-secondary"
                >
                  关闭
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}