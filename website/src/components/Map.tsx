'use client';

import { useEffect, useState } from 'react';

export default function Map() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="aspect-video bg-[var(--color-space-dark-2)] rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[var(--color-neon-cyan)] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[var(--color-silver-dark)]">加载地图中...</p>
        </div>
      </div>
    );
  }

  // 北京市海淀区坐标
  const lat = 39.989;
  const lng = 116.306;
  const zoom = 15;

  return (
    <div className="aspect-video rounded-lg overflow-hidden">
      <iframe
        width="100%"
        height="100%"
        frameBorder="0"
        scrolling="no"
        style={{ border: 0 }}
        src={`https://www.openstreetmap.org/export/embed.html?bbox=${lng-0.005}%2C${lat-0.005}%2C${lng+0.005}%2C${lat+0.005}&layer=mapnik&marker=${lat}%2C${lng}`}
        title="公司位置"
      />
    </div>
  );
}