import * as React from 'react';

import { accentColors } from '@/lib/data';

type AccentColor = (typeof accentColors)[number];
type AccentContext = {
  accent: AccentColor;
  setAccent: (accent: AccentColor) => void;
};
type AccentProviderProps = {
  children: React.ReactNode;
  defaultAccent?: AccentColor;
  storageKey?: string;
};

export const AccentContext = React.createContext({} as AccentContext);

export const AccentProvider = ({
  children,
  defaultAccent = 'pink',
  storageKey = 'accent',
}: AccentProviderProps) => {
  const [accent, setAccent] = React.useState(
    () => (localStorage.getItem(storageKey) as AccentColor) ?? defaultAccent,
  );

  React.useEffect(() => {
    document.documentElement.dataset.accent = accent;
  }, [accent]);

  return (
    <AccentContext.Provider
      value={{
        accent,
        setAccent: (accent: AccentColor) => {
          localStorage.setItem(storageKey, accent);
          setAccent(accent);
        },
      }}
    >
      {children}
    </AccentContext.Provider>
  );
};
