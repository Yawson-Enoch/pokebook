import * as React from 'react';

import { accentColors, accentColorsValues } from '@/lib/data';
import { cn } from '@/lib/utils';
import { useAccent } from '@/hooks/use-accent';
import useMediaQuery from '@/hooks/use-media-query';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

export default function AccentSwitcher() {
  const [open, setOpen] = React.useState(false);
  const { matches } = useMediaQuery('(min-width: 768px)');
  const { accent, setAccent } = useAccent();

  if (matches) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button className="aspect-square size-7 rounded-full bg-accent outline outline-1 outline-offset-4 outline-[#868686] focus-visible:ring-4 md:size-[34.81px]"></button>
        </DialogTrigger>
        <DialogContent className="h-[263px] w-[427px] overflow-hidden rounded-[32px] bg-[#EBEBEB] p-0 lg:duration-300 lg:data-[state=closed]:slide-out-to-bottom-12 lg:data-[state=open]:slide-in-from-bottom-12">
          <DialogHeader className="flex h-[57px] flex-row items-center justify-center bg-background shadow-[0_4px_4px_0_hsl(0_0%_0%_/_.03)] sm:text-center">
            <DialogTitle>Choose Theme</DialogTitle>
          </DialogHeader>
          <div className="p-6">
            <ul className="flex items-center justify-center gap-8">
              {accentColors.map((accentColor) => {
                const isActiveAccentColor = accentColor === accent;

                return (
                  <li key={accentColor}>
                    <DialogClose asChild>
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
                            'outline outline-2 outline-offset-4 outline-foreground focus-visible:outline',
                        )}
                      >
                        <span className="sr-only">{accentColor}</span>
                      </button>
                    </DialogClose>
                  </li>
                );
              })}
            </ul>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <button className="aspect-square size-7 rounded-full bg-accent outline outline-1 outline-offset-4 outline-[#868686] focus-visible:ring-4 md:size-[34.81px]"></button>
      </DrawerTrigger>
      <DrawerContent className="inset-x-0 bottom-0 mt-24 flex h-[263px] flex-col overflow-hidden rounded-t-[32px] bg-[#EBEBEB]">
        <DrawerHeader className="bg-background shadow-[0_4px_4px_0_hsl(0_0%_0%_/_.03)]">
          <div className="mx-auto mb-auto mt-3 h-1.5 w-[100px] rounded-full bg-muted" />
          <DrawerTitle>Choose Theme</DrawerTitle>
        </DrawerHeader>
        <div className="flex h-full items-center justify-center p-6">
          <ul className="flex items-center justify-center gap-6">
            {accentColors.map((accentColor) => {
              const isActiveAccentColor = accentColor === accent;

              return (
                <li key={accentColor}>
                  <DrawerClose asChild>
                    <button
                      onClick={() => setAccent(accentColor)}
                      style={
                        {
                          '--accent-color': `${accentColorsValues[accentColor]}`,
                        } as React.CSSProperties
                      }
                      className={cn(
                        'flex size-12 items-center justify-center rounded-full bg-[hsl(var(--accent-color))] text-accent-foreground focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[hsl(var(--accent-color)_/_.5)]',
                        isActiveAccentColor &&
                          'outline outline-2 outline-offset-4 outline-foreground focus-visible:outline',
                      )}
                    >
                      <span className="sr-only">{accentColor}</span>
                    </button>
                  </DrawerClose>
                </li>
              );
            })}
          </ul>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
