import { configureStore } from '@reduxjs/toolkit';
import { pichillCore } from './services/pichillCore';

export const store = configureStore({
  reducer: {
    [pichillCore.reducerPath]: pichillCore.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pichillCore.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
