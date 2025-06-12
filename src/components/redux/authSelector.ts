
import { RootState } from './store';

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectAuthLoading = (state: RootState) => state.auth.loading;
export const selectAuthError = (state: RootState) => state.auth.error;
<<<<<<< HEAD
export const selectAuthToken = (state: RootState) => state.auth.token;
=======
export const selectAuthToken = (state: RootState) => state.auth.token;
>>>>>>> 3b8404820fc2ec81453d6b87f50b15154e09842f
