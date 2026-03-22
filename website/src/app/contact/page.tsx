'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Check } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import dynamic from 'next/dynamic';

const formSchema = z.object({
  name: z.string().min(2, '姓名至少2个字符'),
  company: z.string().min(2, '单位至少2个字符'),
  email: z.string().email('请输入有效的邮箱地址'),
  phone: z.string().min(11, '请输入正确的手机号'),
  type: z.enum(['school', 'cultural', 'other']),
  message: z.string().min(10, '请描述您的需求，至少10个字符'),
});

type FormData = z.infer<typeof formSchema>;

export default function ContactPage() {
  // 动态导入地图组件（避免 SSR 问题）
  const Map = dynamic(() => import('@/components/Map'), {
    ssr: false,
    loading: () => (
      <div className="aspect-video bg-[var(--color-space-dark-2)] rounded-lg flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[var(--color-neon-cyan)] border-t-transparent rounded-full animate-spin" />
      </div>
    ),
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormData) => {
    console.log('Form data:', data);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
    }, 1000);
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
            <span className="text-white">联系我们</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-[var(--color-silver-dark)]"
          >
            有任何问题？填写表单，我们的团队将在24小时内与您联系
          </motion.p>
        </div>
      </section>

      <section className="px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card p-8"
            >
              {!isSubmitted ? (
                <>
                  <h2 className="text-2xl font-bold text-white mb-6">发送消息</h2>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-[var(--color-silver-dark)] mb-2">
                          姓名 *
                        </label>
                        <input
                          {...register('name')}
                          className="w-full bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-lg px-4 py-2 text-white placeholder:text-[var(--color-silver-dark)] focus:outline-none focus:border-[var(--color-neon-cyan)]"
                          placeholder="您的姓名"
                        />
                        {errors.name && (
                          <p className="text-[var(--color-alert-orange)] text-xs mt-1">
                            {errors.name.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm text-[var(--color-silver-dark)] mb-2">
                          单位 *
                        </label>
                        <input
                          {...register('company')}
                          className="w-full bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-lg px-4 py-2 text-white placeholder:text-[var(--color-silver-dark)] focus:outline-none focus:border-[var(--color-neon-cyan)]"
                          placeholder="学校/机构名称"
                        />
                        {errors.company && (
                          <p className="text-[var(--color-alert-orange)] text-xs mt-1">
                            {errors.company.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-[var(--color-silver-dark)] mb-2">
                          邮箱 *
                        </label>
                        <input
                          type="email"
                          {...register('email')}
                          className="w-full bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-lg px-4 py-2 text-white placeholder:text-[var(--color-silver-dark)] focus:outline-none focus:border-[var(--color-neon-cyan)]"
                          placeholder="your@email.com"
                        />
                        {errors.email && (
                          <p className="text-[var(--color-alert-orange)] text-xs mt-1">
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm text-[var(--color-silver-dark)] mb-2">
                          手机 *
                        </label>
                        <input
                          {...register('phone')}
                          className="w-full bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-lg px-4 py-2 text-white placeholder:text-[var(--color-silver-dark)] focus:outline-none focus:border-[var(--color-neon-cyan)]"
                          placeholder="138****8888"
                        />
                        {errors.phone && (
                          <p className="text-[var(--color-alert-orange)] text-xs mt-1">
                            {errors.phone.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm text-[var(--color-silver-dark)] mb-2">
                        客户类型 *
                      </label>
                      <select
                        {...register('type')}
                        className="w-full bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[var(--color-neon-cyan)]"
                      >
                        <option value="school">学校/教育机构</option>
                        <option value="cultural">文旅基地/博物馆</option>
                        <option value="other">其他</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm text-[var(--color-silver-dark)] mb-2">
                        需求描述 *
                      </label>
                      <textarea
                        {...register('message')}
                        rows={4}
                        className="w-full bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-lg px-4 py-2 text-white placeholder:text-[var(--color-silver-dark)] focus:outline-none focus:border-[var(--color-neon-cyan)] resize-none"
                        placeholder="请描述您的具体需求..."
                      />
                      {errors.message && (
                        <p className="text-[var(--color-alert-orange)] text-xs mt-1">
                          {errors.message.message}
                        </p>
                      )}
                    </div>

                    <button type="submit" className="btn-primary w-full">
                      <Send className="w-4 h-4 inline mr-2" />
                      提交表单
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-12">
                  <div className="w-20 h-20 rounded-full bg-[var(--color-neon-cyan)]/20 flex items-center justify-center mx-auto mb-6">
                    <Check className="w-10 h-10 text-[var(--color-neon-cyan)]" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-3">提交成功!</h2>
                  <p className="text-[var(--color-silver-dark)] mb-6">
                    感谢您的留言，我们的团队将尽快与您联系
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="btn-secondary"
                  >
                    再次提交
                  </button>
                </div>
              )}
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Contact Cards */}
              <div className="glass-card p-8">
                <h3 className="text-xl font-bold text-white mb-6">联系方式</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[var(--color-neon-cyan)]/20 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-[var(--color-neon-cyan)]" />
                    </div>
                    <div>
                      <h4 className="text-sm text-[var(--color-silver-dark)]">邮箱</h4>
                      <p className="text-white">yanxue@runnode.cn</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[var(--color-tech-purple)]/20 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-[var(--color-tech-purple)]" />
                    </div>
                    <div>
                      <h4 className="text-sm text-[var(--color-silver-dark)]">电话</h4>
                      <p className="text-white">020-28185909</p>
                      <p className="text-xs text-[var(--color-silver-dark)]">工作日 9:00-18:00</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[var(--color-alert-orange)]/20 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-[var(--color-alert-orange)]" />
                    </div>
                    <div>
                      <h4 className="text-sm text-[var(--color-silver-dark)]">地址</h4>
                      <p className="text-white">广州市番禺区广州大学城</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="glass-card p-8">
                <h3 className="text-xl font-bold text-white mb-6">公司位置</h3>
                <Map />
              </div>

              {/* WeChat */}
              <div className="glass-card p-8 text-center">
                <h3 className="text-lg font-semibold text-white mb-4">关注我们</h3>
                <div className="w-32 h-32 bg-white rounded-lg mx-auto mb-3 flex items-center justify-center">
                  <span className="text-xs text-gray-500">微信二维码</span>
                </div>
                <p className="text-sm text-[var(--color-silver-dark)]">
                  扫码关注公众号，获取最新资讯
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}