import { accentColors, accentColorsValues } from '@/lib/data';
import { cn } from '@/lib/utils';
import { useAccent } from '@/hooks/use-accent';

export default function AccentSwitcher() {
  const { accent, setAccent } = useAccent();

  return (
    <div className="container flex min-h-screen items-center justify-center py-12">
      <ul className="flex items-center justify-center gap-8">
        {accentColors.map((accentColor) => {
          const isActiveAccentColor = accentColor === accent;

          return (
            <li key={accentColor}>
              <button
                onClick={() => setAccent(accentColor)}
                style={
                  {
                    '--accent-color': `${accentColorsValues[accentColor]}`,
                  } as React.CSSProperties
                }
                className={cn(
                  'flex size-[74px] items-center justify-center rounded-full bg-[hsl(var(--accent-color))] text-accent-foreground focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[hsl(var(--accent-color)_/_.5)]',
                  isActiveAccentColor &&
                    'outline outline-2 outline-offset-[14px] outline-foreground focus-visible:outline',
                )}
              >
                <span className="sr-only">{accentColor}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
