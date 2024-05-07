import * as React from 'react';
import ColorThief from 'colorthief';

import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Icons } from '@/components/common/icons';

/* Get dominant color from an image 
resource: https://codesandbox.io/s/get-dominant-color-sp9ot7?file=/src/App.js 
*/
type CallbackFunction = (color: number[]) => void;
function getDominantColor(imageUrl: string, callback: CallbackFunction): void {
  const img = document.createElement('IMG') as HTMLImageElement;
  const colorThief = new ColorThief();
  img.setAttribute('src', imageUrl);
  img.crossOrigin = 'Anonymous';
  if (img.complete) {
    callback(colorThief.getColor(img));
  } else {
    img.addEventListener('load', function () {
      callback(colorThief.getColor(img));
    });
  }
}

export default function PokemonCard() {
  const [rgb, setRgb] = React.useState<number[]>([]);

  React.useEffect(() => {
    getDominantColor('/assets/images/logo.webp', (color) => setRgb(color));
  }, []);

  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <li className="group relative">
          <div className="grid w-full cursor-pointer justify-items-center gap-y-2 rounded-t-[20px] bg-background pt-2.5">
            {/* image */}
            <div className="size-full px-2.5">
              <div className="flex h-[125.8px] w-full items-center justify-center rounded-[15px] bg-[#F1F1F1] px-2.5 md:h-[148px]">
                <img
                  className="relative -top-12 h-[162.35px] w-[161.09px] object-contain md:h-[191px] md:w-[189.9px]"
                  src={'/assets/images/logo.webp'}
                  /* add pokemon name here */
                  alt="Pokebook logo"
                />
              </div>
            </div>
            {/* title */}
            <p className="px-2.5 text-2xl font-medium">beedrill</p>
            {/* types */}
            <ul className="relative z-20 flex w-full items-center justify-center gap-x-2.5 bg-background px-2.5">
              {['normal', 'poison'].map((title) => (
                <li
                  key={title}
                  className="flex items-center justify-center gap-x-0.5 rounded-full bg-[#EEEEEE] px-[12px] py-[4px] font-sans capitalize"
                >
                  <span>🔥</span>
                  {title}
                </li>
              ))}
            </ul>
          </div>

          <div className="absolute inset-x-0 z-10 flex h-[44px] w-full -translate-y-3 cursor-pointer items-end rounded-b-[20px] bg-background px-2.5 pb-2.5 shadow-[0_4px_40px_0_hsl(0_0%_0%_/_.06)] transition-[height] duration-300 ease-in-out group-hover:h-[90px]">
            <Button className="relative hidden w-full justify-between px-[20px] py-[12px] group-hover:flex">
              <span>View Pokemon</span>
              <Icons.EyeIcon />
            </Button>
          </div>
        </li>
      </DrawerTrigger>
      <DrawerContent className="inset-y-0 right-0 w-[min(100vw,_659px)] outline-0">
        <div className="max-h-dvh overflow-y-auto p-4">
          {/* image */}
          <div
            className="relative flex h-44 w-full items-end justify-center rounded-[15px] md:h-[340px]"
            style={{
              backgroundColor: `rgb(${rgb})`, // just a fallback
              backgroundImage: `linear-gradient(to bottom, rgb(${rgb?.map((v) => v + 30)}), rgb(${rgb?.map((v) => v - 30)}))`,
            }}
          >
            <DrawerClose asChild>
              <Button
                variant={'plain'}
                size={'icon'}
                className="absolute left-4 top-4 z-10 size-11 bg-background shadow-[0_4px_4px_0_hsl(0_0%_0%_/_.1)] md:size-[64px]"
              >
                <Icons.ArrowLeftIcon />
              </Button>
            </DrawerClose>
            <img
              className="relative -bottom-28 h-[270.15px] w-[264.6px] object-contain md:h-[319px] md:w-[312px]"
              src={'/assets/images/logo.webp'}
              /* add pokemon name here */
              alt="Pokebook logo"
            />
          </div>
          {/* title and types */}
          <div className="mt-20 grid justify-items-center gap-y-3 pb-12">
            {/* title */}
            <p className="text-5xl font-semibold">Ivysaur</p>
            {/* types */}
            <ul className="flex items-center justify-center gap-x-2.5">
              {['normal', 'poison'].map((title) => (
                <li
                  key={title}
                  className="flex items-center justify-center gap-x-0.5 rounded-full bg-[#EEEEEE] px-[12px] py-[4px] font-sans capitalize"
                >
                  <span>🔥</span>
                  {title}
                </li>
              ))}
            </ul>
          </div>
          {/* tabs */}
          <Tabs defaultValue="about" className="flex w-full flex-col">
            <TabsContent value="about" className="grid">
              {/* title */}
              <p className="border-y border-y-border/70 bg-background py-4 text-center text-2xl font-semibold md:mx-auto md:w-3/4">
                About
              </p>
              {/* about tab content */}
              <div className="border-b border-b-border/70 bg-background md:mx-auto md:w-3/4">
                <div className="grid grid-cols-2 gap-x-6 py-2 text-lg md:gap-x-10 md:text-xl">
                  <p className="justify-self-end">Height</p>
                  <p className="font-semibold">1.0m</p>
                </div>
                <div className="grid grid-cols-2 gap-x-6 py-2 text-lg md:gap-x-10 md:text-xl">
                  <p className="justify-self-end">Weight</p>
                  <p className="font-semibold">13.0kg</p>
                </div>
                <div className="grid grid-cols-2 gap-x-6 py-2 text-lg md:gap-x-10 md:text-xl">
                  <p className="justify-self-end">Abilities</p>
                  <ul className="list-inside list-disc font-semibold">
                    <li>overgrow</li>
                    <li>chlorophyll </li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="stats" className="grid">
              {/* title */}
              <p className="border-y border-y-border/70 bg-background py-4 text-center text-2xl font-semibold md:mx-auto md:w-3/4">
                Stats
              </p>
              {/* stats tab content */}
              <div className="border-b border-b-border/70 bg-background md:mx-auto md:w-3/4">
                <div className="grid grid-cols-[1fr_120px_36px] items-center gap-x-6 py-2 text-lg md:grid-cols-[1fr_189px_36px] md:gap-x-10 md:text-xl">
                  <p className="justify-self-end">HP</p>
                  <Progress value={60} />
                  <p className="font-semibold">60</p>
                </div>
                <div className="grid grid-cols-[1fr_120px_36px] items-center gap-x-6 py-2 text-lg md:grid-cols-[1fr_189px_36px] md:gap-x-10 md:text-xl">
                  <p className="justify-self-end">Attack</p>
                  <Progress value={62} />
                  <p className="font-semibold">62</p>
                </div>
                <div className="grid grid-cols-[1fr_120px_36px] items-center gap-x-6 py-2 text-lg md:grid-cols-[1fr_189px_36px] md:gap-x-10 md:text-xl">
                  <p className="justify-self-end">Defense</p>
                  <Progress value={63} />
                  <p className="font-semibold">63</p>
                </div>
                <div className="grid grid-cols-[1fr_120px_36px] items-center gap-x-6 py-2 text-lg md:grid-cols-[1fr_189px_36px] md:gap-x-10 md:text-xl">
                  <p className="justify-self-end">Special Attack</p>
                  <Progress value={80} />
                  <p className="font-semibold">80</p>
                </div>
                <div className="grid grid-cols-[1fr_120px_36px] items-center gap-x-6 py-2 text-lg md:grid-cols-[1fr_189px_36px] md:gap-x-10 md:text-xl">
                  <p className="justify-self-end">Special Defense</p>
                  <Progress value={80} />
                  <p className="font-semibold">80</p>
                </div>
                <div className="grid grid-cols-[1fr_120px_36px] items-center gap-x-6 py-2 text-lg md:grid-cols-[1fr_189px_36px] md:gap-x-10 md:text-xl">
                  <p className="justify-self-end">Speed</p>
                  <Progress value={60} />
                  <p className="font-semibold">60</p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="similar" className="grid">
              {/* title */}
              <p className="border-y border-y-border/70 bg-background py-4 text-center text-2xl font-semibold md:mx-auto md:w-3/4">
                Similar
              </p>
              {/* similar tab content */}
              <div className="mt-12 border-b border-b-border/70 bg-background pb-4 md:mx-auto md:w-3/4">
                <ul className="grid grid-cols-[repeat(auto-fill,_minmax(min(288px,_100%),_1fr))] gap-x-4 gap-y-12 md:grid-cols-2">
                  {new Array(10).fill(0).map((_, index) => (
                    <li
                      key={index}
                      className="grid justify-items-center gap-y-2 rounded-[20px] bg-background p-2.5 shadow-[0_4px_40px_0_hsl(0_0%_0%_/_.06)]"
                    >
                      {/* image */}
                      <div className="flex h-[125.8px] w-full items-center justify-center rounded-[15px] bg-[#F1F1F1] md:h-[148px]">
                        <img
                          className="relative -top-12 h-[162.35px] w-[161.09px] object-contain md:h-[191px] md:w-[189.9px]"
                          src={'/assets/images/logo.webp'}
                          /* add pokemon name here */
                          alt="Pokebook logo"
                        />
                      </div>
                      {/* title */}
                      <p className="text-2xl font-medium">beedrill</p>
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>
            <TabsList className="mt-16 self-center md:mt-28">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="stats">Stats</TabsTrigger>
              <TabsTrigger value="similar">Similar</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
