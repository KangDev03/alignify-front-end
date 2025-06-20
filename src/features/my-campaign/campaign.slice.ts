import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type {  CampaignResponse,  CampaignState, } from './campaign.type';

    
const initialState: CampaignState = {
    campaigns: [],
}

export const campaignSlice = createSlice({
    name: 'campaign',
    initialState,
    reducers:{
        setCampagin: (state, action: PayloadAction<CampaignResponse>) => {
            state.campaigns = Array.isArray(action.payload?.data) ? action.payload.data : [];

        },
    }
})
export const {setCampagin} = campaignSlice.actions
export default campaignSlice.reducer