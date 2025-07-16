export interface BrandStatistics {
  invitations: Array<{ month: string; sent: number; accepted: number; rejected: number }>;
  applications: Array<{ month: string; total: number; approved: number; pending: number; rejected: number }>;
  costs: Array<{ month: string; paid: number; pending: number }>;
  totalInvitations: number;
  acceptanceRate: number;
  totalApplications: number;
  currentMonthCost: number;
  totalPaid: number;
  totalPending: number;
  totalCost: number;
  avgCost: number;
}

export interface InfluencerStatistics {
  invitations: Array<{ month: string; received: number; accepted: number; rejected: number }>;
  applications: Array<{ month: string; sent: number; accepted: number; rejected: number }>;
  income: Array<{ month: string; income: number; campaigns: number }>;
  forum: Array<{ month: string; posts: number; likes: number; comments: number; shares: number; views: number }>;
  totalInvitations: number;
  acceptanceRate: number;
  currentMonthIncome: number;
  totalForumPosts: number;
  totalIncome: number;
  totalCampaigns: number;
  avgIncomePerCampaign: number;
  avgIncome: number;
}
