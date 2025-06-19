import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { ContentPosting, ContentPostingResponse } from './forum.type';

interface ContentPostingState {
    contentPosting: ContentPosting[] | null;
}
const initialState: ContentPostingState = {
    contentPosting: null,
}

export const contentPostingSlice = createSlice({
    name: 'contentPosting',
    initialState,
    reducers:{
        setContentPosting: (state, action: PayloadAction<ContentPostingResponse>)=>{
            state.contentPosting = action.payload.data;
        },
    }
})
export const {setContentPosting} = contentPostingSlice.actions
export default contentPostingSlice.reducer