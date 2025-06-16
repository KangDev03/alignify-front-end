import dayjs from 'dayjs';

import type { Campaign, CampaignStatus } from '../my-campaign.type';

export function getCampaignStatus(campaign: Campaign): CampaignStatus {
  const now = dayjs();
  const start = dayjs(campaign.startDate);
  const end = dayjs(campaign.endDate);

  if (now.isBefore(start)) return 'upcoming';
  if (now.isAfter(end)) return 'ended';
  return 'ongoing';
}
