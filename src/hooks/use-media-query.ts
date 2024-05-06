import * as React from 'react';

export default function useMediaQuery(query: string) {
  const [matches, setMatches] = React.useState(
    window.matchMedia(query).matches,
  );

  React.useEffect(() => {
    const media = window.matchMedia(query);

    const handleMediaQuery = () => {
      setMatches(media.matches);
    };

    setMatches(media.matches);

    handleMediaQuery();

    media.addEventListener('change', handleMediaQuery);

    return () => {
      media.removeEventListener('change', handleMediaQuery);
    };
  }, [query]);

  return { matches };
}
