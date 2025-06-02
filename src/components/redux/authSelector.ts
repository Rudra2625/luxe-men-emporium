// components/redux/authSelector.ts
import { RootState } from './store';

export const selectCurrentUser = (state: RootState) => state.auth.user;
