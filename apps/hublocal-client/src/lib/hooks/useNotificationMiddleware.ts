'use client';

import { useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { createNotificationMiddleware } from '../middleware/notificationMiddleware';
import { makeStore } from '../store';

const store = makeStore();

export function useNotificationMiddleware() {
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    store.dispatch = createNotificationMiddleware(enqueueSnackbar)(store)(store.dispatch);
  }, [enqueueSnackbar]);
}
