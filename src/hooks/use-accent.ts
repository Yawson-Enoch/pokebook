import * as React from 'react';

import { AccentContext } from '@/context/accent-provider';

export function useAccent() {
  const context = React.useContext(AccentContext);

  if (context === undefined)
    throw new Error('useAccent must be used within AccentProvider');

  return context;
}
