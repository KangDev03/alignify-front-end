// Dùng để gọi API thống kê và định nghĩa kiểu dữ liệu trả về
export type Statistic = {
  influencerId: string;
  influencerName: string;
  postCount: number;
  acceptedRate: number; // Tỉ lệ đơn ứng tuyển được chấp nhận (0-1)
};

export async function fetchStatistics(): Promise<Statistic[]> {
  const res = await fetch('/api/v1/contentPosting/me/statistics');
  if (!res.ok) throw new Error('Failed to fetch statistics');
  return res.json();
}
