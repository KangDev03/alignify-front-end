import { useEffect, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

import { fetchStatistics,type Statistic } from '@/features/statistics/statistics.service';

export default function StatisticsPage() {
  const [data, setData] = useState<Statistic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStatistics()
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Đang tải thống kê...</div>;
  if (error) return <div>Lỗi: {error}</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
        <span role="img" aria-label="statistic">📊</span>
        Thống kê Influencer
      </h1>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex-1" />
        {/* Có thể thêm bộ lọc/thanh tìm kiếm ở đây nếu cần */}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item) => (
          <Card key={item.influencerId} className="rounded-xl border border-[#E5E7EB] bg-white shadow-sm p-5 flex flex-col gap-3 min-w-[320px] max-w-full">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-base truncate max-w-[180px] text-[#222]">{item.influencerName}</span>
              <Badge variant="secondary" className="bg-[#F3F4F6] text-[#222] font-medium px-3 py-1 rounded-full text-xs">{item.postCount} bài đăng</Badge>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-sm text-[#6B7280]">Tỉ lệ đơn ứng tuyển được chấp nhận:</span>
              <span className="font-bold text-[#22C55E] text-base">{(item.acceptedRate * 100).toFixed(1)}%</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
