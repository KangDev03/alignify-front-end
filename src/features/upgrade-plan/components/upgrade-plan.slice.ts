import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { Plan, PlanResponse } from './upgrade-plan.type';

interface PlanSlice {
  plans: Plan[];
  selectedPlan: Plan | null;
}

const initialState: PlanSlice = {
  plans: [],
  selectedPlan: null,
};

export const planSlice = createSlice({
  name: 'plan',
  initialState,
  reducers: {
    setPlans: (state, action: PayloadAction<PlanResponse>) => {
      const payload = action.payload?.data;
      state.plans = Array.isArray(payload) ? payload : [payload];
    },
    addPlan: (state, action: PayloadAction<Plan>) => {
      state.plans.push(action.payload);
    },
    setSelectedPlan: (state, action: PayloadAction<Plan | null>) => {
      state.selectedPlan = action.payload;
    },
    clearPlans: (state) => {
      state.plans = [];
      state.selectedPlan = null;
    },
  },
});

export const { setPlans, addPlan, setSelectedPlan, clearPlans } = planSlice.actions;

export default planSlice.reducer;
