import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { Application, ApplicationBrandResponse, Campaign } from './application.type';

interface ApplicationBrandState{
   campaignReponse: Campaign | null,
    applications: Application[]| null
}

const initialState: ApplicationBrandState = {
    campaignReponse: null,
    applications: []
}

interface ApplicationStatusState{
    applicationId: string |null;
    campaignId: string | null;
    status: string
}

export const applicationSlice = createSlice({
    name: 'application',
    initialState,
    reducers: {
        setApplicationBrand: (state, action: PayloadAction<ApplicationBrandResponse>) => {
            state.applications = action.payload.data.applications;
            state.campaignReponse = action.payload.data.campaignResponse;
        },
        setStatusApplicationBrand: (state, action:PayloadAction<ApplicationStatusState>)=>{
        const copyState = state.applications;
        const index = copyState?.findIndex(item=>{
            if (item.applicationId === action.payload.applicationId && item.campaignId===action.payload.campaignId){
                return item;
            }
        });
        if (copyState && index !== undefined && index !== -1 && copyState[index]) {
            copyState[index].status = action.payload.status;
        }
        state.applications=copyState;
        }
    }
}) 
export const { setApplicationBrand, setStatusApplicationBrand} = applicationSlice.actions;
export default applicationSlice.reducer;