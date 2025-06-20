import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { CampaignState, type CampaignResponse } from './campaign.type';

const initialState: CampaignState = {
    campaign: [],
}

export const campaignSlice = createSlice({
    name: 'campaign',
    initialState,
    reducers:{
        setCampagin: (state, action: PayloadAction<CampaignResponse>)=>{
            state.campaign = action.payload.data;
        },
    }
})
export const {setCampagin} = campaignSlice.actions
export default campaignSlice.reducer