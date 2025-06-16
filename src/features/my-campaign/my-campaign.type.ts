export interface Campaign {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  budget: number;
  brand: string;
  createdAt: string;
  imageUrl: string;
}

export type CampaignStatus = 'upcoming' | 'ongoing' | 'ended';
