'use client';

import Link from 'next/link';
import { Brain, Mail, Phone, MapPin, Github, Twitter, Linkedin } from 'lucide-react';

const footerLinks = {
  product: [
    { name: '解决方案', href: '/solutions' },
    { name: '剧本案例', href: '/cases' },
    { name: '活动视频', href: '/videos' },
    { name: '资源下载', href: '/resources' },
  ],
  company: [
    { name: '关于我们', href: '/about' },
    { name: '联系我们', href: '/contact' },
    { name: '隐私政策', href: '/privacy' },
    { name: '服务条款', href: '/terms' },
  ],
  contact: [
    { icon: Mail, text: 'contact@yanxue.ai' },
    { icon: Phone, text: '400-888-8888' },
    { icon: MapPin, text: '北京市海淀区科技园' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[var(--color-space-dark-2)] border-t border-[var(--glass-border)]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <Brain className="w-10 h-10 text-[var(--color-neon-cyan)]" />
              <div>
                <span className="text-xl font-bold text-white">AI研学</span>
                <span className="text-sm text-[var(--color-neon-cyan)] ml-1">系统</span>
              </div>
            </Link>
            <p className="text-sm text-[var(--color-silver-dark)] mb-6">
              融合人工智能与研学教育，打造下一代沉浸式学习体验
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-[var(--color-silver-dark)] hover:text-[var(--color-neon-cyan)] transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-[var(--color-silver-dark)] hover:text-[var(--color-neon-cyan)] transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-[var(--color-silver-dark)] hover:text-[var(--color-neon-cyan)] transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">产品服务</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--color-silver-dark)] hover:text-[var(--color-neon-cyan)] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">关于我们</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--color-silver-dark)] hover:text-[var(--color-neon-cyan)] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">联系方式</h4>
            <ul className="space-y-3">
              {footerLinks.contact.map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-[var(--color-silver-dark)]">
                  <item.icon className="w-4 h-4 text-[var(--color-neon-cyan)]" />
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-[var(--glass-border)] mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-[var(--color-silver-dark)]">
            © 2026 AI沉浸式研学系统. All rights reserved.
          </p>
          <div className="flex gap-6">
            <span className="text-sm text-[var(--color-silver-dark)]">
              京ICP备xxxxxxxx号
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}