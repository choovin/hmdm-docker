import Hero3D from '@/components/Hero3D';
import AICapabilities from '@/components/AICapabilities';

export default function Home() {
  return (
    <>
      <Hero3D />
      <AICapabilities />

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="glass-card p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-[var(--color-tech-purple)]/20 flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">精准定位</h3>
              <p className="text-[var(--color-silver-dark)]">
                结合LBS定位技术，精准识别学生位置，自动解锁对应研学内容
              </p>
            </div>

            {/* Feature 2 */}
            <div className="glass-card p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-[var(--color-neon-cyan)]/20 flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🏆</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">游戏化学习</h3>
              <p className="text-[var(--color-silver-dark)]">
                积分排行、勋章系统、团队协作，让学习变成一场有趣的冒险
              </p>
            </div>

            {/* Feature 3 */}
            <div className="glass-card p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-[var(--color-alert-orange)]/20 flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">📊</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">数据驱动</h3>
              <p className="text-[var(--color-silver-dark)]">
                全链路数据采集与分析，为教育决策提供科学依据
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto glass-card p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            准备好开始了吗？
          </h2>
          <p className="text-[var(--color-silver-dark)] mb-8 max-w-xl mx-auto">
            立即联系我们，获取定制化的研学解决方案，让您的研学活动焕发新生
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="btn-primary text-lg">
              预约演示
            </a>
            <a href="/cases" className="btn-secondary text-lg">
              查看案例
            </a>
          </div>
        </div>
      </section>
    </>
  );
}