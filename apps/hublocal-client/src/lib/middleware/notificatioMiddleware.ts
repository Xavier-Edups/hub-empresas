import { Middleware } from '@reduxjs/toolkit';

export const createNotificationMiddleware = (enqueueSnackbar: (msg: string, options?: any) => void): Middleware => {
  return () => (next) => (action) => {
    if (action.type.endsWith('/fulfilled')) {
      enqueueSnackbar('Ação realizada com sucesso!', { variant: 'success' });
    }

    if (action.type.endsWith('/rejected')) {
      enqueueSnackbar('Erro ao realizar a ação.', { variant: 'error' });
    }

    return next(action);
  };
};
