import type { ApiReponseSuccess } from "../common.type";

export interface ApplicationsRequest{
    pageNumber: number | 0,
    pageSize: number | 10
}

export interface Campaign  {
    campaignId: string;
    brandId: string;
    content: string ;
    imageUrl: string;
    categories?: Category[]|[];
    createdDate: string;
    status: string;
    budget: number;
    campaignRequirements: {[key:string]:number};
    influencerRequirement: string[];
    influencerCount: number;

}

interface Category {
    categoryId: string;
    categoryName: string;
}

interface ApplicationsByCampaginResponse  {
        campaignResponse: Campaign;
        applications: Application[];
}

export interface Application {
    applicationId: string;
    campaignId: string;
    influencerId: string;
    brandId: string;
    limited: number;
    status: string;
    createdAt: number[];
}
export interface ApplicationBrandResponse extends ApiReponseSuccess<ApplicationsByCampaginResponse[]>{
    data: ApplicationsByCampaginResponse[]
}

export interface ApplicationByInfluencerResponse extends ApiReponseSuccess<ApplicationsByCampaginResponse[]>{
    data: ApplicationsByCampaginResponse[]
}