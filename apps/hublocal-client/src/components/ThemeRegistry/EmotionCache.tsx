'use client';

import React, { PropsWithChildren } from 'react';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

export default function NextAppDirEmotionCacheProvider({
  children,
  options,
}: PropsWithChildren<{ options: { key: string } }>) {
  const cache = createCache(options);
  return <CacheProvider value={cache}>{children}</CacheProvider>;
}
