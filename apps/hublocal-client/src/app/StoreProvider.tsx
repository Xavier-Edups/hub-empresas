'use client';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { makeStore } from '@/lib/store';
import { injectStore } from '@/lib/api';
import React from 'react';

const store = makeStore();
injectStore(store);
const persistor = require('redux-persist').persistStore(store);

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
