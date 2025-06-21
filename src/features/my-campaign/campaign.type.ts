import type { ApiReponseSuccess } from "../common/common.type";

export interface CampaignRequest{
  pageNumber: number | 0,
  pageSize: number | 10
}
export interface Campaign {
  campaignId: string;
  brandName: string;
  brandAvartar: string;
  campaignName: string;
  content: string;
  imageUrl: string;
  budget: number;
  status: string;
  createdAt: number[]; 
  dueAt: number[];
  startAt: number[];  
  categories: Category[];
  campaignRequirements: {[key:string]:number};
    influencerRequirements: string[];
    influencerCountExpected:number;
    influencerCountCurrent: number;
}
interface Category {
  categoryId: string;
  categoryName: string;
}
export interface CampaignState {
    campaigns: Campaign[]
}
export interface CampaignResponse extends ApiReponseSuccess<CampaignState>{
  data: CampaignState
}