'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Brain, LayoutDashboard, Download, Sparkles, ChevronDown, QrCode } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import QRCode from 'qrcode';

const navItems = [
  { name: '首页', href: '/' },
  { name: '解决方案', href: '/solutions' },
  { name: '剧本案例', href: '/cases' },
  { name: '活动视频', href: '/videos' },
  { name: '关于我们', href: '/about' },
  { name: '资源下载', href: '/resources' },
  { name: '联系我们', href: '/contact' },
];

const quickLinks = [
  { name: '管理后台', href: 'http://192.168.0.181:3100', icon: LayoutDashboard, external: true },
  { name: 'DMS管理', href: 'https://dmd.runnode.cn', icon: LayoutDashboard, external: true },
  { name: 'AI创作', href: 'http://192.168.0.181:2026', icon: Sparkles, external: true },
  { name: 'App下载', href: '#download', icon: Download, external: false },
];

export default function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [quickLinksOpen, setQuickLinksOpen] = useState(false);
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Generate QR code when modal opens
  useEffect(() => {
    if (downloadModalOpen) {
      const apkUrl = 'https://yanxue.runnode.cn/runnode-mdm-launcher-v6.39.apk';
      QRCode.toDataURL(apkUrl, {
        width: 200,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#ffffff',
        },
      }).then(url => {
        setQrCodeDataUrl(url);
      }).catch(err => {
        console.error('QR Code generation failed:', err);
      });
    }
  }, [downloadModalOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setQuickLinksOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleQuickLinkClick = (link: typeof quickLinks[0]) => {
    if (link.name === 'App下载') {
      setDownloadModalOpen(true);
      setQuickLinksOpen(false);
    } else if (link.external) {
      window.open(link.href, '_blank');
      setQuickLinksOpen(false);
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 glass-card rounded-none border-x-0 border-t-0">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="relative">
                <Brain className="w-10 h-10 text-[var(--color-neon-cyan)]" />
                <div className="absolute inset-0 bg-[var(--color-neon-cyan)] blur-xl opacity-30 animate-pulse-glow" />
              </div>
              <div>
                <span className="text-xl font-bold text-white">AI研学</span>
                <span className="text-sm text-[var(--color-neon-cyan)] ml-1">系统</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative py-2 text-sm font-medium transition-colors ${
                    pathname === item.href
                      ? 'text-[var(--color-neon-cyan)]'
                      : 'text-[var(--color-silver)] hover:text-white'
                  }`}
                >
                  {item.name}
                  {pathname === item.href && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-neon-cyan)]"
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Quick Links Dropdown & CTA */}
            <div className="hidden md:flex items-center gap-4">
              {/* Quick Links Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setQuickLinksOpen(!quickLinksOpen)}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[var(--color-silver)] hover:text-white transition-colors rounded-lg hover:bg-white/5"
                >
                  <span>快捷入口</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${quickLinksOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {quickLinksOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full right-0 mt-2 w-48 glass-card py-2"
                    >
                      {quickLinks.map((link) => (
                        <button
                          key={link.name}
                          onClick={() => handleQuickLinkClick(link)}
                          className="w-full flex items-center gap-3 px-4 py-3 text-sm text-[var(--color-silver)] hover:text-white hover:bg-white/5 transition-colors"
                        >
                          <link.icon className="w-4 h-4 text-[var(--color-neon-cyan)]" />
                          <span>{link.name}</span>
                          {link.external && (
                            <svg className="w-3 h-3 ml-auto opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          )}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link href="/contact" className="btn-primary text-sm">
                立即咨询
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-white"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:hidden py-4 border-t border-[var(--glass-border)] mt-4"
            >
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block py-3 text-sm font-medium ${
                    pathname === item.href
                      ? 'text-[var(--color-neon-cyan)]'
                      : 'text-[var(--color-silver)]'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              {/* Mobile Quick Links */}
              <div className="mt-4 pt-4 border-t border-[var(--glass-border)]">
                <div className="text-xs text-[var(--color-silver-dark)] mb-2">快捷入口</div>
                {quickLinks.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => {
                      setIsOpen(false);
                      handleQuickLinkClick(link);
                    }}
                    className="w-full flex items-center gap-3 py-3 text-sm text-[var(--color-silver)]"
                  >
                    <link.icon className="w-4 h-4 text-[var(--color-neon-cyan)]" />
                    <span>{link.name}</span>
                  </button>
                ))}
              </div>
              <Link href="/contact" className="btn-primary text-sm mt-4 inline-block">
                立即咨询
              </Link>
            </motion.div>
          )}
        </div>
      </nav>

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
              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-full bg-[var(--color-neon-cyan)]/20 flex items-center justify-center mx-auto mb-4">
                  <Download className="w-8 h-8 text-[var(--color-neon-cyan)]" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">下载研学App</h3>
                <p className="text-[var(--color-silver-dark)]">选择您的设备类型下载安装</p>
              </div>

              {/* QR Code Section */}
              {qrCodeDataUrl && (
                <div className="mb-6 p-4 rounded-xl bg-white/5 border border-[var(--glass-border)]">
                  <div className="flex items-center gap-2 mb-3 justify-center">
                    <QrCode className="w-4 h-4 text-[var(--color-neon-cyan)]" />
                    <span className="text-sm text-[var(--color-silver-dark)]">扫码直接下载</span>
                  </div>
                  <div className="flex justify-center">
                    <img
                      src={qrCodeDataUrl}
                      alt="下载二维码"
                      className="w-40 h-40 rounded-lg"
                    />
                  </div>
                  <p className="text-xs text-[var(--color-silver-dark)] text-center mt-2">
                    使用 Pad 扫描二维码安装
                  </p>
                </div>
              )}

              <div className="space-y-4">
                <a
                  href="https://yanxue.runnode.cn/runnode-mdm-launcher-v6.31.apk"
                  download
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-[var(--glass-border)] hover:border-[var(--color-neon-cyan)] transition-all group"
                >
                  <div className="w-12 h-12 rounded-lg bg-[var(--color-tech-purple)]/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-[var(--color-tech-purple-light)]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993.0001.5511-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.4124.4124 0 00-.5676.1521l-2.0225 3.503c-1.4655-.6682-3.1128-1.0524-4.8648-1.0524-1.752 0-3.3993.3842-4.8648 1.0524l-2.0225-3.503a.4124.4124 0 00-.5676-.1521.416.416 0 00-.1521.5676l1.9973 3.4592c-2.1698 1.1562-3.6457 3.0871-4.1018 5.3044h18.419c-.4561-2.2173-1.932-4.1482-4.1018-5.3044"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="text-white font-medium group-hover:text-[var(--color-neon-cyan)] transition-colors">MDM Launcher</div>
                    <div className="text-sm text-[var(--color-silver-dark)]">设备管理客户端 v6.31</div>
                  </div>
                  <svg className="w-5 h-5 text-[var(--color-silver-dark)] group-hover:text-[var(--color-neon-cyan)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
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

              <button
                onClick={() => setDownloadModalOpen(false)}
                className="mt-6 w-full py-3 rounded-lg border border-[var(--glass-border)] text-[var(--color-silver)] hover:text-white hover:bg-white/5 transition-colors"
              >
                关闭
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}