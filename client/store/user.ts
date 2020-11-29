import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';

export type UserState = {
  isLoading: boolean;
  name: string | null;
};

const initialState: UserState = {
  isLoading: true,
  name: null,
};

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    load(state) {
      state.isLoading = true;
    },
    setUser(state: UserState, action: PayloadAction<{ id: number; name: string; email: string }>) {
      state.name = action.payload.name;
      state.isLoading = false;
    },
  },
});

const selectLoadingState = createSelector<UserState, UserState['isLoading'], UserState['isLoading']>(
  (state) => state.isLoading,
  (isLoading) => isLoading
);

const selectName = createSelector<UserState, UserState['name'], UserState['name']>(
  (state) => state.name,
  (name) => name
);

const selectAllState = createSelector(selectLoadingState, selectName, (isLoading, name) => {
  return { isLoading, name };
});

export const userSelector = {
  isLoading: (state: RootState) => selectLoadingState(state.user),
  name: (state: RootState) => selectName(state.user),
  all: (state: RootState) => selectAllState(state.user),
};

export const userActions = user.actions;
export default user.reducer;
